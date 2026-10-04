# Chrisora Studio — Independent Website

This is a standalone static website. It does **not** require Higgsfield.

## What is included
- Animated/minimal/cozy storefront
- Responsive mobile layout
- Product catalog in `products.json`
- Category filtering
- Affiliate-link-ready product cards
- `/admin` folder prepared for Decap CMS

## Free hosting
Recommended: Cloudflare Pages or GitHub Pages.

### Cloudflare Pages
1. Create a GitHub repository named `chrisora-studio`.
2. Upload all files from this folder.
3. In Cloudflare: Workers & Pages → Create application → Pages → Connect to Git.
4. Select the repository and deploy.
5. You will get a free `*.pages.dev` address.
6. A custom domain can be connected later.

### Product management
The `/admin` folder is prepared for Decap CMS. After the site is connected to your GitHub repository, replace:
`YOUR_GITHUB_USERNAME/chrisora-studio`
in `admin/config.yml` with your actual repository.

Decap CMS provides a browser-based editing interface for Git-backed content. See the official Decap documentation for the authentication setup.

## Important
The sample products use demo images and `#` links. Replace them with your actual product images and affiliate URLs before publishing.
