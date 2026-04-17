<script lang="ts">
	type Props = {
		title: string;
		children: import('svelte').Snippet;
	};
	let { title, children }: Props = $props();
</script>

<div class="w-full max-w-md rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
	<div class="flex">
		<div class="w-1 shrink-0" style="background: #3b6fd4;"></div>
		<div class="flex-1 px-8 py-8">
			<div class="mb-5 flex justify-center">
				<img src="/logo.png" alt="EXASHARP" class="h-10 w-auto" />
			</div>
			<h1 class="mb-6 text-center text-xl font-bold text-gray-900">{title}</h1>
			{@render children()}
		</div>
	</div>
</div>
