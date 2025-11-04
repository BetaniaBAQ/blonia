import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/debug-env')({
  component: DebugEnv,
})

function DebugEnv() {
  const viteConvexUrl = import.meta.env.VITE_CONVEX_URL
  const mode = import.meta.env.MODE
  const dev = import.meta.env.DEV
  const prod = import.meta.env.PROD

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            Environment Debug
          </h1>

          <div className="space-y-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">VITE_CONVEX_URL</p>
              <p className="text-white font-mono text-sm break-all">
                {viteConvexUrl || '❌ NOT SET'}
              </p>
              {!viteConvexUrl && (
                <p className="text-red-400 text-xs mt-2">
                  ⚠️ This should be set in .env.local
                </p>
              )}
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">MODE</p>
              <p className="text-white font-mono text-sm">{mode}</p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Development Mode</p>
              <p className="text-white font-mono text-sm">
                {dev ? '✅ Yes' : '❌ No'}
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Production Mode</p>
              <p className="text-white font-mono text-sm">
                {prod ? '✅ Yes' : '❌ No'}
              </p>
            </div>

            <div className="bg-cyan-900/30 border border-cyan-700/50 rounded-lg p-4 mt-6">
              <p className="text-cyan-400 text-sm font-semibold mb-2">
                💡 Troubleshooting
              </p>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>
                  • Make sure .env.local exists and contains VITE_CONVEX_URL
                </li>
                <li>• Restart the dev server after changing env files</li>
                <li>• Environment variables are loaded at build time</li>
                <li>
                  • Only VITE_ prefixed vars are exposed to the client
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
