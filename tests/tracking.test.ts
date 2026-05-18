import * as assert from 'node:assert/strict'
import { appendAffiliateTrackingParams, buildAffiliateSubId, cleanParam } from '../lib/tracking'

assert.equal(cleanParam('x promo!* 123', 20), 'xpromo123')

const subId = buildAffiliateSubId({
  source: 'x',
  campaign: 'promo-mei',
  contentId: 'carousel-01',
  productSlug: 'azarine-sunscreen-gel',
})
assert.equal(subId, 'x__promo-mei__carousel-01__azarine-sunscreen-gel')

const shopeeUrl = appendAffiliateTrackingParams('https://shopee.co.id/product/123?foo=bar', {
  source: 'x',
  campaign: 'promo-mei',
  contentId: 'carousel-01',
  productSlug: 'azarine-sunscreen-gel',
})
const parsedShopeeUrl = new URL(shopeeUrl)
assert.equal(parsedShopeeUrl.searchParams.get('foo'), 'bar')
assert.equal(parsedShopeeUrl.searchParams.get('sub_id'), subId)
assert.equal(parsedShopeeUrl.searchParams.get('utm_source'), 'x')
assert.equal(parsedShopeeUrl.searchParams.get('utm_campaign'), 'promo-mei')
assert.equal(parsedShopeeUrl.searchParams.get('utm_content'), 'carousel-01')

const fallbackUrl = appendAffiliateTrackingParams('not a url', {
  source: 'x',
  campaign: null,
  contentId: null,
  productSlug: 'slug',
})
assert.equal(fallbackUrl, 'not a url')

console.log('tracking helper tests passed')
