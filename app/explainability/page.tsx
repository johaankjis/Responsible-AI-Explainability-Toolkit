"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ShapChart } from "@/components/shap-chart"
import { LimeExplanation } from "@/components/lime-explanation"
import { FeatureImportanceComparison } from "@/components/feature-importance-comparison"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockModels, mockBiasMetrics } from "@/lib/mock-data"
import { Eye, BarChart3, Lightbulb } from "lucide-react"

export default function ExplainabilityPage() {
  const [selectedModel, setSelectedModel] = useState<string>(mockModels[0].id)

  const model = mockModels.find((m) => m.id === selectedModel)
  const modelMetrics = mockBiasMetrics.filter((m) => m.model_id === selectedModel)

  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Model Explainability</h1>
            <p className="text-muted-foreground mt-2">
              Understand model predictions using SHAP and LIME interpretability methods
            </p>
          </div>

          {/* Model Selector */}
          <div className="mb-6">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {mockModels.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model Info Card */}
          {model && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  {model.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Model Type</p>
                    <p className="text-sm font-medium">{model.model_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Version</p>
                    <p className="text-sm font-medium">{model.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-sm font-medium capitalize">{model.status.replace(/_/g, " ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="shap">SHAP Analysis</TabsTrigger>
              <TabsTrigger value="lime">LIME Analysis</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <FeatureImportanceComparison metrics={modelMetrics} />

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Analysis Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Demographic Groups Analyzed</p>
                      <p className="text-3xl font-bold">{modelMetrics.length}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Explainability Methods</p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">SHAP</span>
                        <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">LIME</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Key Features Identified</p>
                      <p className="text-3xl font-bold">
                        {new Set(modelMetrics.flatMap((m) => Object.keys(m.shap_importance))).size}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {modelMetrics.slice(0, 2).map((metric) => (
                  <ShapChart
                    key={metric.id}
                    data={metric.shap_importance}
                    title={`${metric.demographic_group} - SHAP Importance`}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shap" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About SHAP (SHapley Additive exPlanations)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    SHAP values explain the contribution of each feature to the model's prediction. Higher values
                    indicate greater importance in the model's decision-making process. SHAP provides a unified measure
                    of feature importance based on game theory.
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                {modelMetrics.map((metric) => (
                  <ShapChart
                    key={metric.id}
                    data={metric.shap_importance}
                    title={`${metric.demographic_group} Group`}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lime" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About LIME (Local Interpretable Model-agnostic Explanations)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    LIME explains individual predictions by approximating the model locally with an interpretable model.
                    It identifies which features positively or negatively contribute to a specific prediction, making it
                    easier to understand model behavior for individual cases.
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                {modelMetrics.map((metric) => (
                  <LimeExplanation
                    key={metric.id}
                    data={metric.lime_explanation}
                    title={`${metric.demographic_group} Group`}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Key Insights & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold mb-2">Feature Consistency</h4>
                    <p className="text-sm text-muted-foreground">
                      The most important features remain consistent across demographic groups, suggesting the model uses
                      similar decision criteria regardless of protected attributes.
                    </p>
                  </div>

                  <div className="border-l-4 border-warning pl-4">
                    <h4 className="font-semibold mb-2">Potential Bias Indicators</h4>
                    <p className="text-sm text-muted-foreground">
                      Some demographic groups show different feature importance rankings, which may indicate the model
                      behaves differently for these groups. This warrants further investigation and potential mitigation
                      strategies.
                    </p>
                  </div>

                  <div className="border-l-4 border-accent pl-4">
                    <h4 className="font-semibold mb-2">Transparency Benefits</h4>
                    <p className="text-sm text-muted-foreground">
                      SHAP and LIME analyses provide complementary views: SHAP offers global feature importance while
                      LIME explains individual predictions. Together, they enable comprehensive model understanding and
                      stakeholder communication.
                    </p>
                  </div>

                  <div className="border-l-4 border-success pl-4">
                    <h4 className="font-semibold mb-2">Recommended Actions</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Monitor feature importance trends over time</li>
                      <li>Validate explanations with domain experts</li>
                      <li>Use insights to improve training data quality</li>
                      <li>Document findings in model cards for stakeholders</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
