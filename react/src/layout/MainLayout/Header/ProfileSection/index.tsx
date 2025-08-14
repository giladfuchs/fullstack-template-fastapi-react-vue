import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';
import {
    TranslateTwoTone as TranslateTwoToneIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Logout as LogoutIcon,
    Settings as SettingsIcon
} from '@mui/icons-material';

import PerfectScrollbar from 'react-perfect-scrollbar';
import MainCard from '../../../../ui-component/cards/MainCard';
import { useAuth } from '../../../../contexts/UseAuth';
import { DefaultRootStateProps } from '../../../../types';
import Customization from '../../../Customization';
import { setLocale } from '../../../../store/customizationReducer';
import { useAppDispatch } from '../../../../store';

const ProfileSection = () => {
    const theme = useTheme();
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);

    const { logout } = useAuth();
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [openLanguage, setOpenLanguage] = useState(false);

    const anchorRef = useRef<HTMLDivElement | null>(null);

    const handleLogout = async () => {
        try {
            logout();
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current?.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': { stroke: theme.palette.primary.light }
                    },
                    '& .MuiChip-label': { lineHeight: 0 }
                }}
                label={<SettingsIcon sx={{ fontSize: '1.5rem', strokeWidth: 1.5, color: theme.palette.primary.main }} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />

            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                disablePortal
                popperOptions={{
                    modifiers: [{ name: 'offset', options: { offset: [0, 14] } }]
                }}
            >
                <Paper sx={{ maxWidth: '22rem' }}>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                            <Box sx={{ p: 2 }}>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h4">Full Stack Template</Typography>
                                </Stack>
                            </Box>

                            <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                <Box sx={{ p: 2 }}>
                                    <Divider />
                                    <List
                                        component="nav"
                                        sx={{
                                            width: '100%',
                                            maxWidth: 350,
                                            minWidth: 300,
                                            backgroundColor: theme.palette.background.paper,
                                            borderRadius: '10px',
                                            [theme.breakpoints.down('md')]: { minWidth: '100%' },
                                            '& .MuiListItemButton-root': { mt: 0.5 }
                                        }}
                                    >
                                        <ListItemButton
                                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                                            onClick={() => setOpenLanguage(!openLanguage)}
                                        >
                                            <ListItemIcon>
                                                <TranslateTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="body2">Language</Typography>} />
                                            {openLanguage ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </ListItemButton>

                                        {openLanguage && (
                                            <List component="div" disablePadding>
                                                {[
                                                    { lng: 'en', label: 'English (UK)' },
                                                    { lng: 'fr', label: 'Français (French)' },
                                                    { lng: 'ro', label: 'Română (Romanian)' },
                                                    { lng: 'zh', label: '中文 (Chinese)' }
                                                ].map(({ lng, label }) => (
                                                    <ListItemButton
                                                        key={lng}
                                                        sx={{ pl: 5 }}
                                                        onClick={() => {
                                                            dispatch(setLocale(lng));
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        <ListItemText primary={<Typography variant="body2">{label}</Typography>} />
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        )}

                                        <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }} onClick={handleLogout}>
                                            <ListItemIcon>
                                                <LogoutIcon sx={{ fontSize: '1.3rem', strokeWidth: 1.5 }} />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                        </ListItemButton>
                                    </List>

                                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                        <Typography variant="h4">Theme Settings</Typography>
                                        <SettingsIcon sx={{ fontSize: '1.4rem', strokeWidth: 2 }} />
                                    </Box>
                                    <Customization />
                                </Box>
                            </PerfectScrollbar>
                        </MainCard>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </>
    );
};

export default ProfileSection;
