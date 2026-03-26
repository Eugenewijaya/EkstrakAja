# Vercel Setup Guide

## Environment Variables for Vercel Deployment

When deploying to Vercel, you need to add the following environment variable:

### In Vercel Dashboard:

1. Go to your project dashboard at https://vercel.com/dashboard
2. Click on your project "ekstrak-aja"
3. Go to **Settings** → **Environment Variables**
4. Add a new environment variable:
   - **Name**: `NEXT_PUBLIC_GEMINI_API_KEY`
   - **Value**: `AIzaSyBX1Dv-pUvIBTI85mwU7HSmXKvLgsltSFc`
   - **Environments**: Select all (Production, Preview, Development)

5. Click **Save**
6. Redeploy your project (or let automatic deployment trigger)

## Important Notes

- The `NEXT_PUBLIC_` prefix means this variable will be exposed to the browser (this is intentional for client-side AI SDK usage)
- Make sure the API key is correctly entered without any extra spaces
- After adding the environment variable, trigger a redeployment
- You can test locally by creating `.env.local` with the same variable

## After Setup

Once the environment variable is set in Vercel:
1. The deployment should automatically include the API key
2. The app will be able to call the Gemini API
3. All extraction and sheet generation features will work

## Troubleshooting

If you get "API key not set" errors:
1. Verify the environment variable is set in Vercel dashboard
2. Check that the exact variable name is `NEXT_PUBLIC_GEMINI_API_KEY`
3. Trigger a manual redeploy from Vercel dashboard
4. Clear browser cache and refresh
