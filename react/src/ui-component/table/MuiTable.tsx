import * as React from 'react';
import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';

import { DefaultRootStateProps, get_columns_mui_by_model, ModelType } from 'types';

import { fetchRowsByModel } from '../../store/generalSlice';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { FormattedMessage } from 'react-intl';

const MuiTable = ({ model }: { model: ModelType }) => {
    const cells = get_columns_mui_by_model(model);
    const dispatch = useDispatch();

    const rows = useSelector((state: DefaultRootStateProps) => state.general.models[model]);

    React.useEffect(() => {
        dispatch(fetchRowsByModel({ model }));
    }, [dispatch, model]);
    return (
        <Grid item xs={12}>
            <MainCard
                data-testid={`mui-table-card-${model}`}
                content={false}
                title={<FormattedMessage id={`${model}_table`} />}
                secondary={
                    <IconButton size="medium" color="primary" component={Link} to={`/form/${model}/add`}>
                        <AddBoxIcon fontSize="medium" />
                    </IconButton>
                }
            >
                <TableContainer>
                    <Table sx={{ minWidth: 350 }} aria-label="mui table">
                        <TableHead>
                            <TableRow>
                                {cells.map((cell: string) => (
                                    <TableCell key={cell} align="left">
                                        <FormattedMessage id={cell} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any) => (
                                <TableRow hover key={row.id}>
                                    {cells.map((cell: string) => (
                                        <TableCell align="left" key={`${cell}_${row[cell]}`}>
                                            {row[cell]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>
        </Grid>
    );
};

export default MuiTable;
