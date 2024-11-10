import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"

export function ChatInterface({ messages, sendMessage, newMessage, setNewMessage }:{
    messages: { id: number, text: string, sender: string }[],
    sendMessage: (e: React.FormEvent) => void,
    newMessage: string,
    setNewMessage: (value: string) => void
}) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Live Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] mb-4">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <span className="font-bold">{msg.sender}: </span>
              <span>{msg.text}</span>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={sendMessage} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow bg-gray-700 text-white border-gray-600"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}