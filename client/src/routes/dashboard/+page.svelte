<script lang="ts">
	import Sidebar from '$lib/components/dashboard/sidebar.svelte';
	import Toolbar from '$lib/components/toolbar.svelte';
	import StatCard from '$lib/components/dashboard/stat-card.svelte';
	import PersonListItem from '$lib/components/dashboard/person-list-item.svelte';
	import DonutChart from '$lib/components/charts/donut-chart.svelte';
	import FunnelChart from '$lib/components/charts/funnel-chart.svelte';
	import {
		pendingLeaves, upcomingEvents, payrollBars,
		funnelStages, recruitmentStages, headcountBars
	} from '$lib/data/dashboard';

	let { data } = $props();
	const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
</script>

<div class="flex h-screen text-white overflow-hidden">
	<Sidebar userName={data?.user?.name ?? 'User'} />

	<main class="flex-1 overflow-y-auto flex flex-col">
		<Toolbar user={data?.user} />

		<div class="flex items-center justify-between px-6 py-3 bg-black/20">
			<h1 class="text-2xl font-semibold">HRMS Dashboard</h1>
			<div class="flex items-center gap-3 text-sm text-gray-400">
				<span>{today}</span>
				<span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">Live</span>
			</div>
		</div>

		<div class="p-5 m-5 rounded-md space-y-4" style = "background: rgb(41 30 11 / 65%)">

			<!-- Workforce Overview -->
			<div>
				<div class="flex items-center gap-2 mb-3">
					<h2 class="text-sm font-semibold">Workforce Overview</h2>
					<span class="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full">The Pulse</span>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-3">

					<StatCard title="Total Headcount" icon="👥" footer="HR: 89 · Sales: 89 · IT: 35 · Eng: 56">
						{#snippet children()}
							<p class="text-4xl font-bold">256</p>
							<div class="flex gap-1 items-end h-8">
								{#each headcountBars as h}
									<div class="flex-1 bg-yellow-500/60 rounded-sm" style="height:{h * 10}%"></div>
								{/each}
							</div>
						{/snippet}
					</StatCard>

					<StatCard title="New Hires vs Attrition" icon="📊" badge="30 Days" footer="Avg. Time-to-Hire">
						{#snippet children()}
							<div class="flex items-center gap-3">
								<div>
									<p class="text-2xl font-bold">14 → 6</p>
									<p class="text-xs text-gray-500">+6 · Stat Changes · +0</p>
								</div>
								<div class="ml-auto">
									<DonutChart value={92.5} size={72} />
								</div>
							</div>
						{/snippet}
					</StatCard>

					<StatCard title="Open Positions" icon="📋" footer="Avg. Time-to-Hire: 23 Days">
						{#snippet children()}
							<p class="text-4xl font-bold">14</p>
							<div class="space-y-1 text-xs text-gray-400">
								<div class="flex justify-between"><span>211 Present</span><span class="text-yellow-400">↗ 7+</span></div>
								<div class="flex justify-between"><span>14 Absent</span><span class="text-red-400">↗ 18</span></div>
							</div>
						{/snippet}
					</StatCard>
				</div>
			</div>

			<!-- Row 2 -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-3">

				<StatCard title="Attendance Rate" footer="Avg. Time-to-Hire: 13 Days">
					{#snippet children()}
						<div class="flex items-center justify-between mb-1">
							<span class="text-yellow-400 font-bold">92.5%</span>
						</div>
						<FunnelChart stages={funnelStages} />
					{/snippet}
				</StatCard>

				<StatCard title="Open Positions">
					{#snippet children()}
						<p class="text-xl font-bold">14</p>
						<div class="grid grid-cols-3 gap-1 text-xs text-gray-400">
							<span>283 Pending</span><span>8 Comp</span><span>4 Sales</span>
							<span>80+ 770 review</span><span>10 Days</span><span>Back Hire</span>
						</div>
					{/snippet}
				</StatCard>

				<StatCard title="Pending Leave Requests">
					{#snippet children()}
						<p class="text-yellow-400 font-bold text-sm mb-1">4 ›</p>
						<div class="space-y-3">
							{#each pendingLeaves as leave}
								<PersonListItem name={leave.name} role={leave.role} meta={leave.dates} sub="Not taken" />
							{/each}
						</div>
					{/snippet}
				</StatCard>
			</div>

			<!-- Row 3 -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-3">

				<StatCard title="Recruitment & Talent Pipeline" footer="Avg. Time-to-Hire: Sara Days">
					{#snippet children()}
						<div class="flex items-center justify-between mb-2">
							<span class="text-xs text-gray-400">Open Positions</span>
							<span class="text-sm font-bold">997 <span class="text-yellow-400">14</span></span>
						</div>
						<FunnelChart stages={recruitmentStages} />
					{/snippet}
				</StatCard>

				<StatCard title="Financial & Performance Insights" footer="763 / 2.80 · Completed · 1 Hiring · +4">
					{#snippet children()}
						<p class="text-xs text-gray-400 mb-2">Payroll Summary</p>
						<div class="flex items-end gap-1 h-20">
							{#each payrollBars as h}
								<div class="flex-1 bg-yellow-500/70 rounded-t" style="height:{h}%"></div>
							{/each}
						</div>
					{/snippet}
				</StatCard>

				<StatCard title="Upcoming Events">
					{#snippet children()}
						<div class="space-y-3">
							{#each upcomingEvents as event}
								<PersonListItem name={event.name} role={event.role} meta={event.days} metaClass="text-yellow-400" />
							{/each}
						</div>
					{/snippet}
				</StatCard>
			</div>

		</div>
	</main>
</div>
