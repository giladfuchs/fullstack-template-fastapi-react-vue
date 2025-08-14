import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useAuth } from '../../contexts/UseAuth';
import { ModelType } from '../../types';

type LoginValues = {
    id: string;
    phone: string;
    submit?: string;
};

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { login } = useAuth();

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid size={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign in with ID & Phone</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik<LoginValues>
                initialValues={{ id: '', phone: '', submit: undefined }}
                validationSchema={Yup.object({
                    id: Yup.string().max(10).required('ID is required'),
                    phone: Yup.string()
                        .matches(/^\d+$/, 'Phone number must be digits only')
                        .min(8)
                        .max(15)
                        .required('Phone number is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        await login(values.id, values.phone).then(
                            () => navigate(`/${ModelType.student}`),
                            (err: unknown) => {
                                const message = err instanceof Error ? err.message : String(err);
                                setStatus({ success: false });
                                setErrors({ submit: message });
                                setSubmitting(false);
                            }
                        );
                    } catch (err: unknown) {
                        const message = err instanceof Error ? err.message : String(err);
                        setStatus({ success: false });
                        setErrors({ submit: message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <FormControl fullWidth error={Boolean(touched.id && errors.id)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-id-login">ID</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-id-login"
                                type="text"
                                value={values.id}
                                name="id"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="ID"
                            />
                            {touched.id && errors.id && (
                                <FormHelperText error id="standard-weight-helper-text-id-login">
                                    {errors.id}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-phone-login">Phone Number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-phone-login"
                                type="tel"
                                value={values.phone}
                                name="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Phone Number"
                                inputProps={{ maxLength: 15 }}
                            />
                            {touched.phone && errors.phone && (
                                <FormHelperText error id="standard-weight-helper-text-phone-login">
                                    {errors.phone}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {typeof errors.submit === 'string' && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                Sign in
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Login;
