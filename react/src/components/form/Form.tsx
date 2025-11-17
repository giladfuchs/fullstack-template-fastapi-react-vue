import { useState, useEffect, useCallback } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from '@mui/material';
import DynamicForm from './DynamicForm';
import MainCard from '../cards/MainCard';
import FormError from '@/components/form/FormError';
import { ModelType, create_form_fields, FormField, get_form_by_model, FieldValue, FormModelType } from '@/lib/types';
import { createOrUpdateRow, fetchRowById } from '@/lib/utils/api';
import { useAppSelector } from '@/lib/store';

export default function Form() {
    const intl = useIntl();
    const navigate = useNavigate();
    const { id, model } = useParams() as { id: string; model: ModelType };
    const errorRedirect = <Navigate to="/error" replace />;
    if (!Object.values(ModelType).includes(model as ModelType)) return errorRedirect;
    const { student_id, user_id } = useAppSelector((state) => state.general);

    const is_add = id === 'add';

    const [fieldError, setFieldError] = useState<string | null>(null);
    const [fields, setFields] = useState<FormField[]>([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const setFormFields = useCallback(
        (data: FormModelType | Record<string, FieldValue>) => {
            setFields(create_form_fields(get_form_by_model(model), data as Record<string, FieldValue>));
        },
        [model]
    );

    const loadData = useCallback(async () => {
        if (is_add) {
            setFormFields({});
            return;
        }
        try {
            const data: FormModelType = await fetchRowById({
                model,
                id
            });
            setFormFields(data);
        } catch {
            setShouldRedirect(true);
        }
    }, [id, model, is_add, setFormFields]);

    useEffect(() => {
        void loadData();
    }, [loadData]);

    if (shouldRedirect) return errorRedirect;

    const title = intl.formatMessage({ id: `${is_add ? 'form_header_add' : 'form_header_edit'}_${model}` });

    const handleSubmit = async (send_fields: FormField[]) => {
        const data: Record<string, FieldValue> = Object.fromEntries(
            send_fields
                .filter((f) => f.key != null)
                .map<
                    [string, FieldValue]
                >((f) => (typeof f.value === 'string' ? [String(f.key), f.value.trim() === '' ? null : f.value.trim()] : [String(f.key), f.value ?? null]))
        );
        if ([ModelType.student, ModelType.assignment].includes(model)) data.teacher_id = user_id;
        if (model === ModelType.assignment) data.student_id = student_id;

        try {
            const message = intl.formatMessage({ id: is_add ? 'toast.create_success' : 'toast.edit_success' }, { model });
            await createOrUpdateRow({ model, data, id, message });
            if (model === ModelType.teacher) navigate(`/login`);
            else if (model === ModelType.student && is_add) navigate(`/${ModelType.student}`);
            else navigate(`/view/${student_id}`);
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                let intlId = err.response?.data?.message ?? 'form.error';
                const errors = err.response?.data?.errors;
                if (Array.isArray(errors) && errors.length > 0 && errors[0]?.field) intlId = `form.label.${errors[0].field}`;
                setFieldError(intlId);
            } else {
                setFieldError('form.error');
            }
        }
    };

    return (
        <MainCard sx={{ py: 6, maxWidth: '65rem', mx: 'auto', textAlign: 'center' }}>
            <Button size="small" onClick={() => navigate(-1)}>
                <FormattedMessage id="form.button.back" />
            </Button>
            {fields.length > 0 && <DynamicForm title={title} fields={fields} onSubmit={handleSubmit} />}
            {fieldError && <FormError fieldError={fieldError} />}
        </MainCard>
    );
}
