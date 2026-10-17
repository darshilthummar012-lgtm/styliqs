import type { Category } from '@/types/product'

export const categories: Category[] = [
  {
    slug: 'women',
    name: "Women's Clothing",
    description: 'Dresses, tops, denim, and essentials for every occasion.',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    gender: 'women',
  },
  {
    slug: 'men',
    name: "Men's Clothing",
    description: 'Shirts, denim, jackets, and everyday staples for men.',
    image:
      'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80',
    gender: 'men',
  },
  {
    slug: 't-shirts',
    name: 'T-Shirts',
    description: 'Soft tees and everyday essentials in elevated fabrics.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    filterKey: 't-shirts',
  },
  {
    slug: 'shirts',
    name: 'Shirts',
    description: 'Crisp button-downs and relaxed shirts for work and weekend.',
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    filterKey: 'shirts',
  },
  {
    slug: 'jeans',
    name: 'Jeans',
    description: 'Classic and contemporary denim fits for every wardrobe.',
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
    filterKey: 'jeans',
  },
  {
    slug: 'trousers',
    name: 'Trousers',
    description: 'Tailored and relaxed trousers for polished everyday wear.',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    filterKey: 'trousers',
  },
  {
    slug: 'dresses',
    name: 'Dresses',
    description: 'Everyday dresses, occasionwear, and timeless silhouettes.',
    image:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    gender: 'women',
    filterKey: 'dresses',
    parent: 'women',
  },
  {
    slug: 'skirts',
    name: 'Skirts',
    description: 'Flowy, structured, and versatile skirts for any season.',
    image:
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80',
    gender: 'women',
    filterKey: 'skirts',
    parent: 'women',
  },
  {
    slug: 'jackets',
    name: 'Jackets',
    description: 'Layering pieces from light utility to structured outerwear.',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    filterKey: 'jackets',
  },
  {
    slug: 'hoodies',
    name: 'Hoodies',
    description: 'Comfortable hoodies and sweatshirts for everyday ease.',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
    filterKey: 'hoodies',
  },
  {
    slug: 'sweaters',
    name: 'Sweaters',
    description: 'Knitwear and sweaters for cooler days and refined layers.',
    image:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    filterKey: 'sweaters',
  },
  {
    slug: 'activewear',
    name: 'Activewear',
    description: 'Performance pieces designed for movement and recovery.',
    image:
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80',
    filterKey: 'activewear',
  },
  {
    slug: 'shoes',
    name: 'Shoes',
    description: 'Sneakers, loafers, and footwear to complete every look.',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    filterKey: 'shoes',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    description: 'Belts, bags, and finishing pieces for a polished outfit.',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    filterKey: 'accessories',
  },
  {
    slug: 'new-arrivals',
    name: 'New Arrivals',
    description: 'Recently added pieces from our curated clothing catalog.',
    image:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getSubcategories(parentSlug: string): Category[] {
  return categories.filter((c) => c.parent === parentSlug)
}
