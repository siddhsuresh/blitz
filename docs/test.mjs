const mutationTokenized = `// ---- ON THE SERVER ----
// app/projects/mutations/createProject.ts
import { resolver } from "@blitzjs/rpc"
import db from "./db"
import * as z from "zod"

// This provides runtime validation + type safety
export const CreateProject = z
  .object({
    name: z.string(),
  })

// resolver.pipe is a functional pipe
export default resolver.pipe(
  // Validate the input data
  resolver.zod(CreateProject),
  // Ensure user is logged in
  resolver.authorize(),
  // Perform business logic
  async (input) => {
    const project = await db.project.create({ data: input })
    return project
  }
)`

const convertToShikiTwoSlash = async () => {
  const shiki = await import("shiki")
  const {renderCodeToHTML, runTwoSlash} = await import("shiki-twoslash")

  const highlighter = await shiki.getHighlighter({
    theme: "github-light",
  })

  const twoslash = runTwoSlash(mutationTokenized, "tsx", {})
  const start = Date.now()
  const html = renderCodeToHTML(mutationTokenized, "tsx", ["twoslash"], {}, highlighter, twoslash)
  const time = Date.now() - start
  return {
    props: {
      code: html,
      time,
    },
  }
}

convertToShikiTwoSlash().then((x) => {
    console.log(x.props.code)
})