"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ComplianceReport } from "@/lib/types"
import { CheckCircle, AlertCircle, XCircle, Calendar } from "lucide-react"

interface ComplianceReportCardProps {
  report: ComplianceReport
  modelName?: string
}

export function ComplianceReportCard({ report, modelName }: ComplianceReportCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-warning"
    return "text-destructive"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "partial":
        return <AlertCircle className="h-4 w-4 text-warning" />
      case "non_compliant":
        return <XCircle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  return (
    <Card className="cursor-pointer transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{report.framework}</CardTitle>
            {modelName && <p className="text-sm text-muted-foreground">{modelName}</p>}
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(report.compliance_score)}`}>
            {report.compliance_score.toFixed(0)}%
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Compliance Status</p>
          <div className="space-y-1">
            {report.findings.slice(0, 3).map((finding, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                {getStatusIcon(finding.status)}
                <span className="capitalize">{finding.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
          <Calendar className="h-3 w-3" />
          <span>{new Date(report.generated_at).toLocaleDateString()}</span>
          <Badge variant="secondary" className="ml-auto">
            {report.report_type}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
