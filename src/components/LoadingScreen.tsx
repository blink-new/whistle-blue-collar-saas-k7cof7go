export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Whistle</h1>
        <p className="text-gray-600">Loading your workspace...</p>
      </div>
    </div>
  )
}