import {defineStore} from 'pinia';
import axios from '@/common/axios';
import {type FilterQuery, ModelType} from '@/common/types';
import {useAuthStore} from '@/common/stores/auth';
import {router} from '@/common/router';
import {useToast} from 'vue-toastification';

const toast = useToast();

const auth_store = useAuthStore();
export const useGeneralStore = defineStore({
    id: 'general',
    state: () => ({
        list: {
            [ModelType.teacher]: [],
            [ModelType.student]: [],
            [ModelType.assignment]: []
        }
    }),
    getters: {
        input_form_to_data:
            () =>
                (form: any): {} => {
                    return Object.assign(
                        {},
                        ...Object.keys(form)
                            .filter((key: string) => form[key].value !== undefined && form[key].value != '')
                            .map((key: string) => {
                                return {[key]: typeof form[key].value === 'string' ? form[key].value.trim() : form[key].value};
                            })
                    );
                }
    },
    actions: {

        async fetch_rows(model: ModelType, data: FilterQuery = {}) {
            try {
                const response = await axios.post(`${model}`, Object.keys(data).length === 0 ? undefined : data);
                this.list[model] = response.data;
            } catch (error) {
                console.error("Fetch error", error);
            }
        },

        async delete_rows(model: ModelType, data: FilterQuery, message: string) {
            try {
                await axios.delete(`${model}`, {data});
                toast.success(message);
                if (model === ModelType.student) {
                    await router.push(`/${ModelType.student}`);
                }
            } catch (error) {
                console.error("Delete error", error);
            }
        },

        async create_update_row_input_form(form: any, model: ModelType, id: string, is_add: boolean, message: string) {
            const data: any = this.input_form_to_data(form);

            if (model === ModelType.student) {
                data.teacher_id = auth_store.user_id;
            } else if (model === ModelType.assignment) {
                data.teacher_id = auth_store.user_id;
                data.student_id = auth_store.student_id;
            }

            try {
                await axios.post(`${model}/${id}`, data);
                toast.success(message);
                if (model === ModelType.teacher) await router.push('/login');
                else if (model === ModelType.student && is_add) await router.push(`/${ModelType.student}`);
                else await router.push(`/${ModelType.student}/view/${auth_store.student_id}`);
            } catch (error) {
                throw error;
            }
        }
    }
});
