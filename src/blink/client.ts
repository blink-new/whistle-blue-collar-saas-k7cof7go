import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'whistle-blue-collar-saas-k7cof7go',
  authRequired: true
})

export default blink