# Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Manual Setup (First Time)

1. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Scroll down to "Pages" section  
   - Source: "GitHub Actions" (not "Deploy from a branch")
   - No need to select a branch - the Action will handle deployment

2. **Repository Settings**:
   - Ensure your repository is public (required for free GitHub Pages)
   - Or have GitHub Pro/Team for private repository Pages

### Automatic Deployment Process

1. **Push to main branch**: Any push to the `main` branch triggers automatic deployment
2. **GitHub Actions builds**: The workflow builds the project using `npm run build:gh-pages`
3. **Deploys to Pages**: The built files are automatically deployed to GitHub Pages
4. **Live site**: Available at `https://yourusername.github.io/vibe-codesitor/`

### Workflow Details

The deployment workflow (`.github/workflows/deploy.yml`):
- Uses the modern GitHub Pages deployment action
- Runs on Node.js 18
- Installs dependencies with `npm ci`
- Builds project with `npm run build:gh-pages`
- Uploads build artifacts to Pages
- Automatic deployment to live site

**No `gh-pages` branch needed** - the new workflow deploys directly from Actions.

### Build Configuration

The project uses webpack with different configurations:
- **Development**: `publicPath: '/dist/'`
- **Production**: `publicPath: '/vibe-codesitor/dist/'`

This ensures assets load correctly on GitHub Pages.

### Local Testing

Test your production build locally:
```bash
npm run build:gh-pages
npm run preview
```

This starts a local server to test the production build before deployment.

### Deployment Steps

1. **Commit and push your changes**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Check Actions tab**: Go to your repository's Actions tab to see the deployment progress

3. **Enable Pages**: Go to Settings → Pages → Source: "GitHub Actions"

4. **Wait for deployment**: The first deployment may take a few minutes

5. **Access your site**: Once complete, visit `https://yourusername.github.io/vibe-codesitor/`

### Troubleshooting

**Common Issues:**

1. **"Source should be GitHub Actions"**: In repository Settings → Pages, make sure Source is set to "GitHub Actions" (not "Deploy from a branch")

2. **Build failing**: Check the Actions tab for detailed error logs
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation passes locally

3. **Assets not loading**: Check webpack `publicPath` configuration in production

4. **Permissions error**: The workflow includes proper permissions for Pages deployment

**Debug Steps:**
1. Check GitHub Actions workflow logs in the Actions tab
2. Verify build completes successfully locally with `npm run build:gh-pages`
3. Ensure `.nojekyll` file is present (prevents Jekyll processing)
4. Check browser console for asset loading errors on the live site

### Repository Settings Checklist

- ✅ Repository is public (or you have GitHub Pro/Team)
- ✅ Actions are enabled in repository settings
- ✅ Pages source is set to "GitHub Actions"
- ✅ Workflow file exists at `.github/workflows/deploy.yml`
- ✅ Build script `build:gh-pages` exists in `package.json`