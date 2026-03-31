<script lang="ts">
	type Bar = { label: string; value: number };
	type Props = { bars: Bar[]; max?: number; color?: string };

	let { bars, max, color = 'bg-yellow-500' }: Props = $props();
	const maxVal = $derived(max ?? Math.max(...bars.map(b => b.value)));
</script>

<div class="flex items-end gap-1 h-16 w-full">
	{#each bars as bar}
		<div class="flex flex-col items-center flex-1 gap-0.5">
			<div
				class="{color}/80 w-full rounded-t transition-all"
				style="height: {maxVal > 0 ? (bar.value / maxVal) * 100 : 0}%"
			></div>
		</div>
	{/each}
</div>
