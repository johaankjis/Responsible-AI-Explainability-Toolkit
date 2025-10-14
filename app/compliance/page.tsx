"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ComplianceReportCard } from "@/components/compliance-report-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockModels, mockComplianceReports } from "@/lib/mock-data"
import { Shield, CheckCircle, AlertTriangle, FileText, Plus } from "lucide-react"
import Link from "next/link"

export default function CompliancePage() {
  const [selectedFramework, setSelectedFramework] = useState<string>("all")

  const filteredReports =
    selectedFramework === "all"
      ? mockComplianceReports
      : mockComplianceReports.filter((r) => r.framework === selectedFramework)

  // Calculate summary statistics
  const avgComplianceScore = filteredReports.reduce((sum, r) => sum + r.compliance_score, 0) / filteredReports.length

  const compliantFindings = filteredReports.reduce(
    (sum, r) => sum + r.findings.filter((f) => f.status === "compliant").length,
    0,
  )

  const partialFindings = filteredReports.reduce(
    (sum, r) => sum + r.findings.filter((f) => f.status === "partial").length,
    0,
  )

  const nonCompliantFindings = filteredReports.reduce(
    (sum, r) => sum + r.findings.filter((f) => f.status === "non_compliant").length,
    0,
  )

  const frameworks = Array.from(new Set(mockComplianceReports.map((r) => r.framework)))

  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Compliance & Governance</h1>
              <p className="text-muted-foreground mt-2">Monitor regulatory compliance and governance standards</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <Select value={selectedFramework} onValueChange={setSelectedFramework}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frameworks</SelectItem>
                {frameworks.map((framework) => (
                  <SelectItem key={framework} value={framework}>
                    {framework}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg Compliance</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgComplianceScore.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground mt-1">Across all frameworks</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Compliant</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{compliantFindings}</div>
                <p className="text-xs text-muted-foreground mt-1">Passing requirements</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Partial</CardTitle>
                <AlertTriangle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{partialFindings}</div>
                <p className="text-xs text-muted-foreground mt-1">Needs improvement</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Non-Compliant</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{nonCompliantFindings}</div>
                <p className="text-xs text-muted-foreground mt-1">Requires action</p>
              </CardContent>
            </Card>
          </div>

          {/* Framework Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Supported Compliance Frameworks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">NIST AI Risk Management Framework</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive framework for managing AI risks across governance, mapping, measuring, and managing
                    functions.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">EU AI Act</h4>
                  <p className="text-sm text-muted-foreground">
                    European Union regulation establishing requirements for high-risk AI systems including risk
                    management, data governance, and transparency.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Grid */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Compliance Reports</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map((report) => {
                const model = mockModels.find((m) => m.id === report.model_id)
                return (
                  <Link key={report.id} href={`/compliance/${report.id}`}>
                    <ComplianceReportCard report={report} modelName={model?.name} />
                  </Link>
                )
              })}
            </div>
          </div>

          {filteredReports.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No compliance reports found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
