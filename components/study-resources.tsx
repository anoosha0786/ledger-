"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Download, Upload, Search, Star, Eye, Calendar, User } from "lucide-react"

interface StudyResourcesProps {
  isOpen: boolean
  onClose: () => void
}

export function StudyResources({ isOpen, onClose }: StudyResourcesProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const resources = [
    {
      id: 1,
      title: "Advanced Mathematics Notes",
      subject: "Mathematics",
      type: "notes",
      author: "Prof. Smith",
      uploadDate: "2024-12-10",
      downloads: 245,
      rating: 4.8,
      size: "2.3 MB",
      format: "PDF",
    },
    {
      id: 2,
      title: "Physics Lab Manual",
      subject: "Physics",
      type: "manual",
      author: "Dr. Johnson",
      uploadDate: "2024-12-08",
      downloads: 189,
      rating: 4.6,
      size: "5.1 MB",
      format: "PDF",
    },
    {
      id: 3,
      title: "Chemistry Practice Problems",
      subject: "Chemistry",
      type: "exercises",
      author: "Sarah Chen",
      uploadDate: "2024-12-05",
      downloads: 156,
      rating: 4.9,
      size: "1.8 MB",
      format: "PDF",
    },
    {
      id: 4,
      title: "History Timeline Presentation",
      subject: "History",
      type: "presentation",
      author: "Mike Wilson",
      uploadDate: "2024-12-03",
      downloads: 98,
      rating: 4.4,
      size: "12.5 MB",
      format: "PPTX",
    },
  ]

  const subjects = ["all", "Mathematics", "Physics", "Chemistry", "History", "Biology", "English"]
  const types = ["all", "notes", "manual", "exercises", "presentation", "textbook", "video"]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === "all" || resource.subject === selectedSubject
    const matchesType = selectedType === "all" || resource.type === selectedType

    return matchesSearch && matchesSubject && matchesType
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-content max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-serif">
            <BookOpen className="h-5 w-5 text-primary" />
            Study Resources & Notes Hub
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="browse" className="btn-vintage">
              Browse Resources
            </TabsTrigger>
            <TabsTrigger value="upload" className="btn-vintage">
              Upload Resource
            </TabsTrigger>
            <TabsTrigger value="my-uploads" className="btn-vintage">
              My Uploads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card className="vintage-card">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search resources, authors, or topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-vintage pl-10"
                    />
                  </div>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="input-vintage px-3 py-2 rounded-lg"
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject === "all" ? "All Subjects" : subject}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="input-vintage px-3 py-2 rounded-lg"
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="vintage-card hover-lift cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-sm font-serif line-clamp-2">{resource.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="badge-vintage text-xs">{resource.subject}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {resource.rating}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {resource.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(resource.uploadDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center justify-between">
                        <span>
                          {resource.size} • {resource.format}
                        </span>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {resource.downloads}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="btn-vintage flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="btn-vintage bg-transparent">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <Card className="vintage-card">
                <CardContent className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-serif mb-2">No resources found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria or upload a new resource.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card className="vintage-card">
              <CardHeader>
                <CardTitle className="font-serif">Upload New Resource</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Resource Title</label>
                    <Input placeholder="Enter resource title" className="input-vintage" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <select className="input-vintage w-full px-3 py-2 rounded-lg">
                      {subjects.slice(1).map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Resource Type</label>
                    <select className="input-vintage w-full px-3 py-2 rounded-lg">
                      {types.slice(1).map((type) => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Class/Group</label>
                    <Input placeholder="e.g., Grade 12, Physics Lab" className="input-vintage" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    placeholder="Describe the resource content and how it can help students..."
                    className="input-vintage w-full px-3 py-2 rounded-lg min-h-[100px] resize-none"
                  />
                </div>

                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop your file here, or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX, PPTX, TXT (Max 50MB)</p>
                  <Button variant="outline" className="btn-vintage mt-4 bg-transparent">
                    Choose File
                  </Button>
                </div>

                <Button className="btn-vintage w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resource
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-uploads" className="space-y-6">
            <Card className="vintage-card">
              <CardHeader>
                <CardTitle className="font-serif">My Uploaded Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-serif mb-2">No uploads yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Share your knowledge by uploading study materials for your classmates.
                  </p>
                  <Button className="btn-vintage">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Your First Resource
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
