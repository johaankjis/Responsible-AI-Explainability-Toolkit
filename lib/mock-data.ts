// Mock data for the Responsible AI Toolkit

import type {
  Model,
  BiasMetric,
  ModelCard,
  AuditLog,
  ExplainabilityResult,
  ComplianceReport,
} from "./types"

// Mock Models
export const mockModels: Model[] = [
  {
    id: "1",
    name: "Credit Risk Predictor",
    version: "v2.1.0",
    model_type: "Random Forest Classifier",
    description: "Predicts credit default risk based on applicant financial history and demographics",
    training_date: "2024-01-15T10:30:00Z",
    status: "active",
    created_at: "2024-01-10T08:00:00Z",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Hiring Recommendation Engine",
    version: "v1.5.2",
    model_type: "Gradient Boosting",
    description: "Recommends candidates for job positions based on skills, experience, and cultural fit",
    training_date: "2024-02-20T14:00:00Z",
    status: "active",
    created_at: "2024-02-01T09:00:00Z",
    updated_at: "2024-02-20T14:00:00Z",
  },
  {
    id: "3",
    name: "Healthcare Diagnosis Assistant",
    version: "v3.0.1",
    model_type: "Neural Network",
    description: "Assists medical professionals in diagnosing conditions based on patient symptoms and history",
    training_date: "2024-03-10T16:45:00Z",
    status: "under_review",
    created_at: "2024-03-01T10:00:00Z",
    updated_at: "2024-03-10T16:45:00Z",
  },
]

// Mock Bias Metrics
export const mockBiasMetrics: BiasMetric[] = [
  {
    id: "bm1",
    model_id: "1",
    demographic_group: "Gender",
    metric_type: "Disparate Impact",
    disparate_impact_score: 0.82,
    statistical_parity_diff: -0.15,
    equal_opportunity_diff: -0.08,
    shap_importance: {
      income: 0.35,
      credit_history: 0.28,
      age: 0.18,
      employment_length: 0.12,
      debt_ratio: 0.07,
    },
    lime_explanation: {
      positive_features: ["high_income", "good_credit_history"],
      negative_features: ["high_debt_ratio"],
    },
    timestamp: "2024-01-16T09:00:00Z",
  },
  {
    id: "bm2",
    model_id: "1",
    demographic_group: "Race",
    metric_type: "Statistical Parity",
    disparate_impact_score: 0.75,
    statistical_parity_diff: -0.22,
    equal_opportunity_diff: -0.12,
    shap_importance: {
      income: 0.32,
      credit_history: 0.3,
      age: 0.2,
      employment_length: 0.1,
      debt_ratio: 0.08,
    },
    lime_explanation: {
      positive_features: ["stable_employment", "low_debt"],
      negative_features: ["limited_credit_history"],
    },
    timestamp: "2024-01-16T09:00:00Z",
  },
  {
    id: "bm3",
    model_id: "2",
    demographic_group: "Gender",
    metric_type: "Equal Opportunity",
    disparate_impact_score: 0.88,
    statistical_parity_diff: -0.1,
    equal_opportunity_diff: -0.05,
    shap_importance: {
      years_experience: 0.4,
      education_level: 0.25,
      technical_skills: 0.2,
      leadership_experience: 0.1,
      certifications: 0.05,
    },
    lime_explanation: {
      positive_features: ["advanced_degree", "relevant_experience"],
      negative_features: ["career_gaps"],
    },
    timestamp: "2024-02-21T10:30:00Z",
  },
]

