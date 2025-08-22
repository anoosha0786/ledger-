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
  MapPin,
  X,
  Plus,
  Package,
  MessageCircle,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Eye,
  Smartphone,
  BookOpen,
  Backpack,
  Headphones,
  Key,
} from "lucide-react"

interface LostFoundItem {
  id: string
  title: string
  description: string
  category: "electronics" | "books" | "bags" | "accessories" | "keys" | "clothing" | "other"
  type: "lost" | "found"
  location: string
  dateReported: string
  reportedBy: string
  contactInfo: {
    email: string
    phone?: string
    preferredContact: "email" | "phone"
  }
  images: string[]
  status: "active" | "claimed" | "expired"
  tags: string[]
  potentialMatches?: string[]
  isUrgent: boolean
}

interface LostFoundProps {
  isOpen: boolean
  onClose: () => void
}

export function LostFound({ isOpen, onClose }: LostFoundProps) {
  const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("browse")
  const [showReportForm, setShowReportForm] = useState(false)
  const [reportType, setReportType] = useState<"lost" | "found">("lost")

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    contactEmail: "",
    contactPhone: "",
    preferredContact: "email",
    isUrgent: false,
  })

  const items: LostFoundItem[] = [
    {
      id: "1",
      title: "Blue Water Bottle",
      description:
        "Stainless steel water bottle with university logo. Has a small dent on the bottom and a sticker from the hiking club.",
      category: "other",
      type: "lost",
      location: "Library - 2nd Floor Study Area",
      dateReported: "2 hours ago",
      reportedBy: "Sarah Chen",
      contactInfo: {
        email: "sarah.chen@university.edu",
        phone: "+1 (555) 123-4567",
        preferredContact: "email",
      },
      images: ["/blue-university-water-bottle.png"],
      status: "active",
      tags: ["water bottle", "blue", "university logo", "hiking club"],
      isUrgent: false,
    },
    {
      id: "2",
      title: "iPhone 14 Pro",
      description:
        "Black iPhone 14 Pro with a clear case. Screen protector is slightly cracked. Last seen in the cafeteria during lunch.",
      category: "electronics",
      type: "lost",
      location: "Student Cafeteria",
      dateReported: "5 hours ago",
      reportedBy: "Mike Johnson",
      contactInfo: {
        email: "mike.j@university.edu",
        phone: "+1 (555) 987-6543",
        preferredContact: "phone",
      },
      images: ["/black-iphone-14-pro-clear-case.png"],
      status: "active",
      tags: ["iphone", "black", "clear case", "cracked screen protector"],
      potentialMatches: ["3"],
      isUrgent: true,
    },
    {
      id: "3",
      title: "Found: Black Smartphone",
      description:
        "Found a black smartphone in the cafeteria. It's in a clear protective case and appears to be an iPhone. The screen has some minor damage.",
      category: "electronics",
      type: "found",
      location: "Student Cafeteria - Table 12",
      dateReported: "3 hours ago",
      reportedBy: "Emma Wilson",
      contactInfo: {
        email: "emma.wilson@university.edu",
        preferredContact: "email",
      },
      images: ["/found-black-iphone.png"],
      status: "active",
      tags: ["iphone", "black", "clear case", "screen damage"],
      potentialMatches: ["2"],
      isUrgent: false,
    },
    {
      id: "4",
      title: "Calculus Textbook",
      description:
        "Stewart's Calculus 8th Edition. Has highlighting and notes throughout. Name 'Alex Kumar' written inside the front cover.",
      category: "books",
      type: "lost",
      location: "Mathematics Building - Room 205",
      dateReported: "1 day ago",
      reportedBy: "Alex Kumar",
      contactInfo: {
        email: "alex.kumar@university.edu",
        preferredContact: "email",
      },
      images: ["/stewart-calculus-8th-edition.png"],
      status: "active",
      tags: ["calculus", "textbook", "stewart", "8th edition", "highlighted"],
      isUrgent: false,
    },
    {
      id: "5",
      title: "Red Backpack",
      description:
        "Medium-sized red backpack with laptop compartment. Contains notebooks and a pencil case. Has a small keychain attached.",
      category: "bags",
      type: "lost",
      location: "Sports Complex - Locker Room",
      dateReported: "6 hours ago",
      reportedBy: "David Park",
      contactInfo: {
        email: "david.park@university.edu",
        phone: "+1 (555) 456-7890",
        preferredContact: "phone",
      },
      images: ["/red-laptop-backpack.png"],
      status: "active",
      tags: ["backpack", "red", "laptop compartment", "keychain"],
      isUrgent: false,
    },
    {
      id: "6",
      title: "Found: Set of Keys",
      description:
        "Found a set of keys with a blue lanyard. Includes what appears to be dorm keys and a car key. Found near the main entrance.",
      category: "keys",
      type: "found",
      location: "Main Building - Entrance",
      dateReported: "4 hours ago",
      reportedBy: "Lisa Zhang",
      contactInfo: {
        email: "lisa.zhang@university.edu",
        preferredContact: "email",
      },
      images: ["/placeholder-gj95z.png"],
      status: "active",
      tags: ["keys", "blue lanyard", "dorm keys", "car key"],
      isUrgent: false,
    },
  ]

  const getCategoryIcon = (category: LostFoundItem["category"]) => {
    switch (category) {
      case "electronics":
        return Smartphone
      case "books":
        return BookOpen
      case "bags":
        return Backpack
      case "accessories":
        return Headphones
      case "keys":
        return Key
      case "clothing":
        return Package
      default:
        return Package
    }
  }

  const getCategoryColor = (category: LostFoundItem["category"]) => {
    switch (category) {
      case "electronics":
        return "bg-blue-500"
      case "books":
        return "bg-green-500"
      case "bags":
        return "bg-purple-500"
      case "accessories":
        return "bg-orange-500"
      case "keys":
        return "bg-yellow-500"
      case "clothing":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeColor = (type: LostFoundItem["type"]) => {
    return type === "lost" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    const matchesType = filterType === "all" || item.type === filterType

    return matchesSearch && matchesCategory && matchesType
  })

  const handleSubmitReport = () => {
    // In a real app, this would make an API call
    console.log("Submitting report:", { ...formData, type: reportType })
    setShowReportForm(false)
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      contactEmail: "",
      contactPhone: "",
      preferredContact: "email",
      isUrgent: false,
    })
  }

  const handleContact = (item: LostFoundItem) => {
    // In a real app, this would open the appropriate contact method
    if (item.contactInfo.preferredContact === "email") {
      window.location.href = `mailto:${item.contactInfo.email}`
    } else if (item.contactInfo.phone) {
      window.location.href = `tel:${item.contactInfo.phone}`
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Lost & Found
          </DialogTitle>
          <DialogDescription>Report lost items or help others find their belongings</DialogDescription>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 border-r bg-muted/30 p-4 overflow-y-auto">
            {/* Action Buttons */}
            <div className="space-y-2 mb-4">
              <Button
                className="w-full"
                onClick={() => {
                  setReportType("lost")
                  setShowReportForm(true)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Report Lost Item
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setReportType("found")
                  setShowReportForm(true)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Report Found Item
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
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
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="bags">Bags</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="keys">Keys</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Lost & Found</SelectItem>
                  <SelectItem value="lost">Lost Items</SelectItem>
                  <SelectItem value="found">Found Items</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Items ({filteredItems.length})
              </h3>
              {filteredItems.map((item) => {
                const Icon = getCategoryIcon(item.category)
                return (
                  <Card
                    key={item.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedItem?.id === item.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getCategoryColor(item.category)} text-white flex-shrink-0`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                            {item.isUrgent && <AlertCircle className="h-3 w-3 text-red-500 flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getTypeColor(item.type)} variant="secondary">
                              {item.type === "lost" ? "Lost" : "Found"}
                            </Badge>
                            <Badge variant="outline" className="text-xs capitalize">
                              {item.category}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.dateReported}
                            </span>
                            {item.potentialMatches && item.potentialMatches.length > 0 && (
                              <Badge variant="default" className="text-xs">
                                Potential Match
                              </Badge>
                            )}
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
            {selectedItem ? (
              <div className="p-6">
                {/* Item Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getCategoryColor(selectedItem.category)} text-white`}>
                      {(() => {
                        const Icon = getCategoryIcon(selectedItem.category)
                        return <Icon className="h-6 w-6" />
                      })()}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold">{selectedItem.title}</h1>
                        {selectedItem.isUrgent && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Badge className={getTypeColor(selectedItem.type)} variant="secondary">
                          {selectedItem.type === "lost" ? "Lost Item" : "Found Item"}
                        </Badge>
                        <span>Reported by {selectedItem.reportedBy}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {selectedItem.dateReported}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Potential Matches Alert */}
                {selectedItem.potentialMatches && selectedItem.potentialMatches.length > 0 && (
                  <Card className="mb-6 border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-800">Potential Match Found!</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        We found {selectedItem.potentialMatches.length} item(s) that might match this description. Check
                        the details below and contact the reporter if it's your item.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Item Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Description */}
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Description</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedItem.description}</p>
                    </CardContent>
                  </Card>

                  {/* Location & Details */}
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Location</p>
                            <p className="text-sm text-muted-foreground">{selectedItem.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Category</p>
                            <p className="text-sm text-muted-foreground capitalize">{selectedItem.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Reported</p>
                            <p className="text-sm text-muted-foreground">{selectedItem.dateReported}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Images */}
                {selectedItem.images.length > 0 && (
                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Photos</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedItem.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`${selectedItem.title} - Photo ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                              <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Tags */}
                {selectedItem.tags.length > 0 && (
                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Contact Information */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{selectedItem.reportedBy.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{selectedItem.reportedBy}</p>
                          <p className="text-xs text-muted-foreground">
                            Prefers {selectedItem.contactInfo.preferredContact} contact
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleContact(selectedItem)}>
                          <Mail className="h-4 w-4 mr-2" />
                          Contact via Email
                        </Button>
                        {selectedItem.contactInfo.phone && (
                          <Button variant="outline" size="sm" onClick={() => handleContact(selectedItem)}>
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center p-6">
                <div>
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select an Item</h3>
                  <p className="text-muted-foreground">
                    Choose an item from the sidebar to view details and contact information.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Report Form Dialog */}
        <Dialog open={showReportForm} onOpenChange={setShowReportForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Report {reportType === "lost" ? "Lost" : "Found"} Item</DialogTitle>
              <DialogDescription>
                Provide as much detail as possible to help {reportType === "lost" ? "others find" : "reunite"} your
                item.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Item Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Blue Water Bottle, iPhone 14 Pro"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="bags">Bags</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="keys">Keys</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description including color, size, brand, distinctive features..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="Where was it lost/found? Be specific."
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Preferred Contact Method</Label>
                <Select
                  value={formData.preferredContact}
                  onValueChange={(value: "email" | "phone") => setFormData({ ...formData, preferredContact: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={formData.isUrgent}
                  onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                />
                <Label htmlFor="urgent" className="text-sm">
                  Mark as urgent (important documents, keys, etc.)
                </Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowReportForm(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReport}
                  disabled={
                    !formData.title ||
                    !formData.description ||
                    !formData.category ||
                    !formData.location ||
                    !formData.contactEmail
                  }
                >
                  Submit Report
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  )
}
