<script lang="ts">
	type Props = {
		type?: string;
		placeholder?: string;
		value?: string;
		error?: boolean;
		icon?: 'email' | 'password' | 'user';
		onkeydown?: (e: KeyboardEvent) => void;
	};

	let { type = 'text', placeholder = '', value = $bindable(''), error = false, icon, onkeydown }: Props = $props();
</script>

<div class="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors {error ? 'border border-red-500' : 'border border-white/10'}" style="background: #0f1117;">
	{#if icon === 'email'}
		<svg class="h-4 w-4 flex-shrink-0 {error ? 'text-red-400' : 'text-gray-400'}" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
			<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
			<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
		</svg>
	{:else if icon === 'password'}
		<svg class="h-4 w-4 flex-shrink-0 {error ? 'text-red-400' : 'text-gray-400'}" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
			<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
		</svg>
	{:else if icon === 'user'}
		<svg class="h-4 w-4 flex-shrink-0 {error ? 'text-red-400' : 'text-gray-400'}" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
			<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
		</svg>
	{/if}
	<input
		{type}
		{placeholder}
		bind:value
		{onkeydown}
		class="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
	/>
</div>
