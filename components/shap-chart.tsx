"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ShapChartProps {
  data: Record<string, number>
  title?: string
}

export function ShapChart({ data, title = "SHAP Feature Importance" }: ShapChartProps) {
  const sortedData = Object.entries(data).sort(([, a], [, b]) => (b as number) - (a as number))
  const maxValue = Math.max(...sortedData.map(([, value]) => value as number))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge variant="secondary">SHAP</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedData.map(([feature, importance]) => (
            <div key={feature} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium capitalize">{feature.replace(/_/g, " ")}</span>
                <span className="font-mono text-muted-foreground">{((importance as number) * 100).toFixed(1)}%</span>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                  style={{
                    width: `${((importance as number) / maxValue) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
