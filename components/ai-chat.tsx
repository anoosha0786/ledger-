"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bot, Send, User, Clock, MapPin, Calendar, Book, Coffee } from "lucide-react"

interface AIChatProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  suggestions?: string[]
}

export function AIChat({ isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hi! I'm your Campus AI Assistant. I can help you with campus information, schedules, directions, and answer any questions about student life. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "What's the weather like today?",
        "Where is the nearest cafeteria?",
        "When is the library open?",
        "Show me today's events",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const quickQuestions = [
    { icon: Clock, text: "Library hours", category: "Hours" },
    { icon: MapPin, text: "Find cafeteria", category: "Location" },
    { icon: Calendar, text: "Today's events", category: "Events" },
    { icon: Book, text: "Assignment help", category: "Academic" },
    { icon: Coffee, text: "Best study spots", category: "Tips" },
  ]

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content.trim())
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (query: string): { content: string; suggestions?: string[] } => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("weather") || lowerQuery.includes("rain")) {
      return {
        content:
          "Today's weather is partly cloudy with a high of 72°F. There's a 20% chance of rain this afternoon, so you might want to bring an umbrella just in case!",
        suggestions: ["What should I wear?", "Indoor study spots", "Covered walkways"],
      }
    }

    if (lowerQuery.includes("cafeteria") || lowerQuery.includes("food") || lowerQuery.includes("eat")) {
      return {
        content:
          "The Main Cafeteria is located on the ground floor of the Student Center, open from 7 AM to 9 PM. Today's specials include grilled chicken, vegetarian pasta, and fresh salad bar. The Coffee Corner near the library is also open until 11 PM!",
        suggestions: ["Menu for today", "Dietary restrictions", "Coffee shop hours"],
      }
    }

    if (lowerQuery.includes("library") || lowerQuery.includes("study")) {
      return {
        content:
          "The Main Library is open 24/7 during exam periods, otherwise 6 AM to midnight. The quiet study area is on the 3rd floor, group study rooms are on the 2nd floor (bookable online), and the computer lab is on the 1st floor. Need help finding a specific book or resource?",
        suggestions: ["Book a study room", "Computer availability", "Research help"],
      }
    }

    if (lowerQuery.includes("event") || lowerQuery.includes("today") || lowerQuery.includes("happening")) {
      return {
        content:
          "Today's events include: Science Fair in Lab 2 (10 AM - 4 PM), Basketball Match at Sports Complex (6 PM), and Study Group for Math 101 in Library Room 204 (7 PM). The Science Fair has 45 attendees so far, and the basketball match is expected to be packed!",
        suggestions: ["Register for events", "Event locations", "Tomorrow's schedule"],
      }
    }

    if (lowerQuery.includes("assignment") || lowerQuery.includes("homework") || lowerQuery.includes("help")) {
      return {
        content:
          "I can help you with academic questions! For specific subject help, check out the Peer Support section where students and teachers answer questions. The Math Tutoring Center is open Mon-Fri 2-6 PM in Room 105, and the Writing Center offers essay help by appointment.",
        suggestions: ["Find a tutor", "Study groups", "Assignment deadlines"],
      }
    }

    if (lowerQuery.includes("lost") || lowerQuery.includes("found")) {
      return {
        content:
          "Check the Lost & Found section in the app! Recently reported items include a black iPhone, blue water bottle, and red backpack. You can post your lost item with a photo and description, and I'll notify you if someone finds a match. The physical Lost & Found office is in the Student Services building.",
        suggestions: ["Report lost item", "Recent found items", "Contact security"],
      }
    }

    // Default response
    return {
      content:
        "I'd be happy to help! I can assist with campus directions, event information, academic resources, dining options, library services, and general student life questions. What specific information are you looking for?",
      suggestions: ["Campus map", "Today's schedule", "Study resources", "Dining options"],
    }
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Campus AI Assistant
          </DialogTitle>
          <DialogDescription>Your personal guide to campus life and information</DialogDescription>
        </DialogHeader>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Quick Questions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start h-auto p-3 bg-transparent"
                  onClick={() => handleQuickQuestion(question.text)}
                >
                  <question.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm">{question.text}</p>
                    <p className="text-xs text-muted-foreground">{question.category}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 min-h-[300px] max-h-[400px]">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
              {message.type === "ai" && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                <Card className={message.type === "user" ? "bg-primary text-primary-foreground" : ""}>
                  <CardContent className="p-3">
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </CardContent>
                </Card>

                {/* AI Suggestions */}
                {message.type === "ai" && message.suggestions && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {message.suggestions.map((suggestion, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80 text-xs"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {message.type === "user" && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">AI is typing...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2 pt-4 border-t">
          <Input
            placeholder="Ask me anything about campus..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
            className="flex-1"
          />
          <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isTyping} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
