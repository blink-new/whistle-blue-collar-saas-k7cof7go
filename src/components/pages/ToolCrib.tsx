import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Wrench, Search, LogOut, LogIn, AlertTriangle, Clock } from 'lucide-react'

export function ToolCrib() {
  const [searchTerm, setSearchTerm] = useState('')

  const checkedOutTools = [
    {
      id: '1',
      name: 'Drill Kit Professional',
      number: 'DK-047',
      checkedOutBy: 'Mike Johnson',
      checkedOutTime: '2024-01-22 08:30',
      avatar: '/api/placeholder/32/32',
      condition: 'good',
      dueBack: '2024-01-23'
    },
    {
      id: '2',
      name: 'Voltage Tester',
      number: 'VT-123',
      checkedOutBy: 'Sarah Lee',
      checkedOutTime: '2024-01-22 09:15',
      avatar: '/api/placeholder/32/32',
      condition: 'excellent',
      dueBack: '2024-01-22'
    },
    {
      id: '3',
      name: 'Hammer Drill',
      number: 'HD-089',
      checkedOutBy: 'David Chen',
      checkedOutTime: '2024-01-21 14:20',
      avatar: '/api/placeholder/32/32',
      condition: 'fair',
      dueBack: '2024-01-23'
    }
  ]

  const recentlyReturned = [
    {
      id: '4',
      name: 'Angle Grinder',
      number: 'AG-156',
      returnedBy: 'Lisa Wilson',
      returnedTime: '2024-01-21 16:30',
      avatar: '/api/placeholder/32/32',
      condition: 'good',
      issues: ''
    },
    {
      id: '5',
      name: 'Circular Saw',
      number: 'CS-234',
      returnedBy: 'Tom Brown',
      returnedTime: '2024-01-21 15:45',
      avatar: '/api/placeholder/32/32',
      condition: 'needs_repair',
      issues: 'Blade guard sticking'
    }
  ]

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'fair': return 'bg-yellow-100 text-yellow-800'
      case 'needs_repair': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const isOverdue = (dueBack: string) => {
    return new Date(dueBack) < new Date()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tool Crib</h2>
          <p className="text-gray-600 mt-2">Manage tool checkout and inventory</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white">
            <LogIn className="h-4 w-4 mr-2" />
            Check In
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <LogOut className="h-4 w-4 mr-2" />
            Check Out
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search tools by name or number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Checked Out Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LogOut className="h-5 w-5 mr-2" />
              Checked Out Tools
              <Badge variant="secondary" className="ml-2">
                {checkedOutTools.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {checkedOutTools.map((tool) => (
                <div key={tool.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Wrench className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{tool.name}</h3>
                      <p className="text-sm text-gray-500">#{tool.number}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={tool.avatar} />
                          <AvatarFallback className="text-xs">
                            {tool.checkedOutBy.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-500">{tool.checkedOutBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Badge className={getConditionColor(tool.condition)}>
                        {tool.condition}
                      </Badge>
                      {isOverdue(tool.dueBack) && (
                        <Badge className="bg-red-100 text-red-800">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Overdue
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Due {new Date(tool.dueBack).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recently Returned */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LogIn className="h-5 w-5 mr-2" />
              Recently Returned
              <Badge variant="secondary" className="ml-2">
                {recentlyReturned.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentlyReturned.map((tool) => (
                <div key={tool.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Wrench className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{tool.name}</h3>
                      <p className="text-sm text-gray-500">#{tool.number}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={tool.avatar} />
                          <AvatarFallback className="text-xs">
                            {tool.returnedBy.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-500">{tool.returnedBy}</span>
                      </div>
                      {tool.issues && (
                        <p className="text-xs text-red-600 mt-1">Issue: {tool.issues}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getConditionColor(tool.condition)}>
                      {tool.condition}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(tool.returnedTime).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}