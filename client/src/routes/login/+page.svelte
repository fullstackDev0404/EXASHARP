<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { authClient } from '$lib/auth-client';

	let email = $state('');
	let password = $state('');
	let rememberMe = $state(false);
	let loading = $state(false);
	let serverError = $state('');
	let emailError = $state('');
	let passwordError = $state('');

	function validateEmail(val: string) {
		if (!val) return 'Email is required.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Enter a valid email address.';
		return '';
	}

	function validatePassword(val: string) {
		if (!val) return 'Password is required.';
		if (val.length < 6) return 'Password must be at least 6 characters.';
		return '';
	}

	$effect(() => { if (email) emailError = validateEmail(email); });
	$effect(() => { if (password) passwordError = validatePassword(password); });

	const login = async () => {
		emailError = validateEmail(email);
		passwordError = validatePassword(password);
		if (emailError || passwordError) return;

		loading = true;
		serverError = '';
		try {
			const { error } = await authClient.signIn.email({ email, password });
			if (error) {
				serverError = error.message || 'Invalid credentials.';
			} else {
				window.location.href = '/dashboard';
			}
		} catch {
			serverError = 'Something went wrong. Please try again.';
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>Sign In — EXASHARP</title>
</svelte:head>

<div class="min-h-screen flex relative overflow-hidden">
	<!-- Full page background -->
	<img src="/auth-bg.png" alt="" class="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
	<div class="absolute inset-0" style="background: rgba(26,39,68,0.75);"></div>

	<!-- Left panel: branding -->
	<div class="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-between p-10">
		<div class="flex items-center gap-3">
			<img src="/logo.png" alt="EXASHARP" class="h-10 w-auto" />
		</div>
		<!-- Bottom tagline -->
		<div>
			<h2 class="text-white text-3xl font-bold leading-snug mb-3">
				Manage your workforce<br />smarter, faster.
			</h2>
			<p class="text-blue-200 text-sm leading-relaxed max-w-sm">
				EXASHARP HRMS gives you complete control over HR, payroll, attendance, and performance — all in one platform.
			</p>
		</div>
	</div>

	<!-- Right panel: form -->
	<div class="flex-1 relative z-10 flex items-center justify-center px-6 py-12">
		<div class="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10">

			<!-- Mobile logo -->
			<div class="flex items-center gap-2 mb-8 lg:hidden">
				<img src="/logo.png" alt="EXASHARP" class="h-8 w-auto" />
				<span class="font-bold text-gray-800">EXASHARP</span>
			</div>

			<h1 class="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
			<p class="text-gray-500 text-sm mb-8">Sign in to your EXASHARP account</p>

			{#if serverError}
				<div class="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
					{serverError}
				</div>
			{/if}

			<form onsubmit={(e) => { e.preventDefault(); login(); }} class="space-y-5">

				<!-- Email -->
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
					<input
						id="email"
						type="email"
						placeholder="Enter your email"
						bind:value={email}
						class="w-full rounded-lg border px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors
							{emailError ? 'border-red-400 bg-red-50 focus:border-red-400' : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}"
					/>
					{#if emailError}<p class="mt-1 text-xs text-red-500">{emailError}</p>{/if}
				</div>

				<!-- Password -->
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
					<input
						id="password"
						type="password"
						placeholder="Enter your password"
						bind:value={password}
						onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && login()}
						class="w-full rounded-lg border px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors
							{passwordError ? 'border-red-400 bg-red-50 focus:border-red-400' : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}"
					/>
					{#if passwordError}<p class="mt-1 text-xs text-red-500">{passwordError}</p>{/if}
				</div>

				<!-- Remember + Forgot -->
				<div class="flex items-center justify-between">
					<Checkbox bind:checked={rememberMe} label="Remember Me" />
					<a href="/forgot-password" class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
						Forgot Password?
					</a>
				</div>

				<!-- Submit -->
				<button
					type="submit"
					disabled={loading}
					class="w-full rounded-lg py-3 text-sm font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90"
					style="background: linear-gradient(135deg, #3b6fd4, #2855b0);"
				>
					{loading ? 'Signing in...' : 'Sign In'}
				</button>

				<p class="text-center text-sm text-gray-500">
					Don't have an account?
					<a href="/register" class="font-bold text-blue-600 hover:text-blue-700 transition-colors">Sign Up</a>
				</p>
			</form>

			<p class="mt-10 text-center text-xs text-gray-400">© 2026 EXASHARP. All rights reserved.</p>
		</div>
	</div>
</div>
