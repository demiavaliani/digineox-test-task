<template>
	<div class="task-group">
		<h2 class="task-group__header">{{ statusHeader }}</h2>

		<div class="task-group__wrapper">
			<TaskCard
				v-for="task in tasksList"
				:title="task.title"
				:color="task.color"
				:status="task.status"
				:key="task.title"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useTasksStore } from '@/stores/tasks';
	import { storeToRefs } from 'pinia';
	import TaskCard from './TaskCard.vue';

	defineProps<{
		statusHeader: string;
	}>();

	const { tasksList } = storeToRefs(useTasksStore());
</script>

<style lang="scss">
	.task-group {
		padding: 48px 36px;
		border: 4px solid $color-black;
		border-radius: 4px;

		&__header {
			margin-bottom: 36px;
		}

		&__wrapper {
			display: flex;
			flex-direction: column;
			gap: 24px;
		}
	}
</style>
