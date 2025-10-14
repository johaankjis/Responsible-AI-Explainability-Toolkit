-- Responsible AI Toolkit Database Schema

-- Models table: stores information about ML models
CREATE TABLE IF NOT EXISTS models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  version VARCHAR(50) NOT NULL,
  model_type VARCHAR(100) NOT NULL,
  description TEXT,
  training_date TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bias Metrics table: stores bias detection results
CREATE TABLE IF NOT EXISTS bias_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES models(id) ON DELETE CASCADE,
  demographic_group VARCHAR(100) NOT NULL,
  metric_type VARCHAR(100) NOT NULL,
  disparate_impact_score DECIMAL(5,4),
  statistical_parity_diff DECIMAL(5,4),
  equal_opportunity_diff DECIMAL(5,4),
  shap_importance JSONB,
  lime_explanation JSONB,
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Model Cards table: stores model documentation
CREATE TABLE IF NOT EXISTS model_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES models(id) ON DELETE CASCADE,
  purpose TEXT NOT NULL,
  intended_use TEXT,
  training_data_summary TEXT,
  performance_metrics JSONB,
  ethical_considerations TEXT,
  limitations TEXT,
  fairness_assessment TEXT,
  bias_mitigation_strategies TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Audit Logs table: tracks all model interactions and decisions
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES models(id) ON DELETE CASCADE,
  action_type VARCHAR(100) NOT NULL,
  user_id VARCHAR(255),
  details JSONB,
  compliance_framework VARCHAR(100),
  risk_level VARCHAR(50),
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Explainability Results table: stores SHAP/LIME analysis results
CREATE TABLE IF NOT EXISTS explainability_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES models(id) ON DELETE CASCADE,
  analysis_type VARCHAR(50) NOT NULL, -- 'shap' or 'lime'
  feature_name VARCHAR(255) NOT NULL,
  importance_score DECIMAL(10,6),
  explanation_data JSONB,
  sample_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Compliance Reports table: stores generated compliance reports
CREATE TABLE IF NOT EXISTS compliance_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES models(id) ON DELETE CASCADE,
  framework VARCHAR(100) NOT NULL, -- 'NIST AI RMF', 'EU AI Act', etc.
  report_type VARCHAR(100) NOT NULL,
  compliance_score DECIMAL(5,2),
  findings JSONB,
  recommendations TEXT,
  generated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bias_metrics_model_id ON bias_metrics(model_id);
CREATE INDEX IF NOT EXISTS idx_bias_metrics_demographic ON bias_metrics(demographic_group);
CREATE INDEX IF NOT EXISTS idx_audit_logs_model_id ON audit_logs(model_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_explainability_model_id ON explainability_results(model_id);
CREATE INDEX IF NOT EXISTS idx_compliance_model_id ON compliance_reports(model_id);
