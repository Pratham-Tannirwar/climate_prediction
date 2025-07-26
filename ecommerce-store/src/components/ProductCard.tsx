import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
              -{discountPercentage}%
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            <Link href={`/product/${product.id}`} className="hover:text-blue-600">
              {product.name}
            </Link>
          </h3>
        </div>

        <p className="text-xs text-gray-500 mb-2">{product.subcategory}</p>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-gray-500">({product.reviews})</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>

        {/* Available colors */}
        <div className="mt-3">
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-500">Colors:</span>
            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ 
                    backgroundColor: color.toLowerCase().includes('blue') ? '#3B82F6' :
                                   color.toLowerCase().includes('black') ? '#000000' :
                                   color.toLowerCase().includes('white') ? '#FFFFFF' :
                                   color.toLowerCase().includes('gray') ? '#6B7280' :
                                   color.toLowerCase().includes('red') ? '#EF4444' :
                                   color.toLowerCase().includes('green') ? '#10B981' :
                                   color.toLowerCase().includes('yellow') ? '#F59E0B' :
                                   color.toLowerCase().includes('pink') ? '#EC4899' :
                                   color.toLowerCase().includes('purple') ? '#8B5CF6' :
                                   color.toLowerCase().includes('brown') ? '#92400E' :
                                   color.toLowerCase().includes('navy') ? '#1E3A8A' :
                                   color.toLowerCase().includes('beige') ? '#D2B48C' :
                                   color.toLowerCase().includes('cream') ? '#F5F5DC' :
                                   color.toLowerCase().includes('tan') ? '#D2691E' :
                                   color.toLowerCase().includes('olive') ? '#808000' :
                                   color.toLowerCase().includes('burgundy') ? '#800020' :
                                   '#9CA3AF'
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}