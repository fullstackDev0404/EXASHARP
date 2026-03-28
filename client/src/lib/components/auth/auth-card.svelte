<script lang="ts">
	type Props = {
		title: string;
		children: import('svelte').Snippet;
	};

	let { title, children }: Props = $props();
</script>

<div class="w-full max-w-md rounded-2xl bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden">
	<div class="flex">
		<!-- Yellow left accent bar -->
		<div class="w-1.5 bg-yellow-400 flex-shrink-0"></div>
		<div class="flex-1 px-10 py-10">
			<!-- Logo -->
			<div class="mb-6 flex justify-center">
				<div class="flex items-center gap-2">
					<img src="/logo.png" alt="EXASHARP" class="h-12 w-auto" />
				</div>
			</div>

			<h1 class="mb-7 text-center text-2xl font-semibold text-white">{title}</h1>

			{@render children()}
		</div>
	</div>
</div>
