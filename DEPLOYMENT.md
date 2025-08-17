# Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. **Push to main branch**: Any push to the `main` branch triggers automatic deployment
2. **GitHub Actions builds**: The workflow builds the project using `npm run build`
3. **Deploys to Pages**: The built files are automatically deployed to GitHub Pages
4. **Live site**: Available at `https://yourusername.github.io/vibe-codesitor/`

### Manual Setup (First Time)

1. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Scroll down to "Pages" section
   - Source: "Deploy from a branch"
   - Branch: Select "gh-pages" (will be created automatically)
   - Folder: "/ (root)"

2. **Repository Settings**:
   - Ensure your repository is public (required for free GitHub Pages)
   - Or have GitHub Pro/Team for private repository Pages

### Workflow Details

The deployment workflow (`.github/workflows/deploy.yml`):
- Runs on Node.js 18
- Installs dependencies with `npm ci`
- Builds project with `npm run build`
- Uploads entire directory to Pages
- Automatic cleanup and deployment

### Build Configuration

The project uses webpack with different configurations:
- **Development**: `publicPath: '/dist/'`
- **Production**: `publicPath: '/vibe-codesitor/dist/'`

This ensures assets load correctly on GitHub Pages.

### Local Testing

Test your production build locally:
```bash
npm run build
npm run preview
```

This starts a local server to test the production build before deployment.

### Troubleshooting

**Common Issues:**

1. **Assets not loading**: Check webpack `publicPath` configuration
2. **Build failing**: Ensure all dependencies are in `package.json`
3. **Pages not updating**: Check GitHub Actions tab for deployment status
4. **404 errors**: Verify repository name matches webpack configuration

**Debug Steps:**
1. Check GitHub Actions workflow logs
2. Verify build completes successfully locally
3. Ensure `.nojekyll` file is present (prevents Jekyll processing)
4. Check browser console for asset loading errors
