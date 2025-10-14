import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockModels, mockComplianceReports } from "@/lib/mock-data"
import { Download, Share2, CheckCircle, AlertCircle, XCircle, Shield, FileText, Lightbulb } from "lucide-react"
import { notFound } from "next/navigation"

export default async function ComplianceReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const report = mockComplianceReports.find((r) => r.id === id)

  if (!report) {
    notFound()
  }

  const model = mockModels.find((m) => m.id === report.model_id)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-warning"
    return "text-destructive"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-5 w-5 text-success" />
      case "partial":
        return <AlertCircle className="h-5 w-5 text-warning" />
      case "non_compliant":
        return <XCircle className="h-5 w-5 text-destructive" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-success text-success-foreground">Compliant</Badge>
      case "partial":
        return <Badge className="bg-warning text-warning-foreground">Partial</Badge>
      case "non_compliant":
        return <Badge variant="destructive">Non-Compliant</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{report.framework}</h1>
                <p className="text-muted-foreground">{model?.name || "Unknown Model"}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary">{report.report_type}</Badge>
              <span className="text-sm text-muted-foreground">
                Generated: {new Date(report.generated_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Compliance Score */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Overall Compliance Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className={`text-6xl font-bold ${getScoreColor(report.compliance_score)}`}>
                  {report.compliance_score.toFixed(0)}%
                </div>
                <div className="flex-1">
                  <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`absolute h-full ${
                        report.compliance_score >= 80
                          ? "bg-success"
                          : report.compliance_score >= 60
                            ? "bg-warning"
                            : "bg-destructive"
                      }`}
                      style={{
                        width: `${report.compliance_score}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0%</span>
                    <span>60% (Partial)</span>
                    <span>80% (Compliant)</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Findings */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Compliance Findings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.findings.map((finding, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(finding.status)}
                        <h4 className="font-semibold">{finding.category}</h4>
                      </div>
                      {getStatusBadge(finding.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{finding.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{report.recommendations}</p>
            </CardContent>
          </Card>

          {/* Framework Details */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Framework Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Framework</p>
                  <p className="text-sm">{report.framework}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Report Type</p>
                  <p className="text-sm">{report.report_type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Model</p>
                  <p className="text-sm">{model?.name || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Generated Date</p>
                  <p className="text-sm">{new Date(report.generated_at).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
