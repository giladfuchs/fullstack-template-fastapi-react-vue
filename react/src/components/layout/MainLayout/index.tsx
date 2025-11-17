import { Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    ...theme.typography.mainContent,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - 260px)`,
    [theme.breakpoints.down('md')]: { marginLeft: '20px' },
    [theme.breakpoints.down('sm')]: { marginLeft: '10px' }
}));

const MainLayout = () => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: theme.transitions.create('width')
                }}
            >
                <Toolbar>
                    <Header />
                </Toolbar>
            </AppBar>
            <Main>
                <Outlet />
            </Main>
        </Box>
    );
};

export default MainLayout;
