import { OAuthError } from "blitz"
import { parse as parseCookie, serialize } from "cookie"
import { AuthAction } from "next-auth"

const actions: AuthAction[] = ["signin", "callback" ]

const decoder = new TextDecoder()

async function streamToString(stream:any): Promise<string> {
  const chunks: Uint8Array[] = []
  return await new Promise((resolve, reject) => {
    stream.on("data", (chunk:any) => chunks.push(Buffer.from(chunk)))
    stream.on("error", (err:any) => reject(err))
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
  })
}

export function toResponse(res:any): Response {
  const headers = new Headers(res.headers)

  res.cookies?.forEach((cookie:any) => {
    const { name, value, options } = cookie
    const cookieHeader = serialize(name, value, options)
    if (headers.has("Set-Cookie")) {
      headers.append("Set-Cookie", cookieHeader)
    } else {
      headers.set("Set-Cookie", cookieHeader)
    }
  })

  const body =
    headers.get("content-type") === "application/json"
      ? JSON.stringify(res.body)
      : res.body

  const response = new Response(body, {
    headers,
    status: res.redirect ? 302 : res.status ?? 200,
  })

  if (res.redirect) {
    response.headers.set("Location", res.redirect)
  }

  return response
}

async function readJSONBody(
  body: ReadableStream | Buffer
): Promise<Record<string, any> | undefined> {
  try {
    if ("getReader" in body) {
      const reader = body.getReader()
      const bytes: number[] = []
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        bytes.push(...value)
      }
      const b = new Uint8Array(bytes)
      return JSON.parse(decoder.decode(b))
    }

    // node-fetch

    if (typeof Buffer !== "undefined" && Buffer.isBuffer(body)) {
      return JSON.parse(body.toString("utf8"))
    }

    return JSON.parse(await streamToString(body))
  } catch (e) {
    console.error(e)
  }
}

export async function toInternalRequest(
  req: Request
): Promise<any | Error> {
  try {
    // TODO: url.toString() should not include action and providerId
    // see init.ts
    const url = new URL(req.url.replace(/\/$/, ""))
    const { pathname } = url

    const action = actions.find((a) => pathname.includes(a))
    if (!action) {
      throw new OAuthError("Cannot detect action.")
    }

    const providerIdOrAction = pathname.split("/").pop()
    let providerId
    if (
      providerIdOrAction &&
      !action.includes(providerIdOrAction) &&
      ["signin", "callback"].includes(action)
    ) {
      providerId = providerIdOrAction
    }

    return {
      url,
      action,
      providerId,
      method: req.method ?? "GET",
      headers: Object.fromEntries(req.headers),
      body: req.body ? await readJSONBody(req.body) : undefined,
      cookies: parseCookie(req.headers.get("cookie") ?? "") ?? {},
      error: url.searchParams.get("error") ?? undefined,
      query: Object.fromEntries(url.searchParams),
    }
  } catch (error) {
    return error as Error
  }
}