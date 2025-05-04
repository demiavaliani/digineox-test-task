<template>
	<div
		class="dialog-card"
		@keyup.esc="$emit('close-dialog')"
		tabindex="0"
		ref="dialogCard"
	>
		<div class="dialog-card__overlay"></div>

		<div class="dialog-card__content">
			<h2 class="dialog-card__title">CARD UPDATED</h2>

			<div class="dialog-card__body">
				<pre class="dialog-card__task-list">
					{{ JSON.stringify(tasksList, null, 5) }}
				</pre
				>
			</div>

			<div class="dialog-card__footer">
				<button @click="$emit('close-dialog')" class="dialog-card__button">
					CLOSE
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Task } from '@/types/TasksType';
	import { SIDEBAR_WIDTH } from '@/constants/constants';
	import { onMounted, ref } from 'vue';

	defineEmits(['close-dialog']);

	defineProps<{
		tasksList: Array<Task>;
	}>();

	const dialogCard = ref<HTMLElement | null>(null);

	// needs to be focused when opened so that the ESC key can be used to close it
	onMounted(() => {
		dialogCard.value?.focus();
	});
</script>

<style lang="scss">
	.dialog-card {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;

		&__overlay {
			position: fixed;
			width: 100%;
			height: 100%;
			background-color: black;
			opacity: 0.4;
		}

		&__content {
			width: fit-content;
			margin-left: v-bind(SIDEBAR_WIDTH);
			border-radius: 4px;
			filter: drop-shadow($shadow-card);
			z-index: 1;
		}

		&__title {
			padding: 24px 16px;
			color: $color-white;
			background-color: $color-lapis;
		}

		&__body {
			max-height: 70vh;
			padding: 16px 12px;
			font-size: 20px;
			font-weight: $fw-light;
			line-height: 140%;
			background-color: $color-white;
			overflow: auto;
		}

		&__task-list {
			text-wrap: auto;
		}

		&__footer {
			padding: 8px;
			background-color: $color-white;
		}

		&__button {
			display: block;
			margin-left: auto;
			padding: 12px 16px;
			font-size: 16px;
			font-weight: $fw-medium;
			line-height: 140%;
			color: $color-lapis;
		}
	}
</style>
