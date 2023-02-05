import { z } from 'zod'
import { router, procedure } from '../trpc'

type Todo = {
  id: string,
  todoName: string,
  isComplete: boolean
}

let Todos: Todo[] = [
  { id: '1', todoName: 'Learn tRPC', isComplete: false },
  { id: '2', todoName: 'Learn Zod', isComplete: false }
]

export const todosRouter = router({
  all: procedure
    .query(() => {
      return Todos
    }),
  byId: procedure
    .input(z.string())
    .query((req) => {
      return Todos.find((todo) => todo.id === req.input)
    }),
  create: procedure
    .input(
      z.object({
        todoName: z.string()
      })
    )
    .mutation((req) => {
      const { todoName } = req.input
      const newTodo: Todo = { id: String(new Date().getTime()), todoName, isComplete: false }
      Todos.push(newTodo)
    }),
  delete: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation((req) => {
      const { id } = req.input
      Todos = Todos.filter((t) => t.id !== id)
    }),
  update: procedure
    .input(
      z.object({
        id: z.string(),
        isComplete: z.boolean()
      })
    )
    .mutation((req) => {
      const { id, isComplete } = req.input
      const todo = Todos.find((todo) => todo.id === id)
      const todoName = todo!.todoName
      const updatedTodo: Todo = { id, todoName, isComplete }
      Todos = Todos.map((t) => t.id == id ? updatedTodo : t)
    }),
})