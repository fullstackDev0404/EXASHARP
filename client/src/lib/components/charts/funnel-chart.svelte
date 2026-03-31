<script lang="ts">
	type Stage = { label: string; value: number };
	type Props = { stages: Stage[] };
	let { stages }: Props = $props();
	const max = $derived(Math.max(...stages.map(s => s.value)));
</script>

<div class="space-y-1.5 w-full">
	{#each stages as stage, i}
		{@const pct = max > 0 ? (stage.value / max) * 100 : 0}
		{@const width = 100 - i * 12}
		<div class="flex items-center gap-2 text-xs">
			<span class="text-gray-400 w-16 shrink-0 text-right">{stage.label}</span>
			<div class="flex-1 flex justify-center">
				<div
					class="bg-yellow-600/70 rounded h-5 flex items-center justify-end pr-2 transition-all"
					style="width:{width}%"
				>
					<span class="text-white text-[10px] font-medium">{stage.value}</span>
				</div>
			</div>
		</div>
	{/each}
</div>
