import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from '@/types/TasksType';

export const useTasksStore = defineStore('tasks', () => {
	const tasksToDo = ref<Array<Task>>([]);
	const tasksInProgress = ref<Array<Task>>([]);
	const tasksDone = ref<Array<Task>>([]);

	return { tasksToDo, tasksInProgress, tasksDone };
});
