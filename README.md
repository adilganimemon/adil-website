# Personal Website

A modern, minimal personal website showcasing technology expertise, recently read books, and travel experiences.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Modern Minimal Aesthetic**: Clean, professional design with smooth animations
- **Technology Section**: Showcase of programming languages, frameworks, and tools
- **Books Section**: Display recently read books with ratings and reviews
- **Travel Section**: Share travel experiences with photos and highlights
- **Smooth Navigation**: Sticky header with smooth scrolling and active section highlighting
- **Mobile Menu**: Hamburger menu for mobile devices

## Project Structure

```
adil_projects/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # All styling (modern, minimal design)
├── js/
│   ├── main.js             # Main JavaScript for interactivity
│   └── data.js             # Content data (books, travel, tech)
├── images/                 # Image assets
│   ├── profile.jpg         # Profile photo (optional)
│   └── travel/             # Travel photos
├── README.md               # Project documentation
└── .gitignore              # Git ignore file
```

## Setup Instructions

1. **Clone or download this repository**

2. **Add your images**:
   - Add book cover images to the `images/` directory
   - Add travel photos to the `images/travel/` directory
   - Update image paths in `js/data.js` to match your file names

3. **Customize content**:
   - Edit `js/data.js` to update:
     - Technology stack (languages, frameworks, tools, practices)
     - Books (title, author, cover image path, rating, review, date)
     - Travel experiences (location, date, image path, description, highlights)
   - Update `index.html` to customize:
     - Your name and title in the hero section
     - About section text
     - Contact information (email, GitHub, LinkedIn links)

4. **Test locally**:
   - Open `index.html` in a web browser
   - Or use a local server (e.g., `python -m http.server` or `npx serve`)

## Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. **Create a new repository on GitHub**:
   - Go to [github.com](https://github.com) and sign in
   - Click the "+" icon in the top right, then "New repository"
   - Name it (e.g., `adil-website` or `personal-website`)
   - Choose **Public** (required for free GitHub Pages)
   - **Do NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

### Step 2: Push Your Code to GitHub

Run these commands in your terminal (from the `adil_website` directory):

```bash
# Add the GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

**Note**: If you haven't configured git credentials, you may need to:
- Use a Personal Access Token instead of password (GitHub no longer accepts passwords)
- Or set up SSH keys for authentication

### Step 3: Enable GitHub Pages

1. **In your GitHub repository**:
   - Go to **Settings** tab
   - Scroll down to **Pages** section (in the left sidebar)
   - Under "Source", select **main** branch
   - Select **/ (root)** folder
   - Click **Save**

2. **Your site will be live at**:
   - `https://YOUR_USERNAME.github.io/REPO_NAME/`
   - It may take a few minutes to deploy

### Step 4: Connect Your Custom Domain (GoDaddy)

1. **In GitHub Pages Settings**:
   - Scroll to "Custom domain" section
   - Enter your domain: `onemomentatatime.com` (or `www.onemomentatatime.com`)
   - Check "Enforce HTTPS" (after DNS propagates)

2. **Configure DNS in GoDaddy**:
   - Go to your GoDaddy account → My Products → Domains
   - Click **DNS** next to your domain
   - Add/Edit these records:
     - **Type A**: 
       - Name: `@` (or leave blank)
       - Value: `185.199.108.153`
       - TTL: 600
     - **Type A**:
       - Name: `@`
       - Value: `185.199.109.153`
       - TTL: 600
     - **Type A**:
       - Name: `@`
       - Value: `185.199.110.153`
       - TTL: 600
     - **Type A**:
       - Name: `@`
       - Value: `185.199.111.153`
       - TTL: 600
     - **Type CNAME** (for www subdomain):
       - Name: `www`
       - Value: `YOUR_USERNAME.github.io`
       - TTL: 600

3. **Wait for DNS propagation** (can take up to 48 hours, usually much faster)

4. **Verify**: Visit your domain - it should show your website!

### Updating Your Website

After making changes to your website:

```bash
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically rebuild and deploy your site (usually within 1-2 minutes).

## Customization Guide

### Changing Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #1a1a1a;      /* Main text color */
    --accent-color: #0066cc;       /* Accent color for links/buttons */
    --background-color: #ffffff;    /* Background color */
    --background-alt: #fafafa;      /* Alternate background */
}
```

### Adding More Content

1. **Add a book**: Edit `js/data.js` and add a new object to the `booksData` array
2. **Add a travel experience**: Edit `js/data.js` and add a new object to the `travelData` array
3. **Update technology**: Edit `js/data.js` and modify the `technologyData` object

### Image Requirements

- **Book covers**: Recommended size 300x400px or similar aspect ratio
- **Travel photos**: Recommended size 800x600px or similar aspect ratio
- **Format**: JPG or PNG
- **Optimization**: Compress images for faster loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- HTML5
- CSS3 (with CSS Variables, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- No external dependencies

## License

This project is open source and available for personal use.

## Notes

- Images referenced in `data.js` will not display if files don't exist (handled gracefully)
- Update contact links in `index.html` with your actual social media profiles
- Consider adding a favicon for your website
- For better SEO, update meta tags in `index.html`
