"use client"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Contrast } from "lucide-react"

interface ThemeSwitcherProps {
  onThemeChange: (theme: string) => void
  currentTheme: string
}

export function ThemeSwitcher({ onThemeChange, currentTheme }: ThemeSwitcherProps) {
  const themes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "contrast", label: "High Contrast", icon: Contrast },
  ]

  return (
    <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
      {themes.map((theme) => (
        <Button
          key={theme.id}
          variant={currentTheme === theme.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onThemeChange(theme.id)}
          className={`text-xs ${
            currentTheme === theme.id ? "bg-primary text-white" : "text-slate-600 hover:text-primary hover:bg-white"
          }`}
        >
          <theme.icon className="h-3 w-3 mr-1" />
          {theme.label}
        </Button>
      ))}
    </div>
  )
}
