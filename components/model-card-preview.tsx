"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ModelCard } from "@/lib/types"
import { FileText, Calendar } from "lucide-react"

interface ModelCardPreviewProps {
  modelCard: ModelCard
  modelName: string
}

export function ModelCardPreview({ modelCard, modelName }: ModelCardPreviewProps) {
  return (
    <Card className="cursor-pointer transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{modelName}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-1">{modelCard.purpose}</p>
          </div>
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-muted-foreground">Accuracy: </span>
            <span className="font-semibold">{(modelCard.performance_metrics.accuracy * 100).toFixed(1)}%</span>
          </div>
          <div>
            <span className="text-muted-foreground">F1: </span>
            <span className="font-semibold">{(modelCard.performance_metrics.f1_score * 100).toFixed(1)}%</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Updated: {new Date(modelCard.updated_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
