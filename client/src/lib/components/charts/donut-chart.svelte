<script lang="ts">
	type Props = { value: number; label?: string; size?: number };
	let { value, label, size = 72 }: Props = $props();

	const r = 15.9;
	const circumference = 2 * Math.PI * r;
	const dash = $derived((value / 100) * circumference);
</script>

<div class="relative flex items-center justify-center" style="width:{size}px;height:{size}px">
	<svg viewBox="0 0 36 36" class="w-full h-full -rotate-90">
		<circle cx="18" cy="18" r={r} fill="none" stroke="#ffffff15" stroke-width="3"/>
		<circle cx="18" cy="18" r={r} fill="none" stroke="#eab308" stroke-width="3"
			stroke-dasharray="{dash} {circumference - dash}" stroke-linecap="round"/>
	</svg>
	<div class="absolute inset-0 flex flex-col items-center justify-center">
		<span class="text-sm font-bold text-white">{value}%</span>
		{#if label}<span class="text-[9px] text-gray-400">{label}</span>{/if}
	</div>
</div>
