use hldvis_simulation::engine::run_simulation;

#[test]
fn test_simple_simulation() {
    let design_json = r#"{
        "nodes": [
            {"id": "1", "component_type": "client", "label": "Client", "max_rps": null, "base_latency_ms": null, "instances": null},
            {"id": "2", "component_type": "load-balancer", "label": "Load Balancer", "max_rps": 10000, "base_latency_ms": 1.0, "instances": 1},
            {"id": "3", "component_type": "rest-service", "label": "Service", "max_rps": 1000, "base_latency_ms": 20.0, "instances": 2},
            {"id": "4", "component_type": "postgresql", "label": "Database", "max_rps": 500, "base_latency_ms": 5.0, "instances": 1}
        ],
        "edges": [
            {"source": "1", "target": "2"},
            {"source": "2", "target": "3"},
            {"source": "3", "target": "4"}
        ]
    }"#;

    let result = run_simulation(design_json, 100, 10);
    assert!(result.is_ok(), "Simulation should succeed");
    let output = result.unwrap();
    assert_eq!(output.total_requests, 1000);
    assert!(output.throughput_rps >= 0.0);
    assert!(output.error_rate >= 0.0 && output.error_rate <= 1.0);
    assert!(!output.node_results.is_empty());
}

#[test]
fn test_invalid_design_json() {
    let result = run_simulation("invalid json", 100, 10);
    assert!(result.is_err(), "Should fail with invalid JSON");
}

#[test]
fn test_empty_design() {
    let design_json = r#"{"nodes": [], "edges": []}"#;
    let result = run_simulation(design_json, 100, 10);
    assert!(result.is_ok(), "Empty design should not fail");
    let output = result.unwrap();
    assert_eq!(output.total_requests, 1000);
}
