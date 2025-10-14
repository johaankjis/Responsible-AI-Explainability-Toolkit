import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockModels, mockModelCards } from "@/lib/mock-data"
import { Download, Share2, FileText, AlertTriangle, Target, Database, TrendingUp } from "lucide-react"
import { notFound } from "next/navigation"

export default async function ModelCardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const modelCard = mockModelCards.find((mc) => mc.id === id)

  if (!modelCard) {
    notFound()
  }

  const model = mockModels.find((m) => m.id === modelCard.model_id)

  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{model?.name || "Model Card"}</h1>
                <p className="text-muted-foreground">Version: {model?.version}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Last updated: {new Date(modelCard.updated_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Model Card Content */}
          <div className="space-y-6">
            {/* Purpose & Intended Use */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Purpose & Intended Use
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Purpose</h4>
                  <p className="text-sm text-muted-foreground">{modelCard.purpose}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Intended Use</h4>
                  <p className="text-sm text-muted-foreground">{modelCard.intended_use}</p>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold">{(modelCard.performance_metrics.accuracy * 100).toFixed(1)}%</p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${modelCard.performance_metrics.accuracy * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Precision</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold">
                        {(modelCard.performance_metrics.precision * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${modelCard.performance_metrics.precision * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Recall</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold">{(modelCard.performance_metrics.recall * 100).toFixed(1)}%</p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${modelCard.performance_metrics.recall * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">F1 Score</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold">{(modelCard.performance_metrics.f1_score * 100).toFixed(1)}%</p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${modelCard.performance_metrics.f1_score * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">AUC-ROC</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold">{(modelCard.performance_metrics.auc_roc * 100).toFixed(1)}%</p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${modelCard.performance_metrics.auc_roc * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Training Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Training Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{modelCard.training_data_summary}</p>
              </CardContent>
            </Card>

            {/* Ethical Considerations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Ethical Considerations & Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Ethical Considerations</h4>
                  <p className="text-sm text-muted-foreground">{modelCard.ethical_considerations}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Limitations</h4>
                  <p className="text-sm text-muted-foreground">{modelCard.limitations}</p>
                </div>
              </CardContent>
            </Card>

            {/* Fairness Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>Fairness Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{modelCard.fairness_assessment}</p>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="text-sm font-semibold mb-2">Bias Mitigation Strategies</h4>
                  <p className="text-sm text-muted-foreground">{modelCard.bias_mitigation_strategies}</p>
                </div>
              </CardContent>
            </Card>

            {/* Model Details */}
            <Card>
              <CardHeader>
                <CardTitle>Model Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Model Type</p>
                    <p className="text-sm">{model?.model_type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Version</p>
                    <p className="text-sm">{model?.version}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Training Date</p>
                    <p className="text-sm">{model ? new Date(model.training_date).toLocaleDateString() : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                    <Badge>{model?.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
