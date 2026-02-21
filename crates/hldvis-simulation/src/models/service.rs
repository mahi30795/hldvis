use crate::models::traits::{ComponentModel, NodeState};
use crate::request::RequestResult;

pub struct ServiceModel {
    pub max_rps: u64,
    pub base_latency_ms: f64,
    pub instances: u32,
}

impl Default for ServiceModel {
    fn default() -> Self {
        Self { max_rps: 1000, base_latency_ms: 20.0, instances: 1 }
    }
}

impl ComponentModel for ServiceModel {
    fn process_request(&self, state: &mut NodeState) -> RequestResult {
        let capacity = self.max_rps as f64 * self.instances as f64;
        if state.current_rps > capacity {
            return RequestResult { latency_ms: 0.0, success: false, error: Some("Service overloaded".to_string()) };
        }
        RequestResult { latency_ms: self.sample_latency(), success: true, error: None }
    }

    fn max_throughput(&self) -> u64 {
        self.max_rps * self.instances as u64
    }

    fn sample_latency(&self) -> f64 {
        self.base_latency_ms + (self.base_latency_ms * 0.2)
    }
}
