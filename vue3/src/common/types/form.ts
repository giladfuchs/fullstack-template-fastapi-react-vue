import { Assignment, Grade, InputType, ModelType, Student, Teacher } from '@/common/types/index';
import { array_to_dict, deep_copy_stringify } from '@/common/helper';

export type FormModelType = Teacher | Student | Assignment;

export type FieldValue = string | number | boolean | null;

export interface InputField {
  value: FieldValue;
  options?: string[];
  type?: string;
}

export type FormApiError = {
  message?: string;
  errors?: Array<{ field?: string; message?: string }>;
};

export type inputFilters = Record<string, InputField>;
export const generate_input = (type: InputType, options?: string[]): InputField => {
  const input: InputField = { value: '', type: type };
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

export const createInputFiltersFormFields = (source: inputFilters, target: Record<string, FieldValue>): inputFilters => {
  if (!target || Object.keys(target).length === 0) {
    return source;
  }
  const source_res = deep_copy_stringify(source) as inputFilters;
  return array_to_dict(
    Object.keys(source_res).map((key: string) => {
      return target[key] !== undefined ? { ...source_res[key], id: key, value: target[key] } : { ...source_res[key] };
    })
  ) as inputFilters;
};

export const formToBodyData = (form: inputFilters): Record<string, FieldValue> => {
  const out: Record<string, FieldValue> = {};

  for (const [key, field] of Object.entries(form)) {
    const v = (field as { value: unknown }).value;

    if (v === undefined) continue;

    if (typeof v === 'string') {
      const t = v.trim();
      if (t !== '') out[key] = t;
      continue;
    }

    if (typeof v === 'number' || typeof v === 'boolean') {
      out[key] = v;
      continue;
    }

    if (v === null) {
      out[key] = null;
    }
  }

  return out;
};
