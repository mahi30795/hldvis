use wasm_bindgen::prelude::*;

pub mod bottleneck;
pub mod engine;
pub mod graph;
pub mod load_test;
pub mod models;
pub mod request;
pub mod stats;

#[wasm_bindgen]
pub struct SimulationEngine;

#[wasm_bindgen]
impl SimulationEngine {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        SimulationEngine
    }

    #[wasm_bindgen]
    pub fn run_simulation(&self, design_json: &str, requests_per_sec: u64, duration_secs: u32) -> String {
        match engine::run_simulation(design_json, requests_per_sec, duration_secs) {
            Ok(result) => serde_json::to_string(&result).unwrap_or_else(|e| format!("{{\"error\":\"{}\"}}", e)),
            Err(e) => format!("{{\"error\":\"{}\"}}", e),
        }
    }
}

impl Default for SimulationEngine {
    fn default() -> Self {
        Self::new()
    }
}
