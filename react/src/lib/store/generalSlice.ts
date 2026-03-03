import { createAsyncThunk, createSlice, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import API from '@/lib/utils/api';
import { FilterQuery, GeneralStateProps, ModelType, TableModelType } from '@/lib/types';

const initialState: GeneralStateProps = {
    models: {
        [ModelType.teacher]: [],
        [ModelType.student]: []
    },
    user_id: 0,
    student_id: 0,
    loading: false
};

export const fetchRowsByModel = createAsyncThunk<{ model: ModelType; data: TableModelType[] }, { model: ModelType; data?: FilterQuery }>(
    'models/fetch_rows',
    async ({ model, data = {} }) => {
        const res: AxiosResponse<TableModelType[]> = await API.post<TableModelType[]>(`/${model}`, data);
        return { model, data: res.data };
    }
);

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
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
    extraReducers: (builder: ActionReducerMapBuilder<GeneralStateProps>) => {
        builder.addCase(fetchRowsByModel.fulfilled, (state, action) => {
            (state.models[action.payload.model] as TableModelType[]) = action.payload.data;
        });
    }
});

export const { setUserAndStudentId, setLoading } = generalSlice.actions;
export default generalSlice.reducer;
