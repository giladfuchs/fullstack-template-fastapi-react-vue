import { Grade, InputType, ModelType } from '@/common/types/index';
import { array_to_dict, deep_copy_stringify } from '@/common/helper';
import _ from 'lodash';
export interface InputField {
  value: any;
  options?: string[];
  type?: string;
}

export interface DBQuery {
  opt: string;
  key: string;
  value: string | number;
}

export interface FilterQuery {
  query?: DBQuery[];
  relation_model?: boolean;
}

export type inputFilters = {
  [key: string]: InputField;
};
export const generate_input = (type: InputType, options?: string[]): InputField => {
  let input: InputField = { value: '', type: type };
  if (options) input.options = options;
  return input;
};

export const default_teacher_model: inputFilters = {
  id: generate_input(InputType.Number),
  phone: generate_input(InputType.Number)
};
export const default_student_model: inputFilters = {
  name: generate_input(InputType.Text),
  phone: generate_input(InputType.Number),
  grade: generate_input(InputType.Text, Object.values(Grade))
};

export const default_assignment_model: inputFilters = {
  title: generate_input(InputType.Text),
  detail: generate_input(InputType.TextArea)
};

export const get_form_by_model = (model: ModelType) => {
  let form_fields: inputFilters;
  switch (model) {
    case ModelType.teacher:
      form_fields = default_teacher_model;
      break;

    case ModelType.student:
      form_fields = default_student_model;
      break;

    case ModelType.assignment:
      form_fields = default_assignment_model;
      break;

    default:
      form_fields = default_teacher_model;
  }

  return form_fields;
};

export const create_form_fields = (source: inputFilters, target: inputFilters): inputFilters => {
  if (_.isEmpty(target)) return source;
  const source_res = deep_copy_stringify(source) as inputFilters;
  return array_to_dict(
    Object.keys(source_res).map((key: string) => {
      return target[key] !== undefined ? { ...source_res[key], id: key, value: target[key] } : { ...source_res[key] };
    })
  ) as inputFilters;
};
