"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Campus AI Assistant 🤖. I can help you with campus information, directions, and general queries. What would you like to know?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const predefinedResponses: Record<string, string> = {
    "where is the physics lab":
      "The Physics Lab is on the 2nd Floor, Block B. Take the stairs near the main entrance and turn right.",
    "physics lab":
      "The Physics Lab is on the 2nd Floor, Block B. Take the stairs near the main entrance and turn right.",
    "when is the next holiday":
      "The next holiday is on 29th August (Raksha Bandhan). Classes will resume on 30th August.",
    "next holiday": "The next holiday is on 29th August (Raksha Bandhan). Classes will resume on 30th August.",
    holiday: "The next holiday is on 29th August (Raksha Bandhan). Classes will resume on 30th August.",
    "lost my id card":
      "Please report your lost ID card in the Lost & Found section of the app. You can also visit the Admin Office (Ground Floor, Block A) with a copy of your admission receipt.",
    "id card":
      "Please report your lost ID card in the Lost & Found section of the app. You can also visit the Admin Office (Ground Floor, Block A) with a copy of your admission receipt.",
    "library hours": "The library is open from 8:00 AM to 8:00 PM on weekdays and 9:00 AM to 5:00 PM on weekends.",
    library:
      "The library is open from 8:00 AM to 8:00 PM on weekdays and 9:00 AM to 5:00 PM on weekends. It's located on the 1st Floor, Block C.",
    cafeteria:
      "The main cafeteria is on the Ground Floor, Block A. It's open from 7:00 AM to 7:00 PM. There's also a smaller café in Block B.",
    "sports day":
      "Annual Sports Day is scheduled for 15th September at the Main Sports Ground. Registration is open in the Events section.",
    "when is sports day":
      "Annual Sports Day is scheduled for 15th September at the Main Sports Ground. Registration is open in the Events section.",
    "exam schedule":
      "Mid-term exams start from 10th September. Check the Notices section for detailed timetables and exam hall allocations.",
    exams:
      "Mid-term exams start from 10th September. Check the Notices section for detailed timetables and exam hall allocations.",
    "wifi password":
      "The campus WiFi password is 'Campus2024!'. Connect to 'CampusNet' network. For issues, contact IT Support at Block A, Room 105.",
    wifi: "The campus WiFi password is 'Campus2024!'. Connect to 'CampusNet' network. For issues, contact IT Support at Block A, Room 105.",
    "computer lab":
      "Computer Labs are on the 3rd Floor, Block B. Lab 1 is for general use, Lab 2 for programming classes. Booking required for Lab 2.",
    parking:
      "Student parking is available behind Block C. Two-wheelers: ₹5/day, Four-wheelers: ₹20/day. Get parking passes from Security Office.",
    fees: "For fee-related queries, visit the Accounts Office (Ground Floor, Block A) between 9:00 AM to 4:00 PM on weekdays.",
    admission: "For admission queries, contact the Admission Office (Ground Floor, Block A) or call +91-XXXX-XXXXXX.",
    "principal office":
      "The Principal's Office is on the 2nd Floor, Block A. Appointments can be scheduled through the Admin Office.",
    medical:
      "The Medical Room is on the Ground Floor, Block A, next to the Admin Office. A nurse is available from 9:00 AM to 5:00 PM.",
    canteen:
      "The main canteen is on the Ground Floor, Block A. It serves breakfast (7-10 AM), lunch (12-2 PM), and snacks (3-6 PM).",
  }

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Check for exact matches first
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }

    // Default responses for common patterns
    if (lowerMessage.includes("where") || lowerMessage.includes("location")) {
      return "I can help you find locations on campus! Try asking about specific places like 'Physics Lab', 'Library', 'Cafeteria', or 'Computer Lab'."
    }

    if (lowerMessage.includes("when") || lowerMessage.includes("time")) {
      return "I can provide timing information! Ask me about library hours, exam schedules, holidays, or specific events."
    }

    if (lowerMessage.includes("lost") || lowerMessage.includes("found")) {
      return "For lost items, please use the Lost & Found section in the app. You can report lost items or check if someone has found your belongings."
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return "I'm here to help! You can ask me about campus locations, timings, events, facilities, or general information. What specific information do you need?"
    }

    // Default response
    return "I'm sorry, I don't have specific information about that. You can try asking about campus locations, library hours, exam schedules, events, or use the search feature in the app for more detailed information."
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    const assistantResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getResponse(inputValue),
      sender: "assistant",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage, assistantResponse])
    setInputValue("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-200 dark:border-slate-700">
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Campus AI Assistant 🤖
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about campus information..."
                className="flex-1 text-sm"
              />
              <Button onClick={handleSendMessage} size="sm" className="px-3" disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Try asking: "Where is the Physics Lab?" or "When is the next holiday?"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
