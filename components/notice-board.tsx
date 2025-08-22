"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Clock,
  Calendar,
  MapPin,
  Users,
  X,
  Heart,
  MessageCircle,
  Share2,
  Bell,
  AlertTriangle,
  BookOpen,
  Megaphone,
  Send,
} from "lucide-react"

interface Notice {
  id: string
  title: string
  content: string
  category: "academic" | "events" | "clubs" | "general" | "urgent"
  author: string
  authorRole: string
  timestamp: string
  deadline?: string
  location?: string
  attendees?: number
  maxAttendees?: number
  tags: string[]
  likes: number
  comments: Comment[]
  isLiked: boolean
  canRSVP: boolean
  hasRSVPed: boolean
  priority: "low" | "medium" | "high"
}

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  avatar?: string
}

interface NoticeBoardProps {
  isOpen: boolean
  onClose: () => void
}

export function NoticeBoard({ isOpen, onClose }: NoticeBoardProps) {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const notices: Notice[] = [
    {
      id: "1",
      title: "Math Assignment Due Friday",
      content:
        "Final submission for Calculus II assignment. Please submit your solutions to the integration problems via the student portal. Late submissions will incur a 10% penalty per day.",
      category: "academic",
      author: "Dr. Sarah Johnson",
      authorRole: "Mathematics Professor",
      timestamp: "2 hours ago",
      deadline: "Friday, 5:00 PM",
      tags: ["calculus", "assignment", "deadline"],
      likes: 12,
      comments: [
        {
          id: "c1",
          author: "Alex Kumar",
          content: "Can we get an extension? The problems are quite challenging.",
          timestamp: "1 hour ago",
        },
        {
          id: "c2",
          author: "Dr. Sarah Johnson",
          content: "The deadline is firm, but office hours are available Tuesday and Thursday.",
          timestamp: "45 minutes ago",
        },
      ],
      isLiked: false,
      canRSVP: false,
      hasRSVPed: false,
      priority: "high",
    },
    {
      id: "2",
      title: "Annual Sports Day - Main Field",
      content:
        "Join us for the annual inter-department sports competition! Events include basketball, soccer, track and field, and swimming. Registration is now open.",
      category: "events",
      author: "Sports Committee",
      authorRole: "Student Organization",
      timestamp: "4 hours ago",
      location: "Main Sports Complex",
      attendees: 89,
      maxAttendees: 200,
      tags: ["sports", "competition", "registration"],
      likes: 45,
      comments: [
        {
          id: "c3",
          author: "Mike Chen",
          content: "Excited for the basketball tournament! When do we find out the schedule?",
          timestamp: "2 hours ago",
        },
      ],
      isLiked: true,
      canRSVP: true,
      hasRSVPed: false,
      priority: "medium",
    },
    {
      id: "3",
      title: "Library Hours Extended During Finals",
      content:
        "The Central Library will be open 24/7 starting next week through the end of finals. Additional study spaces and computer labs will also be available.",
      category: "general",
      author: "Library Administration",
      authorRole: "Staff",
      timestamp: "1 day ago",
      tags: ["library", "finals", "study"],
      likes: 78,
      comments: [],
      isLiked: false,
      canRSVP: false,
      hasRSVPed: false,
      priority: "medium",
    },
    {
      id: "4",
      title: "Emergency: Campus WiFi Maintenance",
      content:
        "Campus-wide WiFi will be down for maintenance today from 2:00 PM to 4:00 PM. Please plan accordingly for any online classes or assignments.",
      category: "urgent",
      author: "IT Services",
      authorRole: "Technical Staff",
      timestamp: "30 minutes ago",
      tags: ["wifi", "maintenance", "emergency"],
      likes: 23,
      comments: [
        {
          id: "c4",
          author: "Emma Wilson",
          content: "Will the library computers still work during this time?",
          timestamp: "20 minutes ago",
        },
      ],
      isLiked: false,
      canRSVP: false,
      hasRSVPed: false,
      priority: "high",
    },
    {
      id: "5",
      title: "Photography Club Meeting",
      content:
        "Weekly meeting to discuss upcoming photo exhibition. We'll be reviewing submissions and planning the gallery setup. New members welcome!",
      category: "clubs",
      author: "Photography Club",
      authorRole: "Student Club",
      timestamp: "6 hours ago",
      location: "Art Building, Room 205",
      attendees: 15,
      maxAttendees: 25,
      tags: ["photography", "exhibition", "meeting"],
      likes: 18,
      comments: [],
      isLiked: false,
      canRSVP: true,
      hasRSVPed: true,
      priority: "low",
    },
  ]

  const getCategoryIcon = (category: Notice["category"]) => {
    switch (category) {
      case "academic":
        return BookOpen
      case "events":
        return Calendar
      case "clubs":
        return Users
      case "urgent":
        return AlertTriangle
      default:
        return Megaphone
    }
  }

  const getCategoryColor = (category: Notice["category"]) => {
    switch (category) {
      case "academic":
        return "bg-blue-500"
      case "events":
        return "bg-purple-500"
      case "clubs":
        return "bg-green-500"
      case "urgent":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: Notice["priority"]) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-yellow-200 bg-yellow-50"
      default:
        return "border-gray-200 bg-white"
    }
  }

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = filterCategory === "all" || notice.category === filterCategory
    const matchesTab = activeTab === "all" || notice.category === activeTab

    return matchesSearch && matchesCategory && matchesTab
  })

  const sortedNotices = [...filteredNotices].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      case "oldest":
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      case "popular":
        return b.likes - a.likes
      default:
        return 0
    }
  })

  const handleLike = (noticeId: string) => {
    // In a real app, this would make an API call
    console.log("Liked notice:", noticeId)
  }

  const handleRSVP = (noticeId: string) => {
    // In a real app, this would make an API call
    console.log("RSVP to notice:", noticeId)
  }

  const handleComment = (noticeId: string) => {
    if (!newComment.trim()) return
    // In a real app, this would make an API call
    console.log("Comment on notice:", noticeId, newComment)
    setNewComment("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Campus Notice Board
          </DialogTitle>
          <DialogDescription>
            Stay updated with campus announcements, events, and important information
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
                  placeholder="Search notices..."
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
                  <SelectItem value="clubs">Clubs</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all" className="text-xs">
                  All
                </TabsTrigger>
                <TabsTrigger value="urgent" className="text-xs">
                  Urgent
                </TabsTrigger>
                <TabsTrigger value="events" className="text-xs">
                  Events
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Notice List */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Notices ({sortedNotices.length})
              </h3>
              {sortedNotices.map((notice) => {
                const Icon = getCategoryIcon(notice.category)
                return (
                  <Card
                    key={notice.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedNotice?.id === notice.id ? "ring-2 ring-primary" : ""
                    } ${getPriorityColor(notice.priority)}`}
                    onClick={() => setSelectedNotice(notice)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getCategoryColor(notice.category)} text-white flex-shrink-0`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2">{notice.title}</p>
                          <p className="text-xs text-muted-foreground capitalize">{notice.category}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {notice.author}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{notice.timestamp}</span>
                          </div>
                          {notice.priority === "high" && (
                            <Badge variant="destructive" className="mt-1 text-xs">
                              High Priority
                            </Badge>
                          )}
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
            {selectedNotice ? (
              <div className="p-6">
                {/* Notice Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getCategoryColor(selectedNotice.category)} text-white`}>
                      {(() => {
                        const Icon = getCategoryIcon(selectedNotice.category)
                        return <Icon className="h-6 w-6" />
                      })()}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold mb-2">{selectedNotice.title}</h1>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          By {selectedNotice.author} • {selectedNotice.authorRole}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {selectedNotice.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedNotice(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Priority Banner */}
                {selectedNotice.priority === "high" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-red-800">High Priority Notice</span>
                    </div>
                  </div>
                )}

                {/* Notice Content */}
                <div className="prose max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed">{selectedNotice.content}</p>
                </div>

                {/* Notice Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {selectedNotice.deadline && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-red-500" />
                          <div>
                            <p className="font-medium text-sm">Deadline</p>
                            <p className="text-sm text-muted-foreground">{selectedNotice.deadline}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedNotice.location && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="font-medium text-sm">Location</p>
                            <p className="text-sm text-muted-foreground">{selectedNotice.location}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedNotice.attendees !== undefined && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="font-medium text-sm">Attendees</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedNotice.attendees}
                              {selectedNotice.maxAttendees && ` / ${selectedNotice.maxAttendees}`}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Tags */}
                {selectedNotice.tags.length > 0 && (
                  <div className="mb-6">
                    <p className="font-medium text-sm mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedNotice.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                  <Button
                    variant={selectedNotice.isLiked ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLike(selectedNotice.id)}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${selectedNotice.isLiked ? "fill-current" : ""}`} />
                    {selectedNotice.likes}
                  </Button>

                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {selectedNotice.comments.length}
                  </Button>

                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>

                  {selectedNotice.canRSVP && (
                    <Button
                      variant={selectedNotice.hasRSVPed ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleRSVP(selectedNotice.id)}
                    >
                      {selectedNotice.hasRSVPed ? "RSVP'd" : "RSVP"}
                    </Button>
                  )}

                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                </div>

                {/* Comments Section */}
                <div>
                  <h3 className="font-semibold mb-4">Comments ({selectedNotice.comments.length})</h3>

                  {/* Add Comment */}
                  <div className="flex gap-3 mb-6">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <Button
                        size="sm"
                        className="mt-2"
                        onClick={() => handleComment(selectedNotice.id)}
                        disabled={!newComment.trim()}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {selectedNotice.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted rounded-lg p-3">
                            <p className="font-medium text-sm">{comment.author}</p>
                            <p className="text-sm text-muted-foreground mt-1">{comment.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{comment.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center p-6">
                <div>
                  <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Notice</h3>
                  <p className="text-muted-foreground">
                    Choose a notice from the sidebar to view details and interact with the content.
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
