<script lang="ts">
	type Props = {
		title: string;
		children: import('svelte').Snippet;
	};

	let { title, children }: Props = $props();
</script>

<div class="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl" style="background: #1c1c24; border: 1px solid rgba(255,255,255,0.08);">
	<div class="flex">
		<!-- Yellow left accent bar -->
		<div class="w-1.5 shrink-0" style="background: linear-gradient(180deg, #f5a623, #d17f1e);"></div>
		<div class="flex-1 px-10 py-10">
			<!-- Logo -->
			<div class="mb-6 flex justify-center">
				<img src="/logo.png" alt="EXASHARP" class="h-12 w-auto" />
			</div>

			<h1 class="mb-7 text-center text-2xl font-semibold text-white">{title}</h1>

			{@render children()}
		</div>
	</div>
</div>
