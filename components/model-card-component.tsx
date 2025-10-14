"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Model } from "@/lib/types"
import { Calendar, Activity } from "lucide-react"

interface ModelCardProps {
  model: Model
  onClick?: () => void
}

export function ModelCardComponent({ model, onClick }: ModelCardProps) {
  const statusColors = {
    active: "bg-success text-success-foreground",
    archived: "bg-muted text-muted-foreground",
    under_review: "bg-warning text-warning-foreground",
  }

  return (
    <Card className="cursor-pointer transition-all hover:shadow-md" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{model.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{model.version}</p>
          </div>
          <Badge className={statusColors[model.status]}>{model.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{model.description}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            <span>{model.model_type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(model.training_date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
