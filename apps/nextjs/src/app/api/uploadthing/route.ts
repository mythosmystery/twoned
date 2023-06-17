import { createNextRouteHandler } from 'uploadthing/next'

import { imageRouter } from './core'

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: imageRouter,
})
