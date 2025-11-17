import { ElementType } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useTheme, styled } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box, Link as MuiLink, Button } from '@mui/material';
import MainCard, { MainCardProps } from '@/components/cards/MainCard';
import FormLogin from '@/components/form/FormLogin';
import Logo from '@/components/layout/Logo';
import MuiTable from '@/components/table/MuiTable';
import { ModelType } from '@/lib/types';

import API from '@/lib/utils/api';
import { useAppDispatch, fetchRowsByModel } from '@/lib/store';

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
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const resetData = async () => {
        await API.get('auth/create_fake_data');
        dispatch(fetchRowsByModel({ model: ModelType.teacher }));
    };
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
                                                        <FormattedMessage id="hi_welcome_back" />
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        <FormattedMessage id="enter_credentials_continue" />
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid size={12}>
                                        <FormLogin />
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
                                                <FormattedMessage id="no_account" />
                                            </MuiLink>
                                        </Grid>
                                    </Grid>
                                    <Button size="large" variant="contained" color="warning" onClick={resetData}>
                                        <FormattedMessage id="reset_database_button" />
                                    </Button>
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
