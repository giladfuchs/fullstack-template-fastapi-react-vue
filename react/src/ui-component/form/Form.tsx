import { useNavigate, useParams } from 'react-router-dom';
import { DefaultRootStateProps, ModelType } from '../../types';
import { create_form_fields, FormField, get_form_by_model } from '../../types/form';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { array_obj_to_obj_with_key } from '../../utils/transformation';
import { createOrUpdateRow } from 'store/generalSlice';
import { AppDispatch } from 'store';
import { FormattedMessage, useIntl } from 'react-intl';
import DynamicForm from './DynamicForm';
import { Button } from '@mui/material';
import MainCard from '../cards/MainCard';

const Form = () => {
    const intl = useIntl();

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id, model } = useParams() as {
        id: string;
        model: ModelType;
    };
    const { models, student_id, user_id } = useSelector((state: DefaultRootStateProps) => state.general);

    const model_objs = models[model];
    const is_add: boolean = id === 'add';

    const obj = is_add ? {} : array_obj_to_obj_with_key(model_objs, id, 'id') ?? {};
    const fields: FormField[] = create_form_fields(get_form_by_model(model), obj);
    const title = intl.formatMessage({ id: `${is_add ? 'form_header_add' : 'form_header_edit'}_${model}` });

    const handleSubmit = async (send_fields: FormField[]) => {
        const data: Record<string, any> = Object.fromEntries(
            send_fields.map((f) => [f.key, typeof f.value === 'string' ? f.value.trim() : f.value])
        );
        if ([ModelType.student, ModelType.assignment].includes(model)) {
            data.teacher_id = user_id;
        }
        if (model === ModelType.assignment) {
            data.student_id = student_id;
        }
        try {
            const message = intl.formatMessage({ id: is_add ? 'toast.create_success' : 'toast.edit_success' }, { model });
            await dispatch(createOrUpdateRow({ model, data, id, message })).unwrap();
            if (model === ModelType.teacher) navigate(`/login`);
            else if (model === ModelType.student && is_add) navigate(`/${ModelType.student}`);
            else navigate(`/view/${student_id}`);
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    return (
        <MainCard sx={{ py: 6, maxWidth: '65rem', mx: 'auto', textAlign: 'center' }}>
            <Button size="small" onClick={() => navigate(-1)}>
                <FormattedMessage id="form.button.back" />
            </Button>
            <DynamicForm title={title} fields={fields} onSubmit={handleSubmit} />
        </MainCard>
    );
};

export default Form;
