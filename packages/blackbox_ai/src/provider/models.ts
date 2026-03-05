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

export namespace ModelsDev {
  const log = Log.create({ service: "models.dev" })
  const filepath = path.join(Global.Path.cache, "models.json")
  const BLACKBOX_PROVIDER_ID = "opencode"
  const BLACKBOX_PROVIDER_NAME = "Blackbox AI"
  const BLACKBOX_API_BASE_URL = "https://api.blackbox.ai"
  const BLACKBOX_MODELS_DATA: Array<{ id: string; name: string }> = [
    { id: "claude-sonnet-4.6", name: "Anthropic: Claude Sonnet 4.6" },
    { id: "claude-sonnet-4.5", name: "Anthropic: Claude Sonnet 4.5" },
    { id: "claude-opus-4.6", name: "Anthropic: Claude Opus 4.6" },
    { id: "claude-opus-4.5", name: "Anthropic: Claude Opus 4.5" },
    { id: "gpt-5.2-codex", name: "Openai: Gpt 5.2 Codex" },
    { id: "gemini-3-pro-preview", name: "Google: Gemini 3 Pro Preview" },
    { id: "gemini-3.1-pro-preview", name: "Google: Gemini 3.1 Pro Preview" },
    { id: "claude-3-haiku", name: "Anthropic: Claude 3 Haiku" },
    { id: "claude-3.5-haiku", name: "Anthropic: Claude 3.5 Haiku" },
    { id: "claude-3.7-sonnet:thinking", name: "Anthropic: Claude 3.7 Sonnet" },
    { id: "claude-3.7-sonnet", name: "Anthropic: Claude 3.7 Sonnet" },
    { id: "claude-haiku-4.5", name: "Anthropic: Claude Haiku 4.5" },
    { id: "claude-opus-4", name: "Anthropic: Claude Opus 4" },
    { id: "claude-opus-4.1", name: "Anthropic: Claude Opus 4.1" },
    { id: "claude-sonnet-4", name: "Anthropic: Claude Sonnet 4" },
    { id: "coder-large", name: "Arcee-ai: Coder Large" },
  ]

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

  function fallbackModel(id: string, name: string): Model {
    return {
      id,
      name,
      family: undefined,
      release_date: "",
      attachment: false,
      reasoning: true,
      temperature: true,
      tool_call: true,
      limit: {
        context: 200000,
        output: 8192,
      },
      options: {},
      provider: {
        npm: "@ai-sdk/openai-compatible",
        api: BLACKBOX_API_BASE_URL,
      },
      modalities: {
        input: ["text"],
        output: ["text"],
      },
    }
  }

  function normalizeProviderModels(models: Record<string, Model>): Record<string, Model> {
    return Object.fromEntries(
      Object.entries(models)
        .filter(([, model]) => {
          const output = model.modalities?.output
          return !output || output.includes("text")
        })
        .map(([id, model]) => [id, model] as const),
    )
  }

  function blackboxModels(source: Provider): Record<string, Model> {
    return Object.fromEntries(
      BLACKBOX_MODELS_DATA.map((item) => {
        const fromSource = source.models[item.id]
        if (fromSource) {
          return [
            item.id,
            {
              ...fromSource,
              id: item.id,
              name: item.name,
              provider: {
                npm: "@ai-sdk/openai-compatible",
                api: BLACKBOX_API_BASE_URL,
              },
            },
          ] as const
        }

        return [item.id, fallbackModel(item.id, item.name)] as const
      }),
    )
  }

  function normalizeCatalog(input: Record<string, Provider>) {
    const normalized = Object.fromEntries(
      Object.entries(input).map(([providerID, provider]) => [
        providerID,
        {
          ...provider,
          models: normalizeProviderModels(provider.models),
        },
      ]),
    )

    const source = normalized[BLACKBOX_PROVIDER_ID]
    if (!source) return normalized

    const env = Array.from(new Set(["BLACKBOX_API_KEY", ...(source.env ?? [])]))

    normalized[BLACKBOX_PROVIDER_ID] = {
      ...source,
      id: BLACKBOX_PROVIDER_ID,
      name: BLACKBOX_PROVIDER_NAME,
      api: BLACKBOX_API_BASE_URL,
      npm: "@ai-sdk/openai-compatible",
      env,
      models: blackboxModels(source),
    }

    return normalized
  }

  function url() {
    return Flag.OPENCODE_MODELS_URL || "https://models.dev"
  }

  export const Data = lazy(async () => {
    const result = await Filesystem.readJson(Flag.OPENCODE_MODELS_PATH ?? filepath).catch(() => {})
    if (result) return normalizeCatalog(result as Record<string, Provider>)
    // @ts-ignore
    const snapshot = await import("./models-snapshot")
      .then((m) => m.snapshot as Record<string, unknown>)
      .catch(() => undefined)
    if (snapshot) return normalizeCatalog(snapshot as Record<string, Provider>)
    if (Flag.OPENCODE_DISABLE_MODELS_FETCH) return {}
    const json = await fetch(`${url()}/api.json`).then((x) => x.text())
    return normalizeCatalog(JSON.parse(json) as Record<string, Provider>)
  })

  export async function get() {
    const result = await Data()
    return result as Record<string, Provider>
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
