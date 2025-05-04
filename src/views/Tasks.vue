<template>
	<div class="tasks">
		<h1>TASKS</h1>

		<DialogCard
			v-if="shouldShowDialog"
			:tasks-list="tasksToDisplay"
			@close-dialog="shouldShowDialog = false"
		/>

		<div class="tasks__wrapper">
			<TaskGroupWrapper
				:status-header="TaskStatus.TODO"
				:tasks-list="tasksToDo"
				@dragged-to-list="openDialog"
			/>

			<TaskGroupWrapper
				:status-header="TaskStatus.IN_PROGRESS"
				:tasks-list="tasksInProgress"
				@dragged-to-list="openDialog"
			/>

			<TaskGroupWrapper
				:status-header="TaskStatus.DONE"
				:tasks-list="tasksDone"
				@dragged-to-list="openDialog"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref, watch, type Ref } from 'vue';
	import { useTasksStore } from '@/stores/tasks';
	import { storeToRefs } from 'pinia';
	import { TaskGroupWrapper } from '@/components';
	import { TaskStatus } from '@/constants/constants';
	import { DialogCard } from '@/components';
	import type { Task } from '@/types/TasksType';

	const { tasksToDo, tasksInProgress, tasksDone } = storeToRefs(
		useTasksStore()
	);

	const shouldShowDialog = ref(false);
	const tasksToDisplay = ref<Array<Task>>([]);

	const fetchTasks = async () => {
		const response = await fetch(
			'https://q1z3telex7a9metry.denaliops.com/data.json'
		);
		return await response.json();
	};

	const setTasksStore = (tasks: Array<Task>) => {
		tasksToDo.value = tasks.filter((task) => task.status === TaskStatus.TODO);

		tasksInProgress.value = tasks.filter(
			(task) => task.status === TaskStatus.IN_PROGRESS
		);

		tasksDone.value = tasks.filter((task) => task.status === TaskStatus.DONE);
	};

	const updateTaskListStatus = (
		taskList: Ref<Array<Task>>,
		newStatus: TaskStatus
	) => {
		taskList.value.forEach((item) => {
			item.status = newStatus;
		});
	};

	const openDialog = (status: string) => {
		tasksToDisplay.value =
			status === TaskStatus.TODO
				? tasksToDo.value
				: status === TaskStatus.IN_PROGRESS
				? tasksInProgress.value
				: tasksDone.value;

		shouldShowDialog.value = true;
	};

	watch(
		tasksToDo,
		() => {
			updateTaskListStatus(tasksToDo, TaskStatus.TODO);
		},
		{ deep: true }
	);

	watch(
		tasksInProgress,
		() => {
			updateTaskListStatus(tasksInProgress, TaskStatus.IN_PROGRESS);
		},
		{ deep: true }
	);

	watch(
		tasksDone,
		() => {
			updateTaskListStatus(tasksDone, TaskStatus.DONE);
		},
		{ deep: true }
	);

	// do not scroll the body, when the dialog is open
	watch(shouldShowDialog, () => {
		document.body.style.overflow = shouldShowDialog.value ? 'hidden' : 'auto';
	});

	onMounted(async () => {
		if (
			!tasksToDo.value.length ||
			!tasksInProgress.value.length ||
			!tasksDone.value.length
		) {
			setTasksStore(await fetchTasks());
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
