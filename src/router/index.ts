import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		component: () => import('@/views/Tasks.vue'),
	},
	{
		path: '/tasks',
		component: () => import('@/views/Tasks.vue'),
	},
	{
		path: '/settings',
		component: () => import('@/views/Settings.vue'),
	},
	{
		path: '/notifications',
		component: () => import('@/views/Notifications.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
