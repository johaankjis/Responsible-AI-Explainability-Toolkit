import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockModels, mockBiasMetrics, mockModelCards, mockAuditLogs } from "@/lib/mock-data"
import { Calendar, Activity, AlertTriangle, FileText, History } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const model = mockModels.find((m) => m.id === id)

  if (!model) {
    notFound()
  }

  const biasMetrics = mockBiasMetrics.filter((m) => m.model_id === id)
  const modelCard = mockModelCards.find((mc) => mc.model_id === id)
  const auditLogs = mockAuditLogs.filter((log) => log.model_id === id)

  const statusColors = {
    active: "bg-success text-success-foreground",
    archived: "bg-muted text-muted-foreground",
    under_review: "bg-warning text-warning-foreground",
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{model.name}</h1>
                <p className="text-muted-foreground mt-2">{model.description}</p>
              </div>
              <Badge className={statusColors[model.status]}>{model.status}</Badge>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>{model.model_type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Trained: {new Date(model.training_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Version: {model.version}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bias">Bias Metrics</TabsTrigger>
              <TabsTrigger value="card">Model Card</TabsTrigger>
              <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Model Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Model Type</p>
                      <p className="text-sm">{model.model_type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Version</p>
                      <p className="text-sm">{model.version}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Training Date</p>
                      <p className="text-sm">{new Date(model.training_date).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge className={`mt-1 ${statusColors[model.status]}`}>{model.status}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      Bias Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {biasMetrics.map((metric) => (
                        <div
                          key={metric.id}
                          className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="text-sm font-medium">{metric.demographic_group}</p>
                            <p className="text-xs text-muted-foreground">{metric.metric_type}</p>
                          </div>
                          <Badge variant={metric.disparate_impact_score < 0.8 ? "destructive" : "secondary"}>
                            DI: {metric.disparate_impact_score.toFixed(2)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Link href={`/bias?model=${id}`}>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        View Full Analysis
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {modelCard && (
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-5">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Accuracy</p>
                        <p className="text-2xl font-bold">
                          {(modelCard.performance_metrics.accuracy * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Precision</p>
                        <p className="text-2xl font-bold">
                          {(modelCard.performance_metrics.precision * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Recall</p>
                        <p className="text-2xl font-bold">{(modelCard.performance_metrics.recall * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">F1 Score</p>
                        <p className="text-2xl font-bold">
                          {(modelCard.performance_metrics.f1_score * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">AUC-ROC</p>
                        <p className="text-2xl font-bold">
                          {(modelCard.performance_metrics.auc_roc * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="bias" className="space-y-6">
              {biasMetrics.map((metric) => (
                <Card key={metric.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{metric.demographic_group} Analysis</span>
                      <Badge variant={metric.disparate_impact_score < 0.8 ? "destructive" : "secondary"}>
                        {metric.metric_type}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Disparate Impact</p>
                        <p className="text-2xl font-bold">{metric.disparate_impact_score.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Statistical Parity Diff</p>
                        <p className="text-2xl font-bold">{metric.statistical_parity_diff.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Equal Opportunity Diff</p>
                        <p className="text-2xl font-bold">{metric.equal_opportunity_diff.toFixed(2)}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">SHAP Feature Importance</p>
                      <div className="space-y-2">
                        {Object.entries(metric.shap_importance).map(([feature, importance]) => (
                          <div key={feature} className="flex items-center gap-2">
                            <span className="text-sm w-32 capitalize">{feature.replace(/_/g, " ")}</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{
                                  width: `${(importance as number) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-mono w-12 text-right">
                              {((importance as number) * 100).toFixed(0)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="card" className="space-y-6">
              {modelCard ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Purpose & Intended Use</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Purpose</p>
                        <p className="text-sm">{modelCard.purpose}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Intended Use</p>
                        <p className="text-sm">{modelCard.intended_use}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Training Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{modelCard.training_data_summary}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Ethical Considerations & Limitations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Ethical Considerations</p>
                        <p className="text-sm">{modelCard.ethical_considerations}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Limitations</p>
                        <p className="text-sm">{modelCard.limitations}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Fairness Assessment</p>
                        <p className="text-sm">{modelCard.fairness_assessment}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Bias Mitigation Strategies</p>
                        <p className="text-sm">{modelCard.bias_mitigation_strategies}</p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No model card available for this model</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="audit" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Audit Trail
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditLogs.map((log) => {
                      const riskColors = {
                        low: "bg-success/10 text-success",
                        medium: "bg-warning/10 text-warning",
                        high: "bg-destructive/10 text-destructive",
                        critical: "bg-destructive text-destructive-foreground",
                      }

                      return (
                        <div
                          key={log.id}
                          className="flex items-start justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                        >
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{log.action_type.replace(/_/g, " ").toUpperCase()}</p>
                            <p className="text-xs text-muted-foreground">
                              User: {log.user_id} • Framework: {log.compliance_framework}
                            </p>
                            {log.details && (
                              <p className="text-xs text-muted-foreground font-mono">
                                {JSON.stringify(log.details, null, 2)}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${riskColors[log.risk_level]}`}
                            >
                              {log.risk_level}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )
                    })}
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
