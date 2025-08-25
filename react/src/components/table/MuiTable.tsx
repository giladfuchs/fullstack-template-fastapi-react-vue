import { FormattedMessage } from 'react-intl';
import { ElementType, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MainCard from '../cards/MainCard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useAppDispatch, fetchRowsByModel, useAppSelector } from '@/lib/store';
import { get_columns_mui_by_model, ModelType, MUITableModelType } from '@/lib/types';

export default function MuiTable({ model }: { model: ModelType }) {
    const cells = get_columns_mui_by_model(model);
    const dispatch = useAppDispatch();
    const rows: MUITableModelType[] = useAppSelector((state) => state.general.models[model] as MUITableModelType[]);
    useEffect(() => {
        dispatch(fetchRowsByModel({ model }));
    }, [dispatch, model]);
    return (
        <Grid size={12}>
            <MainCard
                data-testid={`mui-table-card-${model}`}
                content={false}
                title={<FormattedMessage id={`${model}_table`} />}
                secondary={
                    <IconButton size="medium" color="primary" component={Link as ElementType} to={`/form/${model}/add`}>
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
                            {rows.map((row: MUITableModelType) => (
                                <TableRow hover key={row.id}>
                                    {cells.map((cell) => (
                                        <TableCell align="left" key={`${String(cell)}_${String(row[cell])}`}>
                                            {String(row[cell])}
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
}
