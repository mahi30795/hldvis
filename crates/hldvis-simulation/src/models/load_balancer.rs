use crate::models::traits::{ComponentModel, NodeState};
use crate::request::RequestResult;

pub struct LoadBalancerModel {
    pub max_rps: u64,
}

impl Default for LoadBalancerModel {
    fn default() -> Self {
        Self { max_rps: 50000 }
    }
}

impl ComponentModel for LoadBalancerModel {
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
