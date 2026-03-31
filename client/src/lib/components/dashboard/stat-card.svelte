<script lang="ts">
	type Props = {
		title: string;
		icon?: string;
		badge?: string;
		children: import('svelte').Snippet;
		footer?: string;
	};
	let { title, icon, badge, children, footer }: Props = $props();
</script>

<div class="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col gap-2">
	<div class="flex items-center justify-between">
		<p class="text-xs text-gray-400 flex items-center gap-1.5">
			{#if icon}<span>{icon}</span>{/if}
			{title}
		</p>
		{#if badge}
			<span class="text-xs bg-white/10 px-2 py-0.5 rounded-full">{badge}</span>
		{/if}
	</div>
	{@render children()}
	{#if footer}
		<p class="text-xs text-gray-500 mt-auto">{footer}</p>
	{/if}
</div>
