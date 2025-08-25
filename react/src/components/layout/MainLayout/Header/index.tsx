import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Box, Divider, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ProfileSection from './ProfileSection';
import config from '@/lib/utils/config';

const Header = () => (
    <>
        <Button variant="contained" color="secondary" startIcon={<HomeIcon />} component={Link} to={config.defaultPath}>
            <Box sx={{ flexGrow: 1 }} />
            <FormattedMessage id="home" />
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <ProfileSection />
    </>
);

export default Header;
