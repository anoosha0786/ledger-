"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, MapPin, Bell, Vote, Package, HelpCircle, Calendar, Clock, Users, X } from "lucide-react"

interface GlobalSearchProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (module: string, item?: any) => void
}

export function GlobalSearch({ isOpen, onClose, onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [recentSearches, setRecentSearches] = useState([
    "Library hours",
    "Basketball court",
    "Math assignment",
    "Lost phone",
  ])

  // Mock search data
  const searchData = [
    // Buildings & Locations
    { type: "location", title: "Main Library", category: "Building", icon: MapPin, module: "map" },
    { type: "location", title: "Sports Complex", category: "Building", icon: MapPin, module: "map" },
    { type: "location", title: "Lab 2", category: "Building", icon: MapPin, module: "map" },
    { type: "location", title: "Cafeteria", category: "Building", icon: MapPin, module: "map" },

    // Notices
    {
      type: "notice",
      title: "Math Assignment Due Friday",
      category: "Academic",
      icon: Bell,
      module: "notices",
      urgent: true,
    },
    { type: "notice", title: "Annual Sports Day", category: "Events", icon: Bell, module: "notices" },
    { type: "notice", title: "Library Hours Extended", category: "General", icon: Bell, module: "notices" },

    // Polls
    { type: "poll", title: "Best Cafeteria Food", category: "Student Life", icon: Vote, module: "polls", votes: 156 },
    { type: "poll", title: "Preferred Study Hours", category: "Academic", icon: Vote, module: "polls", votes: 89 },

    // Lost & Found
    { type: "lost", title: "Black iPhone 14 Pro", category: "Electronics", icon: Package, module: "lostfound" },
    { type: "found", title: "Blue Water Bottle", category: "Personal Items", icon: Package, module: "lostfound" },

    // Peer Support
    {
      type: "question",
      title: "Help with Calculus homework",
      category: "Academic",
      icon: HelpCircle,
      module: "peersupport",
      answers: 3,
    },
    {
      type: "question",
      title: "Best study spots on campus",
      category: "Campus Tips",
      icon: HelpCircle,
      module: "peersupport",
      answers: 12,
    },

    // Events
    { type: "event", title: "Science Fair", category: "Academic", icon: Calendar, module: "events", date: "Today" },
    {
      type: "event",
      title: "Basketball Match",
      category: "Sports",
      icon: Calendar,
      module: "events",
      date: "Tomorrow",
    },
  ]

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 3)])
    }
  }

  const handleResultClick = (result: any) => {
    onNavigate(result.module, result)
    onClose()
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case "location":
        return MapPin
      case "notice":
        return Bell
      case "poll":
        return Vote
      case "lost":
      case "found":
        return Package
      case "question":
        return HelpCircle
      case "event":
        return Calendar
      default:
        return Search
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Campus
          </DialogTitle>
          <DialogDescription>Find buildings, events, notices, polls, and more</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for anything on campus..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                    onClick={() => handleSearch(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {results.length > 0 && (
            <div className="max-h-96 overflow-y-auto space-y-2">
              <h3 className="text-sm font-medium">Search Results ({results.length})</h3>
              {results.map((result, index) => {
                const IconComponent = getResultIcon(result.type)
                return (
                  <Card
                    key={index}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleResultClick(result)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-4 w-4 text-muted-foreground mt-0.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-sm">{result.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {result.category}
                                </Badge>
                                {result.urgent && (
                                  <Badge variant="destructive" className="text-xs">
                                    Urgent
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {result.votes && (
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {result.votes}
                                </span>
                              )}
                              {result.answers && (
                                <span className="flex items-center gap-1">
                                  <HelpCircle className="h-3 w-3" />
                                  {result.answers} answers
                                </span>
                              )}
                              {result.date && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {result.date}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* No Results */}
          {query && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No results found for "{query}"</p>
              <p className="text-sm">Try searching for buildings, events, notices, or polls</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
