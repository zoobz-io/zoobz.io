---
title: Hello World!
description: A brief introduction to zoobz.io
author: zoobzio
published: 2026-04-17
tags:
  - meta
  - announcements
---

Welcome! This is where I will be updating my progress on [zoobz.io](https://github.com/zoobz-io), an ecosystem of composable Go libraries designed for constructing modern agentic applications.

As with all things in life, these libraries are a work in progress. Some are battle-tested and used in real applications and others are experiments that may be subject to change. [Keep an eye](/rss.xml) on my progress or open an issue on any repo to get involved!

## Projects

Here is a snapshot of what is available today.

> [!NOTE]
> This article will not be kept up-to-date. Take a look [here](https://github.com/zoobz-io/repositories) for the latest.

### Configuration

| Package                                  | Description                                   |
| ---------------------------------------- | --------------------------------------------- |
| [fig](https://github.com/zoobz-io/fig)   | Struct tags in, configuration out             |
| [flux](https://github.com/zoobz-io/flux) | Reactive configuration synchronization for Go |

### Events

| Package                                          | Description                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| [capitan](https://github.com/zoobz-io/capitan)   | Type-safe event coordination for Go with zero dependencies        |
| [herald](https://github.com/zoobz-io/herald)     | Bidirectional bindings between capitan events and message brokers |
| [aperture](https://github.com/zoobz-io/aperture) | Config-driven bridge from capitan events to OpenTelemetry signals |

### Data & Storage

| Package                                        | Description                                                    |
| ---------------------------------------------- | -------------------------------------------------------------- |
| [dbml](https://github.com/zoobz-io/dbml)       | A Go package for building and generating DBML programmatically |
| [astql](https://github.com/zoobz-io/astql)     | Type-safe SQL query builder with DBML schema validation        |
| [lucene](https://github.com/zoobz-io/lucene)   | Type-safe search queries for Elasticsearch and OpenSearch      |
| [vecna](https://github.com/zoobz-io/vecna)     | Schema-validated filter builder for vector databases           |
| [soy](https://github.com/zoobz-io/soy)         | Type-safe SQL query builder for Go with schema validation      |
| [edamame](https://github.com/zoobz-io/edamame) | Statement-driven query exec for Go                             |
| [grub](https://github.com/zoobz-io/grub)       | Provider-agnostic storage for Go                               |

### Pipelines

| Package                                    | Description                                                         |
| ------------------------------------------ | ------------------------------------------------------------------- |
| [pipz](https://github.com/zoobz-io/pipz)   | Type-safe, composable data pipelines for Go                         |
| [flume](https://github.com/zoobz-io/flume) | A dynamic pipeline factory for pipz with hot-reloading capabilities |

### HTTP

| Package                                        | Description                                                       |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| [openapi](https://github.com/zoobz-io/openapi) | OpenAPI 3.1 specification as native Go types                      |
| [rocco](https://github.com/zoobz-io/rocco)     | Type-safe HTTP framework for Go with automatic OpenAPI generation |
| [sctx](https://github.com/zoobz-io/sctx)       | Certificate-based security contexts for Go                        |

### AI

| Package                                      | Description                                                    |
| -------------------------------------------- | -------------------------------------------------------------- |
| [zyn](https://github.com/zoobz-io/zyn)       | Type-safe LLM orchestration for Go                             |
| [cogito](https://github.com/zoobz-io/cogito) | LLM-powered reasoning chains with semantic memory for Go       |
| [chit](https://github.com/zoobz-io/chit)     | Conversation lifecycle controller for LLM-powered applications |
| [vex](https://github.com/zoobz-io/vex)       | Type-safe embedding vector generation for Go                   |

### Tools

| Package                                          | Description                                                |
| ------------------------------------------------ | ---------------------------------------------------------- |
| [sentinel](https://github.com/zoobz-io/sentinel) | Zero-dependency struct introspection for Go                |
| [clockz](https://github.com/zoobz-io/clockz)     | Type-safe clock abstractions for Go with zero dependencies |
| [slush](https://github.com/zoobz-io/slush)       | Type-safe guarded service locator for Go                   |
| [cereal](https://github.com/zoobz-io/cereal)     | Boundary-aware serialization for Go                        |
| [check](https://github.com/zoobz-io/check)       | Fluent validation for Go with struct tag verification      |
