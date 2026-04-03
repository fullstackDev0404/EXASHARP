<script lang="ts">
	type Props = {
		onclick?: () => void;
		disabled?: boolean;
		type?: 'button' | 'submit';
		class?: string;
		children: import('svelte').Snippet;
	};
	let { onclick, disabled = false, type = 'button', class: cls = '', children }: Props = $props();
</script>

<button
	{type}
	{onclick}
	{disabled}
	class="font-bold text-black rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed {cls}"
	style="background: #f5a623;"
>
	{@render children()}
</button>
