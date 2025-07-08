import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { blink } from './blink/client'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './components/pages/Dashboard'
import { Messages } from './components/pages/Messages'
import { Projects } from './components/pages/Projects'
import { ToolCrib } from './components/pages/ToolCrib'
import { FileStorage } from './components/pages/FileStorage'
import { Calendar } from './components/pages/Calendar'
import { Profile } from './components/pages/Profile'
import { LoadingScreen } from './components/LoadingScreen'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-2">Whistle</h1>
          <p className="text-xl text-gray-600 mb-8">Communication & Project Management for Blue-Collar Teams</p>
          <p className="text-gray-500">Please sign in to continue</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <AppLayout user={user}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tool-crib" element={<ToolCrib />} />
          <Route path="/files" element={<FileStorage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AppLayout>
    </Router>
  )
}

export default App