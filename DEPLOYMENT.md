# TravelAgent Deployment Guide

## Vercel Deployment

This project is configured for deployment on Vercel. Follow these steps to deploy:

### Prerequisites
- GitHub account with access to `https://github.com/roskata1ndl/TravelAgent`
- Vercel account (signup at https://vercel.com)

### Step 1: GitHub Repository
The code has been pushed to: `https://github.com/roskata1ndl/TravelAgent`

### Step 2: Deploy to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Paste the repository URL: `https://github.com/roskata1ndl/TravelAgent`
5. Click "Import"

### Step 3: Configure Build Settings
Vercel will auto-detect Next.js. Configure these settings:

**Build & Development Settings:**
- **Framework Preset:** Next.js
- **Build Command:** `cd travelagent && npm run build`
- **Output Directory:** `travelagent/.next`
- **Install Command:** `npm install` (runs in project root)

**Environment Variables** (if needed):
- No environment variables are currently required for the basic setup

### Step 4: Deploy
1. Click "Deploy"
2. Vercel will build and deploy your project
3. You'll receive a live URL (e.g., `https://travelagent.vercel.app`)

### Step 5: Custom Domain (Optional)
After deployment, you can add a custom domain:
1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain and follow DNS configuration steps

## Project Structure for Vercel

```
TravelAgent/
├── travelagent/           # Next.js project root
│   ├── src/              # Application code
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies
│   ├── next.config.ts    # Next.js configuration
│   └── .next/            # Build output (deployed)
├── vercel.json           # Vercel configuration
└── brand_assets/         # Brand resources
```

## Build & Run Locally

```bash
# Install dependencies
cd travelagent
npm install

# Development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

## Troubleshooting

### Build Fails
- Check that `travelagent/package.json` has all required dependencies
- Ensure Next.js version is compatible
- Check `travelagent/next.config.ts` for configuration errors

### Environment Issues
- Verify Node.js version compatibility (18+ recommended)
- Clear `.next` directory and rebuild: `rm -rf .next && npm run build`

### Performance
- Use Vercel Analytics for performance monitoring
- Enable Vercel Edge Functions for API routes
- Optimize images using Next.js Image component

## Continuous Deployment

Every push to the `main` branch automatically triggers a new deployment on Vercel. Monitor deployments in your Vercel dashboard.

## Support

For Vercel-specific issues: https://vercel.com/support
For Next.js documentation: https://nextjs.org/docs
