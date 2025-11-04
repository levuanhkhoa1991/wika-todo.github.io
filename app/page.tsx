import "@copilotkit/react-ui/styles.css"
import { TodoAppWrapper } from "@/components/todo-app-wrapper"

interface Todo {
  id: string
  title: string
  completed: boolean
  description?: string
}

const TODOS_STORAGE_KEY = "todos_app_data"

export default async function Home() {
  const apiKey = process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY

  if (!apiKey) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-2">Configuration Error</p>
          <p className="text-muted-foreground">
            Missing NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY environment variable.
          </p>
          <p className="text-muted-foreground text-sm mt-2">Please add it to .env.local (copy from .env.example)</p>
        </div>
      </div>
    )
  }

  return <TodoAppWrapper apiKey={apiKey} />
}
