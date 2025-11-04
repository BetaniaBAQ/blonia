import { createServerFn } from '@tanstack/react-start'

export const sendOTPCode = createServerFn({ method: 'POST' }).handler(
  async (ctx: { data: { email: string } }) => {
    // Dynamic imports to keep server-only code out of client bundle
    const { env } = await import('../env')
    const { workos } = await import('./workos')

    console.log('🚀 ==============================================')
    console.log('🚀 SERVER FUNCTION CALLED: sendOTPCode')
    console.log('🚀 ==============================================')
    console.log('📋 Data:', ctx.data)

    const { email } = ctx.data

    console.log('🌍 Environment:', {
      NODE_ENV: env.NODE_ENV,
      hasWorkosApiKey: !!env.WORKOS_API_KEY,
      hasWorkosClientId: !!env.WORKOS_CLIENT_ID,
      hasConvexUrl: !!env.CONVEX_URL,
      workosApiKeyStart: env.WORKOS_API_KEY?.substring(0, 15),
      clientId: env.WORKOS_CLIENT_ID,
    })

    if (!email) {
      console.error('❌ Missing email')
      throw new Error('Missing email')
    }

    try {
      console.log('📨 Sending magic auth code via WorkOS for:', email)

      // Send the code via email (this creates the magic auth AND sends the email)
      const magicAuth = await workos.userManagement.sendMagicAuthCode({
        email,
      })

      console.log('✅ Magic auth email sent!')
      console.log('   - Response:', magicAuth)
      console.log('🎉 Complete! Check email for:', email)

      const result = {
        success: true,
      }

      console.log('📤 Returning result:', result)
      return result
    } catch (error: any) {
      console.error('❌ ========== ERROR ==========')
      console.error('Message:', error.message)
      console.error('Stack:', error.stack)
      console.error('Details:', error)
      console.error('❌ =============================')
      throw new Error(error.message || 'Failed to send code. Please check your credentials.')
    }
  }
)

export const verifyOTPCode = createServerFn({ method: 'POST' }).handler(
  async (ctx: {
    data: {
      code: string
      email: string
    }
  }) => {
    // Dynamic imports to ensure server-only execution
    const { env } = await import('../env')
    const { workos } = await import('./workos')
    const { ConvexHttpClient } = await import('convex/browser')
    const { api } = await import('../../convex/_generated/api')

    const { code, email } = ctx.data

    if (!code || !email) {
      throw new Error('Missing code or email')
    }

    try {
      console.log('🔍 Verifying OTP code...')

      // Use CONVEX_URL if available (set by convex dev), otherwise fallback to VITE_CONVEX_URL
      const convexUrl = env.CONVEX_URL || env.VITE_CONVEX_URL
      const convexClient = new ConvexHttpClient(convexUrl)

      // Verify OTP with WorkOS using magic auth
      const authResponse = await workos.userManagement.authenticateWithMagicAuth({
        clientId: env.WORKOS_CLIENT_ID,
        code,
        email,
      })

      console.log('✅ Code verified successfully')

      // Create or update user in Convex
      const result = await convexClient.mutation(api.auth.createOrUpdateUser, {
        email,
        workosUserId: authResponse.user.id,
      })

      console.log('✅ User session created')

      return {
        success: true,
        token: result.token,
        userId: result.userId,
      }
    } catch (error) {
      console.error('❌ Verification Error:', error)
      throw new Error('Invalid or expired code')
    }
  }
)
