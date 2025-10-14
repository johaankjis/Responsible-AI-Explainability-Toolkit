import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockModels, mockBiasMetrics, mockAuditLogs } from "@/lib/mock-data"
import { Shield, AlertTriangle, CheckCircle, Activity } from "lucide-react"

export default function DashboardPage() {
  // Calculate dashboard metrics
  const activeModels = mockModels.filter((m) => m.status === "active").length
  const modelsUnderReview = mockModels.filter((m) => m.status === "under_review").length

  // Calculate bias alerts (disparate impact < 0.8)
  const biasAlerts = mockBiasMetrics.filter((m) => m.disparate_impact_score < 0.8).length

  // Calculate high-risk audit logs
  const highRiskActions = mockAuditLogs.filter(
    (log) => log.risk_level === "high" || log.risk_level === "critical",
  ).length

  const recentAuditLogs = mockAuditLogs.slice(0, 5)

  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">AI Governance Dashboard</h1>
            <p className="text-muted-foreground mt-2">Monitor model performance, bias metrics, and compliance status</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Models</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeModels}</div>
                <p className="text-xs text-muted-foreground mt-1">{mockModels.length} total models</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Bias Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{biasAlerts}</div>
                <p className="text-xs text-muted-foreground mt-1">Disparate impact {"<"} 0.8</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Under Review</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{modelsUnderReview}</div>
                <p className="text-xs text-muted-foreground mt-1">Pending compliance check</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">High-Risk Actions</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{highRiskActions}</div>
                <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAuditLogs.map((log) => {
                  const model = mockModels.find((m) => m.id === log.model_id)
                  const riskColors = {
                    low: "bg-success/10 text-success",
                    medium: "bg-warning/10 text-warning",
                    high: "bg-destructive/10 text-destructive",
                    critical: "bg-destructive text-destructive-foreground",
                  }

                  return (
                    <div
                      key={log.id}
                      className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{log.action_type.replace(/_/g, " ").toUpperCase()}</p>
                        <p className="text-xs text-muted-foreground">
                          {model?.name} • {log.compliance_framework}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${riskColors[log.risk_level]}`}>
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
        </div>
      </main>
    </div>
  )
}
