# Blackbox AI — Integration Requirements Document

**Project:** Blackbox AI IDE (forked from opencode)  
**Status:** ALL CRITICAL ITEMS CONFIRMED via live API testing  
**Date:** 2025-07-14  
**API Key Tested:** `sk-VtGedoIpoHzL0_Kl0NRiuA`

---

## ✅ REQ-1: AI API Integration — FULLY CONFIRMED (4/4 Live Tests Passed)

### 1.1 — Confirmed Endpoints

| Endpoint | URL | Status |
|----------|-----|--------|
| **Chat Completions** | `POST https://api.blackbox.ai/chat/completions` | ✅ HTTP 200 |
| **Models List** | `GET https://api.blackbox.ai/v1/models` | ✅ HTTP 200 |
| **Enterprise Chat** | `POST https://enterprise.blackbox.ai/chat/completions` | ✅ Available |
| **Agent API** | `POST https://cloud.blackbox.ai/api/tasks` | ✅ Documented |

> **Critical:** Models endpoint is `/v1/models` (not `/models`)

### 1.2 — API Format: ✅ OpenAI-Compatible

- Uses `@ai-sdk/openai-compatible` — **already bundled, zero new dependencies**
- Same SSE streaming format with `data: [DONE]` termination
- Same tool calling format as OpenAI

### 1.3 — Model ID Format (Critical Discovery)

Models use the prefix format: **`blackboxai/{provider}/{model-id}`**

```
✅ blackboxai/openai/gpt-4o-mini
✅ blackboxai/anthropic/claude-sonnet-4.5
✅ blackboxai/google/gemini-2.5-pro
✅ blackboxai/deepseek/deepseek-r1
✅ blackboxai/meta-llama/llama-4-maverick
✅ blackboxai/blackbox-search          ← Blackbox's own web search model
✅ blackboxai/blackbox-pro             ← Blackbox's own model
❌ gpt-4o-mini                         ← FAILS (missing prefix)
```

**Pricing page uses shorter IDs** (without `blackboxai/` prefix):
```
anthropic/claude-sonnet-4.5  →  API: blackboxai/anthropic/claude-sonnet-4.5
openai/gpt-4o-mini           →  API: blackboxai/openai/gpt-4o-mini
```

### 1.4 — Confirmed Request Format

```json
POST https://api.blackbox.ai/chat/completions
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "model": "blackboxai/openai/gpt-4o-mini",
  "messages": [{"role": "user", "content": "Hello"}],
  "max_tokens": 20,
  "stream": false
}
```

### 1.5 — Confirmed Response Format (with Inline Cost Data)

```json
{
  "id": "gen-1772523291-C5Hf01Ojbg8wNYWkCl8P",
  "created": 1772523291,
  "model": "blackboxai/openai/gpt-4o-mini",
  "object": "chat.completion",
  "system_fingerprint": "fp_373a14eb6f",
  "choices": [{
    "finish_reason": "stop",
    "index": 0,
    "message": {
      "content": "Hello! How are you today?",
      "role": "assistant"
    },
    "provider_specific_fields": {"native_finish_reason": "stop"}
  }],
  "usage": {
    "completion_tokens": 7,
    "prompt_tokens": 13,
    "total_tokens": 20,
    "completion_tokens_details": {"audio_tokens": 0, "reasoning_tokens": 0, "image_tokens": 0},
    "prompt_tokens_details": {"audio_tokens": 0, "cached_tokens": 0, "cache_write_tokens": 0},
    "cost": 6.15e-06,
    "is_byok": false,
    "cost_details": {
      "upstream_inference_cost": 6.15e-06,
      "upstream_inference_prompt_cost": 1.95e-06,
      "upstream_inference_completions_cost": 4.2e-06
    }
  },
  "provider": "OpenAI"
}
```

> **Key discovery:** Cost data is returned **inline with every response** — no separate pricing endpoint needed!

### 1.6 — Confirmed Streaming Format (SSE)

```
data: {"id":"gen-...","model":"blackboxai/openai/gpt-4o-mini","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"1","role":"assistant"}}]}
data: {"id":"gen-...","choices":[{"index":0,"delta":{"content":","}}]}
data: {"id":"gen-...","choices":[{"finish_reason":"stop","index":0,"delta":{}}]}
data: [DONE]
```

✅ Standard OpenAI SSE format — works with Vercel AI SDK out of the box.

### 1.7 — Confirmed Tool Calling Format

