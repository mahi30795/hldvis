#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct RequestResult {
    pub latency_ms: f64,
    pub success: bool,
    pub error: Option<String>,
}
