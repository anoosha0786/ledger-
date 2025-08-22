"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CampusMap } from "@/components/campus-map"
import { NoticeBoard } from "@/components/notice-board"
import { PollsFeedback } from "@/components/polls-feedback"
import { LostFound } from "@/components/lost-found"
import { PeerSupport } from "@/components/peer-support"
import { SettingsPanel } from "@/components/settings-panel"
import { GlobalSearch } from "@/components/global-search"
import { AIChat } from "@/components/ai-chat"
import { EventsCalendar } from "@/components/events-calendar"
import { StudyResources } from "@/components/study-resources"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { MoodTracker } from "@/components/mood-tracker"
import { LoginScreen } from "@/components/login-screen"
import { NotesResources } from "@/components/notes-resources"
import { AIAssistant } from "@/components/ai-assistant"
import {
  Bell,
  Search,
  Calendar,
  Settings,
  ChevronRight,
  AlertCircle,
  Clock,
  MapIcon,
  Megaphone,
  Package,
  HelpCircle,
  BookOpen,
  AlertTriangle,
  Bot,
  User,
  Home,
  MessageCircle,
} from "lucide-react"

export default function CampusCompanion() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [activeTab, setActiveTab] = useState("home")
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [isNoticeBoardOpen, setIsNoticeBoardOpen] = useState(false)
  const [isPollsOpen, setIsPollsOpen] = useState(false)
  const [isLostFoundOpen, setIsLostFoundOpen] = useState(false)
  const [isPeerSupportOpen, setIsPeerSupportOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const [isEventsOpen, setIsEventsOpen] = useState(false)
  const [isStudyResourcesOpen, setIsStudyResourcesOpen] = useState(false)
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const [currentTheme, setCurrentTheme] = useState("light")

  useEffect(() => {
    const themes = {
      light: {
        primary: "#6A0DAD",
        secondary: "#9370DB",
        accent: "#D8BFD8",
        background: "#ffffff",
        foreground: "#0f172a",
        muted: "#f1f5f9",
        border: "#e2e8f0",
      },
      dark: {
        primary: "#9370DB",
        secondary: "#6A0DAD",
        accent: "#D8BFD8",
        background: "#0f172a",
        foreground: "#f8fafc",
        muted: "#1e293b",
        border: "#334155",
      },
      contrast: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: "#4b5563",
        background: "#ffffff",
        foreground: "#000000",
        muted: "#f9fafb",
        border: "#d1d5db",
      },
      royal: {
        primary: "#6A0DAD",
        secondary: "#9370DB",
        accent: "#D8BFD8",
        background: "#faf5ff",
        foreground: "#1e1b4b",
        muted: "#f3e8ff",
        border: "#e9d5ff",
      },
    }

    const selectedTheme = themes[currentTheme as keyof typeof themes] || themes.royal

    Object.entries(selectedTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value)
    })

    document.documentElement.setAttribute("data-theme", currentTheme)
    document.body.className = currentTheme === "dark" ? "dark" : ""
  }, [currentTheme])

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem("campus-user")
    setUser(null)
  }

  const quickActions = [
    {
      icon: MapIcon,
      label: "Campus Map",
      color: "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      onClick: () => setIsMapOpen(true),
    },
    {
      icon: Package,
      label: "Lost & Found",
      color: "bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
      count: 5,
      onClick: () => setIsLostFoundOpen(true),
    },
    {
      icon: Megaphone,
      label: "Notices",
      color: "bg-gradient-to-br from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600",
      onClick: () => setIsNoticeBoardOpen(true),
    },
    {
      icon: Calendar,
      label: "Events",
      color: "bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
      onClick: () => setIsEventsOpen(true),
    },
    {
      icon: BookOpen,
      label: "Resources",
      color: "bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700",
      onClick: () => setIsStudyResourcesOpen(true),
    },
    {
      icon: HelpCircle,
      label: "Support",
      color: "bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700",
      onClick: () => setIsPeerSupportOpen(true),
    },
  ]

  const mobileNavTabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "map", icon: MapIcon, label: "Map", onClick: () => setIsMapOpen(true) },
    { id: "notices", icon: Megaphone, label: "Notices", onClick: () => setIsNoticeBoardOpen(true) },
    { id: "chat", icon: MessageCircle, label: "Chat", onClick: () => setIsPeerSupportOpen(true) },
    { id: "resources", icon: BookOpen, label: "Resources", onClick: () => setIsStudyResourcesOpen(true) },
    { id: "profile", icon: User, label: "Profile", onClick: () => setIsSettingsOpen(true) },
  ]

  const notifications = [
    {
      title: "New Assignment Posted",
      message: "Mathematics - Calculus Assignment Due Friday",
      time: "2 min ago",
      type: "urgent",
    },
    {
      title: "Event Reminder",
      message: "Annual Sports Day tomorrow at 9 AM",
      time: "1 hour ago",
      type: "event",
    },
    {
      title: "Lost Item Match",
      message: "Your lost water bottle might be found",
      time: "3 hours ago",
      type: "info",
    },
  ]

  const handleSearchNavigation = (module: string, item?: any) => {
    switch (module) {
      case "map":
        setIsMapOpen(true)
        break
      case "notices":
        setIsNoticeBoardOpen(true)
        break
      case "polls":
        setIsPollsOpen(true)
        break
      case "lostfound":
        setIsLostFoundOpen(true)
        break
      case "peersupport":
        setIsPeerSupportOpen(true)
        break
      case "events":
        setIsEventsOpen(true)
        break
      case "resources":
        setIsStudyResourcesOpen(true)
        break
      default:
        break
    }
  }

  const recentNotices = [
    {
      title: "Math Assignment Due Friday",
      category: "Academic",
      time: "2 hours ago",
      urgent: true,
    },
    {
      title: "Annual Sports Day - Main Field",
      category: "Events",
      time: "4 hours ago",
      urgent: false,
    },
    {
      title: "Library Hours Extended",
      category: "General",
      time: "1 day ago",
      urgent: false,
    },
  ]

  if (isLoading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <div className="container flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <img src="/campus-logo.png" alt="Ledger Logo" className="h-20 w-auto" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Ledger
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Connect. Organise. Thrive.</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl p-1 backdrop-blur-sm ml-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-white/80 dark:hover:bg-slate-700/80 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md"
              onClick={() => setIsMapOpen(true)}
            >
              <MapIcon className="h-4 w-4 mr-2" />
              Map
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-white/80 dark:hover:bg-slate-700/80 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md relative"
              onClick={() => setIsLostFoundOpen(true)}
            >
              <Package className="h-4 w-4 mr-2" />
              Lost & Found
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                5
              </Badge>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-white/80 dark:hover:bg-slate-700/80 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md"
              onClick={() => setIsNoticeBoardOpen(true)}
            >
              <Megaphone className="h-4 w-4 mr-2" />
              Notices
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-white/80 dark:hover:bg-slate-700/80 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md"
              onClick={() => setIsEventsOpen(true)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeSwitcher onThemeChange={setCurrentTheme} currentTheme={currentTheme} />

            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 dark:text-slate-300 hover:text-primary rounded-lg transition-all duration-200"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>

            <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 dark:text-slate-300 hover:text-primary relative rounded-lg transition-all duration-200"
                >
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 p-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50"
              >
                <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="p-4 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <div className="w-full">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{notification.time}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{notification.message}</p>
                        <Badge
                          className={`mt-2 text-xs ${
                            notification.type === "urgent"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                              : notification.type === "event"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          {notification.type}
                        </Badge>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 dark:text-slate-300 hover:text-primary rounded-lg transition-all duration-200"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="h-4 w-4" />
            </Button>

            <Avatar
              className="h-9 w-9 cursor-pointer ring-2 ring-emerald-500/20 hover:ring-emerald-500/40 transition-all duration-200"
              onClick={handleLogout}
            >
              <AvatarImage src="/student-avatar.png" />
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 pb-24 md:pb-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">
            Welcome to Ledger, {user.name}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Connect. Organise. Thrive with your campus community
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="group cursor-pointer hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in-up overflow-hidden hover:border-purple-300/50 hover:shadow-purple-200/25"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={action.onClick}
            >
              <CardContent className="p-8 text-center relative">
                <div
                  className={`w-16 h-16 rounded-2xl ${action.color} flex items-center justify-center mx-auto mb-4 text-white transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 shadow-xl group-hover:shadow-2xl`}
                >
                  <action.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 transition-colors duration-300">
                  {action.label}
                </p>
                {action.count && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse group-hover:scale-110 transition-transform duration-300">
                    {action.count}
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <MoodTracker />
            </div>

            <Card
              className="border-slate-200/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: "300ms" }}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    Recent Notices
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Latest campus announcements
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsNoticeBoardOpen(true)}
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
                >
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentNotices.map((notice, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/20 dark:hover:to-purple-800/20 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                    >
                      {notice.urgent && (
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0 animate-pulse" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-900 dark:text-slate-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                          {notice.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="text-xs bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 border-0">
                            {notice.category}
                          </Badge>
                          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notice.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <NotesResources />
            </div>

            <Card
              className="border-slate-200/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: "500ms" }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    Campus Status
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Online Students</span>
                    <span className="font-medium text-purple-600 dark:text-purple-400">156</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Active Events</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">4</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Lost Items</span>
                    <span className="font-medium text-red-600 dark:text-red-400 animate-pulse">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-red-200/50 bg-gradient-to-br from-red-50/80 to-pink-50/80 dark:border-red-400/50 dark:from-red-900/40 dark:to-pink-900/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: "600ms" }}
            >
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-8 w-8 text-red-500 dark:text-red-400 mx-auto mb-3 animate-bounce" />
                <h3 className="font-medium bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Need Help?
                </h3>
                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-pulse">
                  Emergency SOS
                </Button>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Connect with support staff</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
        <div className="grid grid-cols-6 gap-1 p-2">
          {mobileNavTabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-16 rounded-xl transition-all duration-300 hover:scale-105 ${
                activeTab === tab.id
                  ? "bg-gradient-to-br from-purple-500/20 to-purple-600/20 text-purple-600 dark:text-purple-400 shadow-lg"
                  : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
              }`}
              onClick={() => {
                setActiveTab(tab.id)
                if (tab.onClick) tab.onClick()
              }}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-24 right-6 z-50 md:bottom-6">
        <Button
          className="h-20 w-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-125 animate-pulse-strong border-4 border-white dark:border-slate-900"
          onClick={() => {
            alert("🚨 Emergency Alert Sent!")
          }}
        >
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 mb-1 animate-bounce" />
            <span className="text-xs font-bold">SOS</span>
          </div>
        </Button>
      </div>

      <div className="fixed bottom-24 left-6 z-50 md:bottom-6 md:left-auto md:right-28">
        <Button
          onClick={() => setIsAIAssistantOpen(true)}
          className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-float border-4 border-white dark:border-slate-900"
        >
          <Bot className="h-7 w-7 animate-pulse" />
        </Button>
      </div>

      <CampusMap isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
      <NoticeBoard isOpen={isNoticeBoardOpen} onClose={() => setIsNoticeBoardOpen(false)} />
      <PollsFeedback isOpen={isPollsOpen} onClose={() => setIsPollsOpen(false)} />
      <LostFound isOpen={isLostFoundOpen} onClose={() => setIsLostFoundOpen(false)} />
      <PeerSupport isOpen={isPeerSupportOpen} onClose={() => setIsPeerSupportOpen(false)} />
      <EventsCalendar isOpen={isEventsOpen} onClose={() => setIsEventsOpen(false)} />
      <StudyResources isOpen={isStudyResourcesOpen} onClose={() => setIsStudyResourcesOpen(false)} />
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onThemeChange={setCurrentTheme}
        currentTheme={currentTheme}
      />
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onNavigate={handleSearchNavigation} />
      <AIChat isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
      <AIAssistant isOpen={isAIAssistantOpen} onClose={() => setIsAIAssistantOpen(false)} />
    </div>
  )
}
