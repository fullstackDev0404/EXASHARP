# Better Auth Setup Guide

## Environment Setup

Create a `.env` file in the `server/` directory:

```
DATABASE_URL=postgresql://user:password@localhost:5432/exasharp
BETTER_AUTH_SECRET=your-super-secret-key-change-this
BETTER_AUTH_URL=http://localhost:3000
```

## Available Auth Endpoints

All endpoints are prefixed with `/api/auth/`

### Sign Up

```bash
POST /api/auth/sign-up
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Sign In

```bash
POST /api/auth/sign-in/email
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Current User Session

```bash
GET /api/me

Response (if authenticated):
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "image": null,
    "emailVerified": false,
    "createdAt": "2024-03-27T...",
    "updatedAt": "2024-03-27T..."
  }
}
```

### Sign Out

```bash
POST /api/auth/sign-out
```

### List Sessions

```bash
GET /api/auth/list-sessions
```

## Frontend Example (Svelte)

```javascript
// Sign up
const signUp = async (email, password, name) => {
  const res = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  return res.json();
};

// Sign in
const signIn = async (email, password) => {
  const res = await fetch("/api/auth/sign-in/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

// Get current user
const getCurrentUser = async () => {
  const res = await fetch("/api/me");
  return res.json();
};

// Sign out
const signOut = async () => {
  await fetch("/api/auth/sign-out", { method: "POST" });
};
```

## Next Steps

1. Set up your `.env` file with proper values
2. Run migrations (already done): `bun db:migrate`
3. Start the server: `bun run dev`
4. Test endpoints with the examples above
5. For more features, check the [Better Auth docs](https://better-auth.com)
