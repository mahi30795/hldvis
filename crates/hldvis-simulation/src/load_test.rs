use crate::graph::TopologyGraph;
use crate::models::traits::NodeState;
use crate::request::RequestResult;
use crate::stats::{compute_percentiles, Percentiles};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NodeLoadResult {
    pub node_id: String,
    pub requests_handled: u64,
    pub successful: u64,
    pub failed: u64,
    pub latency_percentiles: Percentiles,
    pub utilization: f64,
}

pub fn run_load_test(
    graph: &TopologyGraph,
    requests_per_sec: u64,
    duration_secs: u32,
) -> Vec<NodeLoadResult> {
    let total_requests = requests_per_sec * duration_secs as u64;
    let mut results = Vec::new();

    for (node_id, node) in &graph.nodes {
        let max_rps = node.max_rps.unwrap_or(1000);
        let base_latency = node.base_latency_ms.unwrap_or(20.0);
        let instances = node.instances.unwrap_or(1) as u64;
        let capacity = max_rps * instances;

        let mut state = NodeState {
            current_rps: requests_per_sec as f64,
            queue_depth: 0,
        };

        let mut latencies = Vec::new();
        let mut successful = 0u64;
        let mut failed = 0u64;

        for _ in 0..total_requests.min(10000) {
            let result = if state.current_rps > capacity as f64 {
                RequestResult { latency_ms: 0.0, success: false, error: Some("Overloaded".to_string()) }
            } else {
                RequestResult { latency_ms: base_latency, success: true, error: None }
            };

            if result.success {
                successful += 1;
                latencies.push(result.latency_ms);
            } else {
                failed += 1;
            }
        }

        let utilization = (requests_per_sec as f64) / (capacity as f64).max(1.0);

        results.push(NodeLoadResult {
            node_id: node_id.clone(),
            requests_handled: successful + failed,
            successful,
            failed,
            latency_percentiles: compute_percentiles(&latencies),
            utilization: utilization.min(1.0),
        });
    }

    results
}
