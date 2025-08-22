"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangle, Phone, MessageSquare, X } from "lucide-react"

export function SOSButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleEmergencyAction = (action: string) => {
    console.log(`[v0] Emergency action triggered: ${action}`)
    // In a real app, this would trigger actual emergency protocols
    setIsOpen(false)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg animate-pulse"
        size="lg"
      >
        <AlertTriangle className="h-8 w-8" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Emergency Alert Activated
            </DialogTitle>
            <DialogDescription>
              Choose how you'd like to get help. Emergency services will be notified immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={() => handleEmergencyAction("call-admin")}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Admin
            </Button>
            <Button
              onClick={() => handleEmergencyAction("notify-teacher")}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Notify Teacher
            </Button>
            <Button onClick={() => setIsOpen(false)} variant="ghost" className="text-slate-600">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
