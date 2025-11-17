import { FormEvent, useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import FieldRenderer from './FieldRenderer';
import { FieldValue, FormField } from '@/lib/types';

interface DynamicFormProps {
    title: string;
    fields: FormField[];
    onSubmit: (fields: FormField[]) => void;
}

export default function DynamicForm({ title, fields, onSubmit }: DynamicFormProps) {
    const [localFields, setLocalFields] = useState<FormField[]>(fields);

    const handleChange = (value: FieldValue, key: string) => {
        const updated = localFields.map((f) => (f.key === key ? { ...f, value } : f));
        setLocalFields(updated);
    };

    return (
        <Grid
            container
            justifyContent="center"
            component="form"
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                onSubmit(localFields);
            }}
        >
            <Grid size={{ xs: 12, sm: 10, md: 6, lg: 4 }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
                    <FormattedMessage id={title} />
                </Typography>

                <Grid container spacing={3}>
                    {localFields.map((field) => (
                        <Grid size={12} key={field.key}>
                            <FieldRenderer field={field} onChange={handleChange} />
                        </Grid>
                    ))}

                    <Grid size={12} textAlign="center">
                        <Button type="submit" variant="contained" data-testid="form-submit-button">
                            <FormattedMessage id="form.button.submit" />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
