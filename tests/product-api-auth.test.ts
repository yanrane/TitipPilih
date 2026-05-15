import assert from 'node:assert/strict'
import { isBearerTokenAuthorized } from '../lib/productApiAuth'

function withEnv(env: Record<string, string | undefined>, run: () => void) {
  const previous: Record<string, string | undefined> = {}
  for (const key of Object.keys(env)) {
    previous[key] = process.env[key]
    if (env[key] === undefined) delete process.env[key]
    else process.env[key] = env[key]
  }
  try {
    run()
  } finally {
    for (const key of Object.keys(env)) {
      if (previous[key] === undefined) delete process.env[key]
      else process.env[key] = previous[key]
    }
  }
}

withEnv(
  {
    TITIPILIH_API_TOKEN: undefined,
    TITIPPILIH_ADMIN_TOKEN: 'admin-token',
  },
  () => {
    assert.equal(isBearerTokenAuthorized('Bearer admin-token'), true)
    assert.equal(isBearerTokenAuthorized('Bearer wrong-token'), false)
    assert.equal(isBearerTokenAuthorized('Bearer admin-token', 'admin-token'), true)
    assert.equal(isBearerTokenAuthorized(null, 'admin-token'), true)
  },
)

withEnv(
  {
    TITIPILIH_API_TOKEN: 'product-token',
    TITIPPILIH_ADMIN_TOKEN: 'admin-token',
  },
  () => {
    assert.equal(isBearerTokenAuthorized('Bearer product-token'), true)
    assert.equal(isBearerTokenAuthorized('Bearer admin-token'), true)
    assert.equal(isBearerTokenAuthorized('admin-token'), false)
  },
)

console.log('product API auth tests passed')
