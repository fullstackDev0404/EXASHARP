<script lang="ts">
	import AuthCard from '$lib/components/auth/auth-card.svelte';
	import { Input } from '$lib/components/ui/input';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let loading = $state(false);
	let serverError = $state('');
	let nameError = $state('');
	let emailError = $state('');
	let passwordError = $state('');
	let confirmPasswordError = $state('');

	function validateName(val: string) {
		if (!val) return 'Name is required.';
		if (val.length < 2) return 'Name must be at least 2 characters.';
		return '';
	}

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

	function validateConfirmPassword(val: string) {
		if (!val) return 'Please confirm your password.';
		if (val !== password) return 'Passwords do not match.';
		return '';
	}

	$effect(() => { if (name) nameError = validateName(name); });
	$effect(() => { if (email) emailError = validateEmail(email); });
	$effect(() => { if (password) passwordError = validatePassword(password); });
	$effect(() => { if (confirmPassword) confirmPasswordError = validateConfirmPassword(confirmPassword); });

	const register = async () => {
		nameError = validateName(name);
		emailError = validateEmail(email);
		passwordError = validatePassword(password);
		confirmPasswordError = validateConfirmPassword(confirmPassword);
		if (nameError || emailError || passwordError || confirmPasswordError) return;

		loading = true;
		serverError = '';
		try {
			const res = await fetch('http://localhost:3000/api/auth/sign-up/email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Origin': 'http://localhost:5173' },
				credentials: 'include',
				body: JSON.stringify({ name, email, password })
			});
			const data = await res.json();
			if (res.ok) {
				window.location.href = '/login';
			} else {
				serverError = data.message || 'Registration failed.';
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
		<AuthCard title="Create Account">
			{#if serverError}
				<p class="mb-4 rounded-lg bg-red-500/20 px-4 py-2 text-center text-sm text-red-400">{serverError}</p>
			{/if}

			<div class="space-y-4">
				<div class="space-y-1">
					<Input type="text" placeholder="Full Name" bind:value={name} icon="user" error={!!nameError} />
					{#if nameError}<p class="text-xs text-red-400 pl-1">{nameError}</p>{/if}
				</div>

				<div class="space-y-1">
					<Input type="email" placeholder="Email Address" bind:value={email} icon="email" error={!!emailError} />
					{#if emailError}<p class="text-xs text-red-400 pl-1">{emailError}</p>{/if}
				</div>

				<div class="space-y-1">
					<Input type="password" placeholder="Password" bind:value={password} icon="password" error={!!passwordError} />
					{#if passwordError}<p class="text-xs text-red-400 pl-1">{passwordError}</p>{/if}
				</div>

				<div class="space-y-1">
					<Input type="password" placeholder="Confirm Password" bind:value={confirmPassword} icon="password"
						error={!!confirmPasswordError}
						onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && register()} />
					{#if confirmPasswordError}<p class="text-xs text-red-400 pl-1">{confirmPasswordError}</p>{/if}
				</div>

				<button
					onclick={register}
					disabled={loading}
					class="w-full rounded-lg bg-yellow-400 py-3 text-base font-bold text-black hover:bg-yellow-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{loading ? 'Creating account...' : 'Register'}
				</button>

				<p class="text-center text-sm text-gray-400">
					Already have an account?
					<a href="/login" class="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">Sign In</a>
				</p>
			</div>
		</AuthCard>
	</div>
</div>
