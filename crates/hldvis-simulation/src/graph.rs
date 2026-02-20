use std::collections::HashMap;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GraphNode {
    pub id: String,
    pub component_type: String,
    pub label: String,
    pub max_rps: Option<u64>,
    pub base_latency_ms: Option<f64>,
    pub instances: Option<u32>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GraphEdge {
    pub source: String,
    pub target: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DesignInput {
    pub nodes: Vec<GraphNode>,
    pub edges: Vec<GraphEdge>,
}

pub struct TopologyGraph {
    pub nodes: HashMap<String, GraphNode>,
    pub adjacency: HashMap<String, Vec<String>>,
}

impl TopologyGraph {
    pub fn from_design(design: &DesignInput) -> Self {
        let mut nodes = HashMap::new();
        let mut adjacency: HashMap<String, Vec<String>> = HashMap::new();

        for node in &design.nodes {
            nodes.insert(node.id.clone(), node.clone());
            adjacency.entry(node.id.clone()).or_default();
        }

        for edge in &design.edges {
            adjacency
                .entry(edge.source.clone())
                .or_default()
                .push(edge.target.clone());
        }

        TopologyGraph { nodes, adjacency }
    }

    pub fn find_sources(&self) -> Vec<String> {
        let targets: std::collections::HashSet<String> = self
            .adjacency
            .values()
            .flat_map(|v| v.iter().cloned())
            .collect();
        self.nodes
            .keys()
            .filter(|id| !targets.contains(*id))
            .cloned()
            .collect()
    }
}
