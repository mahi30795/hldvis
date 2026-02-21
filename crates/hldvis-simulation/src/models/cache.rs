use crate::models::traits::{ComponentModel, NodeState};
use crate::request::RequestResult;

pub struct CacheModel {
    pub hit_rate: f64,
    pub max_rps: u64,
}

impl Default for CacheModel {
    fn default() -> Self {
        Self { hit_rate: 0.8, max_rps: 100000 }
    }
}

impl ComponentModel for CacheModel {
    fn process_request(&self, _state: &mut NodeState) -> RequestResult {
        RequestResult { latency_ms: self.sample_latency(), success: true, error: None }
    }

    fn max_throughput(&self) -> u64 {
        self.max_rps
    }

    fn sample_latency(&self) -> f64 {
        1.0
    }
}
