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

		@media screen and (orientation: portrait) {
			display: flex;
			align-items: center;
			padding: 31px 12px;
			aspect-ratio: 1 / 1;
		}

		&:hover {
			filter: drop-shadow($shadow-card);
		}
	}
</style>
