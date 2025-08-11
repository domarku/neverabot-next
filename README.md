# Never a Bot - Static Website

A statically-generated website that allows users to sign a document declaring they don't want to be turned into a memorial chatbot after death.

## 🚀 Features

- **Static Generation**: Built with Next.js and exported as static HTML
- **Print Functionality**: Submit button opens a print dialog with a clean, PDF-style document
- **Pure CSS**: No Tailwind or other CSS frameworks, just custom CSS
- **Two Pages**: Sign page and About page with related articles
- **No Database**: Completely static, no backend required
- **Responsive Design**: Mobile-friendly layout
- **Mapbox Integration**: Location autocomplete with city/country selection

## 📄 Pages

1. **Sign Page** (`/`): Main form where users can fill out their declaration
2. **About Page** (`/about`): Information about the project and related articles

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🚀 Deployment

This project is configured for static export and can be deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect it's a Next.js project and build it
4. The static files will be served from Vercel's CDN

### Manual Deployment

```bash
# Build the static site
npm run build

# The static files will be in the `out` directory
# You can deploy these files to any static hosting service
```

## 🖨️ Print Functionality

When users click "Preview and print" on the sign page:

1. Form validation ensures all required fields are filled
2. A new window opens with a clean HTML document
3. The document is styled for printing (no navigation, clean layout)
4. The browser's print dialog automatically opens
5. Users can print or save as PDF

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Sign page
│   └── about/
│       └── page.tsx         # About page
├── components/
│   └── Navigation.tsx       # Navigation component
public/
├── assets/                  # Images, fonts, etc.
└── favicon files
```

## 🎨 Design

- **Custom Font**: Publico Text Mono Web Roman
- **Background**: Subtle dot pattern
- **Layout**: Paper-like design with shadow effects
- **Colors**: Clean, minimal color scheme
- **Typography**: Monospace font for that typewriter feel

## 🔧 Configuration

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Static Export** for deployment
- **Unoptimized Images** for static generation

## 🗺️ Mapbox Setup

This project uses Mapbox for location autocomplete. To set it up:

1. Get a free Mapbox access token from [https://account.mapbox.com/access-tokens/](https://account.mapbox.com/access-tokens/)
2. Create a `.env.local` file in the root directory
3. Add your token: `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here`

The free tier includes 100,000 geocoding requests per month.

## 📜 Original Project

This is a refactored version of the original neverabot.org website, converted from an EJS-based dynamic site to a modern static Next.js application while preserving all functionality and design.

## 📄 License

This project maintains the same license and purpose as the original neverabot.org website.

---

**Never a bot** - Because your digital afterlife should be your choice.
