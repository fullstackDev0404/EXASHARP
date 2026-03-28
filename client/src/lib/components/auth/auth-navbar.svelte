<script lang="ts">
	import { page } from '$app/stores';

	const links = [
		{ href: '/services', label: 'Services' },
		{ href: '/solutions', label: 'Solutions' },
		{ href: '/pricing', label: 'Pricing' },
	];
</script>

<nav class="relative z-10 flex items-center justify-between px-10 py-5">
	<a href="/" class="flex items-center gap-3">
		<img src="/logo.png" alt="EXASHARP logo" class="h-15 w-auto" />
	</a>
	<div class="flex items-center gap-8">
		{#each links as link}
			<a
				href={link.href}
				class="text-sm transition-colors {$page.url.pathname === link.href ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}"
			>
				{link.label}
			</a>
		{/each}
		<a
			href="/login"
			class="rounded-md border border-yellow-400 bg-yellow-400 px-5 py-2 text-sm font-semibold text-black hover:bg-yellow-300 transition-colors"
		>
			Sign In
		</a>
	</div>
</nav>
