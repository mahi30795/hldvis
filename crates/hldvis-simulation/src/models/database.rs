use crate::models::traits::{ComponentModel, NodeState};
use crate::request::RequestResult;

pub struct DatabaseModel {
    pub max_rps: u64,
    pub base_latency_ms: f64,
}

impl Default for DatabaseModel {
    fn default() -> Self {
        Self { max_rps: 500, base_latency_ms: 5.0 }
    }
}

impl ComponentModel for DatabaseModel {
    fn process_request(&self, state: &mut NodeState) -> RequestResult {
        if state.current_rps > self.max_rps as f64 {
            return RequestResult { latency_ms: self.sample_latency() * 10.0, success: false, error: Some("DB overloaded".to_string()) };
        }
        RequestResult { latency_ms: self.sample_latency(), success: true, error: None }
    }

    fn max_throughput(&self) -> u64 {
        self.max_rps
    }

    fn sample_latency(&self) -> f64 {
        self.base_latency_ms
    }
}