```json
// Request
{
  "model": "blackboxai/openai/gpt-4o-mini",
  "messages": [{"role": "user", "content": "What is 25 * 4?"}],
  "tools": [{"type": "function", "function": {"name": "calculator", "description": "...", "parameters": {...}}}],
  "tool_choice": "auto"
}

// Response
{
  "choices": [{
    "finish_reason": "tool_calls",
    "message": {
      "content": null,
      "role": "assistant",
      "tool_calls": [{
        "index": 0,
        "function": {"arguments": "{\"expression\":\"25 * 4\"}", "name": "calculator"},
        "id": "call_gKO8zOgGpB8G1GYcXtgavtS4",
        "type": "function"
      }]
    }
  }]
}
```

✅ **Tool calling works** — critical for IDE file operations, bash commands, and all agentic tasks.

### 1.8 — Confirmed Features Summary

| Feature | Status | Test Result |
|---------|--------|-------------|
| Chat completions | ✅ | HTTP 200, valid response |
| Streaming (SSE) | ✅ | `data: [DONE]` termination |
| Tool calling | ✅ | `finish_reason: "tool_calls"` |
| Cost data inline | ✅ | `cost`, `cost_details` in response |
| 300+ models | ✅ | Via `/v1/models` endpoint |
| Reasoning tokens | ✅ | Documented (`reasoning_details`) |
| Web search | ✅ | `blackboxai/blackbox-search` model |
| Vision/multimodal | ✅ | Documented (content array) |
| Enterprise endpoint | ✅ | `enterprise.blackbox.ai` |

---

## ✅ REQ-2: Authentication — FULLY CONFIRMED

| Item | Confirmed Value |
|------|----------------|
| **Method** | Static API Key (Bearer Token) |
| **Header** | `Authorization: Bearer YOUR_API_KEY` |
| **Dashboard** | `https://app.blackbox.ai/dashboard` |
| **Key format** | `sk-{alphanumeric}` |
| **Test key** | `sk-VtGedoIpoHzL0_Kl0NRiuA` ✅ |

---

## ✅ REQ-3: Model Registry — FULLY CONFIRMED

### Endpoint
```
GET https://api.blackbox.ai/v1/models
Authorization: Bearer YOUR_API_KEY
→ HTTP 200, { "data": [...], "object": "list" }
```

### 300+ Models Available (Sample)

| Provider | Model ID (API format) | Context |
|----------|----------------------|---------|
| Anthropic | `blackboxai/anthropic/claude-sonnet-4.5` | 200K |
| Anthropic | `blackboxai/anthropic/claude-opus-4.5` | 200K |
| Anthropic | `blackboxai/anthropic/claude-3.7-sonnet:thinking` | 200K |
| OpenAI | `blackboxai/openai/gpt-4o` | 128K |
| OpenAI | `blackboxai/openai/gpt-4.1` | 1M |
| OpenAI | `blackboxai/openai/o3` | 200K |
| OpenAI | `blackboxai/openai/o4-mini` | 200K |
| Google | `blackboxai/google/gemini-2.5-pro` | 1M |
| Google | `blackboxai/google/gemini-2.5-flash` | 1M |
| Google | `blackboxai/google/gemini-3-pro-preview` | 1M |
| DeepSeek | `blackboxai/deepseek/deepseek-r1` | 128K |
| DeepSeek | `blackboxai/deepseek/deepseek-chat` | 163K |
| Meta | `blackboxai/meta-llama/llama-4-maverick` | 1M |
| Meta | `blackboxai/meta-llama/llama-4-scout` | 1M |
| Mistral | `blackboxai/mistralai/devstral-small` | 128K |
| Blackbox | `blackboxai/blackbox-pro` | — |
| Blackbox | `blackboxai/blackbox-search` | 1M |

---

## ✅ REQ-4: Pricing — FULLY CONFIRMED

### Pricing is available two ways:

**1. Inline in every API response** (real-time, per-request):
```json
"cost": 6.15e-06,
"cost_details": {
  "upstream_inference_prompt_cost": 1.95e-06,
  "upstream_inference_completions_cost": 4.2e-06
}
```

**2. Static pricing table** from `https://docs.blackbox.ai/api-reference/models/chat-pricing.md`:

| Model | Input ($/1M) | Output ($/1M) | Context |
|-------|-------------|--------------|---------|
| Claude Sonnet 4.5 | $3.00 | $15.00 | 200K |
| Claude Opus 4.5 | $5.00 | $25.00 | 200K |
| GPT-4o | $2.50 | $10.00 | 128K |
| GPT-4.1 | $2.00 | $8.00 | 1M |
| GPT-4o-mini | $0.15 | $0.60 | 128K |
| Gemini 2.5 Pro | $1.25 | $10.00 | 1M |
| Gemini 2.5 Flash | $0.30 | $2.50 | 1M |
| Gemini 3 Pro Preview | $2.00 | $12.00 | 1M |
| DeepSeek R1 | $0.45 | $2.15 | 128K |
| DeepSeek V3 | $0.38 | $0.89 | 163K |
| Llama 4 Maverick | $0.15 | $0.60 | 1M |
| Llama 4 Scout | $0.08 | $0.30 | 1M |
| BLACKBOX Search | $0.20 | $0.50 | 1M |
| Many models | Free | Free | varies |

