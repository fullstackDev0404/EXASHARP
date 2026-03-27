<script lang="ts">
  import LoginForm from "$lib/components/section/login-form.svelte";
  import Icon from "@iconify/svelte";

</script>

<div class="grid min-h-svh lg:grid-cols-2">
  <div class="flex flex-col gap-4 p-6 md:p-10">
    <div class="flex justify-center gap-2 md:justify-start">
      <a href="##" class="flex items-center gap-2 font-medium">
        <div
          class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"
        >
          <Icon icon="boxicons:compass-tool" class="size-4" />
        </div>
        EXASHARP
      </a>
    </div>
    <div class="flex flex-1 items-center justify-center">
      <div class="w-full max-w-xs">
        <LoginForm />
      </div>
    </div>
  </div>
  <div class="bg-muted relative hidden lg:block">
    <img
      src="/winter-in-finland.webp"
      alt="placeholder"
      class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
    />
  </div>
</div>
