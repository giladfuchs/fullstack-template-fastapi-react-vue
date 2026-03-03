import { ICellRendererParams } from 'ag-grid-community';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

const ActionRenderer = ({ value }: ICellRendererParams) => (
    <>
        <IconButton sx={{ mt: 0.3 }} size="small" aria-label="view" color="inherit" component={Link} to={`/view/${value}`}>
            <VisibilityIcon fontSize="small" />
        </IconButton>
    </>
);

export default ActionRenderer;
