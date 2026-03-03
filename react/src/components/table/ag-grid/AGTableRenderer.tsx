import { useRef } from 'react';
import { useIntl } from 'react-intl';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import AssignmentsRenderer from './renderer/AssignmentsRenderer';
import ActionRenderer from './renderer/ActionRenderer';
import { AGTableModelType } from '@/lib/types';
import { useAppSelector } from '@/lib/store';

const defaultColDef: ColDef = {
    resizable: true,
    filter: true,
    sortable: true
};

export default function AGTableRenderer({
    cols,
    rows,
    onExportReady
}: {
    cols: ColDef<AGTableModelType>[];
    rows: AGTableModelType[];
    onExportReady: (fn: (fileName: string) => void) => void;
}) {
    const intl = useIntl();
    const customization = useAppSelector((state) => state.customization);

    const themeClass = customization.navType === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';
    const localizedCols: ColDef<AGTableModelType>[] = cols.map((col) => ({
        ...col,
        headerName: intl.formatMessage({ id: `ag.header.${col.field}` }),
        valueFormatter: col.valueFormatter ?? ((p) => (p.value && typeof p.value === 'object' ? '' : p.value))
    }));

    const gridApiRef = useRef<GridApi<AGTableModelType> | null>(null);

    const onGridReady = (e: GridReadyEvent<AGTableModelType>) => {
        gridApiRef.current = e.api as GridApi<AGTableModelType>;
        onExportReady((fileName: string) => {
            gridApiRef.current!.exportDataAsCsv({
                fileName,
                processCellCallback: (p) => {
                    const v = p.value;
                    if (v == null) return '';
                    if (typeof v === 'object') return JSON.stringify(v);
                    return String(v);
                }
            });
        });
    };
    return (
        <div
            key={themeClass}
            className={themeClass}
            style={{
                height: '38rem',
                width: '100%',
                overflowX: 'auto',
                direction: customization.rtlLayout ? 'rtl' : 'ltr'
            }}
            data-testid="ag-table"
        >
            <AgGridReact<AGTableModelType>
                className={themeClass}
                onGridReady={onGridReady}
                rowData={rows}
                columnDefs={localizedCols}
                defaultColDef={defaultColDef}
                enableRtl={customization.rtlLayout}
                ensureDomOrder
                enableCellTextSelection
                animateRows
                rowHeight={38}
                components={{
                    AssignmentsRenderer,
                    ActionRenderer
                }}
            />
        </div>
    );
}
