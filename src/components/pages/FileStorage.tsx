import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { FileText, Folder, Upload, Search, Download, Image, FileType, Clock } from 'lucide-react'

export function FileStorage() {
  const [currentPath, setCurrentPath] = useState('/')
  const [searchTerm, setSearchTerm] = useState('')

  const files = [
    {
      id: '1',
      name: 'Safety Procedures',
      type: 'folder',
      size: null,
      modified: '2024-01-20',
      path: '/safety-procedures'
    },
    {
      id: '2',
      name: 'Project Documentation',
      type: 'folder',
      size: null,
      modified: '2024-01-19',
      path: '/project-docs'
    },
    {
      id: '3',
      name: 'Site Alpha Electrical Plans.pdf',
      type: 'pdf',
      size: '2.4 MB',
      modified: '2024-01-22',
      path: '/site-alpha-plans.pdf'
    },
    {
      id: '4',
      name: 'Equipment Manual - Drill Kit.pdf',
      type: 'pdf',
      size: '1.8 MB',
      modified: '2024-01-21',
      path: '/equipment-manual.pdf'
    },
    {
      id: '5',
      name: 'Building A Photos.zip',
      type: 'zip',
      size: '15.6 MB',
      modified: '2024-01-20',
      path: '/building-a-photos.zip'
    },
    {
      id: '6',
      name: 'Inspection Checklist.xlsx',
      type: 'xlsx',
      size: '245 KB',
      modified: '2024-01-19',
      path: '/inspection-checklist.xlsx'
    }
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder className="h-8 w-8 text-blue-500" />
      case 'pdf': return <FileText className="h-8 w-8 text-red-500" />
      case 'xlsx': return <FileType className="h-8 w-8 text-green-500" />
      case 'zip': return <FileType className="h-8 w-8 text-orange-500" />
      case 'jpg':
      case 'png':
      case 'jpeg': return <Image className="h-8 w-8 text-purple-500" />
      default: return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'folder': return 'bg-blue-100 text-blue-800'
      case 'pdf': return 'bg-red-100 text-red-800'
      case 'xlsx': return 'bg-green-100 text-green-800'
      case 'zip': return 'bg-orange-100 text-orange-800'
      case 'jpg':
      case 'png':
      case 'jpeg': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const breadcrumbs = currentPath.split('/').filter(Boolean)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">File Storage</h2>
          <p className="text-gray-600 mt-2">Organize and share your team's documents</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Folder className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <button
          onClick={() => setCurrentPath('/')}
          className="hover:text-gray-700"
        >
          Home
        </button>
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span>/</span>
            <button
              onClick={() => setCurrentPath('/' + breadcrumbs.slice(0, index + 1).join('/'))}
              className="hover:text-gray-700"
            >
              {crumb}
            </button>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search files and folders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* File Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Files and Folders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files
              .filter(file => 
                file.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((file) => (
                <div
                  key={file.id}
                  className="group relative p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => file.type === 'folder' && setCurrentPath(file.path)}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex-shrink-0">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="text-center w-full">
                      <h3 className="font-medium text-gray-900 text-sm truncate w-full">
                        {file.name}
                      </h3>
                      <div className="flex items-center justify-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getFileTypeColor(file.type)}`}>
                          {file.type.toLowerCase()}
                        </span>
                        {file.size && (
                          <span className="text-xs text-gray-500">{file.size}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(file.modified).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  {file.type !== 'folder' && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}