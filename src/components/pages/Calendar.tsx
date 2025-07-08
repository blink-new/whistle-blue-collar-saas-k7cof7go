import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { CalendarDays, Plus, Clock, Users, MapPin } from 'lucide-react'

export function Calendar() {
  const [view, setView] = useState<'events' | 'schedule'>('events')

  const events = [
    {
      id: '1',
      title: 'Safety Meeting',
      description: 'Monthly safety briefing and equipment check',
      date: '2024-01-25',
      time: '09:00',
      location: 'Conference Room A',
      attendees: ['Mike Johnson', 'Sarah Lee', 'David Chen'],
      type: 'meeting'
    },
    {
      id: '2',
      title: 'Equipment Maintenance',
      description: 'Scheduled maintenance for heavy machinery',
      date: '2024-01-26',
      time: '14:00',
      location: 'Maintenance Bay',
      attendees: ['Tom Brown', 'Lisa Wilson'],
      type: 'maintenance'
    },
    {
      id: '3',
      title: 'Site Inspection',
      description: 'Monthly site safety and compliance inspection',
      date: '2024-01-28',
      time: '11:00',
      location: 'Building A',
      attendees: ['Jim Smith', 'Sarah Lee'],
      type: 'inspection'
    }
  ]

  const timeOffRequests = [
    {
      id: '1',
      employee: 'Mike Johnson',
      dates: '2024-02-05 to 2024-02-09',
      reason: 'Family vacation',
      status: 'approved',
      submitted: '2024-01-20'
    },
    {
      id: '2',
      employee: 'Sarah Lee',
      dates: '2024-02-15',
      reason: 'Medical appointment',
      status: 'pending',
      submitted: '2024-01-22'
    },
    {
      id: '3',
      employee: 'David Chen',
      dates: '2024-02-20 to 2024-02-21',
      reason: 'Personal time',
      status: 'approved',
      submitted: '2024-01-18'
    }
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800'
      case 'maintenance': return 'bg-orange-100 text-orange-800'
      case 'inspection': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Calendar</h2>
          <p className="text-gray-600 mt-2">Manage events and schedule time off</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          {view === 'events' ? 'New Event' : 'Request Time Off'}
        </Button>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-2">
        <Button
          variant={view === 'events' ? 'default' : 'outline'}
          onClick={() => setView('events')}
          className={view === 'events' ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          <CalendarDays className="h-4 w-4 mr-2" />
          Events Calendar
        </Button>
        <Button
          variant={view === 'schedule' ? 'default' : 'outline'}
          onClick={() => setView('schedule')}
          className={view === 'schedule' ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          <Clock className="h-4 w-4 mr-2" />
          Schedule & Time Off
        </Button>
      </div>

      {view === 'events' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees.length} attendees
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendar View (Simplified) */}
          <Card>
            <CardHeader>
              <CardTitle>January 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center">
                {/* Calendar headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days (simplified) */}
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1
                  const hasEvent = events.some(e => new Date(e.date).getDate() === day)
                  
                  return (
                    <div
                      key={day}
                      className={`p-2 text-sm cursor-pointer hover:bg-gray-100 rounded ${
                        hasEvent ? 'bg-orange-100 text-orange-800 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time Off Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Time Off Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeOffRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{request.employee}</h3>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        {request.dates}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Submitted {new Date(request.submitted).toLocaleDateString()}
                      </div>
                      {request.reason && (
                        <p className="text-sm text-gray-500 mt-2">
                          <strong>Reason:</strong> {request.reason}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schedule Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Team Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-8 text-gray-500">
                  <CalendarDays className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-medium text-gray-900 mb-2">Schedule Overview</h3>
                  <p className="text-sm">Team schedule and availability will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}