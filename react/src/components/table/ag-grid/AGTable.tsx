import { useMemo, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { ColDef } from 'ag-grid-community';
import { IconButton, Paper } from '@mui/material';
import MainCard from '../../cards/MainCard';
import AGTableRenderer from './AGTableRenderer';
import { AddBox as AddBoxIcon, Download as DownloadIcon } from '@mui/icons-material';

import { ModelType, AGTableModelType, get_columns_ag_by_model } from '@/lib/types';
import { useAppDispatch, fetchRowsByModel, useAppSelector } from '@/lib/store';

export default function AGTable() {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { model } = params as {
        model: ModelType;
    };
    if (![ModelType.student].includes(model as ModelType)) {
        return <Navigate to="/error" replace />;
    }
    const [exportCsv, setExportCsv] = useState<(fileName: string) => void>(() => () => {});
    const rows: AGTableModelType[] = useAppSelector((state) => state.general.models[model] as AGTableModelType[]);
    const cols: ColDef<AGTableModelType>[] = useMemo(() => get_columns_ag_by_model(model), [model]);
    useEffect(() => {
        dispatch(fetchRowsByModel({ model, data: { relation_model: true } }));
    }, [dispatch, model]);
    const fileName = `${model}-${new Date().toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: '2-digit' })}.csv`;
    return (
        <MainCard
            content={false}
            title={<FormattedMessage id={`${model}_table`} />}
            secondary={
                <>
                    <IconButton size="medium" color="secondary" onClick={() => exportCsv?.(fileName)}>
                        <DownloadIcon fontSize="medium" />
                    </IconButton>
                    <IconButton
                        size="medium"
                        color="primary"
                        component={Link}
                        to={`/form/${model}/add`}
                        data-testid={`add-${model}-button`}
                    >
                        <AddBoxIcon fontSize="medium" />
                    </IconButton>
                </>
            }
        >
            <Paper sx={{ width: '100%', mb: 2 }} data-testid={`table-wrapper-${model}`}>
                <AGTableRenderer cols={cols} rows={rows} onExportReady={(fn) => setExportCsv(() => fn)} />
            </Paper>
        </MainCard>
    );
}
