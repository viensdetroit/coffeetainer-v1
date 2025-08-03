"use client"

import { useState } from "react"
import { Send, Smile, Paperclip, MoreVertical } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  avatar: string
  isOwn: boolean
}

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  status: "online" | "offline" | "busy"
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Ahmet Yılmaz",
      content: "Bugün kahve çekirdekleri tükendi, yeni sipariş vermemiz gerekiyor.",
      timestamp: "14:30",
      avatar: "/placeholder.svg?height=40&width=40&text=AY",
      isOwn: false,
    },
    {
      id: "2",
      sender: "Sen",
      content: "Tamam, hemen tedarikçiyi arayıp sipariş veriyorum. 5kg yeterli mi?",
      timestamp: "14:32",
      avatar: "/placeholder.svg?height=40&width=40&text=ME",
      isOwn: true,
    },
    {
      id: "3",
      sender: "Zeynep Kaya",
      content: "Akşam vardiyası için bir kişi daha lazım, Mehmet bugün gelemeyecek.",
      timestamp: "14:35",
      avatar: "/placeholder.svg?height=40&width=40&text=ZK",
      isOwn: false,
    },
    {
      id: "4",
      sender: "Sen",
      content: "Ben kalabilirim, sorun değil. Saat kaça kadar?",
      timestamp: "14:36",
      avatar: "/placeholder.svg?height=40&width=40&text=ME",
      isOwn: true,
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Ahmet Yılmaz",
      role: "Barista",
      avatar: "/placeholder.svg?height=40&width=40&text=AY",
      status: "online",
    },
    {
      id: "2",
      name: "Zeynep Kaya",
      role: "Müdür Yardımcısı",
      avatar: "/placeholder.svg?height=40&width=40&text=ZK",
      status: "online",
    },
    {
      id: "3",
      name: "Mehmet Demir",
      role: "Barista",
      avatar: "/placeholder.svg?height=40&width=40&text=MD",
      status: "offline",
    },
    {
      id: "4",
      name: "Ayşe Öztürk",
      role: "Kasiyer",
      avatar: "/placeholder.svg?height=40&width=40&text=AÖ",
      status: "busy",
    },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "Sen",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        avatar: "/placeholder.svg?height=40&width=40&text=ME",
        isOwn: true,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Çevrimiçi"
      case "busy":
        return "Meşgul"
      case "offline":
        return "Çevrimdışı"
      default:
        return "Bilinmiyor"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Ekip Chat</h2>
        <p className="text-gray-600">Ekip üyeleriyle anlık iletişim</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ekip Üyeleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {getStatusText(member.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Genel Chat</CardTitle>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                      <AvatarFallback>
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 max-w-xs lg:max-w-md ${message.isOwn ? "text-right" : ""}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">{message.sender}</span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          message.isOwn ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Mesajınızı yazın..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
