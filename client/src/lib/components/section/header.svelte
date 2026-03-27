<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import * as NavigationMenu from '$lib/components/ui/navigation-menu';
    import Icon from '@iconify/svelte';
    import Button from '../ui/button/button.svelte';
    import Separator from '../ui/separator/separator.svelte';
</script>

<header class="flex items-center justify-between px-10 h-15">
<div class="flex items-center gap-4">
    <img src={favicon} class="w-6 h-6" style="filter: invert(27%) sepia(100%) saturate(2000%) hue-rotate(0deg) brightness(100%) contrast(100%);" alt="">
    <NavigationMenu.Root>
        <NavigationMenu.List class="flex gap-2">
        <NavigationMenu.Item>
            <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
        </NavigationMenu.Item>
                <NavigationMenu.Item>
            <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
            <NavigationMenu.Link href="/contact">Contact</NavigationMenu.Link>
        </NavigationMenu.Item>
        </NavigationMenu.List>
    </NavigationMenu.Root>
</div>

<div class="flex items-center h-6 space-x-4">
    <Button onclick={() => (window.location.href = "/login")} variant="outline">Login</Button>
    <Button onclick={() => (window.location.href = "/register")}>Register</Button>
    <Separator orientation="vertical"/>
    <a href="https://github.com/fullstackDev0404/EXASHARP.git" target="_blank" rel="noopener noreferrer" class="hover:bg-gray-200 h-7.5 rounded-lg w-7.5 flex items-center justify-center">
        <Icon icon="mdi:github" class="w-5 h-5" />
    </a>
</div>

</header>