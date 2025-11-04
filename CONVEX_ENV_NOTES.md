# Convex Environment Variables - Important Notes

## Why CONVEX_URL is not in .env.local

The Convex CLI (`convex dev`) automatically sets `CONVEX_URL` in the environment at runtime. If you manually add it to `.env.local`, you'll get this warning:

```
⚠️  Found multiple CONVEX_URL environment variables in .env.local
    so cannot update automatically
```

## Current Setup

### In `.env.local` (what you manage):
```bash
CONVEX_DEPLOYMENT=dev:chatty-setter-482
VITE_CONVEX_URL=https://chatty-setter-482.convex.cloud
```

### At Runtime (set by Convex CLI):
```bash
CONVEX_URL=https://chatty-setter-482.convex.cloud  # Set by `convex dev`
```

## How It Works

1. **Client-side**: Uses `VITE_CONVEX_URL` from `.env.local`
   - Accessed via `import.meta.env.VITE_CONVEX_URL`
   - Used in `src/lib/convex.ts`

2. **Server-side**: Uses `CONVEX_URL` from Convex CLI or falls back to `VITE_CONVEX_URL`
   - Set automatically when running `pnpm convex:dev`
   - Fallback ensures it works even if Convex CLI isn't running
   - Used in `src/lib/auth-server.ts`

## Best Practices

✅ **DO:**
- Keep `CONVEX_DEPLOYMENT` in `.env.local`
- Keep `VITE_CONVEX_URL` in `.env.local`
- Run `convex dev` in a separate terminal
- Let Convex CLI manage `CONVEX_URL` at runtime

❌ **DON'T:**
- Manually add `CONVEX_URL` to `.env.local`
- Edit `CONVEX_DEPLOYMENT` manually (let `convex dev` set it)

## Troubleshooting

### If you see the warning:
```bash
# Remove CONVEX_URL from .env.local
grep -v "^CONVEX_URL=" .env.local > .env.local.tmp
mv .env.local.tmp .env.local
```

### If server can't connect to Convex:
1. Make sure `convex dev` is running
2. Check that `VITE_CONVEX_URL` is set correctly
3. Server will fallback to `VITE_CONVEX_URL` if `CONVEX_URL` isn't set
