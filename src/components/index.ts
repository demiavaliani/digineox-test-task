import { defineAsyncComponent } from 'vue';

const Sidebar = defineAsyncComponent(() => import('./Sidebar.vue'));

export { Sidebar };
