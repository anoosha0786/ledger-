"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Search,
  Pin,
  PinOff,
  Edit,
  Trash2,
  FileText,
  ImageIcon,
  FileSpreadsheet,
  Download,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  pinned: boolean
  createdAt: Date
  updatedAt: Date
}

interface Resource {
  id: string
  title: string
  type: "PDF" | "DOCX" | "PPT" | "Image" | "Link"
  category: "Academics" | "Clubs" | "Competitions" | "General"
  size: string
  uploadedBy: string
  uploadedAt: Date
}

const sampleResources: Resource[] = [
  {
    id: "1",
    title: "Newton's Laws – Quick Revision Notes",
    type: "PDF",
    category: "Academics",
    size: "250 KB",
    uploadedBy: "Physics Dept",
    uploadedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Integration Formulas Sheet",
    type: "DOCX",
    category: "Academics",
    size: "120 KB",
    uploadedBy: "Math Dept",
    uploadedAt: new Date("2024-01-14"),
  },
  {
    id: "3",
    title: "Semester 1 Exam Timetable",
    type: "PDF",
    category: "Academics",
    size: "180 KB",
    uploadedBy: "Admin Office",
    uploadedAt: new Date("2024-01-13"),
  },
  {
    id: "4",
    title: "Script for Annual Play",
    type: "PDF",
    category: "Clubs",
    size: "500 KB",
    uploadedBy: "Drama Club",
    uploadedAt: new Date("2024-01-12"),
  },
  {
    id: "5",
    title: "Coding Competition Guidelines",
    type: "PDF",
    category: "Competitions",
    size: "320 KB",
    uploadedBy: "CS Society",
    uploadedAt: new Date("2024-01-11"),
  },
  {
    id: "6",
    title: "Chemistry Lab Safety Protocols",
    type: "PPT",
    category: "Academics",
    size: "1.2 MB",
    uploadedBy: "Chemistry Dept",
    uploadedAt: new Date("2024-01-10"),
  },
]

export function NotesResources() {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [newNote, setNewNote] = useState({ title: "", content: "", tags: "" })
  const [expandedSections, setExpandedSections] = useState({
    academics: true,
    clubs: true,
    competitions: true,
    general: true,
  })

  useEffect(() => {
    const savedNotes = localStorage.getItem("campus-notes")
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes)
    localStorage.setItem("campus-notes", JSON.stringify(updatedNotes))
  }

  const addNote = () => {
    if (!newNote.title.trim()) return

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      pinned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    saveNotes([note, ...notes])
    setNewNote({ title: "", content: "", tags: "" })
    setIsAddingNote(false)
  }

  const updateNote = (updatedNote: Note) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? { ...updatedNote, updatedAt: new Date() } : note,
    )
    saveNotes(updatedNotes)
    setEditingNote(null)
  }

  const deleteNote = (id: string) => {
    saveNotes(notes.filter((note) => note.id !== id))
  }

  const togglePin = (id: string) => {
    const updatedNotes = notes.map((note) => (note.id === id ? { ...note, pinned: !note.pinned } : note))
    saveNotes(updatedNotes)
  }

  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesSearch
    })
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4 text-red-500" />
      case "DOCX":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "PPT":
        return <FileSpreadsheet className="h-4 w-4 text-orange-500" />
      case "Image":
        return <ImageIcon className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academics":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Clubs":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Competitions":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const filteredResources =
    selectedCategory === "All"
      ? sampleResources
      : sampleResources.filter((resource) => resource.category === selectedCategory)

  const resourcesByCategory = {
    academics: sampleResources.filter((r) => r.category === "Academics"),
    clubs: sampleResources.filter((r) => r.category === "Clubs"),
    competitions: sampleResources.filter((r) => r.category === "Competitions"),
    general: sampleResources.filter((r) => r.category === "General"),
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="space-y-6">
      {/* My Notes Section */}
      <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-slate-900 dark:text-slate-100">My Notes</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Personal study notes and reminders
              </CardDescription>
            </div>
            <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Note
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Note</DialogTitle>
                  <DialogDescription>Add a new personal note with tags for easy organization.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Note title..."
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Write your note content here..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    rows={4}
                  />
                  <Input
                    placeholder="Tags (comma separated)..."
                    value={newNote.tags}
                    onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button onClick={addNote} className="flex-1">
                      Save Note
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingNote(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredNotes.length === 0 ? (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No notes yet. Create your first note!</p>
                </div>
              ) : (
                filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {note.pinned && <Pin className="h-3 w-3 text-primary" />}
                          <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate">
                            {note.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">{note.content}</p>
                        {note.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {note.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <Button variant="ghost" size="sm" onClick={() => togglePin(note.id)} className="h-6 w-6 p-0">
                          {note.pinned ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setEditingNote(note)} className="h-6 w-6 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNote(note.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shared Resources Section */}
      <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Shared Resources</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Study materials and documents shared by teachers and students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto space-y-3">
            {/* Academics Section */}
            <div className="border border-slate-200 dark:border-slate-600 rounded-lg">
              <button
                onClick={() => toggleSection("academics")}
                className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Academics</Badge>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {resourcesByCategory.academics.length} files
                  </span>
                </div>
                {expandedSections.academics ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {expandedSections.academics && (
                <div className="border-t border-slate-200 dark:border-slate-600 p-3 space-y-2">
                  {resourcesByCategory.academics.map((resource) => (
                    <div
                      key={resource.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      {getFileIcon(resource.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate">
                          {resource.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500 dark:text-slate-400">{resource.size}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">•</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{resource.uploadedBy}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Clubs Section */}
            <div className="border border-slate-200 dark:border-slate-600 rounded-lg">
              <button
                onClick={() => toggleSection("clubs")}
                className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Clubs</Badge>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {resourcesByCategory.clubs.length} files
                  </span>
                </div>
                {expandedSections.clubs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {expandedSections.clubs && (
                <div className="border-t border-slate-200 dark:border-slate-600 p-3 space-y-2">
                  {resourcesByCategory.clubs.map((resource) => (
                    <div
                      key={resource.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      {getFileIcon(resource.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate">
                          {resource.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500 dark:text-slate-400">{resource.size}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">•</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{resource.uploadedBy}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Competitions Section */}
            <div className="border border-slate-200 dark:border-slate-600 rounded-lg">
              <button
                onClick={() => toggleSection("competitions")}
                className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    Competitions
                  </Badge>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {resourcesByCategory.competitions.length} files
                  </span>
                </div>
                {expandedSections.competitions ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {expandedSections.competitions && (
                <div className="border-t border-slate-200 dark:border-slate-600 p-3 space-y-2">
                  {resourcesByCategory.competitions.map((resource) => (
                    <div
                      key={resource.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      {getFileIcon(resource.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate">
                          {resource.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500 dark:text-slate-400">{resource.size}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">•</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{resource.uploadedBy}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Note Dialog */}
      {editingNote && (
        <Dialog open={!!editingNote} onOpenChange={() => setEditingNote(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
              <DialogDescription>Update your note content and tags.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Note title..."
                value={editingNote.title}
                onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
              />
              <Textarea
                placeholder="Write your note content here..."
                value={editingNote.content}
                onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                rows={4}
              />
              <Input
                placeholder="Tags (comma separated)..."
                value={editingNote.tags.join(", ")}
                onChange={(e) =>
                  setEditingNote({
                    ...editingNote,
                    tags: e.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                  })
                }
              />
              <div className="flex gap-2">
                <Button onClick={() => updateNote(editingNote)} className="flex-1">
                  Update Note
                </Button>
                <Button variant="outline" onClick={() => setEditingNote(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
