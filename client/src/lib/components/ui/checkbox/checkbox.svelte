<script lang="ts">
	type Props = { checked?: boolean; label?: string; };
	let { checked = $bindable(false), label = '' }: Props = $props();
</script>

<label class="flex cursor-pointer items-center gap-2">
	<input type="checkbox" bind:checked class="h-4 w-4 accent-blue-600 cursor-pointer rounded" />
	{#if label}<span class="text-sm text-gray-600">{label}</span>{/if}
</label>
