use crate::bottleneck::detect_bottlenecks;
use crate::graph::{DesignInput, TopologyGraph};
use crate::load_test::run_load_test;
use crate::stats::compute_percentiles;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SimulationOutput {
    pub total_requests: u64,
    pub successful_requests: u64,
    pub failed_requests: u64,
    pub duration_secs: u32,
    pub throughput_rps: f64,
    pub error_rate: f64,
    pub overall_latency: crate::stats::Percentiles,
    pub node_results: Vec<crate::load_test::NodeLoadResult>,
    pub bottlenecks: Vec<crate::bottleneck::BottleneckInfo>,
}

pub fn run_simulation(design_json: &str, requests_per_sec: u64, duration_secs: u32) -> Result<SimulationOutput, String> {
    let design: DesignInput = serde_json::from_str(design_json)
        .map_err(|e| format!("Failed to parse design: {}", e))?;

    let graph = TopologyGraph::from_design(&design);
    let node_results = run_load_test(&graph, requests_per_sec, duration_secs);

    let total_requests = requests_per_sec * duration_secs as u64;
    let successful_requests: u64 = node_results.iter().map(|r| r.successful).sum::<u64>() / node_results.len().max(1) as u64;
    let failed_requests = total_requests.saturating_sub(successful_requests);
    let error_rate = failed_requests as f64 / total_requests.max(1) as f64;
    let throughput_rps = successful_requests as f64 / duration_secs as f64;

    let all_latencies: Vec<f64> = node_results
        .iter()
        .flat_map(|r| {
            vec![
                r.latency_percentiles.p50,
                r.latency_percentiles.p95,
                r.latency_percentiles.p99,
            ]
        })
        .collect();

    let overall_latency = compute_percentiles(&all_latencies);

    let node_ids: Vec<String> = node_results.iter().map(|r| r.node_id.clone()).collect();
    let node_labels: Vec<String> = graph
        .nodes
        .values()
        .map(|n| n.label.clone())
        .collect();
    let utilizations: Vec<f64> = node_results.iter().map(|r| r.utilization).collect();
    let bottlenecks = detect_bottlenecks(&node_ids, &node_labels, &utilizations, 0.8);

    Ok(SimulationOutput {
        total_requests,
        successful_requests,
        failed_requests,
        duration_secs,
        throughput_rps,
        error_rate,
        overall_latency,
        node_results,
        bottlenecks,
    })
}
