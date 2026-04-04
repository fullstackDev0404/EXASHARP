<script lang="ts">
	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import Icon from "@iconify/svelte";

	const stats = [
		{
			title: "Total Users",
			value: "12,345",
			change: "+12.5%",
			trend: "up",
			icon: "lucide:users",
			color: "text-blue-400",
			bgColor: "bg-blue-500/10"
		},
		{
			title: "Revenue",
			value: "$54,321",
			change: "+8.2%",
			trend: "up",
			icon: "lucide:dollar-sign",
			color: "text-emerald-400",
			bgColor: "bg-emerald-500/10"
		},
		{
			title: "Orders",
			value: "1,234",
			change: "-3.1%",
			trend: "down",
			icon: "lucide:shopping-cart",
			color: "text-purple-400",
			bgColor: "bg-purple-500/10"
		},
		{
			title: "Active Now",
			value: "573",
			change: "+4.3%",
			trend: "up",
			icon: "lucide:activity",
			color: "text-orange-400",
			bgColor: "bg-orange-500/10"
		}
	];

	const recentActivity = [
		{ user: "Sarah Chen", action: "completed order", time: "2 min ago", icon: "lucide:shopping-cart", color: "bg-emerald-500" },
		{ user: "Mike Ross", action: "signed up", time: "5 min ago", icon: "lucide:user-plus", color: "bg-blue-500" },
		{ user: "Jessica Pearson", action: "made payment", time: "12 min ago", icon: "lucide:dollar-sign", color: "bg-yellow-500" },
		{ user: "Harvey Specter", action: "submitted form", time: "25 min ago", icon: "lucide:file-text", color: "bg-purple-500" },
		{ user: "Donna Paulsen", action: "left a review", time: "1 hour ago", icon: "lucide:message-square", color: "bg-pink-500" }
	];

	const quickActions = [
		{ label: "Create Report", icon: "lucide:file-plus", color: "hover:bg-blue-500/20 hover:text-blue-400" },
		{ label: "Add User", icon: "lucide:user-plus", color: "hover:bg-emerald-500/20 hover:text-emerald-400" },
		{ label: "Analytics", icon: "lucide:bar-chart-3", color: "hover:bg-purple-500/20 hover:text-purple-400" },
		{ label: "Quick Post", icon: "lucide:zap", color: "hover:bg-orange-500/20 hover:text-orange-400" }
	];
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4">
			<Sidebar.Trigger class="-ms-1" />
			<Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item class="hidden md:block">
						<Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="hidden md:block" />
					<Breadcrumb.Item>
						<Breadcrumb.Page>Overview</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<div class="flex items-center gap-4 ml-auto">
				<div class="relative hidden md:flex">
					<Icon icon="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search..."
						class="h-9 w-64 rounded-lg border bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
					/>
				</div>
				<button class="relative rounded-lg p-2 hover:bg-muted transition-colors">
					<Icon icon="lucide:bell" class="h-5 w-5 text-muted-foreground" />
					<span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
				</button>
			</div>
		</header>

		<div class="flex flex-1 flex-col gap-6 p-6 pt-4">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-2xl font-bold tracking-tight">Welcome back!</h1>
					<p class="text-muted-foreground">Here's what's happening with your platform today.</p>
				</div>
				<div class="flex items-center gap-2">
					<button class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
						<Icon icon="lucide:sparkles" class="h-4 w-4" />
						Generate Report
					</button>
				</div>
			</div>

			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{#each stats as stat}
					<Card.Root class="overflow-hidden border-muted/50 bg-linear-to-br from-card to-card/50 backdrop-blur">
						<Card.Content class="p-6">
							<div class="flex items-center justify-between">
								<div class="flex h-12 w-12 items-center justify-center rounded-xl {stat.bgColor}">
									<Icon icon={stat.icon} class="h-6 w-6 {stat.color}" />
								</div>
								<div class="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium {stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}">
									<Icon icon={stat.trend === 'up' ? 'lucide:trending-up' : 'lucide:trending-down'} class="h-3 w-3" />
									{stat.change}
								</div>
							</div>
							<div class="mt-4">
								<p class="text-2xl font-bold">{stat.value}</p>
								<p class="text-sm text-muted-foreground">{stat.title}</p>
							</div>
						</Card.Content>
					</Card.Root>
				{/each}
			</div>

			<div class="grid gap-6 lg:grid-cols-3">
				<Card.Root class="lg:col-span-2 border-muted/50">
					<Card.Header class="flex flex-row items-center justify-between pb-2">
						<div>
							<Card.Title class="text-lg font-semibold">Revenue Overview</Card.Title>
							<Card.Description class="text-sm text-muted-foreground">Performance over the last 30 days</Card.Description>
						</div>
						<div class="flex items-center gap-2 text-sm">
							<span class="flex items-center gap-1 text-emerald-500">
								<Icon icon="lucide:trending-up" class="h-4 w-4" />
								+24.5%
							</span>
						</div>
					</Card.Header>
					<Card.Content>
						<div class="h-70 w-full rounded-xl bg-linear-0-to-br from-primary/5 via-primary/10 to-primary/5 border border-muted/50 flex items-center justify-center">
							<div class="text-center">
								<Icon icon="lucide:bar-chart-3" class="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
								<p class="text-muted-foreground">Chart visualization coming soon</p>
								<p class="text-xs text-muted-foreground/70 mt-1">Integrate your preferred charting library</p>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root class="border-muted/50">
					<Card.Header class="pb-3">
						<Card.Title class="text-lg font-semibold">Recent Activity</Card.Title>
						<Card.Description class="text-sm text-muted-foreground">Latest actions on your platform</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-4">
						{#each recentActivity as activity}
							<div class="flex items-center gap-3 group cursor-pointer hover:bg-muted/50 -mx-2 px-2 py-2 rounded-lg transition-colors">
								<div class="flex h-9 w-9 items-center justify-center rounded-full {activity.color} text-white text-xs font-bold">
									<Icon icon={activity.icon} class="h-4 w-4" />
								</div>
								<div class="flex-1 min-w-0">
									<p class="text-sm font-medium truncate">{activity.user}</p>
									<p class="text-xs text-muted-foreground">{activity.action}</p>
								</div>
								<span class="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
							</div>
						{/each}
						<button class="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
							View all activity
							<Icon icon="lucide:arrow-right" class="h-4 w-4" />
						</button>
					</Card.Content>
				</Card.Root>
			</div>

			<div class="grid gap-6 lg:grid-cols-3">
				<Card.Root class="border-muted/50">
					<Card.Header>
						<Card.Title class="text-lg font-semibold">Quick Actions</Card.Title>
						<Card.Description class="text-sm text-muted-foreground">Frequently used features</Card.Description>
					</Card.Header>
					<Card.Content class="grid grid-cols-2 gap-3">
						{#each quickActions as action}
							<button class="flex flex-col items-center justify-center gap-2 rounded-xl border border-muted/50 bg-muted/30 p-4 transition-all {action.color}">
								<Icon icon={action.icon} class="h-6 w-6" />
								<span class="text-xs font-medium">{action.label}</span>
							</button>
						{/each}
					</Card.Content>
				</Card.Root>

				<Card.Root class="border-muted/50">
					<Card.Header>
						<Card.Title class="text-lg font-semibold">Upcoming Events</Card.Title>
						<Card.Description class="text-sm text-muted-foreground">Scheduled activities</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-3">
						{#each [
							{ title: "Team Meeting", date: "Today, 3:00 PM", type: "bg-blue-500" },
							{ title: "Product Launch", date: "Tomorrow, 10:00 AM", type: "bg-emerald-500" },
							{ title: "Q4 Review", date: "Dec 15, 2:00 PM", type: "bg-purple-500" }
						] as event}
							<div class="flex items-center gap-3">
								<div class="h-10 w-10 rounded-lg {event.type} flex items-center justify-center">
									<Icon icon="lucide:calendar" class="h-5 w-5 text-white" />
								</div>
								<div>
									<p class="text-sm font-medium">{event.title}</p>
									<p class="text-xs text-muted-foreground">{event.date}</p>
								</div>
							</div>
						{/each}
					</Card.Content>
				</Card.Root>

				<Card.Root class="border-muted/50">
					<Card.Header>
						<Card.Title class="text-lg font-semibold">Top Performers</Card.Title>
						<Card.Description class="text-sm text-muted-foreground">Best performing members</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-3">
						{#each [
							{ name: "Sarah Chen", sales: "$12,450", avatar: "SC" },
							{ name: "Mike Ross", sales: "$11,230", avatar: "MR" },
							{ name: "Jessica Pearson", sales: "$10,890", avatar: "JP" }
						] as performer, i}
							<div class="flex items-center gap-3">
								<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/50 text-primary-foreground font-bold text-sm">
									{performer.avatar}
								</div>
								<div class="flex-1">
									<p class="text-sm font-medium">{performer.name}</p>
									<p class="text-xs text-muted-foreground">Rank #{i + 1}</p>
								</div>
								<div class="text-right">
									<p class="text-sm font-semibold text-emerald-500">{performer.sales}</p>
									<p class="text-xs text-muted-foreground">Sales</p>
								</div>
							</div>
						{/each}
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
