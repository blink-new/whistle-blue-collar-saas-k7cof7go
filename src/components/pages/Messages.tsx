import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { MessageSquare, Search, Plus, Users, Clock, Send } from 'lucide-react'

export function Messages() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const chats = [
    {
      id: '1',
      name: 'Mike Johnson',
      type: 'direct',
      lastMessage: 'Hey, can you check the electrical panel?',
      lastMessageTime: '10:30 AM',
      unreadCount: 2,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '2',
      name: 'Site Alpha Team',
      type: 'group',
      lastMessage: 'Sarah: Meeting at 2 PM today',
      lastMessageTime: '9:45 AM',
      unreadCount: 0,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '3',
      name: 'Daily Safety Check',
      type: 'temp',
      lastMessage: 'All clear from Zone 3',
      lastMessageTime: 'Yesterday',
      unreadCount: 1,
      avatar: '/api/placeholder/40/40',
      expiresIn: '4 hours'
    }
  ]

  const messages = [
    {
      id: '1',
      senderId: '1',
      senderName: 'Mike Johnson',
      content: 'Hey, can you check the electrical panel in building A?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'Me',
      content: 'Sure, I\'ll head there right now. Should I bring the multimeter?',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Mike Johnson',
      content: 'Yes, and check the main breaker too. There were some issues yesterday.',
      timestamp: '10:33 AM',
      isOwn: false
    }
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Messages</h2>
          <p className="text-gray-600 mt-2">Stay connected with your team</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 border-b last:border-b-0 ${
                    selectedChat === chat.id ? 'bg-orange-50 border-r-2 border-r-orange-500' : ''
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>
                      {chat.type === 'group' ? (
                        <Users className="h-5 w-5" />
                      ) : (
                        chat.name.charAt(0)
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {chat.name}
                        </p>
                        {chat.type === 'temp' && (
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {chat.expiresIn}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                        {chat.unreadCount > 0 && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2">
          {selectedChat ? (
            <div className="flex flex-col h-full">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  {chats.find(c => c.id === selectedChat)?.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.isOwn
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {!msg.isOwn && (
                          <p className="text-xs font-medium mb-1 opacity-75">
                            {msg.senderName}
                          </p>
                        )}
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${
                          msg.isOwn ? 'text-orange-200' : 'text-gray-500'
                        }`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="bg-orange-500 hover:bg-orange-600">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <CardContent className="flex items-center justify-center h-full text-center">
              <div>
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a chat from the list to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}