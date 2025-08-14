import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Divider, Button } from '@mui/material';
import ProfileSection from './ProfileSection';
import config from '../../../config';

const Header = () => (
    <>
        <Button variant="contained" color="secondary" startIcon={<HomeIcon />} component={Link} to={config.defaultPath}>
            <Box sx={{ flexGrow: 1 }} />
            Home
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <ProfileSection />
    </>
);

export default Header;
