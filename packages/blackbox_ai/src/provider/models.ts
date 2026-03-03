import { Global } from "../global"
import { Log } from "../util/log"
import path from "path"
import z from "zod"
import { Installation } from "../installation"
import { Flag } from "../flag/flag"
import { lazy } from "@/util/lazy"
import { Filesystem } from "../util/filesystem"

// Try to import bundled snapshot (generated at build time)
// Falls back to undefined in dev mode when snapshot doesn't exist
/* @ts-ignore */

// ---------------------------------------------------------------------------
// Hardcoded Blackbox AI provider — all models route through api.blackbox.ai
// Model IDs use the full "blackboxai/{provider}/{model}" prefix required by
// the Blackbox AI API.  Cost figures are in USD per 1 million tokens and come
// from https://docs.blackbox.ai/api-reference/models/chat-pricing.md
// ---------------------------------------------------------------------------
const BLACKBOX_AI_PROVIDER = {
  id: "blackbox-ai",
  name: "Blackbox AI",
  env: ["BLACKBOXAI_API_KEY"],
  npm: "@ai-sdk/openai-compatible",
  api: "https://api.blackbox.ai",
  models: {
    // ── Anthropic via Blackbox AI ──────────────────────────────────────────
    "blackboxai/anthropic/claude-sonnet-4.5": {
      id: "blackboxai/anthropic/claude-sonnet-4.5",
      name: "Claude Sonnet 4.5 (Blackbox AI)",
      family: "claude",
      release_date: "2025-01-01",
      attachment: true,
      reasoning: false,
      temperature: true,
      tool_call: true,
      cost: { input: 3.0, output: 15.0 },
      limit: { context: 200000, output: 8192 },
      modalities: { input: ["text", "image"], output: ["text"] },
      options: {},
    },
    "blackboxai/anthropic/claude-opus-4.5": {
      id: "blackboxai/anthropic/claude-opus-4.5",
      name: "Claude Opus 4.5 (Blackbox AI)",
      family: "claude",
      release_date: "2025-01-01",
      attachment: true,
      reasoning: false,
      temperature: true,
      tool_call: true,
      cost: { input: 5.0, output: 25.0 },
      limit: { context: 200000, output: 8192 },
      modalities: { input: ["text", "image"], output: ["text"] },
      options: {},
    },
    "blackboxai/anthropic/claude-3-7-sonnet:thinking": {
      id: "blackboxai/anthropic/claude-3-7-sonnet:thinking",
      name: "Claude 3.7 Sonnet Thinking (Blackbox AI)",
      family: "claude",
      release_date: "2025-01-01",
      attachment: true,
      reasoning: true,
      temperature: true,
      tool_call: true,
      cost: { input: 3.0, output: 15.0 },
      limit: { context: 200000, output: 16000 },
      modalities: { input: ["text", "image"], output: ["text"] },
      options: {},
    },
    // ── OpenAI via Blackbox AI ─────────────────────────────────────────────
    "blackboxai/openai/gpt-4o": {
      id: "blackboxai/openai/gpt-4o",
      name: "GPT-4o (Blackbox AI)",
      family: "gpt",
      release_date: "2024-05-13",
      attachment: true,
      reasoning: false,
      temperature: true,
      tool_call: true,
      cost: { input: 2.5, output: 10.0 },
      limit: { context: 128000, output: 16384 },
      modalities: { input: ["text", "image"], output: ["text"] },
      options: {},
    },
    "blackboxai/openai/gpt-4o-mini": {
      id: "blackboxai/openai/gpt-4o-mini",
      name: "GPT-4o Mini (Blackbox AI)",
      family: "gpt",
      release_date: "2024-07-18",
      attachment: true,
      reasoning: false,
      temperature: true,
      tool_call: true,
      cost: { input: 0.15, output: 0.6 },
      limit: { context: 128000, output: 16384 },
      modalities: { input: ["text", "image"], output: ["text"] },
      options: {},
    },
    "blackboxai/openai/gpt-4.1": {
      id: "blackboxai/openai/gpt-4.1",
      name: "GPT-4.1 (Blackbox AI)",
      family: "gpt",
      release_date: "2025-04-14",
      attachment: true,
      reasoning: false,
      temperature: true,
      tool_call: true,
      cost: { input: 2.0, output: 8.0 },
      limit: { context: 1000000, output: 32768 },
      modalities: { input: ["text", "image"], output: ["text"] },
      options: {},
    },
    "blackboxai/openai/o3": {
      id: "blackboxai/openai/o3",
      name: "o3 (Blackbox AI)",
      family: "o",
      release_date: "2025-04-16",
      attachment: true,
      reasoning: true,
      temperature: false,
      tool_call: true,
      cost: { input: 10.0, output: 40.0 },
      limit: { context: 200000, output: 100000 },
      modalities: { input: ["text", "image"], output: ["text"] },
      options: {},
    },
    "blackboxai/openai/o4-mini": {
      id: "blackboxai/openai/o4-mini",
      name: "o4-mini (Blackbox AI)",
      family: "o",
      release_date: "2025-04-16",
      attachment: true,
      reasoning: true,
      temperature: false,
      tool_call: true,
      cost: { input: 1.1, output: 4.4 },
      limit: { context: 200000, output: 100000 },
      modalities: { input: ["text", "image"], output: ["text"] },
      options: {},
    },
    // ── Google via Blackbox AI ─────────────────────────────────────────────
    "blackboxai/google/gemini-2.5-pro": {
      id: "blackboxai/google/gemini-2.5-pro",
      name: "Gemini 2.5 Pro (Blackbox AI)",
      family: "gemini",
      release_date: "2025-03-25",
      attachment: true,
      reasoning: true,
      temperature: true,
      tool_call: true,
      cost: { input: 1.25, output: 10.0 },
      limit: { context: 1000000, output: 65536 },
      modalities: { input: ["text", "image", "video", "pdf"], output: ["text"] },
      options: {},
    },
    "blackboxai/google/gemini-2.5-flash": {
      id: "blackboxai/google/gemini-2.5-flash",
      name: "Gemini 2.5 Flash (Blackbox AI)",
      family: "gemini",
      release_date: "2025-05-20",
      attachment: true,
      reasoning: true,
      temperature: true,
      tool_call: true,
      cost: { input: 0.3, output: 2.5 },
      limit: { context: 1000000, output: 65536 },
      modalities: { input: ["text", "image", "video", "pdf"], output: ["text"] },
      options: {},
    },
    "blackboxai/google/gemini-3-pro-preview": {
      id: "blackboxai/google/gemini-3-pro-preview",
      name: "Gemini 3 Pro Preview (Blackbox AI)",
      family: "gemini",
      release_date: "2025-06-01",
      attachment: true,
      reasoning: true,
      temperature: true,
      tool_call: true,
      cost: { input: 2.0, output: 12.0 },
      limit: { context: 1000000, output: 65536 },
      modalities: { input: ["text", "image", "video", "pdf"], output: ["text"] },
      options: {},
      status: "beta" as const,
    },
    // ── DeepSeek via Blackbox AI ───────────────────────────────────────────
    "blackboxai/deepseek/deepseek-r1": {
      id: "blackboxai/deepseek/deepseek-r1",
      name: "DeepSeek R1 (Blackbox AI)",
      family: "deepseek",
      release_date: "2025-01-20",
      attachment: false,
      reasoning: true,
      temperature: true,
      tool_call: true,
      cost: { input: 0.45, output: 2.15 },
      limit: { context: 128000, output: 32768 },
      modalities: { input: ["text"], output: ["text"] },
      options: {},
    },
    "blackboxai/deepseek/deepseek-chat": {
      id: "blackboxai/deepseek/deepseek-chat",
      name: "DeepSeek V3 (Blackbox AI)",
      family: "deepseek",
      release_date: "2024-12-26",
      attachment: false,
      reasoning: false,
      temperature: true,
      tool_call: true,
      cost: { input: 0.38, output: 0.89 },
      limit: { context: 163840, output: 32768 },
      modalities: { input: ["text"], output: ["text"] },
      options: {},
    },
    // ── Meta via Blackbox AI ───────────────────────────────────────────────
    "blackboxai/meta-llama/llama-4-maverick": {
      id: "blackboxai/meta-llama/llama-4-maverick",
      name: "Llama 4 Maverick (Blackbox AI)",
      family: "llama",
      release_date: "2025-04-05",
      attachment: true,
      reasoning: false,
      temperature: true,
      tool_call: true,
      cost: { input: 0.15, output: 0.6 },
      limit: { context: 1000000, output: 32768 },
      modalities: { input: ["text", "image"], output: ["text"] },
      options: {},
    },
    "blackboxai/meta-llama/llama-4-scout": {
      id: "blackboxai/meta-llama/llama-4-scout",
      name: "Llama 4 Scout (Blackbox AI)",
      family: "llama",
      release_date: "2025-04-05",
      attachment: true,
      reasoning: false,
      temperature: true,
      tool_call: true,
      cost: { input: 0.08, output: 0.3 },
      limit: { context: 1000000, output: 32768 },
      modalities: { input: ["text", "image"], output: ["text"] },
      options: {},
    },
    // ── Mistral via Blackbox AI ────────────────────────────────────────────
    "blackboxai/mistralai/devstral-small": {
      id: "blackboxai/mistralai/devstral-small",
      name: "Devstral Small (Blackbox AI)",
      family: "mistral",
      release_date: "2025-05-21",
      attachment: false,
      reasoning: false,
      temperature: true,
      tool_call: true,
      cost: { input: 0.1, output: 0.3 },
      limit: { context: 128000, output: 32768 },
      modalities: { input: ["text"], output: ["text"] },
      options: {},
    },
    // ── Blackbox AI native models ──────────────────────────────────────────
    "blackboxai/blackbox-pro": {
      id: "blackboxai/blackbox-pro",
      name: "Blackbox Pro",
      family: "blackbox",
      release_date: "2024-01-01",
      attachment: false,
      reasoning: false,
      temperature: true,
      tool_call: true,
      cost: { input: 0.0, output: 0.0 },
      limit: { context: 128000, output: 32768 },
      modalities: { input: ["text"], output: ["text"] },
      options: {},
    },
    "blackboxai/blackbox-search": {
      id: "blackboxai/blackbox-search",
      name: "Blackbox Search",
      family: "blackbox",
      release_date: "2024-01-01",
      attachment: false,
      reasoning: false,
      temperature: true,
      tool_call: true,
      cost: { input: 0.2, output: 0.5 },
      limit: { context: 1000000, output: 32768 },
      modalities: { input: ["text"], output: ["text"] },
      options: {},
    },
  },
} as const

