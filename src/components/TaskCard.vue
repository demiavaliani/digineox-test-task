<template>
	<div class="task-card">
		{{ title }}
	</div>
</template>

<script setup lang="ts">
	import type { Task } from '@/types/TasksType';

	const props = defineProps<{
		title: Task['title'];
		color: Task['color'];
		status: Task['status'];
	}>();
</script>

<style lang="scss">
	.task-card {
		padding: 31px 24px;
		border: 2px solid $color-black;
		border-radius: 4px;
		background-color: v-bind('props.color');
		color: $color-black;

		&:hover {
			filter: drop-shadow($shadow-card);
		}
	}
</style>
