# StyleHub - E-commerce Fashion Store

A modern, responsive e-commerce website built with Next.js 15, featuring men's and women's clothing collections with a beautiful, user-friendly interface.

## 🌟 Features

### 🛍️ Product Catalog
- **Men's & Women's Collections**: Curated selection of clothing and accessories
- **Product Categories**: Organized by type (Jackets, Shirts, Pants, Shoes, Dresses, etc.)
- **Product Details**: High-quality images, detailed descriptions, ratings, and reviews
- **Size & Color Options**: Interactive selection with visual feedback
- **Discount System**: Sale items with percentage discounts displayed

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Beautiful Hero Section**: Eye-catching gradient backgrounds with call-to-action buttons
- **Interactive Product Cards**: Hover effects, rating stars, and color previews
- **Smooth Animations**: Transitions and hover effects throughout the site
- **Custom Styling**: Enhanced with Tailwind CSS and custom utilities

### 🔍 Shopping Features
- **Product Filtering**: Filter by category and subcategory
- **Advanced Sorting**: Sort by name, price (low to high/high to low), and ratings
- **Product Search**: Search functionality in the header
- **Sale Page**: Dedicated page for discounted items
- **Product Detail Pages**: Comprehensive product information with size/color selection

### 📱 Navigation & Layout
- **Sticky Header**: Always accessible navigation with cart icon
- **Mobile-Friendly Menu**: Collapsible navigation for mobile devices
- **Breadcrumb Navigation**: Easy navigation on product pages
- **Footer**: Comprehensive footer with links and social media icons

## 🛒 Product Categories

### Men's Collection
- Classic Denim Jacket - $89.99 (was $120.00)
- Cotton Polo Shirt - $45.99
- Slim Fit Chinos - $65.99 (was $85.00)
- Casual Sneakers - $129.99
- Wool Sweater - $95.99 (was $130.00)
- Leather Dress Shoes - $189.99

### Women's Collection
- Floral Summer Dress - $79.99 (was $110.00)
- Silk Blouse - $89.99
- High-Waisted Jeans - $75.99 (was $95.00)
- Cashmere Cardigan - $159.99 (was $200.00)
- Ankle Boots - $139.99
- Maxi Skirt - $55.99 (was $75.00)
- Blazer Jacket - $119.99
- Athletic Leggings - $39.99 (was $55.00)

## 🚀 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Images**: Next.js Image Optimization
- **Icons**: SVG icons for UI elements
- **Fonts**: Geist Sans and Geist Mono

## 📁 Project Structure

```
ecommerce-store/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with header/footer
│   │   ├── page.tsx            # Homepage with hero and featured products
│   │   ├── men/page.tsx        # Men's category page
│   │   ├── women/page.tsx      # Women's category page
│   │   ├── sale/page.tsx       # Sale/discount page
│   │   ├── product/[id]/page.tsx # Dynamic product detail page
│   │   └── globals.css         # Global styles and utilities
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Hero.tsx            # Homepage hero section
│   │   └── ProductCard.tsx     # Product display component
│   ├── data/
│   │   └── products.ts         # Product data and utility functions
│   └── types/
│       └── product.ts          # TypeScript type definitions
└── public/                     # Static assets
```

## 🎯 Key Pages

### Homepage (`/`)
- Hero section with brand messaging
- Featured products grid
- Separate sections for men's and women's collections
- Newsletter signup

### Category Pages (`/men`, `/women`)
- Full product listings with filtering and sorting
- Category-specific headers
- Responsive product grid

### Sale Page (`/sale`)
- Discounted items only
- Special sale header design
- Sort by discount percentage

### Product Detail (`/product/[id]`)
- Large product images
- Detailed product information
- Size and color selection
- Quantity selector
- Add to cart functionality
- Product features list

## 🛠️ Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: Full-featured experience with multi-column layouts
- **Tablet**: Adapted layouts with touch-friendly interfaces
- **Mobile**: Single-column layouts with collapsible navigation

## 🎨 Design Features

- **Color Scheme**: Modern gradient backgrounds (purple to blue, red to pink)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Interactive Elements**: Hover effects, transitions, and visual feedback
- **Accessibility**: Proper contrast ratios and semantic HTML
- **Performance**: Optimized images and efficient component structure

## 🔧 Customization

### Adding New Products
Edit `src/data/products.ts` to add new products with the following structure:
```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  price: 99.99,
  originalPrice: 129.99, // Optional for sale items
  image: 'https://image-url.com/image.jpg',
  category: 'men' | 'women',
  subcategory: 'Category Name',
  description: 'Product description',
  sizes: ['S', 'M', 'L'],
  colors: ['Color1', 'Color2'],
  inStock: true,
  rating: 4.5,
  reviews: 100
}
```

### Styling Customization
- Modify `src/app/globals.css` for global styles
- Use Tailwind CSS classes for component-specific styling
- Custom color mappings in `ProductCard.tsx` for color swatches

## 📈 Future Enhancements

- Shopping cart functionality
- User authentication
- Payment integration
- Wishlist feature
- Product reviews system
- Search functionality
- Inventory management
- Order tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**StyleHub** - Your premier destination for fashion-forward clothing. Discover your perfect style today! 🛍️✨
