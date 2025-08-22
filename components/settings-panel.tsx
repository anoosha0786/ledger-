"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Settings, Palette, Bell, Moon, Sun, Volume2, Smartphone, Mail, Check } from "lucide-react"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  onThemeChange: (theme: string) => void
  currentTheme: string
}

export function SettingsPanel({ isOpen, onClose, onThemeChange, currentTheme }: SettingsPanelProps) {
  const [notifications, setNotifications] = useState({
    academic: true,
    events: true,
    clubs: false,
    urgent: true,
    polls: true,
    lostFound: false,
  })

  const [preferences, setPreferences] = useState({
    darkMode: false,
    soundEnabled: true,
    emailNotifications: true,
    pushNotifications: true,
    fontSize: [16],
  })

  const themes = [
    { id: "emerald", name: "Emerald", primary: "#059669", accent: "#10b981" },
    { id: "blue", name: "Ocean Blue", primary: "#0ea5e9", accent: "#38bdf8" },
    { id: "purple", name: "Royal Purple", primary: "#8b5cf6", accent: "#a78bfa" },
    { id: "orange", name: "Sunset Orange", primary: "#ea580c", accent: "#fb923c" },
    { id: "pink", name: "Cherry Blossom", primary: "#ec4899", accent: "#f472b6" },
    { id: "teal", name: "Ocean Teal", primary: "#0d9488", accent: "#14b8a6" },
  ]

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings & Personalization
          </DialogTitle>
          <DialogDescription>Customize your Campus Companion experience</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Theme Customization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="h-5 w-5" />
                Theme & Appearance
              </CardTitle>
              <CardDescription>Personalize your app's look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex items-center gap-2">
                  {preferences.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  Dark Mode
                </Label>
                <Switch
                  id="dark-mode"
                  checked={preferences.darkMode}
                  onCheckedChange={(value) => handlePreferenceChange("darkMode", value)}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Color Theme</Label>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`relative cursor-pointer rounded-lg border-2 p-3 transition-all hover:scale-105 ${
                        currentTheme === theme.id ? "border-primary" : "border-muted"
                      }`}
                      onClick={() => onThemeChange(theme.id)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }} />
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accent }} />
                      </div>
                      <p className="text-xs font-medium">{theme.name}</p>
                      {currentTheme === theme.id && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Font Size: {preferences.fontSize[0]}px</Label>
                <Slider
                  value={preferences.fontSize}
                  onValueChange={(value) => handlePreferenceChange("fontSize", value)}
                  max={24}
                  min={12}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { key: "academic", label: "Academic Updates", desc: "Assignments, exams, grades" },
                  { key: "events", label: "Campus Events", desc: "Sports, cultural events, seminars" },
                  { key: "clubs", label: "Club Activities", desc: "Club meetings and announcements" },
                  { key: "urgent", label: "Urgent Alerts", desc: "Emergency notifications and important updates" },
                  { key: "polls", label: "Polls & Surveys", desc: "New polls and feedback requests" },
                  { key: "lostFound", label: "Lost & Found", desc: "Matches for your lost/found items" },
                ].map((item) => (
                  <div key={item.key} className="flex items-start justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">{item.label}</Label>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(value) => handleNotificationChange(item.key, value)}
                    />
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Notifications
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={preferences.emailNotifications}
                    onCheckedChange={(value) => handlePreferenceChange("emailNotifications", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Push Notifications
                  </Label>
                  <Switch
                    id="push-notifications"
                    checked={preferences.pushNotifications}
                    onCheckedChange={(value) => handlePreferenceChange("pushNotifications", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-enabled" className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Sound Effects
                  </Label>
                  <Switch
                    id="sound-enabled"
                    checked={preferences.soundEnabled}
                    onCheckedChange={(value) => handlePreferenceChange("soundEnabled", value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Settings</CardTitle>
              <CardDescription>Frequently used preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Default View</Label>
                  <Select defaultValue="dashboard">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="map">Campus Map</SelectItem>
                      <SelectItem value="notices">Notice Board</SelectItem>
                      <SelectItem value="calendar">Calendar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Language</Label>
                  <Select defaultValue="english">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Español</SelectItem>
                      <SelectItem value="french">Français</SelectItem>
                      <SelectItem value="german">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">Reset to Default</Button>
              <Button onClick={onClose}>Save Changes</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
