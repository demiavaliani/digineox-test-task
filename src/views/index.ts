import { defineAsyncComponent } from 'vue';

const Tasks = defineAsyncComponent(() => import('./Tasks.vue'));
const Notifications = defineAsyncComponent(() => import('./Notifications.vue'));
const Settings = defineAsyncComponent(() => import('./Settings.vue'));

export { Tasks, Notifications, Settings };
