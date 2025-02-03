import config from '../../../../config/server.js'
import { responses } from '../../../../responses.js'
import * as database from '../../../../database'

export default {
  method: 'DELETE',
  path: '/users/me/auth/email',
  requireAuth: true,
  handler: async ({ user }) => {
    if (!config.email) {
      return responses.badEndpoint
    }
    let result
    try {
      result = await database.users.removeEmail({ id: user.id })
    } catch (e) {
      if (e.constraint === 'require_email_or_ctftime_id') {
        return responses.badZeroAuth
      }
      throw e
    }
    if (result === undefined) {
      return responses.badEmailNoExists
    }
    return responses.goodEmailRemoved
  }
}
