import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from '@/types/TasksType';

export const useTasksStore = defineStore('tasks', () => {
	const tasksList = ref<Array<Task> | null>(null);

	return { tasksList };
});
