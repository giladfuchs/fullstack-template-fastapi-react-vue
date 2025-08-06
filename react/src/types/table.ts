import { ModelType, Student } from './general';
import { ColDef } from 'ag-grid-community';
// -- AG Grid table ---

export type AGTableModelType = Student;
export const columns_student: ColDef<Student>[] = [
    {
        field: 'name'
    },
    {
        field: 'phone'
    },
    {
        field: 'grade'
    },
    {
        field: 'assignments',
        cellRenderer: 'AssignmentsRenderer'
    },
    {
        field: 'id',
        cellRenderer: 'ActionRenderer',
        width: 100
    }
];

export const get_columns_ag_by_model = (model: ModelType): ColDef<AGTableModelType>[] => {
    let columns = [];
    switch (model) {
        case ModelType.student:
            columns = [...columns_student];
            break;

        default:
            columns = [...columns_student];
    }

    return columns as ColDef<AGTableModelType>[];
};
// -- MUI table ---
export const teacher_columns = ['id', 'phone'];

export const get_columns_mui_by_model = (model: ModelType): string[] => {
    let cells: string[] = teacher_columns;

    switch (model) {
        case ModelType.teacher:
            cells = teacher_columns;
            break;
    }
    return cells;
};
