use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BottleneckInfo {
    pub node_id: String,
    pub node_label: String,
    pub utilization: f64,
    pub suggestion: String,
}

pub fn detect_bottlenecks(
    node_ids: &[String],
    node_labels: &[String],
    utilizations: &[f64],
    threshold: f64,
) -> Vec<BottleneckInfo> {
    node_ids
        .iter()
        .zip(node_labels.iter())
        .zip(utilizations.iter())
        .filter(|((_, _), &util)| util > threshold)
        .map(|((id, label), &util)| BottleneckInfo {
            node_id: id.clone(),
            node_label: label.clone(),
            utilization: util,
            suggestion: format!(
                "Node '{}' is at {:.0}% utilization. Consider scaling horizontally.",
                label,
                util * 100.0
            ),
        })
        .collect()
}
