<script lang="ts">
	type Props = {
		type?: string;
		placeholder?: string;
		value?: string;
		error?: boolean;
		icon?: 'email' | 'password' | 'user' | 'building' | 'hash';
	};
	let { type = 'text', placeholder = '', value = $bindable(''), error = false, icon }: Props = $props();
</script>

<div class="flex items-center gap-2 rounded-lg px-3 py-2.5 border transition-colors bg-white
	{error ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-300 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-200'}">
	{#if icon === 'email'}
		<svg class="h-4 w-4 shrink-0 {error ? 'text-red-400' : 'text-gray-400'}" fill="currentColor" viewBox="0 0 20 20">
			<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
			<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
		</svg>
	{:else if icon === 'password'}
		<svg class="h-4 w-4 shrink-0 {error ? 'text-red-400' : 'text-gray-400'}" fill="currentColor" viewBox="0 0 20 20">
			<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
		</svg>
	{:else if icon === 'user'}
		<svg class="h-4 w-4 shrink-0 {error ? 'text-red-400' : 'text-gray-400'}" fill="currentColor" viewBox="0 0 20 20">
			<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
		</svg>
	{:else if icon === 'building'}
		<svg class="h-4 w-4 shrink-0 {error ? 'text-red-400' : 'text-gray-400'}" fill="currentColor" viewBox="0 0 20 20">
			<path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
		</svg>
	{:else if icon === 'hash'}
		<svg class="h-4 w-4 shrink-0 {error ? 'text-red-400' : 'text-gray-400'}" fill="currentColor" viewBox="0 0 20 20">
			<path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clip-rule="evenodd" />
		</svg>
	{/if}
	<input {type} {placeholder} bind:value
		class="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none" />
</div>
