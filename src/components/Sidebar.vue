<template>
	<div :class="['sidebar', { 'sidebar--open': isSidebarOpen }]">
		<!-- use component, because Menu item should not be rendered as a RouterLink -->
		<component
			v-for="item in sidebarItems"
			class="sidebar__item"
			:is="item.path ? 'RouterLink' : 'button'"
			:to="item.path"
			:key="item.name"
			@mouseenter="hoveredIconName = item.name"
			@mouseleave="hoveredIconName = ''"
			@click="item.toggleSidebar ? item.toggleSidebar() : null"
		>
			<img
				:src="
					hoveredIconName === item.name || $route.fullPath === item.path
						? item.iconLapis
						: item.iconWhite
				"
			/>

			<p class="sidebar__item-label" v-if="isSidebarOpen">
				{{ item.itemLabel ? item.itemLabel : '' }}
			</p>
		</component>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import Menu from '../assets/icons/Menu.svg';
	import NotificationsWhite from '../assets/icons/Notifications, White.svg';
	import NotificationsLapis from '../assets/icons/Notifications, Lapis.svg';
	import SettingsWhite from '../assets/icons/Settings, White.svg';
	import SettingsLapis from '../assets/icons/Settings, Lapis.svg';
	import TasksWhite from '../assets/icons/Tasks, White.svg';
	import TasksLapis from '../assets/icons/Tasks, Lapis.svg';
	import { SIDEBAR_WIDTH } from '@/constants/constants';

	const sidebarItems = [
		{
			toggleSidebar: () => (isSidebarOpen.value = !isSidebarOpen.value),
			name: 'Menu',
			iconWhite: Menu,
			iconLapis: Menu,
		},
		{
			name: 'Tasks',
			iconWhite: TasksWhite,
			iconLapis: TasksLapis,
			itemLabel: 'TASKS',
			path: '/tasks',
		},
		{
			name: 'Notifications',
			iconWhite: NotificationsWhite,
			iconLapis: NotificationsLapis,
			itemLabel: 'NOTIFICATIONS',
			path: '/notifications',
		},
		{
			name: 'Settings',
			iconWhite: SettingsWhite,
			iconLapis: SettingsLapis,
			itemLabel: 'SETTINGS',
			path: '/settings',
		},
	];
	const hoveredIconName = ref<string>('');
	const isSidebarOpen = ref(false);
</script>

<style lang="scss">
	.sidebar {
		$parent: &;
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: column;
		gap: 48px;
		min-width: v-bind(SIDEBAR_WIDTH);
		height: 100vh;
		padding-top: 48px;
		background-color: $color-lapis;
		transition: width 0.3s;

		&__item {
			display: flex;
			align-items: center;
			gap: 18px;
			width: 100%;
			padding: 11px 0 11px 18px;

			&:not(&:first-child):not(.router-link-active):hover {
				background-color: $color-pastel-aqua;

				#{$parent}__item-label {
					color: $color-lapis;
				}
			}
		}

		&__item-label {
			font-size: 20px;
			font-weight: $fw-light;
			line-height: 140%;
			color: $color-white;
		}

		&--open {
			min-width: 240px;
		}
	}
</style>
