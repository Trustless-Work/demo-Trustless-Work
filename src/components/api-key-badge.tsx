"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Key } from "lucide-react"

export function ApiKeyBadge() {
  return (
    <div className="flex items-center gap-4 bg-muted/50 p-3 rounded-lg">
      <Badge variant="default" className="bg-green-600 hover:bg-green-700">
        Demo Mode
      </Badge>
      <Button variant="outline" size="sm" className="gap-2">
        <Key className="h-4 w-4" />
        <span>Using Demo API Key</span>
      </Button>
    </div>
  )
}