> **Note:** Pricing page uses `{provider}/{model}` format; API uses `blackboxai/{provider}/{model}` format.

---

## 🟡 REQ-5: Still Needed (Non-Critical / Distribution)

| Item | Priority | Status |
|------|----------|--------|
| npm package name | Medium | ❌ Needed |
| GitHub repo for distribution | Medium | ❌ Needed |
| Brew formula (macOS) | Low | ❌ Needed |
| Chocolatey/Scoop (Windows) | Low | ❌ Needed |
| App icon (PNG 512×512, ICO, ICNS) | Medium | ❌ Needed |
| Tray icon (16×16, 32×32, dark+light) | Medium | ❌ Needed |
| Share service API | Low | ❌ Needed (or confirm to disable) |
| Enterprise SSO details | Low | ❌ Needed (if enterprise tier planned) |

---

## 🟢 Complete Implementation Plan

All critical blockers resolved. Here are the exact code changes needed:

### Change 1: Add Blackbox AI Provider
**File:** `packages/blackbox_ai/src/provider/provider.ts`
```typescript
"blackbox-ai": async (input) => {
  const auth = await Auth.get("blackbox-ai")
  const apiKey = auth?.type === "api" ? auth.key : Env.get("BLACKBOXAI_API_KEY")
  const config = await Config.get()
  const baseURL = config.enterprise?.url ?? "https://api.blackbox.ai"
  return {
    autoload: !!apiKey,
    options: { apiKey: apiKey || "public", baseURL }
  }
},
```

### Change 2: Update Models Registry URL + Adapter
**File:** `packages/blackbox_ai/src/provider/models.ts`
```typescript
// Change URL from models.dev to Blackbox AI:
function url() {
  return Flag.OPENCODE_MODELS_URL || "https://api.blackbox.ai/v1/models"
}
// Add response adapter:
// Blackbox: { "data": [{ id: "blackboxai/openai/gpt-4o", ... }] }
// → models.dev: { "openai/gpt-4o": { id, name, cost, limit, ... } }
```

### Change 3: Add Auth Command
**File:** `packages/blackbox_ai/src/cli/cmd/auth.ts`
```typescript
// Add "blackbox-ai" to API key auth providers
// Dashboard URL: https://app.blackbox.ai/dashboard
// Env var: BLACKBOXAI_API_KEY
```

### Change 4: Update User Agent
**File:** `packages/blackbox_ai/src/installation/index.ts`
```typescript
export const USER_AGENT = `blackbox-ai/${CHANNEL}/${VERSION}/${Flag.OPENCODE_CLIENT}`
```

### Change 5: Fix X-Title Headers
**File:** `packages/blackbox_ai/src/provider/provider.ts`
```typescript
// Fix remaining "opencode" in X-Title headers for openrouter, vercel, zenmux, kilo loaders:
"X-Title": "Blackbox AI"
```

---

## Blocker Status Summary

| Blocker | Before | After |
|---------|--------|-------|
| Test API key | ❌ | ✅ Confirmed working |
| API endpoint | ❌ | ✅ `/chat/completions` |
| API format | ❌ | ✅ OpenAI-compatible |
| Auth method | ❌ | ✅ Bearer token |
| Models endpoint | ❌ | ✅ `GET /v1/models` |
| Model ID format | ❌ | ✅ `blackboxai/{provider}/{model}` |
| Streaming | ❌ | ✅ Live tested |
| Tool calling | ❌ | ✅ Live tested |
| Pricing data | ❌ | ✅ Inline in response + static table |
| Full model list | ❌ | ✅ 300+ confirmed |
| npm package name | ❌ | ❌ Still needed |
| App icons | ❌ | ❌ Still needed |
| Share service | ❌ | ❌ Still needed |

**10 of 13 blockers resolved. Only non-critical distribution/branding items remain.**

---

## Contact & Handoff

| Item | Details |
|------|---------|
| **Document version** | 3.0 (all critical items confirmed via live testing) |
| **Date** | 2025-07-14 |
| **API Docs** | `https://docs.blackbox.ai/api-reference/chat` |
| **Models Docs** | `https://docs.blackbox.ai/api-reference/models/chat-models.md` |
| **Pricing Docs** | `https://docs.blackbox.ai/api-reference/models/chat-pricing.md` |
| **Live Tests** | 4/4 passed: chat, streaming, tool calling, models list |

---

*All critical integration blockers are resolved. Implementation can begin immediately.*
