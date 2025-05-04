<template>
	<div class="tasks">
		<h1>TASKS</h1>

		<div class="tasks__wrapper">
			<TaskGroupWrapper
				:status-header="TaskStatus.TODO"
				:tasks-list="tasksToDo"
			/>

			<TaskGroupWrapper
				:status-header="TaskStatus.IN_PROGRESS"
				:tasks-list="tasksInProgress"
			/>

			<TaskGroupWrapper
				:status-header="TaskStatus.DONE"
				:tasks-list="tasksDone"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, onMounted } from 'vue';
	import { useTasksStore } from '@/stores/tasks';
	import { storeToRefs } from 'pinia';
	import { TaskGroupWrapper } from '@/components';
	import { TaskStatus } from '@/constants/constants';

	const { tasksList } = storeToRefs(useTasksStore());

	const tasksToDo = computed(() => {
		return tasksList.value
			? tasksList.value.filter((task) => task.status === TaskStatus.TODO)
			: [];
	});

	const tasksInProgress = computed(() => {
		return tasksList.value
			? tasksList.value.filter((task) => task.status === TaskStatus.IN_PROGRESS)
			: [];
	});

	const tasksDone = computed(() => {
		return tasksList.value
			? tasksList.value.filter((task) => task.status === TaskStatus.DONE)
			: [];
	});

	const fetchTasks = async () => {
		const response = await fetch(
			'https://q1z3telex7a9metry.denaliops.com/data.json'
		);
		return await response.json();
	};

	onMounted(async () => {
		if (!tasksList.value) {
			tasksList.value = await fetchTasks();
		}
	});
</script>

<style lang="scss">
	.tasks {
		overflow-y: auto;
		width: 100%;
		padding: 48px;

		&__wrapper {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 36px;

			@media screen and (orientation: portrait) {
				grid-template-columns: 1fr;
			}
		}
	}
</style>
