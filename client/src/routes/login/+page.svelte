<script lang="ts">
	import AuthCard from '$lib/components/auth/auth-card.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Checkbox } from '$lib/components/ui/checkbox';

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
			const res = await fetch('http://localhost:3000/api/auth/sign-in/email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Origin': 'http://localhost:5173' },
				credentials: 'include',
				body: JSON.stringify({ email, password })
			});
			const data = await res.json();
			if (res.ok) {
				window.location.href = '/dashboard';
			} else {
				serverError = data.message || 'Invalid credentials.';
			}
		} catch {
			serverError = 'Something went wrong. Please try again.';
		} finally {
			loading = false;
		}
	};
</script>

<div class="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f]">
	<img src="/auth-bg.png" alt="" class="absolute inset-0 h-full w-full object-cover opacity-60" aria-hidden="true" />

	<div class="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
		<AuthCard title="Sign In">
			{#if serverError}
				<p class="mb-4 rounded-lg bg-red-500/20 px-4 py-2 text-center text-sm text-red-400">{serverError}</p>
			{/if}

			<div class="space-y-4">
				<div class="space-y-1">
					<Input type="email" placeholder="Email Address" bind:value={email} icon="email" error={!!emailError} />
					{#if emailError}<p class="text-xs text-red-400 pl-1">{emailError}</p>{/if}
				</div>

				<div class="space-y-1">
					<Input type="password" placeholder="Password" bind:value={password} icon="password" error={!!passwordError}
						onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && login()} />
					{#if passwordError}<p class="text-xs text-red-400 pl-1">{passwordError}</p>{/if}
				</div>

				<div class="flex items-center justify-between">
					<Checkbox bind:checked={rememberMe} label="Remember Me" />
					<a href="/forgot-password" class="text-sm text-gray-400 hover:text-white transition-colors">Forgot Password?</a>
				</div>

				<button
					onclick={login}
					disabled={loading}
					class="w-full rounded-lg bg-yellow-400 py-3 text-base font-bold text-black hover:bg-yellow-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{loading ? 'Signing in...' : 'Sign In'}
				</button>

				<p class="text-center text-sm text-gray-400">
					Don't have an account?
					<a href="/register" class="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">Register</a>
				</p>
			</div>
		</AuthCard>
	</div>
</div>
