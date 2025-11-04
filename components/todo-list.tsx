"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { EditTodoDialog } from "./edit-todo-dialog"

interface Todo {
  id: string
  title: string
  completed: boolean
  description?: string
}

interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (id: string) => void
  onRemoveTodo: (id: string) => void
  onEditTodo: (id: string, updates: Partial<Todo>) => void
}

export function TodoList({ todos, onToggleTodo, onRemoveTodo, onEditTodo }: TodoListProps) {
  const activeTodos = todos.filter((t) => !t.completed)

  if (activeTodos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No active tasks yet. Ask the AI to help create some!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Active Todos ({activeTodos.length})</h2>
      <div className="space-y-3">
        {activeTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-start gap-4 p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <Checkbox
              id={todo.id}
              checked={todo.completed}
              onCheckedChange={() => onToggleTodo(todo.id)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <label htmlFor={todo.id} className="block text-sm font-medium text-foreground cursor-pointer">
                {todo.title}
              </label>
              {todo.description && <p className="text-sm text-muted-foreground mt-1">{todo.description}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <EditTodoDialog todo={todo} onSave={(updates) => onEditTodo(todo.id, updates)} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveTodo(todo.id)}
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
