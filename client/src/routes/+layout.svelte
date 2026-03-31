<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Toolbar from '$lib/components/toolbar.svelte';
	import { page } from '$app/state';

	let { children, data } = $props();

	const isDashboard = $derived(page.url.pathname.startsWith('/dashboard'));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Enterprise Resource Planning (ERP) - EXASHARP</title>
</svelte:head>

{#if !isDashboard}
	<Toolbar user={data.user} />
{/if}

{@render children()}
