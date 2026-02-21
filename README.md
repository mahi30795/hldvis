# HLDVis

A high-level design (HLD) visualization and simulation platform. Design distributed systems architectures visually, then simulate their performance characteristics using a high-performance Rust/WASM simulation engine.

## Architecture

HLDVis uses a **React + Rust/WASM hybrid architecture**:

- **React Frontend** (Vite + TypeScript): Handles the UI — canvas, component palette, configuration panels, and simulation controls
- **Rust Simulation Engine** (compiled to WASM): Runs in a Web Worker for high-performance, non-blocking simulation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 19 + TypeScript |
| Build Tool | Vite 6 |
| Canvas | React Flow |
| State Management | Zustand |
| Styling | Tailwind CSS |
| UI Primitives | Radix UI |
| Simulation Engine | Rust + WebAssembly (wasm-bindgen) |
| Package Manager | pnpm (workspace) |
| Rust Toolchain | Stable |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) 8+
- [Rust](https://rustup.rs/) stable
- [wasm-pack](https://rustwasm.github.io/wasm-pack/) (for WASM builds)

### Development

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev

# Run Rust tests
cargo test --all

# Build WASM module (requires wasm-pack)
pnpm build:wasm

# Build React app
pnpm build
```

## Project Structure

```
hldvis/
├── apps/web/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── store/        # Zustand state stores
│   │   ├── hooks/        # Custom hooks
│   │   ├── workers/      # Web Worker (WASM bridge)
│   │   └── types/        # TypeScript types
│   └── ...
├── crates/
│   └── hldvis-simulation/  # Rust WASM simulation engine
│       └── src/
│           ├── engine.rs     # Simulation orchestrator
│           ├── graph.rs      # Topology graph
│           ├── models/       # Component models
│           └── ...
├── Cargo.toml          # Rust workspace
└── package.json        # pnpm workspace root
```

## Components

Drag and drop components onto the canvas:

- **Clients**: Browser/mobile clients
- **Networking**: Load Balancer, CDN, API Gateway
- **Compute**: REST, GraphQL, gRPC services
- **Data**: PostgreSQL, MongoDB, Redis, Cassandra
- **Caching**: Redis Cache, Memcached
- **Messaging**: Kafka, RabbitMQ, SQS

## Roadmap

- [x] Phase 1: Project scaffold with React + Rust WASM architecture
- [ ] Phase 2: Compile Rust engine to WASM, plug into Web Worker
- [ ] Phase 3: Real-time simulation heatmap on canvas nodes
- [ ] Phase 4: Save/load designs, templates library
- [ ] Phase 5: Collaborative editing

## License

MIT