// Mock Model Cards
export const mockModelCards: ModelCard[] = [
  {
    id: "mc1",
    model_id: "1",
    purpose: "Assess credit default risk for loan applications",
    intended_use:
      "To be used by financial institutions for preliminary credit risk assessment. Final decisions should involve human review.",
    training_data_summary:
      "Trained on 500,000 historical loan applications from 2018-2023, including demographic information, financial history, and loan outcomes.",
    performance_metrics: {
      accuracy: 0.87,
      precision: 0.84,
      recall: 0.82,
      f1_score: 0.83,
      auc_roc: 0.91,
    },
    ethical_considerations:
      "Model may exhibit bias across demographic groups. Regular monitoring and bias mitigation strategies are implemented.",
    limitations:
      "Performance may degrade for applicants with limited credit history. Not suitable for high-stakes decisions without human oversight.",
    fairness_assessment:
      "Disparate impact analysis shows potential bias in gender (0.82) and race (0.75) categories. Mitigation strategies include threshold adjustment and feature engineering.",
    bias_mitigation_strategies:
      "Applied reweighting techniques during training, implemented fairness constraints, and use calibrated probability thresholds per demographic group.",
    created_at: "2024-01-15T11:00:00Z",
    updated_at: "2024-01-15T11:00:00Z",
  },
  {
    id: "mc2",
    model_id: "2",
    purpose: "Recommend qualified candidates for job openings",
    intended_use:
      "Assist HR teams in initial candidate screening. Should be used as a decision support tool, not for automated hiring decisions.",
    training_data_summary:
      "Trained on 200,000 historical hiring decisions from 2019-2023, including candidate profiles, interview outcomes, and performance reviews.",
    performance_metrics: {
      accuracy: 0.79,
      precision: 0.76,
      recall: 0.74,
      f1_score: 0.75,
      auc_roc: 0.85,
    },
    ethical_considerations:
      "Potential for perpetuating historical hiring biases. Regular audits and diverse training data updates are essential.",
    limitations:
      "May not capture soft skills or cultural fit accurately. Performance varies across different job categories and seniority levels.",
    fairness_assessment:
      "Gender parity analysis shows 0.88 disparate impact ratio. Age-based analysis indicates potential bias against older candidates.",
    bias_mitigation_strategies:
      "Removed proxy features for protected attributes, implemented adversarial debiasing, and use diverse evaluation panels for model validation.",
    created_at: "2024-02-20T15:00:00Z",
    updated_at: "2024-02-20T15:00:00Z",
  },
]

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: "al1",
    model_id: "1",
    action_type: "model_prediction",
    user_id: "user_123",
    details: {
      input_features: { income: 75000, credit_score: 720 },
      prediction: "approved",
      confidence: 0.89,
    },
    compliance_framework: "NIST AI RMF",
    risk_level: "low",
    timestamp: "2024-03-15T14:30:00Z",
  },
  {
    id: "al2",
    model_id: "1",
    action_type: "bias_detection",
    user_id: "admin_456",
    details: {
      demographic_group: "Gender",
      disparate_impact: 0.82,
      threshold: 0.8,
    },
    compliance_framework: "NIST AI RMF",
    risk_level: "medium",
    timestamp: "2024-03-15T15:00:00Z",
  },
  {
    id: "al3",
    model_id: "2",
    action_type: "model_update",
    user_id: "admin_456",
    details: {
      previous_version: "v1.5.1",
      new_version: "v1.5.2",
      changes: "Updated bias mitigation parameters",
    },
    compliance_framework: "EU AI Act",
    risk_level: "high",
    timestamp: "2024-03-14T10:00:00Z",
  },
]

// Mock Explainability Results
export const mockExplainabilityResults: ExplainabilityResult[] = [
  {
    id: "er1",
    model_id: "1",
    analysis_type: "shap",
    feature_name: "income",
    importance_score: 0.35,
    explanation_data: {
      base_value: 0.5,
      shap_value: 0.15,
      feature_value: 75000,
    },
    sample_id: "sample_001",
    created_at: "2024-03-15T16:00:00Z",
  },
  {
    id: "er2",
    model_id: "1",
    analysis_type: "lime",
    feature_name: "credit_history",
    importance_score: 0.28,
    explanation_data: {
      weight: 0.28,
      intercept: 0.45,
      prediction_local: 0.73,
    },
    sample_id: "sample_001",
    created_at: "2024-03-15T16:00:00Z",
  },
]

// Mock Compliance Reports
export const mockComplianceReports: ComplianceReport[] = [
  {
    id: "cr1",
    model_id: "1",
    framework: "NIST AI RMF",
    report_type: "Quarterly Assessment",
    compliance_score: 78.5,
    findings: [
      {
        category: "Governance",
        status: "compliant",
        details: "Model governance structure is well-defined with clear roles and responsibilities.",
      },
      {
        category: "Fairness",
        status: "partial",
        details:
          "Disparate impact detected in gender and race categories. Mitigation strategies in place but require monitoring.",
      },
      {
        category: "Transparency",
        status: "compliant",
        details: "Model card and documentation meet transparency requirements.",
      },
      {
        category: "Accountability",
        status: "compliant",
        details: "Audit logs and monitoring systems are functioning properly.",
      },
    ],
    recommendations:
      "Continue monitoring bias metrics monthly. Consider additional training data from underrepresented groups. Implement enhanced human-in-the-loop review for borderline cases.",
    generated_at: "2024-03-01T09:00:00Z",
  },
  {
    id: "cr2",
    model_id: "2",
    framework: "EU AI Act",
    report_type: "Annual Compliance Review",
    compliance_score: 82.0,
    findings: [
      {
        category: "Risk Management",
        status: "compliant",
        details: "Comprehensive risk assessment and mitigation strategies documented.",
      },
      {
        category: "Data Governance",
        status: "compliant",
        details: "Training data quality and diversity meet regulatory standards.",
      },
      {
        category: "Human Oversight",
        status: "compliant",
        details: "Human review process integrated into decision workflow.",
      },
      {
        category: "Technical Documentation",
        status: "compliant",
        details: "Complete technical documentation available and up-to-date.",
      },
    ],
    recommendations:
      "Maintain current practices. Schedule next review in 12 months. Consider implementing additional explainability features for end users.",
    generated_at: "2024-02-28T10:00:00Z",
  },
]
