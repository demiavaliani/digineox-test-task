<template>
	<div class="task-group">
		<h2 class="task-group__header">{{ statusHeader.toUpperCase() }}</h2>

		<draggable
			class="task-group__wrapper"
			:list="tasks"
			group="tasks"
			itemKey="id"
			animation="200"
			empty-insert-threshold="50"
			@add="draggedToList"
			:data-status="tasksList[0] ? tasksList[0].status : ''"
		>
			<template #item="{ element, index }">
				<TaskCard
					:title="element.title"
					:color="element.color"
					:status="element.status"
					:key="element.title"
				/>
			</template>
		</draggable>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import draggable from 'vuedraggable';
	import TaskCard from './TaskCard.vue';
	import type { Task } from '@/types/TasksType';
	import type { SortableEvent } from 'sortablejs';

	const emits = defineEmits<{
		(ev: 'draggedToList', payload: string): void;
	}>();

	const props = defineProps<{
		statusHeader: string;
		tasksList: Array<Task>;
	}>();

	// for the sake of draggable, we need to access the tasks list as a ref instead of a prop
	const tasks = ref(props.tasksList);

	const draggedToList = (ev: SortableEvent) => {
		// emit name of the exact list where the item was dropped
		// need for DialogCard to display the correct list
		emits('draggedToList', ev.to.dataset.status || '');
	};
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

		@media screen and (orientation: portrait) {
			padding: 36px;

			&__header {
				margin-bottom: 24px;
			}

			&__wrapper {
				display: grid;
				// grid-template-columns: repeat(auto-fit, minmax(148px, 1fr));
				grid-template-columns: repeat(auto-fit, 148px);
				gap: 16px;
			}
		}
	}
</style>
