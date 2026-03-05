export default defineAppConfig({
  title: "cldpd",
  collection: {
    key: "cldpd",
    title: "cldpd",
    hero: {
      tagline: "Async Pod Lifecycle for Claude Code.",
      taglineHighlight: "Dispatch. Stream. Resume.",
      description:
        "Activate GitHub-aware repositories as autonomous Claude Code agent teams in Docker containers. Point at an issue, stream typed events, and resume with follow-up guidance — zero external dependencies.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/cldpd"

// Create dispatcher from pod definitions
d := cldpd.NewDispatcher(podsDir, &cldpd.DockerRunner{})

// Start a task — returns immediately, container runs async
session, _ := d.Start(ctx, "myrepo",
    "https://github.com/org/repo/issues/42",
)

// Stream typed events
for event := range session.Events() {
    switch e := event.(type) {
    case *cldpd.EventOutput:
        fmt.Print(e.Text)
    case *cldpd.EventContainerExited:
        fmt.Printf("Exit code: %d\\n", e.Code)
    case *cldpd.EventError:
        log.Printf("Error: %v\\n", e.Err)
    }
}

// Resume with follow-up guidance mid-task
session, _ = d.Resume(ctx, "myrepo", "Focus on error handling")

// Wait for completion
code, _ := session.Wait()`,
      },
    },
    highlights: {
      title: "Why cldpd?",
      description:
        "Lightweight activation for autonomous agent teams — repos bring their own intelligence.",
      items: [
        {
          icon: "bolt",
          title: "Non-Blocking Dispatch",
          description:
            "Start() returns a Session immediately after build. Containers run in background goroutines with event streaming.",
        },
        {
          icon: "code",
          title: "Zero Dependencies",
          description:
            "Stdlib only. Docker interaction via os/exec — no Docker SDK bloat. Portable across any system with Docker CLI.",
        },
        {
          icon: "sort",
          title: "Typed Event Stream",
          description:
            "EventOutput, EventContainerExited, EventError — structured events replace raw streaming. 256-entry buffered channel.",
        },
        {
          icon: "edit",
          title: "Mid-Task Resume",
          description:
            "Send follow-up guidance without interrupting the workflow. Same deterministic container naming enables reliable reconnection.",
        },
        {
          icon: "lock",
          title: "Secure Credential Passthrough",
          description:
            "Environment variables and SSH keys forwarded via Docker CLI flags. No temporary files, no disk writes.",
        },
        {
          icon: "settings",
          title: "Runner Interface",
          description:
            "Five-method abstraction over Docker operations. Mock testing without Docker, future Podman or containerd support.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Dispatch, stream, and resume autonomous agent teams in ephemeral Docker containers.",
      items: [
        {
          feature: "Pod Definitions",
          description:
            "Directory with Dockerfile, optional pod.json config, and template.md. Repositories bring their own .claude/ workflows.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Session Lifecycle",
          description:
            "Two goroutines per session — container execution and event streaming. Idempotent Stop(), independent Events() and Wait().",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Credential Handling",
          description:
            "Two-tier passthrough: inheritEnv resolved eagerly at dispatch, unset values deferred to Docker for late binding.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Graceful Shutdown",
          description:
            "SIGTERM with configurable timeout before SIGKILL. Clean Ctrl+C handling in CLI usage.",
          link: { label: "Troubleshooting", to: "/guides/troubleshooting" },
        },
        {
          feature: "Error Handling",
          description:
            "Semantic sentinel errors — ErrPodNotFound, ErrBuildFailed, ErrSessionNotFound. Checked with errors.Is.",
          link: { label: "API", to: "/reference/api" },
        },
        {
          feature: "Testing",
          description:
            "Runner interface enables mock testing without Docker. Isolated dispatcher logic testing.",
          link: { label: "Testing", to: "/guides/testing" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full cldpd documentation.",
    },
    repo: "https://github.com/zoobzio/cldpd",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Reference: "reference",
    },
  },
});
