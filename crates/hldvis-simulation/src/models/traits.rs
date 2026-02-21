use crate::request::RequestResult;

pub struct NodeState {
    pub current_rps: f64,
    pub queue_depth: usize,
}

pub trait ComponentModel {
    fn process_request(&self, state: &mut NodeState) -> RequestResult;
    fn max_throughput(&self) -> u64;
    fn sample_latency(&self) -> f64;
}
