export default defineAppConfig({
  title: "Tendo",
  collection: {
    key: "tendo",
    title: "Tendo",
    hero: {
      tagline: "Composable Tensor Operations for Go.",
      taglineHighlight: "Native Inference. No Python.",
      description:
        "Load pretrained weights, build computation graphs, and run inference in pure Go. Optional CUDA acceleration, pipz-composable operations, and capitan observability — all without CGO for CPU workloads.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/tendo"

// Load pretrained weights
weights, _ := tendo.LoadSafetensors("model.safetensors")

// Build a forward pass — every operation is pipz.Chainable
forward := pipz.NewSequence(forwardID,
    tendo.MatMul(weights["layer1.weight"]),
    tendo.Add(weights["layer1.bias"]),
    tendo.ReLU(),
    tendo.MatMul(weights["layer2.weight"]),
    tendo.Add(weights["layer2.bias"]),
    tendo.Softmax(-1),
)

// Run inference
input := tendo.Randn([]int{1, 784}, tendo.Float32, tendo.CPU)
result, _ := forward.Process(ctx, input)

// Move to GPU with one call
gpuInput := input.To(tendo.CUDA(0))`,
      },
    },
    highlights: {
      title: "Why Tendo?",
      description:
        "Production inference in Go — single binary, standard tooling, no runtime dependencies.",
      items: [
        {
          icon: "bolt",
          title: "Pure Go CPU Path",
          description:
            "No CGO required for CPU operations. Deploy as a single binary with Go's standard build and deployment tooling.",
        },
        {
          icon: "speed",
          title: "Optional CUDA Acceleration",
          description:
            "Write operations once, run on CPU or GPU. Transfer tensors between devices with a single To() call.",
        },
        {
          icon: "link",
          title: "Pipz Composability",
          description:
            "Every operation returns pipz.Chainable[*Tensor]. Build reusable computation graphs that compose, retry, and observe.",
        },
        {
          icon: "cache",
          title: "Memory Pooling",
          description:
            "Size-class bucketed allocation pools reduce GC pressure and CUDA malloc overhead. Per-device statistics tracking.",
        },
        {
          icon: "explore",
          title: "Built-In Observability",
          description:
            "Every operation emits capitan signals with shape metadata. Hook listeners for logging, profiling, and graph visualization.",
        },
        {
          icon: "code",
          title: "50+ Operations",
          description:
            "Elementwise, matrix, shape, reduction, activation, convolution, pooling, and normalization. Float32, Float16, BFloat16.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Tensor creation, transformation, and inference with device portability and composable operations.",
      items: [
        {
          feature: "Device Portability",
          description:
            "Seamless CPU and CUDA execution. Runtime device checking with clear error messages for mismatches.",
          link: { label: "Devices", to: "/guides/devices" },
        },
        {
          feature: "Memory Management",
          description:
            "Go GC for CPU tensors, explicit management for CUDA. Allocation pooling with size-class bucketing for reuse.",
          link: { label: "Memory", to: "/guides/memory" },
        },
        {
          feature: "Data Types",
          description:
            "Float32 default with Float16 and BFloat16 support. Automatic conversion on device transfer.",
          link: { label: "DTypes", to: "/guides/dtypes" },
        },
        {
          feature: "Computation Pipelines",
          description:
            "Chain operations into pipz pipelines with context-driven inference vs training mode. Custom layers via Apply and Transform.",
          link: { label: "Pipelines", to: "/cookbook/pipelines" },
        },
        {
          feature: "Safetensors Loading",
          description:
            "Load pretrained PyTorch weights in safetensors format. Map to tendo tensors on any device.",
          link: { label: "Quickstart", to: "/learn/quickstart" },
        },
        {
          feature: "Observability",
          description:
            "Capitan signals on every operation with shape metadata. Computation graph visualization and profiling hooks.",
          link: { label: "Observability", to: "/cookbook/observability" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full tendo documentation.",
    },
    repo: "https://github.com/zoobzio/tendo",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
