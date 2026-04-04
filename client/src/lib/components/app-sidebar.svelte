<script lang="ts" module>
	import AudioWaveformIcon from "@lucide/svelte/icons/audio-waveform";
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import BotIcon from "@lucide/svelte/icons/bot";
	import ChartPieIcon from "@lucide/svelte/icons/chart-pie";
	import CommandIcon from "@lucide/svelte/icons/command";
	import FrameIcon from "@lucide/svelte/icons/frame";
	import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
	import MapIcon from "@lucide/svelte/icons/map";
	import Settings2Icon from "@lucide/svelte/icons/settings-2";
	import SquareTerminalIcon from "@lucide/svelte/icons/square-terminal";

</script>

<script lang="ts">
	import NavMain from "./nav-main.svelte";
	import NavProjects from "./nav-projects.svelte";
	import NavUser from "./nav-user.svelte";
	import TeamSwitcher from "./team-switcher.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";
	import { page } from "$app/state";

	const user = $derived({
		name: page.data.user?.name ?? "Guest",
		email: page.data.user?.email ?? "guest@example.com",
		avatar: "/avatars/shadcn.jpg"
	});

	const companies = $derived(page.data.companies || []);
	const currentCompany = $derived(page.data.currentCompany);

	const teams = $derived(
		companies.length > 0
			? companies.map((c: any) => ({
					name: c.name,
					logo: GalleryVerticalEndIcon,
					plan: c.code,
					isActive: c.id === currentCompany?.id,
			  }))
			: [{ name: "No Company", logo: CommandIcon, plan: "Join or create a company", isActive: true }]
	);

	const navMain = [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: SquareTerminalIcon,
			isActive: true,
		},
		{
			title: "Employees",
			url: "/dashboard/employees",
			icon: BotIcon,
			items: [],
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpenIcon,
			items: [],
		},
		{
			title: "Settings",
			url: "/dashboard/settings",
			icon: Settings2Icon,
			items: [],
		},
	];

	const projects = [
		{
			name: "Design Engineering",
			url: "#",
			icon: FrameIcon,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: ChartPieIcon,
		},
		{
			name: "Travel",
			url: "#",
			icon: MapIcon,
		},
	];

	let {
		ref = $bindable(null),
		collapsible = "icon",
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher {teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={navMain} />
		<NavProjects {projects} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser {user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
