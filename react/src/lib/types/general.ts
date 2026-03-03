export enum ModelType {
    teacher = 'teacher',
    student = 'student',
    assignment = 'assignment'
}

export interface LoginToken {
    token: string;
    id: number;
}

export type Teacher = {
    id: number;
    phone: number;
};

export type Assignment = {
    id: number;
    title: string;
    detail: string;
};

export type Student = {
    id: number;
    name: string;
    grade: string;
    phone: number;
    teacher_id: number;
    assignments: Assignment[];
};

export interface DBQuery {
    opt: string;
    key: string;
    value: string | number;
}

export interface FilterQuery {
    query?: DBQuery[];
    relation_model?: boolean;
}
