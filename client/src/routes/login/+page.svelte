<script lang="ts">
	let email = '';
	let password = '';

	const login = async () => {
		const res = await fetch('http://localhost:8080/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		const data = await res.json();

		if (res.ok) {
			alert('Login success');
		} else {
			alert(data.message);
		}
	};
</script>

<h1>Login</h1>

<input placeholder="Email" bind:value={email} />
<input placeholder="Password" type="password" bind:value={password} />

<button on:click={login}>Login</button>
