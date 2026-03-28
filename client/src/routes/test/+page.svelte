<script>
  import { authClient } from "$lib/auth-client";
  
  const session = authClient.useSession();
  console.log("Session data:", $session);
</script>

{#if $session?.data}
  <div>
    <h1>Welcome, {$session.data.user.name}!</h1>
    <p>Your email: {$session.data.user.email}</p>
  </div>
{:else}
  <div>
    <h1>You are not logged in.</h1>
  </div>
{/if}