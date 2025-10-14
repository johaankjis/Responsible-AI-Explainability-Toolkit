"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BiasMetric } from "@/lib/types"

interface FeatureImportanceComparisonProps {
  metrics: BiasMetric[]
}

export function FeatureImportanceComparison({ metrics }: FeatureImportanceComparisonProps) {
  // Aggregate feature importance across all metrics
  const aggregatedFeatures: Record<string, { total: number; count: number }> = {}

  metrics.forEach((metric) => {
    Object.entries(metric.shap_importance).forEach(([feature, importance]) => {
      if (!aggregatedFeatures[feature]) {
        aggregatedFeatures[feature] = { total: 0, count: 0 }
      }
      aggregatedFeatures[feature].total += importance as number
      aggregatedFeatures[feature].count += 1
    })
  })

  const averagedFeatures = Object.entries(aggregatedFeatures)
    .map(([feature, { total, count }]) => ({
      feature,
      importance: total / count,
    }))
    .sort((a, b) => b.importance - a.importance)

  const maxImportance = Math.max(...averagedFeatures.map((f) => f.importance))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Importance Across All Groups</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {averagedFeatures.map(({ feature, importance }) => (
            <div key={feature} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium capitalize">{feature.replace(/_/g, " ")}</span>
                <span className="font-mono text-muted-foreground">{(importance * 100).toFixed(1)}%</span>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-primary rounded-full"
                  style={{
                    width: `${(importance / maxImportance) * 100}%`,
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
