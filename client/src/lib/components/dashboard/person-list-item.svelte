<script lang="ts">
	type Props = {
		name: string;
		role: string;
		meta?: string;
		metaClass?: string;
		sub?: string;
	};
	let { name, role, meta, metaClass = 'text-yellow-400', sub }: Props = $props();
</script>

<div class="flex items-center gap-3">
	<div class="h-8 w-8 rounded-full bg-yellow-400/30 flex items-center justify-center text-xs font-bold shrink-0">
		{name[0]}
	</div>
	<div class="min-w-0 flex-1">
		<p class="text-xs font-medium truncate">{name}</p>
		<p class="text-xs text-gray-500 truncate">{role}</p>
	</div>
	{#if meta}
		<div class="text-right shrink-0">
			<p class="text-xs text-gray-400">{meta}</p>
			{#if sub}<p class="text-xs {metaClass}">{sub}</p>{/if}
		</div>
	{/if}
</div>
