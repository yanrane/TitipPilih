import assert from 'node:assert/strict'
import { toPublicProduct } from '../lib/publicProduct'

const product = {
  id: 'product-1',
  slug: 'azarine-hydrasoothe-spf45',
  title: 'Azarine Hydrasoothe Sunscreen Gel SPF45 PA++++',
  image: 'https://example.test/azarine.jpg',
  categorySlug: 'sunscreen',
  rating: 9.4,
  priceMin: 49000,
  priceMax: 69000,
  trending: true,
  affiliateUrl: 'https://shopee.co.id/universal-link/product?secret=affiliate',
  category: { slug: 'sunscreen', label: 'Sunscreen' },
  createdAt: new Date('2026-07-19T00:00:00.000Z'),
  updatedAt: new Date('2026-07-19T00:00:00.000Z'),
}

const publicProduct = toPublicProduct(product)

assert.equal(publicProduct.slug, product.slug)
assert.equal(publicProduct.title, product.title)
assert.deepEqual(publicProduct.category, product.category)
assert.equal('affiliateUrl' in publicProduct, false)
assert.equal('id' in publicProduct, false)
assert.equal('createdAt' in publicProduct, false)
assert.equal('updatedAt' in publicProduct, false)

console.log('public product mapper tests passed')
