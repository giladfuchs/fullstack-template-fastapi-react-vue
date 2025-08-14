import { Link } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box, Link as MuiLink } from '@mui/material';
import MainCard, { MainCardProps } from '../../ui-component/cards/MainCard';
import AuthLogin from './AuthLogin';
import Logo from '../../ui-component/layout/Logo';
import MuiTable from '../../ui-component/table/MuiTable';
import { ModelType } from '../../types';
import { ElementType } from 'react';

const AuthCardWrapper = ({ children, ...other }: MainCardProps) => (
    <MainCard
        sx={{
            maxWidth: { xs: 400, lg: 475 },
            margin: { xs: 2.5, md: 3 },
            '& > *': { flexGrow: 1, flexBasis: '50%' }
        }}
        content={false}
        {...other}
    >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
);

const AuthWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light,
    minHeight: '100vh'
}));

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid size={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid sx={{ mb: 3 }}>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>

                                    <Grid size={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Hi, Welcome Back
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid size={12}>
                                        <AuthLogin />
                                    </Grid>

                                    <Grid size={12}>
                                        <Divider />
                                    </Grid>

                                    <Grid size={12}>
                                        <Grid container direction="column" alignItems="center">
                                            <MuiLink
                                                component={Link as ElementType}
                                                to={`/form/${ModelType.teacher}/add`}
                                                variant="subtitle1"
                                                underline="none"
                                            >
                                                Don&apos;t have an account?
                                            </MuiLink>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container justifyContent="center">
                <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6 }}>
                    <MuiTable model={ModelType.teacher} />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Login;
