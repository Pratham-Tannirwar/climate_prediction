import { Product } from '@/types/product';

export const products: Product[] = [
  // Men's Clothing
  {
    id: '1',
    name: 'Classic Denim Jacket',
    price: 89.99,
    originalPrice: 120.00,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'men',
    subcategory: 'Jackets',
    description: 'A timeless denim jacket perfect for casual outings and layering.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Black', 'Light Blue'],
    inStock: true,
    rating: 4.5,
    reviews: 128
  },
  {
    id: '2',
    name: 'Cotton Polo Shirt',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'men',
    subcategory: 'Shirts',
    description: 'Premium cotton polo shirt with modern fit and breathable fabric.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'White', 'Gray', 'Green'],
    inStock: true,
    rating: 4.3,
    reviews: 89
  },
  {
    id: '3',
    name: 'Slim Fit Chinos',
    price: 65.99,
    originalPrice: 85.00,
    image: 'https://images.unsplash.com/photo-1506629905607-0770a3b7b9c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'men',
    subcategory: 'Pants',
    description: 'Comfortable slim-fit chinos perfect for both casual and semi-formal occasions.',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Khaki', 'Navy', 'Black', 'Olive'],
    inStock: true,
    rating: 4.6,
    reviews: 156
  },
  {
    id: '4',
    name: 'Casual Sneakers',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'men',
    subcategory: 'Shoes',
    description: 'Comfortable casual sneakers with premium materials and modern design.',
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Gray'],
    inStock: true,
    rating: 4.4,
    reviews: 203
  },
  {
    id: '5',
    name: 'Wool Sweater',
    price: 95.99,
    originalPrice: 130.00,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'men',
    subcategory: 'Sweaters',
    description: 'Premium wool sweater with classic crew neck design.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Navy', 'Burgundy', 'Cream'],
    inStock: true,
    rating: 4.7,
    reviews: 94
  },
  {
    id: '6',
    name: 'Leather Dress Shoes',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'men',
    subcategory: 'Shoes',
    description: 'Handcrafted leather dress shoes perfect for formal occasions.',
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Black', 'Brown'],
    inStock: true,
    rating: 4.8,
    reviews: 67
  },

  // Women's Clothing
  {
    id: '7',
    name: 'Floral Summer Dress',
    price: 79.99,
    originalPrice: 110.00,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'women',
    subcategory: 'Dresses',
    description: 'Beautiful floral summer dress with flowing silhouette and comfortable fit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral Pink', 'Floral Blue', 'Floral Yellow'],
    inStock: true,
    rating: 4.6,
    reviews: 142
  },
  {
    id: '8',
    name: 'Silk Blouse',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'women',
    subcategory: 'Tops',
    description: 'Elegant silk blouse with delicate details and professional styling.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Cream', 'Blush', 'Navy'],
    inStock: true,
    rating: 4.5,
    reviews: 98
  },
  {
    id: '9',
    name: 'High-Waisted Jeans',
    price: 75.99,
    originalPrice: 95.00,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'women',
    subcategory: 'Jeans',
    description: 'Trendy high-waisted jeans with perfect fit and premium denim fabric.',
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Dark Blue', 'Light Blue', 'Black'],
    inStock: true,
    rating: 4.4,
    reviews: 187
  },
  {
    id: '10',
    name: 'Cashmere Cardigan',
    price: 159.99,
    originalPrice: 200.00,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'women',
    subcategory: 'Cardigans',
    description: 'Luxurious cashmere cardigan with soft texture and elegant design.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Gray', 'Pink', 'Black'],
    inStock: true,
    rating: 4.8,
    reviews: 76
  },
  {
    id: '11',
    name: 'Ankle Boots',
    price: 139.99,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'women',
    subcategory: 'Shoes',
    description: 'Stylish ankle boots with comfortable heel and versatile design.',
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true,
    rating: 4.3,
    reviews: 124
  },
  {
    id: '12',
    name: 'Maxi Skirt',
    price: 55.99,
    originalPrice: 75.00,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'women',
    subcategory: 'Skirts',
    description: 'Flowing maxi skirt with elegant drape and comfortable waistband.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy', 'Olive'],
    inStock: true,
    rating: 4.2,
    reviews: 91
  },
  {
    id: '13',
    name: 'Blazer Jacket',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'women',
    subcategory: 'Blazers',
    description: 'Professional blazer jacket with tailored fit and modern styling.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Gray', 'Cream'],
    inStock: true,
    rating: 4.7,
    reviews: 108
  },
  {
    id: '14',
    name: 'Athletic Leggings',
    price: 39.99,
    originalPrice: 55.00,
    image: 'https://images.unsplash.com/photo-1506629905607-0770a3b7b9c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'women',
    subcategory: 'Activewear',
    description: 'High-performance athletic leggings with moisture-wicking fabric.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy', 'Purple'],
    inStock: true,
    rating: 4.5,
    reviews: 234
  }
];

export const getProductsByCategory = (category: 'men' | 'women') => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};