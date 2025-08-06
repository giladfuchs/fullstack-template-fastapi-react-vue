import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    ButtonBase,
    Drawer,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Switch,
    PaletteMode
} from '@mui/material';
import { IconChecks } from '@tabler/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';

import SubCard from 'ui-component/cards/SubCard';
import { MENU_TYPE, PRESET_COLORS, SET_FONT_FAMILY, THEME_RTL, TOGGLE_CUSTOMIZATION_DRAWER } from 'store/actions';

import colors from 'assets/scss/_themes-vars.module.scss';
import theme1 from 'assets/scss/_theme1.module.scss';
import theme2 from 'assets/scss/_theme2.module.scss';
import theme3 from 'assets/scss/_theme3.module.scss';
import theme4 from 'assets/scss/_theme4.module.scss';
import theme5 from 'assets/scss/_theme5.module.scss';
import theme6 from 'assets/scss/_theme6.module.scss';

import { StringColorProps, DefaultRootStateProps } from 'types';
import config from '../../config';

const PresetColor = ({
    color,
    presetColor,
    setPresetColor
}: {
    color: StringColorProps;
    presetColor: string;
    setPresetColor: (s: string) => void;
}) => (
    <Grid item>
        <ButtonBase sx={{ borderRadius: '12px' }} onClick={() => setPresetColor(color?.id!)}>
            <Avatar
                variant="rounded"
                color="inherit"
                sx={{
                    background: `linear-gradient(135deg, ${color.primary} 50%, ${color.secondary} 50%)`,
                    opacity: presetColor === color.id ? 0.6 : 1
                }}
            >
                {presetColor === color.id && <IconChecks color="#fff" />}
            </Avatar>
        </ButtonBase>
    </Grid>
);

const Customization = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);
    const open = useSelector((state: DefaultRootStateProps) => state.customization.openDrawer);

    const handleToggle = () => {
        dispatch({ type: TOGGLE_CUSTOMIZATION_DRAWER, openDrawer: !open });
    };

    const [navType, setNavType] = React.useState<PaletteMode>(customization.navType);
    useEffect(() => {
        dispatch({ type: MENU_TYPE, navType });
    }, [dispatch, navType]);

    const [presetColor, setPresetColor] = React.useState<string>(customization.presetColor);
    useEffect(() => {
        dispatch({ type: PRESET_COLORS, presetColor });
    }, [dispatch, presetColor]);

    const [rtlLayout, setRtlLayout] = React.useState(customization.rtlLayout);
    const handleRtlLayout = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRtlLayout(event.target.checked);
    };

    if (customization.rtlLayout) {
        document?.querySelector('html')?.setAttribute('dir', 'rtl');
    } else {
        document?.querySelector('html')?.removeAttribute('dir');
    }

    useEffect(() => {
        dispatch({ type: THEME_RTL, rtlLayout });
    }, [dispatch, rtlLayout]);

    let initialFont;
    switch (customization.fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins';
            break;
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto';
            break;
    }

    const [fontFamily, setFontFamily] = React.useState(initialFont);
    useEffect(() => {
        let newFont;
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
    }, [dispatch, fontFamily]);

    const colorOptions = [
        {
            id: 'default',
            primary: theme.palette.mode === 'dark' ? colors.darkPrimaryMain : colors.primaryMain,
            secondary: theme.palette.mode === 'dark' ? colors.darkSecondaryMain : colors.secondaryMain
        },
        {
            id: 'theme1',
            primary: theme.palette.mode === 'dark' ? theme1.darkPrimaryMain : theme1.primaryMain,
            secondary: theme.palette.mode === 'dark' ? theme1.darkSecondaryMain : theme1.secondaryMain
        },
        {
            id: 'theme2',
            primary: theme.palette.mode === 'dark' ? theme2.darkPrimaryMain : theme2.primaryMain,
            secondary: theme.palette.mode === 'dark' ? theme2.darkSecondaryMain : theme2.secondaryMain
        },
        {
            id: 'theme3',
            primary: theme.palette.mode === 'dark' ? theme3.darkPrimaryMain : theme3.primaryMain,
            secondary: theme.palette.mode === 'dark' ? theme3.darkSecondaryMain : theme3.secondaryMain
        },
        {
            id: 'theme4',
            primary: theme.palette.mode === 'dark' ? theme4.darkPrimaryMain : theme4.primaryMain,
            secondary: theme.palette.mode === 'dark' ? theme4.darkSecondaryMain : theme4.secondaryMain
        },
        {
            id: 'theme5',
            primary: theme.palette.mode === 'dark' ? theme5.darkPrimaryMain : theme5.primaryMain,
            secondary: theme.palette.mode === 'dark' ? theme5.darkSecondaryMain : theme5.secondaryMain
        },
        {
            id: 'theme6',
            primary: theme.palette.mode === 'dark' ? theme6.darkPrimaryMain : theme6.primaryMain,
            secondary: theme.palette.mode === 'dark' ? theme6.darkSecondaryMain : theme6.secondaryMain
        }
    ];

    return (
        <Drawer
            anchor="right"
            onClose={handleToggle}
            open={open}
            PaperProps={{
                sx: {
                    width: 280
                }
            }}
        >
            <PerfectScrollbar component="div">
                <Grid container spacing={config.gridSpacing} sx={{ p: 3 }}>
                    <Grid item xs={12}>
                        {/* layout type */}
                        <SubCard title="Layout">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Mode</FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="layout"
                                    value={navType}
                                    onChange={(e) => setNavType(e.target.value as PaletteMode)}
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel
                                        value="light"
                                        control={<Radio />}
                                        label="Light"
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 28 },
                                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                                        }}
                                    />
                                    <FormControlLabel
                                        value="dark"
                                        control={<Radio />}
                                        label="Dark"
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 28 },
                                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                                        }}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" sx={{ mt: 2 }}>
                                <FormLabel component="legend">Direction</FormLabel>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={rtlLayout}
                                            onChange={handleRtlLayout}
                                            inputProps={{ 'aria-label': 'controlled-direction' }}
                                        />
                                    }
                                    label="RTL"
                                />
                            </FormControl>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        {/* Theme Preset Color */}
                        <SubCard title="Preset Color">
                            <Grid item container spacing={2} alignItems="center">
                                {colorOptions.map((color, index) => (
                                    <PresetColor key={index} color={color} presetColor={presetColor} setPresetColor={setPresetColor} />
                                ))}
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        {/* font family */}
                        <SubCard title="Font Family">
                            <FormControl>
                                <RadioGroup
                                    aria-label="font-family"
                                    value={fontFamily}
                                    onChange={(e) => setFontFamily(e.target.value)}
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel
                                        value="Roboto"
                                        control={<Radio />}
                                        label="Roboto"
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 28 },
                                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                                        }}
                                    />
                                    <FormControlLabel
                                        value="Poppins"
                                        control={<Radio />}
                                        label="Poppins"
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 28 },
                                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                                        }}
                                    />
                                    <FormControlLabel
                                        value="Inter"
                                        control={<Radio />}
                                        label="Inter"
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 28 },
                                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                                        }}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </SubCard>
                    </Grid>
                </Grid>
            </PerfectScrollbar>
        </Drawer>
    );
};

export default Customization;
