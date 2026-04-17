<script lang="ts">
	import { page } from '$app/state';

	type Props = {
		user?: { id: string; name: string; email: string } | null;
	};

	let { user = null }: Props = $props();

	const isDashboard = $derived(page.url.pathname.startsWith('/dashboard'));

	const authLinks: { href: string; label: string }[] = [];

	const dashboardLinks = [
		{ href: '/dashboard', label: 'Dashboard' },
		{ href: '/dashboard/reports', label: 'Pay Site' },
	];

	const links = $derived(isDashboard ? dashboardLinks : authLinks);

	const logout = async () => {
		await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/api/auth/sign-out`, {
			method: 'POST',
			credentials: 'include',
		});
		window.location.href = '/login';
	};
</script>

<nav class="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm w-full z-10">
	{#if !isDashboard}
		<a href="/" class="flex items-center gap-2 shrink-0">
			<img src="/logo.png" alt="EXASHARP" class="h-8 w-auto" />
		</a>
	{/if}

	<div class="flex items-center gap-6">
		{#each links as link}
			<a href={link.href}
				class="text-sm font-medium transition-colors
					{page.url.pathname === link.href
						? 'text-blue-600'
						: 'text-gray-600 hover:text-gray-900'}">
				{link.label}
			</a>
		{/each}
	</div>

	<div class="flex items-center gap-3">
		{#if user}
			<!-- Search -->
			{#if isDashboard}
			<div class="relative hidden md:flex">
				<svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
				<input type="text" placeholder="Search..." class="h-8 w-48 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400" />
			</div>
			{/if}
			<!-- Bell -->
			<button aria-label="Notifications" class="relative p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
				</svg>
				<span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
			</button>
			<!-- Avatar + name -->
			<div class="flex items-center gap-2">
				<img src="/user_avatar.png" alt="User avatar" class="h-8 w-8 rounded-full object-cover border-2 border-blue-400" />
				<span class="text-sm font-medium text-gray-700 hidden md:block">{user.name}</span>
			</div>
			<button
				onclick={logout}
				class="px-4 py-1.5 text-sm font-semibold text-white rounded-lg transition-colors hover:opacity-90"
				style="background: #3b6fd4;">
				Sign Out
			</button>
		{:else if page.url.pathname === '/login'}
			<a href="/register" class="px-4 py-1.5 text-sm font-semibold text-white rounded-lg" style="background: #3b6fd4;">Sign Up</a>
		{:else}
			<a href="/login" class="px-4 py-1.5 text-sm font-semibold text-white rounded-lg" style="background: #3b6fd4;">Sign In</a>
		{/if}
	</div>
</nav>