export namespace ModelsDev {
  const log = Log.create({ service: "models.dev" })
  const filepath = path.join(Global.Path.cache, "models.json")

  export const Model = z.object({
    id: z.string(),
    name: z.string(),
    family: z.string().optional(),
    release_date: z.string(),
    attachment: z.boolean(),
    reasoning: z.boolean(),
    temperature: z.boolean(),
    tool_call: z.boolean(),
    interleaved: z
      .union([
        z.literal(true),
        z
          .object({
            field: z.enum(["reasoning_content", "reasoning_details"]),
          })
          .strict(),
      ])
      .optional(),
    cost: z
      .object({
        input: z.number(),
        output: z.number(),
        cache_read: z.number().optional(),
        cache_write: z.number().optional(),
        context_over_200k: z
          .object({
            input: z.number(),
            output: z.number(),
            cache_read: z.number().optional(),
            cache_write: z.number().optional(),
          })
          .optional(),
      })
      .optional(),
    limit: z.object({
      context: z.number(),
      input: z.number().optional(),
      output: z.number(),
    }),
    modalities: z
      .object({
        input: z.array(z.enum(["text", "audio", "image", "video", "pdf"])),
        output: z.array(z.enum(["text", "audio", "image", "video", "pdf"])),
      })
      .optional(),
    experimental: z.boolean().optional(),
    status: z.enum(["alpha", "beta", "deprecated"]).optional(),
    options: z.record(z.string(), z.any()),
    headers: z.record(z.string(), z.string()).optional(),
    provider: z.object({ npm: z.string().optional(), api: z.string().optional() }).optional(),
    variants: z.record(z.string(), z.record(z.string(), z.any())).optional(),
  })
  export type Model = z.infer<typeof Model>

