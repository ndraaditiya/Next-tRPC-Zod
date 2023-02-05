import { z } from 'zod'
import { router, procedure } from '../trpc'
import { todosRouter } from './todos'

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string()
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`
      }
    }),
  todos: todosRouter
})

export type AppRouter = typeof appRouter