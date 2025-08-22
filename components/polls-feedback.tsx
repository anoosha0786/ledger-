"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Clock, Users, X, BarChart3, Vote, Eye, EyeOff, Star, CheckCircle } from "lucide-react"

interface Poll {
  id: string
  title: string
  description: string
  type: "multiple-choice" | "rating" | "feedback" | "multi-select"
  category: "academic" | "events" | "facilities" | "general"
  author: string
  authorRole: string
  createdAt: string
  expiresAt: string
  isActive: boolean
  isAnonymous: boolean
  totalVotes: number
  hasVoted: boolean
  options?: PollOption[]
  ratingScale?: { min: number; max: number; labels: string[] }
  responses?: FeedbackResponse[]
}

interface PollOption {
  id: string
  text: string
  votes: number
  percentage: number
}

interface FeedbackResponse {
  id: string
  text: string
  rating?: number
  timestamp: string
  isAnonymous: boolean
  author?: string
}

interface PollsProps {
  isOpen: boolean
  onClose: () => void
}

export function PollsFeedback({ isOpen, onClose }: PollsProps) {
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("active")
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [ratingValue, setRatingValue] = useState<number[]>([5])
  const [feedbackText, setFeedbackText] = useState("")
  const [showResults, setShowResults] = useState(false)

  const polls: Poll[] = [
    {
      id: "1",
      title: "Farewell Theme Selection",
      description:
        "Help us choose the theme for this year's farewell party. Your vote will help determine the decorations, music, and overall atmosphere.",
      type: "multiple-choice",
      category: "events",
      author: "Student Council",
      authorRole: "Student Organization",
      createdAt: "2 days ago",
      expiresAt: "5 days",
      isActive: true,
      isAnonymous: false,
      totalVotes: 156,
      hasVoted: false,
      options: [
        { id: "opt1", text: "Beach Party", votes: 45, percentage: 28.8 },
        { id: "opt2", text: "Retro Night", votes: 67, percentage: 42.9 },
        { id: "opt3", text: "Hollywood Glamour", votes: 32, percentage: 20.5 },
        { id: "opt4", text: "Masquerade Ball", votes: 12, percentage: 7.7 },
      ],
    },
    {
      id: "2",
      title: "Cafeteria Food Quality",
      description:
        "Rate your overall satisfaction with the cafeteria food quality and service. Your feedback helps us improve the dining experience.",
      type: "rating",
      category: "facilities",
      author: "Cafeteria Management",
      authorRole: "Staff",
      createdAt: "1 week ago",
      expiresAt: "3 days",
      isActive: true,
      isAnonymous: true,
      totalVotes: 89,
      hasVoted: true,
      ratingScale: { min: 1, max: 5, labels: ["Poor", "Fair", "Good", "Very Good", "Excellent"] },
    },
    {
      id: "3",
      title: "Library Study Environment Feedback",
      description: "Share your thoughts on the library study environment. What improvements would you like to see?",
      type: "feedback",
      category: "facilities",
      author: "Library Administration",
      authorRole: "Staff",
      createdAt: "3 days ago",
      expiresAt: "1 week",
      isActive: true,
      isAnonymous: true,
      totalVotes: 34,
      hasVoted: false,
      responses: [
        {
          id: "r1",
          text: "More power outlets near study tables would be great. Sometimes it's hard to find a spot to charge laptops.",
          rating: 4,
          timestamp: "2 hours ago",
          isAnonymous: true,
        },
        {
          id: "r2",
          text: "The quiet zones are perfect, but maybe we could have more group study rooms available for booking.",
          rating: 4,
          timestamp: "5 hours ago",
          isAnonymous: true,
        },
        {
          id: "r3",
          text: "Love the extended hours during finals! The 24/7 access really helps with late-night studying.",
          rating: 5,
          timestamp: "1 day ago",
          isAnonymous: true,
        },
      ],
    },
    {
      id: "4",
      title: "Course Evaluation - Advanced Mathematics",
      description:
        "Please evaluate various aspects of the Advanced Mathematics course to help improve the curriculum and teaching methods.",
      type: "multi-select",
      category: "academic",
      author: "Academic Department",
      authorRole: "Faculty",
      createdAt: "5 days ago",
      expiresAt: "2 days",
      isActive: true,
      isAnonymous: true,
      totalVotes: 67,
      hasVoted: false,
      options: [
        { id: "opt1", text: "Course content is well-structured", votes: 45, percentage: 67.2 },
        { id: "opt2", text: "Assignments are challenging but fair", votes: 38, percentage: 56.7 },
        { id: "opt3", text: "Professor explains concepts clearly", votes: 52, percentage: 77.6 },
        { id: "opt4", text: "Need more practical examples", votes: 29, percentage: 43.3 },
        { id: "opt5", text: "Pace of the course is appropriate", votes: 41, percentage: 61.2 },
      ],
    },
    {
      id: "5",
      title: "Campus WiFi Performance",
      description:
        "Rate the campus WiFi performance in different areas to help us identify and fix connectivity issues.",
      type: "rating",
      category: "facilities",
      author: "IT Services",
      authorRole: "Technical Staff",
      createdAt: "1 day ago",
      expiresAt: "1 week",
      isActive: true,
      isAnonymous: false,
      totalVotes: 23,
      hasVoted: false,
      ratingScale: {
        min: 1,
        max: 10,
        labels: [
          "Very Poor",
          "Poor",
          "Below Average",
          "Average",
          "Above Average",
          "Good",
          "Very Good",
          "Great",
          "Excellent",
          "Outstanding",
        ],
      },
    },
  ]

  const getCategoryColor = (category: Poll["category"]) => {
    switch (category) {
      case "academic":
        return "bg-blue-500"
      case "events":
        return "bg-purple-500"
      case "facilities":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: Poll["type"]) => {
    switch (type) {
      case "multiple-choice":
        return Vote
      case "rating":
        return Star
      case "feedback":
        return BarChart3
      case "multi-select":
        return CheckCircle
      default:
        return Vote
    }
  }

  const filteredPolls = polls.filter((poll) => {
    const matchesSearch =
      poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poll.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || poll.category === filterCategory
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && poll.isActive) ||
      (filterStatus === "voted" && poll.hasVoted) ||
      (filterStatus === "not-voted" && !poll.hasVoted)
    const matchesTab =
      activeTab === "all" || (activeTab === "active" && poll.isActive) || (activeTab === "completed" && poll.hasVoted)

    return matchesSearch && matchesCategory && matchesStatus && matchesTab
  })

  const handleVote = () => {
    if (!selectedPoll) return

    // In a real app, this would make an API call
    console.log("Voting on poll:", selectedPoll.id, {
      selectedOption,
      selectedOptions,
      ratingValue,
      feedbackText,
    })

    // Reset form
    setSelectedOption("")
    setSelectedOptions([])
    setRatingValue([5])
    setFeedbackText("")
    setShowResults(true)
  }

  const renderPollContent = (poll: Poll) => {
    switch (poll.type) {
      case "multiple-choice":
        return (
          <div className="space-y-4">
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              {poll.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case "multi-select":
        return (
          <div className="space-y-4">
            {poll.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedOptions([...selectedOptions, option.id])
                    } else {
                      setSelectedOptions(selectedOptions.filter((id) => id !== option.id))
                    }
                  }}
                />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        )

      case "rating":
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Rating: {ratingValue[0]}</Label>
              <div className="mt-2">
                <Slider
                  value={ratingValue}
                  onValueChange={setRatingValue}
                  max={poll.ratingScale?.max || 5}
                  min={poll.ratingScale?.min || 1}
                  step={1}
                  className="w-full"
                />
              </div>
              {poll.ratingScale?.labels && (
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>{poll.ratingScale.labels[0]}</span>
                  <span>{poll.ratingScale.labels[poll.ratingScale.labels.length - 1]}</span>
                </div>
              )}
            </div>
          </div>
        )

      case "feedback":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Share your thoughts and suggestions..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="min-h-[120px] mt-2"
              />
            </div>
            <div>
              <Label className="text-sm">Overall Rating: {ratingValue[0]}</Label>
              <Slider
                value={ratingValue}
                onValueChange={setRatingValue}
                max={5}
                min={1}
                step={1}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderResults = (poll: Poll) => {
    if (poll.type === "multiple-choice" || poll.type === "multi-select") {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Results</h4>
            <span className="text-sm text-muted-foreground">{poll.totalVotes} votes</span>
          </div>
          {poll.options?.map((option) => (
            <div key={option.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{option.text}</span>
                <span className="font-medium">{option.percentage}%</span>
              </div>
              <Progress value={option.percentage} className="h-2" />
              <div className="text-xs text-muted-foreground">{option.votes} votes</div>
            </div>
          ))}
        </div>
      )
    }

    if (poll.type === "feedback" && poll.responses) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Recent Feedback</h4>
            <span className="text-sm text-muted-foreground">{poll.totalVotes} responses</span>
          </div>
          {poll.responses.map((response) => (
            <Card key={response.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {response.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{response.rating}/5</span>
                      </div>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {response.isAnonymous ? "Anonymous" : response.author}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{response.timestamp}</span>
                </div>
                <p className="text-sm text-gray-700">{response.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            Polls & Feedback
          </DialogTitle>
          <DialogDescription>
            Participate in campus polls and share your feedback to help improve student life
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 border-r bg-muted/30 p-4 overflow-y-auto">
            {/* Search and Filters */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search polls..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="facilities">Facilities</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Polls</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="voted">Already Voted</SelectItem>
                  <SelectItem value="not-voted">Not Voted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active" className="text-xs">
                  Active
                </TabsTrigger>
                <TabsTrigger value="completed" className="text-xs">
                  Voted
                </TabsTrigger>
                <TabsTrigger value="all" className="text-xs">
                  All
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Polls List */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Polls ({filteredPolls.length})
              </h3>
              {filteredPolls.map((poll) => {
                const Icon = getTypeIcon(poll.type)
                return (
                  <Card
                    key={poll.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedPoll?.id === poll.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => {
                      setSelectedPoll(poll)
                      setShowResults(poll.hasVoted)
                    }}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getCategoryColor(poll.category)} text-white flex-shrink-0`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2">{poll.title}</p>
                          <p className="text-xs text-muted-foreground capitalize">{poll.category}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {poll.author}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{poll.createdAt}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {poll.totalVotes} votes
                            </span>
                            {poll.hasVoted && (
                              <Badge variant="secondary" className="text-xs">
                                Voted
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Expires in {poll.expiresAt}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {selectedPoll ? (
              <div className="p-6">
                {/* Poll Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getCategoryColor(selectedPoll.category)} text-white`}>
                      {(() => {
                        const Icon = getTypeIcon(selectedPoll.type)
                        return <Icon className="h-6 w-6" />
                      })()}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold mb-2">{selectedPoll.title}</h1>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          By {selectedPoll.author} • {selectedPoll.authorRole}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {selectedPoll.createdAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {selectedPoll.totalVotes} votes
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowResults(!showResults)}>
                      {showResults ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                      {showResults ? "Hide Results" : "Show Results"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedPoll(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Poll Status */}
                <div className="flex items-center gap-4 mb-6">
                  <Badge variant={selectedPoll.isActive ? "default" : "secondary"}>
                    {selectedPoll.isActive ? "Active" : "Closed"}
                  </Badge>
                  <Badge variant="outline">{selectedPoll.isAnonymous ? "Anonymous" : "Public"}</Badge>
                  <Badge variant="outline" className="capitalize">
                    {selectedPoll.type.replace("-", " ")}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Expires in {selectedPoll.expiresAt}</span>
                </div>

                {/* Poll Description */}
                <div className="prose max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed">{selectedPoll.description}</p>
                </div>

                {/* Poll Content */}
                <Tabs value={showResults ? "results" : "vote"} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="vote" onClick={() => setShowResults(false)}>
                      Vote
                    </TabsTrigger>
                    <TabsTrigger value="results" onClick={() => setShowResults(true)}>
                      Results
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="vote" className="mt-6">
                    {selectedPoll.hasVoted ? (
                      <Card>
                        <CardContent className="p-6 text-center">
                          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Thank you for voting!</h3>
                          <p className="text-muted-foreground">
                            You have already submitted your response for this poll.
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="p-6">
                          {renderPollContent(selectedPoll)}
                          <div className="flex justify-end mt-6">
                            <Button
                              onClick={handleVote}
                              disabled={
                                (selectedPoll.type === "multiple-choice" && !selectedOption) ||
                                (selectedPoll.type === "multi-select" && selectedOptions.length === 0) ||
                                (selectedPoll.type === "feedback" && !feedbackText.trim())
                              }
                            >
                              Submit Vote
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="results" className="mt-6">
                    <Card>
                      <CardContent className="p-6">{renderResults(selectedPoll)}</CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center p-6">
                <div>
                  <Vote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Poll</h3>
                  <p className="text-muted-foreground">
                    Choose a poll from the sidebar to participate or view results.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