  export const Provider = z.object({
    api: z.string().optional(),
    name: z.string(),
    env: z.array(z.string()),
    id: z.string(),
    npm: z.string().optional(),
    models: z.record(z.string(), Model),
  })

  export type Provider = z.infer<typeof Provider>

  function url() {
    return Flag.OPENCODE_MODELS_URL || "https://models.dev"
  }

  export const Data = lazy(async () => {
    const result = await Filesystem.readJson(Flag.OPENCODE_MODELS_PATH ?? filepath).catch(() => {})
    if (result) return result
    // @ts-ignore
    const snapshot = await import("./models-snapshot")
      .then((m) => m.snapshot as Record<string, unknown>)
      .catch(() => undefined)
    if (snapshot) return snapshot
    if (Flag.OPENCODE_DISABLE_MODELS_FETCH) return {}
    const json = await fetch(`${url()}/api.json`).then((x) => x.text())
    return JSON.parse(json)
  })

  export async function get() {
    const result = await Data()
    const providers = result as Record<string, Provider>
    // Always inject the Blackbox AI provider so it is available in the
    // provider database regardless of whether models.dev is reachable.
    providers["blackbox-ai"] = BLACKBOX_AI_PROVIDER as unknown as Provider
    return providers
  }

  export async function refresh() {
    const result = await fetch(`${url()}/api.json`, {
      headers: {
        "User-Agent": Installation.USER_AGENT,
      },
      signal: AbortSignal.timeout(10 * 1000),
    }).catch((e) => {
      log.error("Failed to fetch models.dev", {
        error: e,
      })
    })
    if (result && result.ok) {
      await Filesystem.write(filepath, await result.text())
      ModelsDev.Data.reset()
    }
  }
}

if (!Flag.OPENCODE_DISABLE_MODELS_FETCH && !process.argv.includes("--get-yargs-completions")) {
  ModelsDev.refresh()
  setInterval(
    async () => {
      await ModelsDev.refresh()
    },
    60 * 1000 * 60,
  ).unref()
}
