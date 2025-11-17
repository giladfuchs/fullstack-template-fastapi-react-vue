import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'sonner';
import { Typography } from '@mui/material';

export default function FormError({ fieldError }: { fieldError: string }) {
    const intl = useIntl();
    const isFieldSpecific = fieldError.startsWith('form.label.');
    const isUnique = fieldError.includes('unique:');

    let baseFieldId = isUnique
        ? fieldError.slice(fieldError.indexOf('unique:') + 'unique:'.length)
        : fieldError.slice('form.label.'.length);
    toast.error(intl.formatMessage({ id: 'form.error' }), {
        description: isUnique
            ? intl.formatMessage({ id: 'form.error.unique' }, { field: intl.formatMessage({ id: baseFieldId }) })
            : intl.formatMessage({ id: 'form.error.required.dynamic' }, { field: intl.formatMessage({ id: baseFieldId }) })
    });
    return (
        <Typography textAlign="center" fontSize={isFieldSpecific ? '2em' : '2em'} color="error" mt={2}>
            {isUnique ? (
                <FormattedMessage id="form.error.unique" values={{ field: intl.formatMessage({ id: baseFieldId }) }} />
            ) : isFieldSpecific ? (
                <FormattedMessage id="form.error.required.dynamic" values={{ field: intl.formatMessage({ id: baseFieldId }) }} />
            ) : fieldError === 'form.error' ? (
                <FormattedMessage id={fieldError} />
            ) : (
                <>{fieldError}</>
            )}
        </Typography>
    );
}
