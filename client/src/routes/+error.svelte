<!-- src/routes/+error.svelte -->
<script>
  import { page } from "$app/state";
  import Button from "$lib/components/ui/button/button.svelte";
</script>

<svelte:head>
  <title>{page.status || 500} - An error occurred</title>
</svelte:head>

<main
  class="flex flex-col items-center justify-center min-h-screen gap-5 px-4 animate-in fade-in duration-500"
>
  <h1
    class="text-6xl sm:text-8xl md:text-9xl font-semibold bg-linear-to-r from-mauve-500 to-purple-500 bg-clip-text text-transparent"
  >
    {page.status || 500}
  </h1>
  <p class="text-xl sm:text-3xl text-center">
    {page.error?.message ||
      (page.status === 404 ? "Page not found" : "An unexpected error occurred")}
  </p>
  <p
    class="text-base sm:text-lg text-mauve-600 dark:text-mauve-400 text-center max-w-md"
  >
    We're sorry for the inconvenience. Please try again later.
  </p>
  <div class="flex gap-3 mt-4">
    <Button onclick={() => history.back()} variant="outline">Go Back</Button>
    <Button onclick={() => (window.location.href = "/")}>Return Home</Button>
  </div>
</main>
