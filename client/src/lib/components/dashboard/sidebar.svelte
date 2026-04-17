<script lang="ts">
	import Icon from '@iconify/svelte';
	import { navItems, quickActions } from '$lib/data/dashboard';

	type Props = { userName?: string; };
	let { userName = 'User' }: Props = $props();
</script>

<aside class="hidden md:flex flex-col w-56 shrink-0 h-screen overflow-y-auto sticky top-0" style="background: #1a2744;">
	<!-- Logo -->
	<div class="flex items-center gap-2 px-5 py-4 border-b border-white/10">
		<img src="/logo.png" alt="EXASHARP" class="h-8 w-auto" />
		<span class="text-white font-bold text-sm tracking-wide">EXASHARP</span>
	</div>

	<!-- User -->
	<div class="flex items-center gap-3 px-5 py-4 border-b border-white/10">
		<img src="/user_avatar.png" alt="User avatar" class="h-9 w-9 rounded-full object-cover border-2 border-blue-400" />
		<div class="min-w-0">
			<p class="text-sm font-semibold text-white truncate">{userName}</p>
			<p class="text-xs text-blue-300">HR Manager</p>
		</div>
	</div>

	<!-- Nav -->
	<nav class="flex-1 py-3">
		{#each navItems as item}
			<a href={item.href}
				class="flex items-center gap-3 px-5 py-2.5 text-sm transition-all
					{item.active
						? 'bg-blue-600 text-white font-medium border-l-4 border-blue-300'
						: 'text-blue-100/80 hover:bg-white/10 hover:text-white border-l-4 border-transparent'}">
				<Icon icon={item.icon} class="h-4 w-4 shrink-0" />
				{item.label}
				{#if item.active}<span class="ml-auto text-blue-200">›</span>{/if}
			</a>
		{/each}
	</nav>

	<!-- Quick Actions -->
	<div class="px-5 py-4 border-t border-white/10">
		<p class="text-xs text-blue-300/70 uppercase tracking-wider mb-2">Quick Actions</p>
		{#each quickActions as action}
			<button class="flex items-center gap-2 w-full text-left text-sm text-blue-100/70 hover:text-white py-1.5 transition-colors">
				<Icon icon={action.icon} class="h-4 w-4 shrink-0 text-blue-300" />
				{action.label}
			</button>
		{/each}
	</div>

	<p class="text-xs text-blue-300/40 text-center py-3">© 2026 EXASHARP</p>
</aside>
