"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Bell, ChevronLeft, ChevronRight } from "lucide-react"

interface EventsCalendarProps {
  isOpen: boolean
  onClose: () => void
}

export function EventsCalendar({ isOpen, onClose }: EventsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [subscribedCategories, setSubscribedCategories] = useState<string[]>(["exams", "events"])

  const events = [
    {
      id: 1,
      title: "Mathematics Final Exam",
      date: new Date(2024, 11, 15),
      time: "09:00 AM",
      location: "Room 101",
      category: "exams",
      attendees: 45,
      description: "Final examination for Advanced Mathematics course",
    },
    {
      id: 2,
      title: "Annual Science Fair",
      date: new Date(2024, 11, 18),
      time: "10:00 AM",
      location: "Main Hall",
      category: "events",
      attendees: 200,
      description: "Student science project presentations and competitions",
    },
    {
      id: 3,
      title: "Drama Club Performance",
      date: new Date(2024, 11, 20),
      time: "07:00 PM",
      location: "Auditorium",
      category: "clubs",
      attendees: 150,
      description: "Annual drama club theatrical performance",
    },
    {
      id: 4,
      title: "Lost Item: Blue Backpack",
      date: new Date(2024, 11, 16),
      time: "02:30 PM",
      location: "Library",
      category: "lostfound",
      attendees: 1,
      description: "Blue backpack found in library study area",
    },
  ]

  const categories = [
    { id: "exams", label: "Exams", color: "bg-red-100 text-red-800" },
    { id: "events", label: "Events", color: "bg-blue-100 text-blue-800" },
    { id: "clubs", label: "Clubs", color: "bg-green-100 text-green-800" },
    { id: "lostfound", label: "Lost & Found", color: "bg-yellow-100 text-yellow-800" },
  ]

  const toggleSubscription = (categoryId: string) => {
    setSubscribedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => event.date.toDateString() === date.toDateString())
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayEvents = getEventsForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = selectedDate?.toDateString() === date.toDateString()

      days.push(
        <div
          key={day}
          className={`h-12 p-1 cursor-pointer rounded-lg border transition-all hover-lift ${
            isToday
              ? "bg-primary text-primary-foreground"
              : isSelected
                ? "bg-accent text-accent-foreground"
                : "hover:bg-muted"
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="text-sm font-medium">{day}</div>
          {dayEvents.length > 0 && (
            <div className="flex gap-1 mt-1">
              {dayEvents.slice(0, 2).map((event, idx) => (
                <div key={idx} className="w-2 h-2 rounded-full bg-accent animate-gentle-pulse" />
              ))}
              {dayEvents.length > 2 && <div className="text-xs">+{dayEvents.length - 2}</div>}
            </div>
          )}
        </div>,
      )
    }

    return days
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-content max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-serif">
            <Calendar className="h-5 w-5 text-primary" />
            Events Calendar & Notifications
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card className="vintage-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif">
                    {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                      className="btn-vintage"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                      className="btn-vintage"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
              </CardContent>
            </Card>
          </div>

          {/* Events List & Notifications */}
          <div className="space-y-4">
            {/* Notification Subscriptions */}
            <Card className="vintage-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-serif">
                  <Bell className="h-4 w-4 text-primary" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <Badge className={`${category.color} badge-vintage`}>{category.label}</Badge>
                    <Button
                      variant={subscribedCategories.includes(category.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSubscription(category.id)}
                      className="btn-vintage"
                    >
                      {subscribedCategories.includes(category.id) ? "Subscribed" : "Subscribe"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Selected Date Events */}
            {selectedDate && (
              <Card className="vintage-card">
                <CardHeader>
                  <CardTitle className="text-base font-serif">Events for {selectedDate.toLocaleDateString()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getEventsForDate(selectedDate).map((event) => (
                      <div
                        key={event.id}
                        className="p-3 rounded-lg border hover:bg-muted/50 transition-colors hover-lift"
                      >
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.attendees}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{event.description}</p>
                      </div>
                    ))}
                    {getEventsForDate(selectedDate).length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No events scheduled for this date
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Events */}
            <Card className="vintage-card">
              <CardHeader>
                <CardTitle className="text-base font-serif">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="p-3 rounded-lg border hover:bg-muted/50 transition-colors hover-lift"
                    >
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={`${categories.find((c) => c.id === event.category)?.color} badge-vintage text-xs`}
                        >
                          {categories.find((c) => c.id === event.category)?.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{event.date.toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
