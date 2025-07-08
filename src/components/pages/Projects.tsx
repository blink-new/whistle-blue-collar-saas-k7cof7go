import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { FolderKanban, Plus, Calendar, Users, MessageSquare } from 'lucide-react'

export function Projects() {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: '1',
      title: 'Site Alpha Electrical Update',
      description: 'Upgrade electrical systems in building A and B',
      status: 'not_started',
      dueDate: '2024-02-15',
      assignedUsers: [
        { id: '1', name: 'Mike Johnson', avatar: '/api/placeholder/32/32' },
        { id: '2', name: 'Sarah Lee', avatar: '/api/placeholder/32/32' }
      ],
      comments: 3,
      timePosted: '2024-01-20',
      priority: 'high'
    },
    {
      id: '2',
      title: 'HVAC Maintenance - Building C',
      description: 'Routine maintenance and filter replacement',
      status: 'in_progress',
      dueDate: '2024-02-10',
      assignedUsers: [
        { id: '3', name: 'David Chen', avatar: '/api/placeholder/32/32' }
      ],
      comments: 7,
      timePosted: '2024-01-18',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Safety Equipment Inspection',
      description: 'Monthly safety equipment check and documentation',
      status: 'under_review',
      dueDate: '2024-02-08',
      assignedUsers: [
        { id: '4', name: 'Lisa Wilson', avatar: '/api/placeholder/32/32' },
        { id: '5', name: 'Tom Brown', avatar: '/api/placeholder/32/32' }
      ],
      comments: 2,
      timePosted: '2024-01-15',
      priority: 'high'
    },
    {
      id: '4',
      title: 'Parking Lot Resurfacing',
      description: 'Complete resurfacing of main parking area',
      status: 'completed',
      dueDate: '2024-01-30',
      assignedUsers: [
        { id: '6', name: 'Jim Smith', avatar: '/api/placeholder/32/32' }
      ],
      comments: 12,
      timePosted: '2024-01-10',
      priority: 'low'
    }
  ]

  const statusColumns = [
    { key: 'not_started', title: 'Not Started', color: 'bg-gray-100' },
    { key: 'in_progress', title: 'In Progress', color: 'bg-blue-100' },
    { key: 'under_review', title: 'Under Review', color: 'bg-yellow-100' },
    { key: 'completed', title: 'Completed', color: 'bg-green-100' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'bg-gray-500'
      case 'in_progress': return 'bg-blue-500'
      case 'under_review': return 'bg-yellow-500'
      case 'completed': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600 mt-2">Manage your team's work and track progress</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          All Projects
        </Button>
        <Button
          variant={filter === 'assigned' ? 'default' : 'outline'}
          onClick={() => setFilter('assigned')}
          className={filter === 'assigned' ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          My Projects
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusColumns.map((column) => {
          const columnProjects = filteredProjects.filter(p => p.status === column.key)
          
          return (
            <div key={column.key} className="space-y-4">
              <div className={`p-4 rounded-lg ${column.color}`}>
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <FolderKanban className="h-4 w-4 mr-2" />
                  {column.title}
                  <Badge variant="secondary" className="ml-2">
                    {columnProjects.length}
                  </Badge>
                </h3>
              </div>
              
              <div className="space-y-4">
                {columnProjects.map((project) => (
                  <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{project.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(project.dueDate).toLocaleDateString()}
                        </div>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <div className="flex -space-x-2">
                            {project.assignedUsers.map((user) => (
                              <Avatar key={user.id} className="h-6 w-6 border-2 border-white">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="text-xs">
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {project.comments}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}