import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { MessageSquare, FolderKanban, Wrench, FileText, CalendarDays, Activity, Clock } from 'lucide-react'

export function Dashboard() {
  const quickStats = [
    { name: 'Active Projects', value: '12', icon: FolderKanban, color: 'bg-blue-500' },
    { name: 'Unread Messages', value: '4', icon: MessageSquare, color: 'bg-green-500' },
    { name: 'Tools Checked Out', value: '8', icon: Wrench, color: 'bg-orange-500' },
    { name: 'Upcoming Events', value: '3', icon: CalendarDays, color: 'bg-purple-500' },
  ]

  const recentActivity = [
    { type: 'project', title: 'Site Electrical Update', time: '2 hours ago', status: 'In Progress' },
    { type: 'message', title: 'New message from Mike Johnson', time: '4 hours ago', status: 'Unread' },
    { type: 'tool', title: 'Drill Kit #47 checked out', time: '1 day ago', status: 'Active' },
    { type: 'event', title: 'Safety meeting scheduled', time: '2 days ago', status: 'Upcoming' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your team.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <div className={`p-2 rounded-md ${stat.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {item.type === 'project' && <FolderKanban className="h-4 w-4 text-blue-600" />}
                      {item.type === 'message' && <MessageSquare className="h-4 w-4 text-green-600" />}
                      {item.type === 'tool' && <Wrench className="h-4 w-4 text-orange-600" />}
                      {item.type === 'event' && <CalendarDays className="h-4 w-4 text-purple-600" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{item.time}</span>
                      <span className="text-gray-300">•</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'Unread' ? 'bg-red-100 text-red-800' :
                        item.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
                <MessageSquare className="h-8 w-8 text-orange-500 mb-2" />
                <span className="text-sm font-medium text-gray-700">Start Chat</span>
              </button>
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <FolderKanban className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm font-medium text-gray-700">New Project</span>
              </button>
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                <Wrench className="h-8 w-8 text-green-500 mb-2" />
                <span className="text-sm font-medium text-gray-700">Check Out Tool</span>
              </button>
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                <FileText className="h-8 w-8 text-purple-500 mb-2" />
                <span className="text-sm font-medium text-gray-700">Upload Files</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}