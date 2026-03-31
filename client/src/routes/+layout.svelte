<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/toolbar.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Enterprise Resource Planning (ERP) - EXASHARP</title>
</svelte:head>

<Navbar user={data.user} />

{@render children()}
