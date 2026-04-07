<script lang="ts">
	import AuthCard from '$lib/components/auth/auth-card.svelte';
	import { Input } from '$lib/components/ui/input';
	import { authClient } from '$lib/auth-client';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let companyName = $state('');
	let companyCode = $state('');
	let loading = $state(false);
	let serverError = $state('');
	let nameError = $state('');
	let emailError = $state('');
	let passwordError = $state('');
	let confirmPasswordError = $state('');
	let companyNameError = $state('');
	let companyCodeError = $state('');

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

	function validateCompanyName(val: string) {
		if (!val) return 'Company name is required.';
		if (val.length < 2) return 'Company name must be at least 2 characters.';
		return '';
	}

	function validateCompanyCode(val: string) {
		if (!val) return 'Company code is required.';
		if (!/^[A-Z0-9]+$/.test(val)) return 'Company code must be uppercase letters and numbers only.';
		return '';
	}

	$effect(() => { if (name) nameError = validateName(name); });
	$effect(() => { if (email) emailError = validateEmail(email); });
	$effect(() => { if (password) passwordError = validatePassword(password); });
	$effect(() => { if (confirmPassword) confirmPasswordError = validateConfirmPassword(confirmPassword); });
	$effect(() => { if (companyName) companyNameError = validateCompanyName(companyName); });
	$effect(() => { if (companyCode) companyCodeError = validateCompanyCode(companyCode); });

	const register = async () => {
		nameError = validateName(name);
		emailError = validateEmail(email);
		passwordError = validatePassword(password);
		confirmPasswordError = validateConfirmPassword(confirmPassword);
		companyNameError = validateCompanyName(companyName);
		companyCodeError = validateCompanyCode(companyCode);
		if (nameError || emailError || passwordError || confirmPasswordError || companyNameError || companyCodeError) return;

		loading = true;
		serverError = '';
		try {
			const { error: signUpError } = await authClient.signUp.email({
				email,
				password,
				name,
			});

			if (signUpError) {
				serverError = signUpError.message || 'Registration failed.';
				return;
			}

			const companyRes = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/api/company`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					name: companyName,
					code: companyCode.toUpperCase(),
				}),
			});

			if (!companyRes.ok) {
				const companyData = await companyRes.json();
				serverError = companyData.error || 'Failed to create company.';
				return;
			}

			window.location.href = '/dashboard';
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

			<form onsubmit={(e) => { e.preventDefault(); register(); }} class="space-y-4">
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
					<Input type="password" placeholder="Confirm Password" bind:value={confirmPassword} icon="password" error={!!confirmPasswordError} />
					{#if confirmPasswordError}<p class="text-xs text-red-400 pl-1">{confirmPasswordError}</p>{/if}
				</div>

				<div class="border-t border-gray-700 pt-4 mt-4">
					<p class="text-sm text-gray-400 mb-3">Create Your Company</p>
					<div class="space-y-3">
						<div class="space-y-1">
							<Input type="text" placeholder="Company Name" bind:value={companyName} icon="building" error={!!companyNameError} />
							{#if companyNameError}<p class="text-xs text-red-400 pl-1">{companyNameError}</p>{/if}
						</div>

						<div class="space-y-1">
							<Input type="text" placeholder="Company Code (e.g. ACME)" bind:value={companyCode} icon="hash" error={!!companyCodeError} />
							{#if companyCodeError}<p class="text-xs text-red-400 pl-1">{companyCodeError}</p>{/if}
						</div>
					</div>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full rounded-lg bg-yellow-400 py-3 text-base font-bold text-black hover:bg-yellow-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{loading ? 'Creating account...' : 'Register & Create Company'}
				</button>

				<p class="text-center text-sm text-gray-400">
					Already have an account?
					<a href="/login" class="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">Sign In</a>
				</p>
			</form>
		</AuthCard>
	</div>
</div>
