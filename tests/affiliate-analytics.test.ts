import assert from 'node:assert/strict'
import { witaStartOfDay } from '../lib/affiliateAnalytics'

assert.equal(
  witaStartOfDay(new Date('2026-07-18T23:34:23.123Z')).toISOString(),
  '2026-07-18T16:00:00.000Z',
)

assert.equal(
  witaStartOfDay(new Date('2026-07-19T00:48:15.000Z')).toISOString(),
  '2026-07-18T16:00:00.000Z',
)

assert.equal(
  witaStartOfDay(new Date('2026-07-19T16:00:00.000Z')).toISOString(),
  '2026-07-19T16:00:00.000Z',
)

console.log('affiliate analytics timezone tests passed')
