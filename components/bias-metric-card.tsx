"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BiasMetric } from "@/lib/types"
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"

interface BiasMetricCardProps {
  metric: BiasMetric
  modelName?: string
}

export function BiasMetricCard({ metric, modelName }: BiasMetricCardProps) {
  const getDisparateImpactStatus = (score: number) => {
    if (score >= 0.8 && score <= 1.25) return { status: "pass", color: "text-success", icon: CheckCircle }
    if (score >= 0.7 && score < 0.8) return { status: "warning", color: "text-warning", icon: AlertCircle }
    return { status: "fail", color: "text-destructive", icon: AlertTriangle }
  }

  const diStatus = getDisparateImpactStatus(metric.disparate_impact_score)
  const StatusIcon = diStatus.icon

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{metric.demographic_group}</CardTitle>
            {modelName && <p className="text-sm text-muted-foreground mt-1">{modelName}</p>}
          </div>
          <StatusIcon className={`h-5 w-5 ${diStatus.color}`} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Disparate Impact</p>
            <p className={`text-xl font-bold ${diStatus.color}`}>{metric.disparate_impact_score.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Target: 0.8-1.25</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Statistical Parity</p>
            <p className="text-xl font-bold">{metric.statistical_parity_diff.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Difference</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Equal Opportunity</p>
            <p className="text-xl font-bold">{metric.equal_opportunity_diff.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Difference</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Top Features (SHAP)</p>
          <div className="space-y-1">
            {Object.entries(metric.shap_importance)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .slice(0, 3)
              .map(([feature, importance]) => (
                <div key={feature} className="flex items-center justify-between text-xs">
                  <span className="capitalize">{feature.replace(/_/g, " ")}</span>
                  <Badge variant="secondary">{((importance as number) * 100).toFixed(0)}%</Badge>
                </div>
              ))}
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">Analyzed: {new Date(metric.timestamp).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}
