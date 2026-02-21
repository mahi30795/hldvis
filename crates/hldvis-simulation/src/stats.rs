#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Percentiles {
    pub p50: f64,
    pub p95: f64,
    pub p99: f64,
    pub max: f64,
}

pub fn compute_percentiles(latencies: &[f64]) -> Percentiles {
    if latencies.is_empty() {
        return Percentiles { p50: 0.0, p95: 0.0, p99: 0.0, max: 0.0 };
    }
    let mut sorted = latencies.to_vec();
    sorted.sort_by(|a, b| a.partial_cmp(b).unwrap_or(std::cmp::Ordering::Equal));
    let len = sorted.len();
    let percentile = |p: f64| -> f64 {
        let idx = ((p / 100.0) * len as f64).ceil() as usize;
        sorted[idx.min(len) - 1]
    };
    Percentiles {
        p50: percentile(50.0),
        p95: percentile(95.0),
        p99: percentile(99.0),
        max: *sorted.last().unwrap(),
    }
}
