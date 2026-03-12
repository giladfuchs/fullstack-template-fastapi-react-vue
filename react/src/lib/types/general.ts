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

export type FilterQuery = {
    query?: DBQuery[];
    count?: boolean;
    or_query?: DBQuery[];

    // Sort string format: "field:asc" or "field:desc".
    // Multiple sorts can be applied by separating with commas.
    // Example: "created_at:desc,name:asc"
    sort?: string | null;

    // Relations
    relation_model?: boolean;
    relations?: string[] | null;
};
