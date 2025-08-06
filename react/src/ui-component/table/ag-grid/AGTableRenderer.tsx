import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { AGTableModelType } from '../../../types/table';
import AssignmentsRenderer from './renderer/AssignmentsRenderer';
import ActionRenderer from './renderer/ActionRenderer';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { DefaultRootStateProps } from '../../../types';

const defaultColDef: ColDef = {
    resizable: true,
    filter: true,
    sortable: true
};

const AGTableRenderer = ({ cols, rows }: { cols: ColDef<AGTableModelType>[]; rows: AGTableModelType[] }) => {
    const intl = useIntl();
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);

    const localizedCols: ColDef<AGTableModelType>[] = cols.map((col) => ({
        ...col,
        headerName: intl.formatMessage({ id: `ag.header.${col.field}` })
    }));

    return (
        <div
            className="ag-theme-alpine"
            style={{
                height: 600,
                width: '100%',
                overflowX: 'auto',
                direction: customization.rtlLayout ? 'rtl' : 'ltr'
            }}
            data-testid="ag-table"
        >
            <AgGridReact<AGTableModelType>
                rowData={rows}
                columnDefs={localizedCols}
                defaultColDef={defaultColDef}
                enableRtl={customization.rtlLayout}
                ensureDomOrder
                enableCellTextSelection
                rowHeight={30}
                frameworkComponents={{
                    AssignmentsRenderer,
                    ActionRenderer
                }}
            />
        </div>
    );
};

export default AGTableRenderer;
