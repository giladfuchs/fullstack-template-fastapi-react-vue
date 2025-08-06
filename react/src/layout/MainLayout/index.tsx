import React from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { styled, useTheme, Theme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

import Header from './Header';
import Customization from '../Customization';
import { SET_MENU } from 'store/actions';

interface MainStyleProps {
    theme: Theme;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }: MainStyleProps) => ({
    ...theme.typography.mainContent,

    ...{
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - 260px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    }
}));

const MainLayout = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownMd });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);

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

            <Main theme={theme}>
                <Outlet />
            </Main>
            <Customization />
        </Box>
    );
};

export default MainLayout;
