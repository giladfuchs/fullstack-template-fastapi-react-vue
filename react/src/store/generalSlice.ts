import { createAsyncThunk, createSlice, PayloadAction, ActionReducerMapBuilder, type GetThunkAPI } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { Assignment, FieldValue, FilterQuery, ModelType, Student, TableModelType, Teacher } from '../types';
import API from '../utils/axios';

export interface ModelList {
    teacher: Teacher[];
    student: Student[];
    assignment: Assignment[];
}

export interface ModelState {
    models: ModelList;
    user_id: number;
    student_id: number;
    loading: boolean;
}

const initialState: ModelState = {
    models: {
        [ModelType.teacher]: [],
        [ModelType.student]: [],
        [ModelType.assignment]: []
    },
    user_id: 0,
    student_id: 0,
    loading: false
};

type ThunkCfg = { rejectValue: string };

export const fetchRowsByModel = createAsyncThunk<{ model: ModelType; data: TableModelType[] }, { model: ModelType; data?: FilterQuery }>(
    'models/fetch_rows',
    async ({ model, data = {} }) => {
        const res = await API.post<TableModelType[]>(`/${model}`, data);
        return { model, data: res.data };
    }
);

export const createOrUpdateRow = createAsyncThunk<
    unknown,
    { model: ModelType; id: number | string; data: Record<string, FieldValue>; message: string },
    { rejectValue: string }
>('models/create_or_update_row', async ({ model, id, data, message }, thunkApi: GetThunkAPI<{ rejectValue: string }>) => {
    try {
        const res = await API.post(`/${model}/${id}`, data);
        toast.success(message);
        return res.data;
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to save row';
        return thunkApi.rejectWithValue(msg);
    }
});

export const deleteRowById = createAsyncThunk<
    { model: ModelType; id: number | string },
    { model: ModelType; id: number | string; message: string },
    ThunkCfg
>('models/delete_row', async ({ model, id, message }, thunkApi: GetThunkAPI<{ rejectValue: string }>) => {
    try {
        const data = { query: [{ key: 'id', value: id, opt: 'eq' }] };
        await API.delete(`/${model}`, { data });
        toast.success(message);
        return { model, id };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to delete row';
        return thunkApi.rejectWithValue(msg);
    }
});

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setAssignments(state, action: PayloadAction<Assignment[]>) {
            state.models[ModelType.assignment] = action.payload;
        },
        setUserAndStudentId(
            state,
            action: PayloadAction<{
                user_id: number;
                student_id: number;
            }>
        ) {
            state.user_id = action.payload.user_id;
            state.student_id = action.payload.student_id;
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<ModelState>) => {
        builder.addCase(fetchRowsByModel.fulfilled, (state, action) => {
            (state.models[action.payload.model] as TableModelType[]) = action.payload.data;
        });
    }
});

export const { setAssignments, setUserAndStudentId, setLoading } = generalSlice.actions;
export default generalSlice.reducer;
