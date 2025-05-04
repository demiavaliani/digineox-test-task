import { defineAsyncComponent } from 'vue';

const Sidebar = defineAsyncComponent(() => import('./Sidebar.vue'));
const TaskGroupWrapper = defineAsyncComponent(
	() => import('./TaskGroupWrapper.vue')
);

export { Sidebar, TaskGroupWrapper };
