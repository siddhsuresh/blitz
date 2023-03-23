//---- ON THE CLIENT ----
// app/pages/projects/new.tsx
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
//@errors: 2307
import Layout from "src/core/layouts/Layout"
// Notice how we import the server function directly
import createProject, { CreateProject } from "src/projects/mutations/createProject"
//@errors: 2307
import { ProjectForm } from "src/projects/components/ProjectForm"

const NewProjectPage: BlitzPage = () => {
  const router = useRouter()
  const [createProjectMutation] = useMutation(createProject)

  return (
    <div>
      <h1>Create New Project</h1>

      <ProjectForm
        submitText="Create Project"
        schema={CreateProject}
        onSubmit={async (values: any) => {
          // This is equivalent to calling the server function directly
          const project = await createProjectMutation(values)
          // Notice the 'Routes' object Blitz provides for routing
          router.push("/")
        }}
      />
    </div>
  );
};

NewProjectPage.authenticate = true
NewProjectPage.getLayout = (page) => <Layout>{page}</Layout>

export default NewProjectPage