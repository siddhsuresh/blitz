// ---- ON THE SERVER ----
// app/projects/mutations/createProject.ts
import {resolver} from "@blitzjs/rpc"
// import db from "db"
import * as z from "zod"

// This provides runtime validation + type safety
export const CreateProject = z.object({
  name: z.string().min(3),
})

export type CreateProjectInput = z.infer<typeof CreateProject>

// resolver.pipe is a functional pipe
export default resolver.pipe(
  // Validate the input data
  resolver.zod(CreateProject),
  // Ensure user is logged in
  resolver.authorize(),
  // Perform business logic
  async (input) => {
    // const project = await db.project.create({
    //   data: {
    //     name: input.name as string,
    //   },
    // })
    // return project
  },
)
