"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Filter, Navigation, Clock, Users, X, Zap, BookOpen, Utensils, Trophy, Car } from "lucide-react"

interface CampusBuilding {
  id: string
  name: string
  type: "academic" | "sports" | "dining" | "admin" | "parking" | "events"
  x: number
  y: number
  description: string
  currentEvent?: {
    name: string
    attendees: number
    endTime: string
  }
}

interface MapProps {
  isOpen: boolean
  onClose: () => void
}

export function CampusMap({ isOpen, onClose }: MapProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<CampusBuilding | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [showRoute, setShowRoute] = useState(false)

  const buildings: CampusBuilding[] = [
    {
      id: "main-hall",
      name: "Main Hall",
      type: "academic",
      x: 45,
      y: 30,
      description: "Primary lecture halls and administrative offices",
      currentEvent: {
        name: "Orientation Session",
        attendees: 150,
        endTime: "3:00 PM",
      },
    },
    {
      id: "library",
      name: "Central Library",
      type: "academic",
      x: 25,
      y: 45,
      description: "24/7 study spaces, research facilities, and digital resources",
    },
    {
      id: "lab-complex",
      name: "Science Labs",
      type: "academic",
      x: 65,
      y: 25,
      description: "Chemistry, Physics, and Biology laboratories",
      currentEvent: {
        name: "Science Fair",
        attendees: 45,
        endTime: "5:00 PM",
      },
    },
    {
      id: "sports-center",
      name: "Sports Complex",
      type: "sports",
      x: 75,
      y: 65,
      description: "Gymnasium, swimming pool, and outdoor courts",
      currentEvent: {
        name: "Basketball Match",
        attendees: 120,
        endTime: "4:30 PM",
      },
    },
    {
      id: "cafeteria",
      name: "Student Cafeteria",
      type: "dining",
      x: 35,
      y: 60,
      description: "Main dining hall with multiple food options",
    },
    {
      id: "auditorium",
      name: "Grand Auditorium",
      type: "events",
      x: 55,
      y: 50,
      description: "Large venue for concerts, plays, and major events",
    },
    {
      id: "parking-a",
      name: "Parking Area A",
      type: "parking",
      x: 15,
      y: 20,
      description: "Main student parking facility",
    },
    {
      id: "admin",
      name: "Administration",
      type: "admin",
      x: 85,
      y: 40,
      description: "Student services, registrar, and financial aid",
    },
  ]

  const getIconForType = (type: CampusBuilding["type"]) => {
    switch (type) {
      case "academic":
        return BookOpen
      case "sports":
        return Trophy
      case "dining":
        return Utensils
      case "events":
        return Zap
      case "admin":
        return Car
      case "parking":
        return Car
      default:
        return MapPin
    }
  }

  const getColorForType = (type: CampusBuilding["type"]) => {
    switch (type) {
      case "academic":
        return "bg-primary"
      case "sports":
        return "bg-orange-500"
      case "dining":
        return "bg-green-500"
      case "events":
        return "bg-purple-500"
      case "admin":
        return "bg-blue-500"
      case "parking":
        return "bg-gray-500"
      default:
        return "bg-primary"
    }
  }

  const filteredBuildings = buildings.filter((building) => {
    const matchesSearch = building.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || building.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleBuildingClick = (building: CampusBuilding) => {
    setSelectedBuilding(building)
    setShowRoute(false)
  }

  const handleGetDirections = () => {
    setShowRoute(true)
    // In a real app, this would integrate with navigation APIs
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Campus Map
          </DialogTitle>
          <DialogDescription>Click on buildings to view details and ongoing events</DialogDescription>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Map Controls Sidebar */}
          <div className="w-80 border-r bg-muted/30 p-4 overflow-y-auto">
            {/* Search and Filter */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search buildings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Buildings</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="dining">Dining</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="admin">Administration</SelectItem>
                  <SelectItem value="parking">Parking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Building List */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Buildings ({filteredBuildings.length})
              </h3>
              {filteredBuildings.map((building) => {
                const Icon = getIconForType(building.type)
                return (
                  <Card
                    key={building.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedBuilding?.id === building.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleBuildingClick(building)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getColorForType(building.type)} text-white`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{building.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{building.type}</p>
                          {building.currentEvent && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse" />
                              Live Event
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

          {/* Map Area */}
          <div className="flex-1 relative bg-green-50">
            {/* Campus Map SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full" style={{ minHeight: "400px" }}>
              {/* Campus Background */}
              <rect width="100" height="100" fill="#f0f9ff" />

              {/* Pathways */}
              <path d="M 10 50 Q 30 30 50 50 Q 70 70 90 50" stroke="#e5e7eb" strokeWidth="2" fill="none" />
              <path d="M 50 10 L 50 90" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
              <path d="M 20 20 L 80 80" stroke="#e5e7eb" strokeWidth="1" fill="none" />

              {/* Route Line (if showing directions) */}
              {showRoute && selectedBuilding && (
                <path
                  d={`M 50 90 L ${selectedBuilding.x} ${selectedBuilding.y}`}
                  stroke="#059669"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              )}

              {/* Building Markers */}
              {filteredBuildings.map((building) => {
                const Icon = getIconForType(building.type)
                const isSelected = selectedBuilding?.id === building.id
                const hasEvent = !!building.currentEvent

                return (
                  <g key={building.id}>
                    {/* Building Marker */}
                    <circle
                      cx={building.x}
                      cy={building.y}
                      r={isSelected ? "4" : "3"}
                      className={`cursor-pointer transition-all ${getColorForType(building.type).replace("bg-", "fill-")} ${
                        isSelected ? "stroke-primary stroke-2" : "stroke-white stroke-1"
                      } hover:r-4 hover:stroke-2`}
                      onClick={() => handleBuildingClick(building)}
                    />

                    {/* Event Indicator */}
                    {hasEvent && (
                      <circle
                        cx={building.x + 2}
                        cy={building.y - 2}
                        r="1.5"
                        fill="#ef4444"
                        className="animate-pulse"
                      />
                    )}

                    {/* Building Label with Smart Spacing */}
                    <text
                      x={building.x}
                      y={building.y + 6}
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-700 pointer-events-none select-none"
                      fontSize="1.8"
                      style={{
                        textShadow: "1px 1px 2px rgba(255,255,255,0.9)",
                        fontWeight: "500",
                      }}
                    >
                      {building.name.length > 8 ? building.name.substring(0, 6) + "..." : building.name}
                    </text>
                  </g>
                )
              })}

              {/* Current Location Marker */}
              <circle cx="50" cy="90" r="3" fill="#3b82f6" stroke="white" strokeWidth="2" className="animate-pulse" />
              <text x="50" y="96" textAnchor="middle" className="text-xs font-medium fill-blue-600" fontSize="1.8">
                You are here
              </text>
            </svg>

            {/* Building Details Overlay */}
            {selectedBuilding && (
              <Card className="absolute top-4 right-4 w-80 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getColorForType(selectedBuilding.type)} text-white`}>
                        {(() => {
                          const Icon = getIconForType(selectedBuilding.type)
                          return <Icon className="h-4 w-4" />
                        })()}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{selectedBuilding.name}</CardTitle>
                        <p className="text-sm text-muted-foreground capitalize">{selectedBuilding.type}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedBuilding(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{selectedBuilding.description}</p>

                  {selectedBuilding.currentEvent && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <p className="font-medium text-sm">Live Event</p>
                      </div>
                      <p className="font-medium">{selectedBuilding.currentEvent.name}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {selectedBuilding.currentEvent.attendees} attending
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Until {selectedBuilding.currentEvent.endTime}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button onClick={handleGetDirections} className="flex-1">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    {showRoute && (
                      <Button variant="outline" onClick={() => setShowRoute(false)}>
                        Clear Route
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
