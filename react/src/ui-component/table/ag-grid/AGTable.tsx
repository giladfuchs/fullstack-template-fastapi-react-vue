import * as React from 'react';

import { IconButton, Paper } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { FormattedMessage } from 'react-intl';

import AGTableRenderer from './AGTableRenderer';
import { AGTableModelType, get_columns_ag_by_model } from '../../../types/table';
import { DefaultRootStateProps, ModelType } from '../../../types';
import { ColDef } from 'ag-grid-community';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRowsByModel } from '../../../store/generalSlice';
import { Link, useParams } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useMemo } from 'react';

export default function AGTable() {
    const params = useParams();
    const { model } = params as {
        model: ModelType;
    };
    const dispatch = useDispatch();
    const rows: AGTableModelType[] = useSelector((state: DefaultRootStateProps) => state.general.models[model] as AGTableModelType[]);
    const cols: ColDef<AGTableModelType>[] = useMemo(() => get_columns_ag_by_model(model), [model]);
    React.useEffect(() => {
        dispatch(fetchRowsByModel({ model, data: { relation_model: true } }));
    }, [dispatch, model]);
    return (
        <MainCard
            content={false}
            title={<FormattedMessage id={`${model}_table`} />}
            secondary={
                <IconButton size="medium" color="primary" component={Link} to={`/form/${model}/add`} data-testid={`add-${model}-button`}>
                    <AddBoxIcon fontSize="medium" />
                </IconButton>
            }
        >
            <Paper sx={{ width: '100%', mb: 2 }} data-testid={`table-wrapper-${model}`}>
                <AGTableRenderer cols={cols} rows={rows} />
            </Paper>
        </MainCard>
    );
}
