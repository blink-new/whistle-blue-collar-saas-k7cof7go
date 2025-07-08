import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { User, Search, MapPin, Phone, Mail, Calendar, Award, Star } from 'lucide-react'

export function Profile() {
  const [view, setView] = useState<'my-profile' | 'team-directory'>('my-profile')
  const [searchTerm, setSearchTerm] = useState('')
  const [editableUser, setEditableUser] = useState({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '(555) 123-4567',
    jobTitle: 'Senior Electrician',
    team: 'Electrical Team',
    location: 'Building A - Floor 2',
    birthday: '1990-06-15',
    funFact: 'Can solve a Rubik\'s cube in under 2 minutes',
    certifications: ['Licensed Electrician', 'OSHA 30', 'Arc Flash Safety'],
    avatar: '/api/placeholder/128/128'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditableUser(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In a real app, you'd send editableUser to your backend here
    console.log('Saving changes:', editableUser)
    alert('Changes saved! (simulated)')
  }

  const handleCancel = () => {
    // Reset to original values or fetch from backend again
    setEditableUser({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      phone: '(555) 123-4567',
      jobTitle: 'Senior Electrician',
      team: 'Electrical Team',
      location: 'Building A - Floor 2',
      birthday: '1990-06-15',
      funFact: 'Can solve a Rubik\'s cube in under 2 minutes',
      certifications: ['Licensed Electrician', 'OSHA 30', 'Arc Flash Safety'],
      avatar: '/api/placeholder/128/128'
    })
    alert('Changes cancelled!')
  }

  const teamMembers = [
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      jobTitle: 'Project Manager',
      team: 'Management',
      location: 'Building A - Floor 1',
      birthday: '1985-03-22',
      funFact: 'Has climbed Mount Washington 12 times',
      avatar: '/api/placeholder/80/80'
    },
    {
      id: '3',
      name: 'Sarah Lee',
      email: 'sarah.lee@company.com',
      jobTitle: 'HVAC Technician',
      team: 'HVAC Team',
      location: 'Building B - Basement',
      birthday: '1992-11-08',
      funFact: 'Speaks 4 languages fluently',
      avatar: '/api/placeholder/80/80'
    },
    {
      id: '4',
      name: 'David Chen',
      email: 'david.chen@company.com',
      jobTitle: 'Maintenance Supervisor',
      team: 'Maintenance',
      location: 'Building C - Floor 1',
      birthday: '1988-07-14',
      funFact: 'Makes the best coffee in the office',
      avatar: '/api/placeholder/80/80'
    },
    {
      id: '5',
      name: 'Lisa Wilson',
      email: 'lisa.wilson@company.com',
      jobTitle: 'Safety Inspector',
      team: 'Safety & Compliance',
      location: 'Building A - Floor 3',
      birthday: '1991-12-03',
      funFact: 'Has never missed a deadline in 5 years',
      avatar: '/api/placeholder/80/80'
    }
  ]

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.team.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
          <p className="text-gray-600 mt-2">Manage your profile and find team members</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-2">
        <Button
          variant={view === 'my-profile' ? 'default' : 'outline'}
          onClick={() => setView('my-profile')}
          className={view === 'my-profile' ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          <User className="h-4 w-4 mr-2" />
          My Profile
        </Button>
        <Button
          variant={view === 'team-directory' ? 'default' : 'outline'}
          onClick={() => setView('team-directory')}
          className={view === 'team-directory' ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          <Search className="h-4 w-4 mr-2" />
          Team Directory
        </Button>
      </div>

      {view === 'my-profile' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={editableUser.avatar} />
                <AvatarFallback className="text-2xl bg-orange-500 text-white">
                  {editableUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{editableUser.name}</CardTitle>
              <p className="text-gray-600">{editableUser.jobTitle}</p>
              <Badge className="bg-blue-100 text-blue-800">{editableUser.team}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {editableUser.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {editableUser.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {editableUser.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Birthday: {new Date(editableUser.birthday).toLocaleDateString()}
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <Star className="h-4 w-4 mr-2 mt-0.5" />
                <span>{editableUser.funFact}</span>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input name="name" value={editableUser.name} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <Input name="jobTitle" value={editableUser.jobTitle} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input name="email" value={editableUser.email} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <Input name="phone" value={editableUser.phone} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team
                  </label>
                  <Input name="team" value={editableUser.team} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Input name="location" value={editableUser.location} onChange={handleInputChange} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fun Fact
                </label>
                <Input name="funFact" value={editableUser.funFact} onChange={handleInputChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certifications
                </label>
                <div className="flex flex-wrap gap-2">
                  {editableUser.certifications.map((cert, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800">
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Team Directory */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Team Directory
                <Badge variant="secondary" className="ml-2">
                  {filteredMembers.length} members
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-orange-500 text-white">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.jobTitle}</p>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          {member.team}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-2" />
                        {member.email}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-2" />
                        {member.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-2" />
                        Birthday: {new Date(member.birthday).toLocaleDateString()}
                      </div>
                      <div className="flex items-start">
                        <Star className="h-3 w-3 mr-2 mt-0.5" />
                        <span className="text-xs">{member.funFact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}