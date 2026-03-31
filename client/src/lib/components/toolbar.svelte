<script lang="ts">
	import { page } from '$app/state';

	type Props = {
		user?: { id: string; name: string; email: string } | null;
	};

	let { user = null }: Props = $props();

	const isDashboard = $derived(page.url.pathname.startsWith('/dashboard'));

	const publicLinks = [
		{ href: '/services', label: 'Services' },
		{ href: '/solutions', label: 'Solutions' },
		{ href: '/pricing', label: 'Pricing' },
	];

	const dashboardLinks = [
		{ href: '/services', label: 'Services' },
		{ href: '/solutions', label: 'Solutions' },
		{ href: '/dashboard/reports', label: 'Reports' },
	];

	const links = $derived(isDashboard ? dashboardLinks : publicLinks);

	const logout = async () => {
		await fetch('http://localhost:3000/api/auth/sign-out', {
			method: 'POST',
			credentials: 'include',
			headers: { 'Origin': 'http://localhost:5173' }
		});
		window.location.href = '/login';
	};
</script>

<nav class="relative z-10 flex items-center justify-between px-10 py-3
	{isDashboard
		? 'bg-gradient-to-r from-yellow-900/30 via-black/50 to-yellow-900/20 backdrop-blur-md border-b border-yellow-600/20'
		: 'bg-black/60 backdrop-blur-sm'}">
	<a href="/" class="flex items-center gap-3">
		<img src="/logo.png" alt="EXASHARP logo" class="h-12 w-auto" />
	</a>
	<div class="flex items-center gap-8">
		{#each links as link}
			<a
				href={link.href}
				class="text-sm transition-colors {page.url.pathname === link.href ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}"
			>
				{link.label}
			</a>
		{/each}

		{#if user}
			<!-- Bell icon -->
			<button aria-label="Notifications" class="relative text-gray-300 hover:text-white transition-colors">
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
				</svg>
				<span class="absolute -top-1 -right-1 h-2 w-2 bg-yellow-400 rounded-full"></span>
			</button>
			<!-- Avatar -->
			<img src="/user_avatar.png" alt="User avatar" class="h-8 w-8 rounded-full object-cover border border-yellow-400/50" />
			<button
				onclick={logout}
				class="rounded-md px-5 py-2 text-sm font-semibold text-black transition-all"
				style="background: linear-gradient(179deg, #dba74e, #d17f1e, #bf6508); box-shadow: 0 0 12px rgba(245,158,11,0.4);"
			>
				Sign Out
			</button>
		{:else if page.url.pathname === '/login'}
			<a href="/register" class="rounded-md border border-yellow-400 bg-yellow-400 px-5 py-2 text-sm font-semibold text-black hover:bg-yellow-300 transition-colors">
				Register
			</a>
		{:else}
			<a href="/login" class="rounded-md border border-yellow-400 bg-yellow-400 px-5 py-2 text-sm font-semibold text-black hover:bg-yellow-300 transition-colors">
				Sign In
			</a>
		{/if}
	</div>
</nav>
