<script lang="ts">
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
			const { error: signUpError } = await authClient.signUp.email({ email, password, name });
			if (signUpError) { serverError = signUpError.message || 'Registration failed.'; return; }

			const companyRes = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/api/company`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ name: companyName, code: companyCode.toUpperCase() }),
			});

			if (!companyRes.ok) {
				const d = await companyRes.json();
				serverError = d.error || 'Failed to create company.';
				return;
			}
			window.location.href = '/dashboard';
		} catch {
			serverError = 'Something went wrong. Please try again.';
		} finally {
			loading = false;
		}
	};

	const inputClass = (err: boolean) =>
		`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors ${
			err
				? 'border-red-400 bg-red-50 focus:border-red-400'
				: 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
		}`;
</script>

<svelte:head>
	<title>Create Account — EXASHARP</title>
</svelte:head>

<div class="min-h-screen flex relative overflow-hidden">
	<!-- Full page background -->
	<img src="/auth-bg.png" alt="" class="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
	<div class="absolute inset-0" style="background: rgba(26,39,68,0.75);"></div>

	<!-- Left panel: branding -->
	<div class="hidden lg:flex lg:w-2/5 relative z-10 flex-col justify-between p-10">
		<div class="flex items-center gap-3">
			<img src="/logo.png" alt="EXASHARP" class="h-10 w-auto" />
		</div>
		<div>
			<h2 class="text-white text-3xl font-bold leading-snug mb-3">
				Start your journey<br />with EXASHARP.
			</h2>
			<p class="text-blue-200 text-sm leading-relaxed max-w-sm">
				Set up your company and team in minutes. Full HRMS capabilities from day one.
			</p>
		</div>
	</div>

	<!-- Right panel: form -->
	<div class="flex-1 relative z-10 flex items-center justify-center px-6 py-8">
		<div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl px-8 py-8">

			<!-- Mobile logo -->
			<div class="flex items-center gap-2 mb-6 lg:hidden">
				<img src="/logo.png" alt="EXASHARP" class="h-8 w-auto" />
				<span class="font-bold text-gray-800">EXASHARP</span>
			</div>

			<h1 class="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
			<p class="text-gray-500 text-sm mb-6">Fill in your details to get started</p>

			{#if serverError}
				<div class="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
					{serverError}
				</div>
			{/if}

			<form onsubmit={(e) => { e.preventDefault(); register(); }} class="space-y-4">

				<!-- Personal info -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label for="reg-name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
						<input id="reg-name" type="text" placeholder="Enter your name" bind:value={name} class={inputClass(!!nameError)} />
						{#if nameError}<p class="mt-1 text-xs text-red-500">{nameError}</p>{/if}
					</div>
					<div>
						<label for="reg-email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
						<input id="reg-email" type="email" placeholder="Enter your email" bind:value={email} class={inputClass(!!emailError)} />
						{#if emailError}<p class="mt-1 text-xs text-red-500">{emailError}</p>{/if}
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label for="reg-password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
						<input id="reg-password" type="password" placeholder="Create password" bind:value={password} class={inputClass(!!passwordError)} />
						{#if passwordError}<p class="mt-1 text-xs text-red-500">{passwordError}</p>{/if}
					</div>
					<div>
						<label for="reg-confirm" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
						<input id="reg-confirm" type="password" placeholder="Confirm password" bind:value={confirmPassword} class={inputClass(!!confirmPasswordError)} />
						{#if confirmPasswordError}<p class="mt-1 text-xs text-red-500">{confirmPasswordError}</p>{/if}
					</div>
				</div>

				<!-- Company info -->
				<div class="border-t border-gray-100 pt-4">
					<p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Company Details</p>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="reg-company" class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
							<input id="reg-company" type="text" placeholder="Your company name" bind:value={companyName} class={inputClass(!!companyNameError)} />
							{#if companyNameError}<p class="mt-1 text-xs text-red-500">{companyNameError}</p>{/if}
						</div>
						<div>
							<label for="reg-code" class="block text-sm font-medium text-gray-700 mb-1">Company Code</label>
							<input id="reg-code" type="text" placeholder="e.g. ACME" bind:value={companyCode} class={inputClass(!!companyCodeError)} />
							{#if companyCodeError}<p class="mt-1 text-xs text-red-500">{companyCodeError}</p>{/if}
						</div>
					</div>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full rounded-lg py-3 text-sm font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 mt-2"
					style="background: linear-gradient(135deg, #3b6fd4, #2855b0);"
				>
					{loading ? 'Creating account...' : 'Create Account'}
				</button>

				<p class="text-center text-sm text-gray-500">
					Already have an account?
					<a href="/login" class="font-bold text-blue-600 hover:text-blue-700 transition-colors">Sign In</a>
				</p>
			</form>

			<p class="mt-6 text-center text-xs text-gray-400">© 2026 EXASHARP. All rights reserved.</p>
		</div>
	</div>
</div>
