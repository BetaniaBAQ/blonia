import { WorkOS } from '@workos-inc/node'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '.env.local') })

console.log('Testing WorkOS API Key...')
console.log('API Key (first 20 chars):', process.env.WORKOS_API_KEY?.substring(0, 20))
console.log('Client ID:', process.env.WORKOS_CLIENT_ID)
console.log('')

if (!process.env.WORKOS_API_KEY) {
  console.error('❌ No API key found in .env.local!')
  process.exit(1)
}

const workos = new WorkOS(process.env.WORKOS_API_KEY)

try {
  // Try to create a magic auth to test if API key works
  const result = await workos.userManagement.createMagicAuth({
    email: 'test@example.com',
  })
  console.log('✅ SUCCESS! API Key is valid')
  console.log('Magic Auth created:', result.id)
  console.log('Code:', result.code)
} catch (error) {
  console.error('❌ ERROR! API Key test failed')
  console.error('Status:', error.status)
  console.error('Message:', error.message)
  console.error('\nPlease check:')
  console.error('1. Your API key is correct in .env.local')
  console.error('2. The API key is for the correct environment (test vs production)')
  console.error('3. The API key has not expired')
  console.error('4. You have User Management enabled in your WorkOS dashboard')
}
