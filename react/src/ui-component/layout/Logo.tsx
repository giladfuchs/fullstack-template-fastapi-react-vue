import { useTheme } from '@mui/material/styles';
import logo from '../../assets/images/logo.png';

const Logo = () => {
    const theme = useTheme();

    return (
        <img
            src={theme.palette.mode === 'dark' ? logo : logo}
            alt="Full Stack Template"
            style={{
                width: '100%',
                maxWidth: 240,
                height: 'auto',
                display: 'block'
            }}
        />
    );
};

export default Logo;
