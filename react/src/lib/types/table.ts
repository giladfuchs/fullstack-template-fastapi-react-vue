import { ModelType, Student, Teacher } from './general';
import { ColDef } from 'ag-grid-community';
// -- AG Grid table ---

export type AGTableModelType = Student;
export const columns_student: ColDef<Student>[] = [
    {
        field: 'name'
    },
    {
        field: 'phone',
        filter: 'agTextColumnFilter'
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
    let columns: ColDef<AGTableModelType>[];
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
export type MUITableModelType = Teacher;

export const teacher_columns: Array<keyof Teacher> = ['id', 'phone'];

export const get_columns_mui_by_model = (model: ModelType): Array<keyof MUITableModelType> => {
    let columns: Array<keyof MUITableModelType>;

    switch (model) {
        case ModelType.teacher:
            columns = teacher_columns;
            break;
        default:
            columns = teacher_columns;
    }
    return columns;
};

export type TableModelType = AGTableModelType | MUITableModelType;
