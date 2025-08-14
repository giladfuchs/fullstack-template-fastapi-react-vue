import { deep_copy_stringify } from '@/common/helper';
import { ModelType, type Student } from '@/common/types/index';
import type { ColDef } from 'ag-grid-community';
import type { Header } from 'vue3-easy-data-table';

//-- ag table --

export type AGTableModelType = Student;

export const columns_student: ColDef[] = [
  {
    field: 'name',
    width: 150
  },
  {
    field: 'phone',
    width: 150
  },
  {
    field: 'grade',
    width: 95
  },

  {
    field: 'assignments',
    width: 140,
    cellRenderer: 'AssignmentsRenderer'
  },
  {
    field: 'id',
    width: 85,
    cellRenderer: 'ActionRenderer'
  }
];

export const get_columns_ag_by_model = (model: ModelType): ColDef[] => {
  let columns = [];
  switch (model) {
    case ModelType.student:
      columns = deep_copy_stringify(columns_student);
      break;

    default:
      columns = columns_student;
  }

  return columns;
};

//-- EasyDataTable--

export const columns_teacher: Header[] = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Phone', value: 'phone', sortable: true }
];

export const get_columns_easy_table_by_model = (title: ModelType): Header[] => {
  let columns: Header[] = [];

  switch (title) {
    case ModelType.teacher:
      columns = columns_teacher;
      break;

    default:
      columns = columns_teacher;
  }

  return columns;
};
