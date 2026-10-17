import type { NavItem } from '@/types/product'

export const mainNav: NavItem[] = [
  {
    label: 'Women',
    href: '/category/women',
    children: [
      { label: "All Women's Clothing", href: '/category/women' },
      { label: 'Dresses', href: '/category/women/dresses' },
      { label: 'Skirts', href: '/category/women/skirts' },
      { label: 'T-Shirts', href: '/category/t-shirts?gender=women' },
      { label: 'Jeans', href: '/category/jeans?gender=women' },
      { label: 'Jackets', href: '/category/jackets?gender=women' },
    ],
  },
  {
    label: 'Men',
    href: '/category/men',
    children: [
      { label: "All Men's Clothing", href: '/category/men' },
      { label: 'Shirts', href: '/category/shirts?gender=men' },
      { label: 'T-Shirts', href: '/category/t-shirts?gender=men' },
      { label: 'Jeans', href: '/category/jeans?gender=men' },
      { label: 'Trousers', href: '/category/trousers?gender=men' },
      { label: 'Jackets', href: '/category/jackets?gender=men' },
    ],
  },
  {
    label: 'Clothing',
    href: '/shop',
    children: [
      { label: 'All Clothing', href: '/shop' },
      { label: 'T-Shirts', href: '/category/t-shirts' },
      { label: 'Shirts', href: '/category/shirts' },
      { label: 'Jeans', href: '/category/jeans' },
      { label: 'Hoodies', href: '/category/hoodies' },
      { label: 'Sweaters', href: '/category/sweaters' },
      { label: 'Activewear', href: '/category/activewear' },
    ],
  },
  {
    label: 'Shoes',
    href: '/category/shoes',
  },
  {
    label: 'Accessories',
    href: '/category/accessories',
  },
  {
    label: 'New Arrivals',
    href: '/category/new-arrivals',
  },
  {
    label: 'Deals',
    href: '/deals',
  },
]
