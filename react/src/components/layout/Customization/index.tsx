import { ChangeEvent, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Property } from 'csstype';
import { useTheme } from '@mui/material/styles';
import { Avatar, ButtonBase, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Switch, PaletteMode } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import SubCard from '@/components/cards/SubCard';

import colors from '@/assets/scss/_themes-vars.module.scss';
import theme1 from '@/assets/scss/_theme1.module.scss';
import theme2 from '@/assets/scss/_theme2.module.scss';
import theme3 from '@/assets/scss/_theme3.module.scss';
import theme4 from '@/assets/scss/_theme4.module.scss';
import theme5 from '@/assets/scss/_theme5.module.scss';
import theme6 from '@/assets/scss/_theme6.module.scss';

import { StringColorProps } from '@/lib/types';
import { useAppDispatch, setFontFamily, setNavType, setPresetColor, setRtlLayout, useAppSelector } from '@/lib/store';

const PresetColor = ({
    color,
    presetColor,
    setPresetColorState
}: {
    color: StringColorProps;
    presetColor: string;
    setPresetColorState: (s: string) => void;
}) => (
    <Grid>
        <ButtonBase sx={{ borderRadius: '0.75rem' }} onClick={() => setPresetColorState(color.id)}>
            <Avatar
                variant="rounded"
                color="inherit"
                sx={{
                    background: `linear-gradient(135deg, ${color.primary} 50%, ${color.secondary} 50%)`,
                    opacity: presetColor === color.id ? 0.6 : 1
                }}
            >
                {presetColor === color.id && <CheckCircleIcon sx={{ color: '#fff' }} />}
            </Avatar>
        </ButtonBase>
    </Grid>
);

const Customization = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const customization = useAppSelector((state) => state.customization);

    const [navType, setNavTypeState] = useState<PaletteMode>(customization.navType);
    useEffect(() => {
        dispatch(setNavType(navType));
    }, [dispatch, navType]);

    const [presetColor, setPresetColorState] = useState<string>(customization.presetColor);
    useEffect(() => {
        dispatch(setPresetColor(presetColor));
    }, [dispatch, presetColor]);

    const [rtlLayout, setRtlLayoutState] = useState(customization.rtlLayout);
    const handleRtlLayout = (event: ChangeEvent<HTMLInputElement>) => {
        setRtlLayoutState(event.target.checked);
    };

    if (customization.rtlLayout) {
        document?.querySelector('html')?.setAttribute('dir', 'rtl');
    } else {
        document?.querySelector('html')?.removeAttribute('dir');
    }

    useEffect(() => {
        dispatch(setRtlLayout(rtlLayout));
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

    const [fontFamily, setFontFamilyState] = useState(initialFont);
    useEffect(() => {
        let newFont: Property.FontFamily;
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
        dispatch(setFontFamily(newFont));
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
        <Grid container sx={{ p: 3, gap: 2 }}>
            <Grid size={12}>
                <SubCard title={<FormattedMessage id="layout" />}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            <FormattedMessage id="mode" />
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-label="layout"
                            value={navType}
                            onChange={(e) => setNavTypeState(e.target.value as PaletteMode)}
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="light" control={<Radio />} label={<FormattedMessage id="light" />} />
                            <FormControlLabel value="dark" control={<Radio />} label={<FormattedMessage id="dark" />} />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" sx={{ mt: 2 }}>
                        <FormLabel component="legend">
                            <FormattedMessage id="direction" />
                        </FormLabel>
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
            <Grid size={12}>
                <SubCard title={<FormattedMessage id="preset_color" />}>
                    <Grid container spacing={2} alignItems="center">
                        {colorOptions.map((color, index) => (
                            <PresetColor key={index} color={color} presetColor={presetColor} setPresetColorState={setPresetColorState} />
                        ))}
                    </Grid>
                </SubCard>
            </Grid>
            <Grid size={12}>
                <SubCard title={<FormattedMessage id="font_family" />}>
                    <FormControl>
                        <RadioGroup
                            aria-label="font-family"
                            value={fontFamily}
                            onChange={(e) => setFontFamilyState(e.target.value)}
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Roboto" control={<Radio />} label={<FormattedMessage id="Roboto" />} />
                            <FormControlLabel value="Poppins" control={<Radio />} label={<FormattedMessage id="Poppins" />} />
                            <FormControlLabel value="Inter" control={<Radio />} label={<FormattedMessage id="Inter" />} />
                        </RadioGroup>
                    </FormControl>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default Customization;
