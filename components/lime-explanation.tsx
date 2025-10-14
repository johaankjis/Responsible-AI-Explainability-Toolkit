"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown } from "lucide-react"

interface LimeExplanationProps {
  data: {
    positive_features?: string[]
    negative_features?: string[]
  }
  title?: string
}

export function LimeExplanation({ data, title = "LIME Local Explanation" }: LimeExplanationProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge variant="secondary">LIME</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.positive_features && data.positive_features.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ThumbsUp className="h-4 w-4 text-success" />
              <h4 className="text-sm font-semibold text-success">Positive Contributions</h4>
            </div>
            <div className="space-y-2">
              {data.positive_features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span className="capitalize">{feature.replace(/_/g, " ")}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.negative_features && data.negative_features.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ThumbsDown className="h-4 w-4 text-destructive" />
              <h4 className="text-sm font-semibold text-destructive">Negative Contributions</h4>
            </div>
            <div className="space-y-2">
              {data.negative_features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-destructive" />
                  <span className="capitalize">{feature.replace(/_/g, " ")}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
