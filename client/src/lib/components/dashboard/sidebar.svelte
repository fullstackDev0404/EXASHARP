<script lang="ts">
	import Icon from '@iconify/svelte';
	import { navItems, quickActions } from '$lib/data/dashboard';

	type Props = {
		userName?: string;
	};
	let { userName = 'User' }: Props = $props();
</script>

<aside class="hidden md:flex flex-col w-52 shrink-0 h-screen overflow-y-auto bg-black/50 backdrop-blur-sm border-r border-white/10 sticky top-0">
	<!-- Logo -->
	<div class="flex items-center gap-2 px-4 py-4 border-b border-white/10">
		<img src="/logo.png" alt="EXASHARP" class="h-9 w-auto" />
	</div>

	<!-- User -->
	<div class="flex items-center gap-3 px-4 py-4 border-b border-white/10">
		<img src="/user_avatar.png" alt="User avatar" class="h-8 w-8 rounded-full object-cover border border-yellow-400/50" />
		<div class="min-w-0">
			<p class="text-sm font-semibold truncate">{userName}</p>
			<p class="text-xs text-gray-400">HR Manager</p>
		</div>
	</div>

	<!-- Nav -->
	<nav class="flex-1 space-y-0.5">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex items-center gap-3 px-3 py-2 text-md transition-colors
					{item.active ? 'bg-yellow-400/20  font-medium border-l-2 border-yellow-400' : 'text-gray-300 hover:bg-white/10 hover:text-white'}"
			>
				<Icon icon={item.icon} class="h-4 w-4 shrink-0 {item.active && 'text-yellow-400'}" />
				{item.label}
				{#if item.active}<span class="ml-auto">›</span>{/if}
			</a>
		{/each}
	</nav>

	<!-- Quick Actions -->
	<div class="px-4 py-4 border-t border-white/10">
		<p class="text-xs text-gray-500 uppercase tracking-wider mb-2">Quick Actions</p>
		{#each quickActions as action}
			<button class="flex items-center gap-2 w-full text-left text-sm text-gray-300 hover:text-white py-1.5 transition-colors">
				<Icon icon={action.icon} class="h-4 w-4 shrink-0" />
				{action.label}
			</button>
		{/each}
	</div>

	<p class="text-xs text-gray-600 text-center py-3">© 2026 EXASHARP</p>
</aside>
