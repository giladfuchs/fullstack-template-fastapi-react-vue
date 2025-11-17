import { TextField, Autocomplete } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { FormField, FormType, FieldAutoComplete, FieldValue } from '@/lib/types';

interface Props {
    field: FormField;
    onChange: (value: FieldValue, key: string) => void;
}

export default function FieldRenderer({ field, onChange }: Props) {
    const label = <FormattedMessage id={field.key} />;

    switch (field.type) {
        case FormType.AutoComplete:
            return (
                <Autocomplete
                    options={(field as FieldAutoComplete).options}
                    value={field.value as string}
                    onChange={(_, value) => onChange(value, field.key)}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />
            );

        case FormType.NUMBER:
        case FormType.TEXT:
        case FormType.TEXTAREA:
        default:
            return (
                <TextField
                    fullWidth
                    type={field.type === FormType.NUMBER ? 'number' : 'text'}
                    label={label}
                    placeholder={field.key}
                    value={field.value}
                    multiline={field.type === FormType.TEXTAREA}
                    rows={field.type === FormType.TEXTAREA ? 5 : undefined}
                    onChange={(e) => onChange(e.target.value, field.key)}
                />
            );
    }
}
