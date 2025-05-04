<template>
	<h1>Tasks</h1>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { useTasksStore } from '@/stores/tasks';
	import { storeToRefs } from 'pinia';

	const { tasksList } = storeToRefs(useTasksStore());

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
