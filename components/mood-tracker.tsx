"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MoodEntry {
  date: string
  mood: string
  emoji: string
}

export function MoodTracker() {
  const [todayMood, setTodayMood] = useState<string | null>(null)
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])

  const moods = [
    { id: "great", emoji: "😊", label: "Great", color: "text-green-500" },
    { id: "good", emoji: "🙂", label: "Good", color: "text-blue-500" },
    { id: "okay", emoji: "😐", label: "Okay", color: "text-yellow-500" },
    { id: "down", emoji: "😔", label: "Down", color: "text-orange-500" },
    { id: "stressed", emoji: "😰", label: "Stressed", color: "text-red-500" },
  ]

  useEffect(() => {
    const today = new Date().toDateString()
    const savedMood = localStorage.getItem(`mood-${today}`)
    const savedHistory = localStorage.getItem("mood-history")

    if (savedMood) {
      setTodayMood(savedMood)
    }

    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory))
    }
  }, [])

  const handleMoodSelect = (moodId: string) => {
    const today = new Date().toDateString()
    const selectedMood = moods.find((m) => m.id === moodId)

    if (selectedMood) {
      setTodayMood(moodId)
      localStorage.setItem(`mood-${today}`, moodId)

      const newEntry: MoodEntry = {
        date: today,
        mood: selectedMood.label,
        emoji: selectedMood.emoji,
      }

      const updatedHistory = [newEntry, ...moodHistory.filter((entry) => entry.date !== today)].slice(0, 7)
      setMoodHistory(updatedHistory)
      localStorage.setItem("mood-history", JSON.stringify(updatedHistory))
    }
  }

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg text-slate-900">How are you feeling today?</CardTitle>
        <CardDescription className="text-slate-600">Track your daily mood</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {moods.map((mood) => (
            <Button
              key={mood.id}
              variant={todayMood === mood.id ? "default" : "outline"}
              className={`h-16 flex-col gap-1 ${todayMood === mood.id ? "bg-primary text-white" : "hover:bg-slate-50"}`}
              onClick={() => handleMoodSelect(mood.id)}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs">{mood.label}</span>
            </Button>
          ))}
        </div>

        {moodHistory.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-2">This Week</h4>
            <div className="flex gap-1">
              {moodHistory.map((entry, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg">{entry.emoji}</div>
                  <div className="text-xs text-slate-500">
                    {new Date(entry.date).toLocaleDateString("en", { weekday: "short" })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
