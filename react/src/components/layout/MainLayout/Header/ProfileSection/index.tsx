import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
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

import MainCard from '@/components/cards/MainCard';
import { useAuth } from '@/lib/contexts/UseAuth';
import Customization from '@/components/layout/Customization';
import { useAppDispatch, setLocale } from '@/lib/store';

const ProfileSection = () => {
    const theme = useTheme();
    const intl = useIntl();
    const dispatch = useAppDispatch();
    const { logout } = useAuth();

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

    const handleToggle = () => setOpen((prev) => !prev);

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as Node)) return;
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current && !open) anchorRef.current?.focus();
        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                sx={{
                    height: '3rem',
                    alignItems: 'center',
                    borderRadius: '1.6875rem',
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
                popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [0, 14] } }] }}
            >
                <Paper sx={{ maxWidth: '22rem' }}>
                    <ClickAwayListener onClickAway={handleClose} mouseEvent="onMouseUp" touchEvent="onTouchEnd">
                        <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                            <Box sx={{ p: 2 }}>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h4">
                                        <FormattedMessage id="full_stack_template" />
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box
                                sx={{
                                    height: '100%',
                                    maxHeight: 'calc(100vh - 8rem)',
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    '&::-webkit-scrollbar': {
                                        width: '0.4rem'
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        backgroundColor: theme.palette.background.paper
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: '0.5rem'
                                    },
                                    '&::-webkit-scrollbar-thumb:hover': {
                                        backgroundColor: theme.palette.primary.dark
                                    },
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`
                                }}
                            >
                                <Box sx={{ p: 2 }}>
                                    <Divider />
                                    <List
                                        component="nav"
                                        sx={{
                                            width: '100%',
                                            maxWidth: '21',
                                            minWidth: '18rem',
                                            backgroundColor: theme.palette.background.paper,
                                            borderRadius: '0.5rem',
                                            [theme.breakpoints.down('md')]: { minWidth: '100%' },
                                            '& .MuiListItemButton-root': { mt: 0.5 }
                                        }}
                                    >
                                        <ListItemButton sx={{ borderRadius: '0.7rem' }} onClick={handleLogout}>
                                            <ListItemIcon>
                                                <LogoutIcon sx={{ fontSize: '1.3rem', strokeWidth: 1.5 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="body2">
                                                        <FormattedMessage id="logout" />
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                        <ListItemButton sx={{ borderRadius: '0.7rem' }} onClick={() => setOpenLanguage((v) => !v)}>
                                            <ListItemIcon>
                                                <TranslateTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="body2">
                                                        <FormattedMessage id="language" />
                                                    </Typography>
                                                }
                                            />
                                            {openLanguage ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </ListItemButton>

                                        {openLanguage && (
                                            <List component="div" disablePadding>
                                                {[
                                                    { lng: 'en', label: intl.formatMessage({ id: 'english' }) },
                                                    { lng: 'es', label: intl.formatMessage({ id: 'spanish' }) },
                                                    { lng: 'fr', label: intl.formatMessage({ id: 'french' }) },
                                                    { lng: 'he', label: intl.formatMessage({ id: 'hebrew' }) },
                                                    { lng: 'hi', label: intl.formatMessage({ id: 'hindi' }) }
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
                                    </List>

                                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                        <Typography variant="h4">
                                            <FormattedMessage id="theme_settings" />
                                        </Typography>
                                        <SettingsIcon sx={{ fontSize: '1.4rem', strokeWidth: 2 }} />
                                    </Box>
                                    <Customization />
                                </Box>
                            </Box>
                        </MainCard>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </>
    );
};

export default ProfileSection;
