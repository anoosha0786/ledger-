"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import {
  Search,
  Filter,
  Clock,
  Users,
  X,
  Plus,
  HelpCircle,
  ArrowUp,
  MessageCircle,
  BookOpen,
  Calendar,
  MapPin,
  Send,
  CheckCircle,
  Star,
} from "lucide-react"

interface Question {
  id: string
  title: string
  content: string
  category: "academics" | "events" | "campus-tips" | "general"
  author: string
  authorRole: "student" | "moderator" | "teacher"
  timestamp: string
  upvotes: number
  hasUpvoted: boolean
  answers: Answer[]
  tags: string[]
  status: "open" | "answered" | "closed"
  isUrgent: boolean
  views: number
}

interface Answer {
  id: string
  content: string
  author: string
  authorRole: "student" | "moderator" | "teacher"
  timestamp: string
  upvotes: number
  hasUpvoted: boolean
  isAccepted: boolean
  isModerator: boolean
}

interface PeerSupportProps {
  isOpen: boolean
  onClose: () => void
}

export function PeerSupport({ isOpen, onClose }: PeerSupportProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("recent")
  const [activeTab, setActiveTab] = useState("browse")
  const [showAskForm, setShowAskForm] = useState(false)
  const [newAnswer, setNewAnswer] = useState("")

  // Form state
  const [questionForm, setQuestionForm] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    isUrgent: false,
  })

  const questions: Question[] = [
    {
      id: "1",
      title: "Does anyone know the deadline for the Science Fair project?",
      content:
        "I can't find the exact deadline anywhere. I know it's coming up soon but I want to make sure I don't miss it. Has anyone seen the official announcement?",
      category: "academics",
      author: "Alex Kumar",
      authorRole: "student",
      timestamp: "2 hours ago",
      upvotes: 5,
      hasUpvoted: false,
      views: 23,
      status: "answered",
      isUrgent: false,
      tags: ["science fair", "deadline", "project"],
      answers: [
        {
          id: "a1",
          content:
            "The Science Fair project deadline is Friday, March 15th at 5:00 PM. You need to submit both your project proposal and initial research. Check the student portal for the submission link!",
          author: "Dr. Sarah Johnson",
          authorRole: "teacher",
          timestamp: "1 hour ago",
          upvotes: 8,
          hasUpvoted: true,
          isAccepted: true,
          isModerator: true,
        },
        {
          id: "a2",
          content: "Thanks Dr. Johnson! I was looking for this too. Just submitted mine.",
          author: "Emma Wilson",
          authorRole: "student",
          timestamp: "45 minutes ago",
          upvotes: 2,
          hasUpvoted: false,
          isAccepted: false,
          isModerator: false,
        },
      ],
    },
    {
      id: "2",
      title: "Best study spots on campus during finals week?",
      content:
        "The library gets super crowded during finals. Does anyone know of other quiet places to study? Looking for somewhere with good WiFi and power outlets.",
      category: "campus-tips",
      author: "Mike Chen",
      authorRole: "student",
      timestamp: "4 hours ago",
      upvotes: 12,
      hasUpvoted: true,
      views: 45,
      status: "open",
      isUrgent: false,
      tags: ["study spots", "finals", "quiet", "wifi"],
      answers: [
        {
          id: "a3",
          content:
            "The 3rd floor of the Student Union has some great quiet corners with plenty of outlets. It's usually less crowded than the library.",
          author: "Lisa Zhang",
          authorRole: "student",
          timestamp: "3 hours ago",
          upvotes: 6,
          hasUpvoted: false,
          isAccepted: false,
          isModerator: false,
        },
        {
          id: "a4",
          content:
            "Try the graduate study rooms in the basement of the Math building. They're open to all students and very quiet. Just bring your student ID.",
          author: "David Park",
          authorRole: "student",
          timestamp: "2 hours ago",
          upvotes: 4,
          hasUpvoted: false,
          isAccepted: false,
          isModerator: false,
        },
        {
          id: "a5",
          content:
            "The 24/7 computer lab in the Engineering building is also a good option. Lots of space and always quiet after 8 PM.",
          author: "Campus Moderator",
          authorRole: "moderator",
          timestamp: "1 hour ago",
          upvotes: 3,
          hasUpvoted: false,
          isAccepted: false,
          isModerator: true,
        },
      ],
    },
    {
      id: "3",
      title: "How to register for the Photography Club exhibition?",
      content:
        "I saw the notice about the photography exhibition but I'm not sure how to submit my photos. Is there a specific format or deadline?",
      category: "events",
      author: "Rachel Green",
      authorRole: "student",
      timestamp: "6 hours ago",
      upvotes: 3,
      hasUpvoted: false,
      views: 18,
      status: "open",
      isUrgent: false,
      tags: ["photography", "exhibition", "registration", "club"],
      answers: [
        {
          id: "a6",
          content:
            "You need to email your photos (max 3, high resolution) to photography.club@university.edu by March 20th. Include your name, year, and a brief description of each photo.",
          author: "Photography Club",
          authorRole: "student",
          timestamp: "4 hours ago",
          upvotes: 5,
          hasUpvoted: false,
          isAccepted: false,
          isModerator: false,
        },
      ],
    },
    {
      id: "4",
      title: "URGENT: Math 201 midterm study group?",
      content:
        "The midterm is tomorrow and I'm really struggling with integration by parts. Anyone want to form a last-minute study group? I can meet anywhere on campus.",
      category: "academics",
      author: "Tom Wilson",
      authorRole: "student",
      timestamp: "30 minutes ago",
      upvotes: 7,
      hasUpvoted: false,
      views: 12,
      status: "open",
      isUrgent: true,
      tags: ["math 201", "midterm", "study group", "integration"],
      answers: [
        {
          id: "a7",
          content:
            "I'm free for the next 2 hours! Let's meet at the library study room 204. I have some good practice problems we can work through.",
          author: "Jessica Brown",
          authorRole: "student",
          timestamp: "20 minutes ago",
          upvotes: 3,
          hasUpvoted: false,
          isAccepted: false,
          isModerator: false,
        },
        {
          id: "a8",
          content: "Count me in! I'll bring my notes and the textbook solutions manual.",
          author: "Kevin Lee",
          authorRole: "student",
          timestamp: "15 minutes ago",
          upvotes: 2,
          hasUpvoted: false,
          isAccepted: false,
          isModerator: false,
        },
      ],
    },
    {
      id: "5",
      title: "Campus WiFi keeps disconnecting in dorms",
      content:
        "Is anyone else having issues with the campus WiFi in the residence halls? Mine keeps dropping every few minutes, especially in the evening.",
      category: "campus-tips",
      author: "Nina Patel",
      authorRole: "student",
      timestamp: "1 day ago",
      upvotes: 15,
      hasUpvoted: false,
      views: 67,
      status: "answered",
      isUrgent: false,
      tags: ["wifi", "dorms", "connection issues", "technical"],
      answers: [
        {
          id: "a9",
          content:
            "This is a known issue we're working on. Try connecting to the 'Campus-5G' network instead of the regular 'Campus-WiFi'. It should be more stable. If problems persist, contact IT support.",
          author: "IT Support",
          authorRole: "moderator",
          timestamp: "20 hours ago",
          upvotes: 12,
          hasUpvoted: false,
          isAccepted: true,
          isModerator: true,
        },
        {
          id: "a10",
          content: "The 5G network worked for me! Thanks for the tip.",
          author: "Carlos Rodriguez",
          authorRole: "student",
          timestamp: "18 hours ago",
          upvotes: 4,
          hasUpvoted: false,
          isAccepted: false,
          isModerator: false,
        },
      ],
    },
  ]

  const getCategoryIcon = (category: Question["category"]) => {
    switch (category) {
      case "academics":
        return BookOpen
      case "events":
        return Calendar
      case "campus-tips":
        return MapPin
      default:
        return HelpCircle
    }
  }

  const getCategoryColor = (category: Question["category"]) => {
    switch (category) {
      case "academics":
        return "bg-blue-500"
      case "events":
        return "bg-purple-500"
      case "campus-tips":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: Question["status"]) => {
    switch (status) {
      case "answered":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getRoleColor = (role: Answer["authorRole"]) => {
    switch (role) {
      case "teacher":
        return "bg-purple-100 text-purple-800"
      case "moderator":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = filterCategory === "all" || question.category === filterCategory
    const matchesStatus = filterStatus === "all" || question.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      case "popular":
        return b.upvotes - a.upvotes
      case "unanswered":
        return a.answers.length - b.answers.length
      case "most-viewed":
        return b.views - a.views
      default:
        return 0
    }
  })

  const handleUpvote = (questionId: string, answerId?: string) => {
    // In a real app, this would make an API call
    console.log("Upvoting:", { questionId, answerId })
  }

  const handleSubmitQuestion = () => {
    // In a real app, this would make an API call
    console.log("Submitting question:", questionForm)
    setShowAskForm(false)
    setQuestionForm({
      title: "",
      content: "",
      category: "",
      tags: "",
      isUrgent: false,
    })
  }

  const handleSubmitAnswer = () => {
    if (!newAnswer.trim() || !selectedQuestion) return
    // In a real app, this would make an API call
    console.log("Submitting answer:", { questionId: selectedQuestion.id, content: newAnswer })
    setNewAnswer("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Peer Support & Q&A
          </DialogTitle>
          <DialogDescription>Get help from fellow students, teachers, and moderators</DialogDescription>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 border-r bg-muted/30 p-4 overflow-y-auto">
            {/* Ask Question Button */}
            <Button className="w-full mb-4" onClick={() => setShowAskForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ask Question
            </Button>

            {/* Search and Filters */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
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
                  <SelectItem value="academics">Academics</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="campus-tips">Campus Tips</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Questions</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="answered">Answered</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="unanswered">Unanswered First</SelectItem>
                  <SelectItem value="most-viewed">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Questions List */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Questions ({sortedQuestions.length})
              </h3>
              {sortedQuestions.map((question) => {
                const Icon = getCategoryIcon(question.category)
                return (
                  <Card
                    key={question.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedQuestion?.id === question.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedQuestion(question)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${getCategoryColor(question.category)} text-white flex-shrink-0`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-medium text-sm line-clamp-2">{question.title}</p>
                            {question.isUrgent && (
                              <Badge variant="destructive" className="text-xs ml-2">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(question.status)} variant="secondary">
                              {question.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs capitalize">
                              {question.category.replace("-", " ")}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <ArrowUp className="h-3 w-3" />
                              {question.upvotes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {question.answers.length}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {question.views}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{question.timestamp}</span>
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
            {selectedQuestion ? (
              <div className="p-6">
                {/* Question Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getCategoryColor(selectedQuestion.category)} text-white`}>
                      {(() => {
                        const Icon = getCategoryIcon(selectedQuestion.category)
                        return <Icon className="h-6 w-6" />
                      })()}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold">{selectedQuestion.title}</h1>
                        {selectedQuestion.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Asked by {selectedQuestion.author}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {selectedQuestion.timestamp}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {selectedQuestion.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedQuestion(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Question Status */}
                <div className="flex items-center gap-4 mb-6">
                  <Badge className={getStatusColor(selectedQuestion.status)} variant="secondary">
                    {selectedQuestion.status}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {selectedQuestion.category.replace("-", " ")}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpvote(selectedQuestion.id)}
                      className={selectedQuestion.hasUpvoted ? "bg-primary/10" : ""}
                    >
                      <ArrowUp className="h-4 w-4 mr-1" />
                      {selectedQuestion.upvotes}
                    </Button>
                  </div>
                </div>

                {/* Question Content */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">{selectedQuestion.content}</p>
                    {selectedQuestion.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedQuestion.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Answers Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Answers ({selectedQuestion.answers.length})</h3>
                  <div className="space-y-4">
                    {selectedQuestion.answers.map((answer) => (
                      <Card key={answer.id} className={answer.isAccepted ? "border-green-200 bg-green-50" : ""}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpvote(selectedQuestion.id, answer.id)}
                                className={answer.hasUpvoted ? "bg-primary/10" : ""}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <span className="text-sm font-medium">{answer.upvotes}</span>
                              {answer.isAccepted && <CheckCircle className="h-4 w-4 text-green-600" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">{answer.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm">{answer.author}</span>
                                <Badge className={getRoleColor(answer.authorRole)} variant="secondary">
                                  {answer.authorRole}
                                </Badge>
                                {answer.isModerator && <Star className="h-3 w-3 text-yellow-500" />}
                                <span className="text-xs text-muted-foreground">{answer.timestamp}</span>
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed">{answer.content}</p>
                              {answer.isAccepted && (
                                <div className="flex items-center gap-1 mt-2 text-green-600">
                                  <CheckCircle className="h-3 w-3" />
                                  <span className="text-xs font-medium">Accepted Answer</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Add Answer */}
                {selectedQuestion.status !== "closed" && (
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Your Answer</h4>
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Share your knowledge and help your fellow students..."
                          value={newAnswer}
                          onChange={(e) => setNewAnswer(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-end">
                          <Button onClick={handleSubmitAnswer} disabled={!newAnswer.trim()}>
                            <Send className="h-4 w-4 mr-2" />
                            Post Answer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center p-6">
                <div>
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Question</h3>
                  <p className="text-muted-foreground">
                    Choose a question from the sidebar to view details and answers, or ask a new question.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ask Question Dialog */}
        <Dialog open={showAskForm} onOpenChange={setShowAskForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ask a Question</DialogTitle>
              <DialogDescription>Get help from your fellow students, teachers, and moderators</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Question Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., How do I solve integration by parts problems?"
                  value={questionForm.title}
                  onChange={(e) => setQuestionForm({ ...questionForm, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={questionForm.category}
                  onValueChange={(value) => setQuestionForm({ ...questionForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academics">Academics</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="campus-tips">Campus Tips</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content">Question Details *</Label>
                <Textarea
                  id="content"
                  placeholder="Provide as much detail as possible to help others understand your question..."
                  value={questionForm.content}
                  onChange={(e) => setQuestionForm({ ...questionForm, content: e.target.value })}
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (optional)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., calculus, integration, math201 (separate with commas)"
                  value={questionForm.tags}
                  onChange={(e) => setQuestionForm({ ...questionForm, tags: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={questionForm.isUrgent}
                  onChange={(e) => setQuestionForm({ ...questionForm, isUrgent: e.target.checked })}
                />
                <Label htmlFor="urgent" className="text-sm">
                  Mark as urgent (for time-sensitive questions)
                </Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAskForm(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitQuestion}
                  disabled={!questionForm.title || !questionForm.content || !questionForm.category}
                >
                  Ask Question
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  )
}
