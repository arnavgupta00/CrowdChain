'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Progress } from "../../components/ui/progress"
import { VideoStream } from "../../components/live-stream/video-stream"
import { ChatInterface } from "../../components/live-stream/chat-interface"
import { ProjectDetails } from "../../components/live-stream/project-details"
import { ContributeModal } from "../../components/live-stream/contribute-modal"

export default function LiveStreamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [messages, setMessages] = useState<{ id: number; text: string; sender: string }[]>([])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = (e:any) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'User' }])
      setNewMessage('')
    }
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-900 text-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Live Stream</CardTitle>
            </CardHeader>
            <CardContent>
              <VideoStream />
            </CardContent>
          </Card>
        </div>
        <div>
          <ProjectDetails 
            title="Innovative Green Tech"
            description="Revolutionizing sustainable energy solutions for urban environments."
            raised={75000}
            goal={100000}
            daysLeft={15}
          />
          <Button 
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Contribute Now
          </Button>
        </div>
        <div className="lg:col-span-3">
          <ChatInterface messages={messages} sendMessage={sendMessage} newMessage={newMessage} setNewMessage={setNewMessage} />
        </div>
      </div>
      <ContributeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}