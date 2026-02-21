use crate::models::traits::{ComponentModel, NodeState};
use crate::request::RequestResult;

pub struct QueueModel {
    pub processing_rate_rps: u64,
    pub max_queue_depth: usize,
}

impl Default for QueueModel {
    fn default() -> Self {
        Self { processing_rate_rps: 1000, max_queue_depth: 10000 }
    }
}

impl ComponentModel for QueueModel {
    fn process_request(&self, state: &mut NodeState) -> RequestResult {
        if state.queue_depth >= self.max_queue_depth {
            return RequestResult { latency_ms: 0.0, success: false, error: Some("Queue full".to_string()) };
        }
        state.queue_depth += 1;
        RequestResult { latency_ms: self.sample_latency(), success: true, error: None }
    }

    fn max_throughput(&self) -> u64 {
        self.processing_rate_rps
    }

    fn sample_latency(&self) -> f64 {
        2.0
    }
}
