// Type definitions for the Responsible AI Toolkit

export type ModelStatus = "active" | "archived" | "under_review"
export type RiskLevel = "low" | "medium" | "high" | "critical"
export type AnalysisType = "shap" | "lime"
export type ComplianceStatus = "compliant" | "non_compliant" | "partial"

export interface Model {
  id: string
  name: string
  version: string
  model_type: string
  description: string
  training_date: string
  status: ModelStatus
  created_at: string
  updated_at: string
}

export interface BiasMetric {
  id: string
  model_id: string
  demographic_group: string
  metric_type: string
  disparate_impact_score: number
  statistical_parity_diff: number
  equal_opportunity_diff: number
  shap_importance: Record<string, number>
  lime_explanation: Record<string, any>
  timestamp: string
}

export interface ModelCard {
  id: string
  model_id: string
  purpose: string
  intended_use: string
  training_data_summary: string
  performance_metrics: {
    accuracy: number
    precision: number
    recall: number
    f1_score: number
    auc_roc: number
  }
  ethical_considerations: string
  limitations: string
  fairness_assessment: string
  bias_mitigation_strategies: string
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  model_id: string
  action_type: string
  user_id: string
  details: Record<string, any>
  compliance_framework: string
  risk_level: RiskLevel
  timestamp: string
}

export interface ExplainabilityResult {
  id: string
  model_id: string
  analysis_type: AnalysisType
  feature_name: string
  importance_score: number
  explanation_data: Record<string, any>
  sample_id: string
  created_at: string
}

export interface ComplianceReport {
  id: string
  model_id: string
  framework: string
  report_type: string
  compliance_score: number
  findings: Array<{
    category: string
    status: ComplianceStatus
    details: string
  }>
  recommendations: string
  generated_at: string
}
