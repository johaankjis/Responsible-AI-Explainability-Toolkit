"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { BiasMetricCard } from "@/components/bias-metric-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockModels, mockBiasMetrics } from "@/lib/mock-data"
import { AlertTriangle, CheckCircle, AlertCircle, TrendingDown } from "lucide-react"

export default function BiasDetectionPage() {
  const [selectedModel, setSelectedModel] = useState<string>("all")

  const filteredMetrics =
    selectedModel === "all" ? mockBiasMetrics : mockBiasMetrics.filter((m) => m.model_id === selectedModel)

  // Calculate summary statistics
  const totalMetrics = filteredMetrics.length
  const failingMetrics = filteredMetrics.filter((m) => m.disparate_impact_score < 0.8).length
  const warningMetrics = filteredMetrics.filter(
    (m) => m.disparate_impact_score >= 0.7 && m.disparate_impact_score < 0.8,
  ).length
  const passingMetrics = filteredMetrics.filter(
    (m) => m.disparate_impact_score >= 0.8 && m.disparate_impact_score <= 1.25,
  ).length

  // Calculate average disparate impact
  const avgDisparateImpact =
    filteredMetrics.reduce((sum, m) => sum + m.disparate_impact_score, 0) / filteredMetrics.length

  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Bias Detection & Mitigation</h1>
            <p className="text-muted-foreground mt-2">
              Monitor fairness metrics and identify potential bias across demographic groups
            </p>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                {mockModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Metrics</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalMetrics}</div>
                <p className="text-xs text-muted-foreground mt-1">Demographic groups analyzed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Passing</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{passingMetrics}</div>
                <p className="text-xs text-muted-foreground mt-1">DI: 0.8-1.25</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Warning</CardTitle>
                <AlertCircle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{warningMetrics}</div>
                <p className="text-xs text-muted-foreground mt-1">DI: 0.7-0.8</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Failing</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{failingMetrics}</div>
                <p className="text-xs text-muted-foreground mt-1">DI {"<"} 0.7</p>
              </CardContent>
            </Card>
          </div>

          {/* Average Disparate Impact */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Average Disparate Impact Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">{avgDisparateImpact.toFixed(2)}</div>
                <div className="flex-1">
                  <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`absolute h-full ${
                        avgDisparateImpact >= 0.8
                          ? "bg-success"
                          : avgDisparateImpact >= 0.7
                            ? "bg-warning"
                            : "bg-destructive"
                      }`}
                      style={{
                        width: `${Math.min((avgDisparateImpact / 1.25) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0.0</span>
                    <span>0.8 (Target)</span>
                    <span>1.25</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bias Metrics Grid */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Detailed Metrics by Demographic Group</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMetrics.map((metric) => {
                const model = mockModels.find((m) => m.id === metric.model_id)
                return <BiasMetricCard key={metric.id} metric={metric} modelName={model?.name} />
              })}
            </div>
          </div>

          {filteredMetrics.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No bias metrics found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
