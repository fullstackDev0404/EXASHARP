<script lang="ts">
    import Footer from "$lib/components/section/footer.svelte";
    let { data } = $props();

    const isLoggedIn = $derived(!!data.user);

    const features = [
        { icon: '👥', title: 'HR Management', desc: 'Employee records, contracts, documents and org structure' },
        { icon: '📅', title: 'Attendance & Leave', desc: 'Shift scheduling, check-in tracking and leave approvals' },
        { icon: '💰', title: 'Payroll', desc: 'Automated salary, allowances, deductions and payslips' },
        { icon: '📊', title: 'Performance', desc: 'KPI tracking, reviews and goal management' },
        { icon: '🎯', title: 'Recruitment', desc: 'Job posts, applicant pipeline and interview scheduling' },
        { icon: '📦', title: 'Asset Management', desc: 'Track company equipment assigned to employees' },
    ];

    const stats = [
        { value: '500+', label: 'Companies' },
        { value: '50K+', label: 'Employees Managed' },
        { value: '99.9%', label: 'Uptime' },
        { value: '24/7', label: 'Support' },
    ];
</script>

<svelte:head>
    <title>EXASHARP - The Foundation for your ERP System</title>
</svelte:head>

<div class="min-h-screen text-gray-900 bg-white">

    <!-- Hero -->
    <section class="flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
        {#if data.backendMessage && data.backendMessage !== 'Backend is offline'}
        <div class="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-medium text-blue-600 border border-blue-200 bg-blue-50">
            <span class="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            {data.backendMessage}
        </div>
        {/if}

        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl leading-tight mb-6 text-gray-900">
            The Foundation for your
            <span class="text-blue-600"> ERP System</span>
        </h1>

        <p class="text-gray-500 text-lg max-w-2xl mb-10 leading-relaxed">
            Next-generation HRMS built for scale. Manage your entire workforce — from onboarding to payroll — in one unified platform.
        </p>

        <div class="flex gap-4 flex-wrap justify-center">
            {#if isLoggedIn}
                <!-- Logged in: go to dashboard -->
                <a href="/dashboard"
                    class="px-8 py-3 rounded-lg font-bold text-black text-sm"
                    style="background: #f5a623;">
                    Go to Dashboard
                </a>
            {:else}
                <!-- Not logged in: register + sign in -->
        <a href="/register"
                    class="px-8 py-3 rounded-lg font-bold text-white text-sm"
                    style="background: #3b6fd4;">
                    Get Started Free
                </a>
                <a href="/login"
                    class="px-8 py-3 rounded-lg font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                    Sign In
                </a>
            {/if}
        </div>
    </section>

    <!-- Stats -->
    <section class="px-6 pb-16">
        <div class="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {#each stats as stat}
                <div class="text-center p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
                    <p class="text-3xl font-bold text-blue-600">{stat.value}</p>
                    <p class="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
            {/each}
        </div>
    </section>

    <!-- Features -->
    <section class="px-6 pb-20">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-semibold text-center mb-10 text-gray-900">Everything you need to manage your workforce</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each features as feature}
                    <div class="p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
                        <span class="text-2xl mb-3 block">{feature.icon}</span>
                        <h3 class="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p class="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="px-6 pb-20">
        <div class="max-w-2xl mx-auto text-center p-10 rounded-2xl border border-blue-200 bg-blue-50">
            <h2 class="text-2xl font-bold mb-3 text-gray-900">
                {#if isLoggedIn}Welcome back, {data.user?.name}!{:else}Ready to get started?{/if}
            </h2>
            <p class="text-gray-500 mb-6 text-sm">
                {#if isLoggedIn}Head to your dashboard to manage your workforce.{:else}Sign up and have your company running in minutes.{/if}
            </p>
            {#if isLoggedIn}
                <a href="/dashboard"
                    class="inline-block px-8 py-3 rounded-lg font-bold text-white text-sm"
                    style="background: #3b6fd4;">
                    Open Dashboard
                </a>
            {:else}
                <a href="/register"
                    class="inline-block px-8 py-3 rounded-lg font-bold text-white text-sm"
                    style="background: #3b6fd4;">
                    Create Your Account
                </a>
            {/if}
        </div>
    </section>

</div>

<Footer />
