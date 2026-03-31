<script lang="ts">
    import Footer from "$lib/components/section/footer.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    let { data } = $props()
</script>

<svelte:head>
    <title>EXASHARP - The Foundation for your ERP System</title>
</svelte:head>

<div class="flex items-center justify-center flex-col py-25">
    <div class="pb-4 flex items-center gap-2 text-sm font-medium leading-6 text-center text-primary">
        <div class="h-2 w-2 bg-red-400 rounded-full"></div>
        {data.backendMessage}
    </div>
    <h1 class="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
        The Foundation for your ERP System
    </h1>
    <p class="leading-7 not-first:mt-6 text-center max-w-3xl text-lg">
        Experimenting with next-generation ERP: flexible, scalable, and intelligent. Built for innovation, designed to adapt, and crafted to evolve with your business.
    </p>
    <div class="pt-6">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline" class="ml-4">View Documentation</Button>
    </div>
</div>

<Footer />
