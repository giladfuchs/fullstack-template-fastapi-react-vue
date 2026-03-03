// stores/general.ts
import { defineStore } from 'pinia';
import API from '@/common/api';
import type { AxiosResponse } from 'axios';
import { ModelType, type Teacher, type Student, type Assignment, type FilterQuery } from '@/common/types';

type ModelMap = {
  [ModelType.teacher]: Teacher;
  [ModelType.student]: Student;
  [ModelType.assignment]: Assignment;
};

type ModelsState = {
  [ModelType.teacher]: Teacher[];
  [ModelType.student]: Student[];
  [ModelType.assignment]?: Assignment[]; // optional, unused just for TS silence
};

export const useGeneralStore = defineStore('general', {
  persist: true,
  state: (): { models: ModelsState } =>
    ({
      models: {
        [ModelType.teacher]: [],
        [ModelType.student]: []
      }
    }) as { models: ModelsState },
  actions: {
    async fetchRows<K extends keyof ModelMap>(model: K, data: FilterQuery = {}) {
      const res: AxiosResponse<Array<ModelMap[K]>> = await API.post(`/${model}`, Object.keys(data).length ? data : undefined);
      this.models[model] = res.data as ModelsState[K];
      return res.data;
    }
  }
});
