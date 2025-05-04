import { defineAsyncComponent } from 'vue';

const Tasks = defineAsyncComponent(() => import('./Tasks.vue'));

export { Tasks };
