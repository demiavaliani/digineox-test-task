import { defineAsyncComponent } from 'vue';

const Sidebar = defineAsyncComponent(() => import('./Sidebar.vue'));
const TaskGroupWrapper = defineAsyncComponent(
	() => import('./TaskGroupWrapper.vue')
);
const DialogCard = defineAsyncComponent(() => import('./DialogCard.vue'));

export { Sidebar, TaskGroupWrapper, DialogCard };
