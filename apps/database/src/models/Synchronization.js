import { Model, mergeSchemas, timestampsSchema, jobModelSchema } from '../util'
import { User } from './User'
import { Installation } from './Installation'

export class Synchronization extends Model {
  static get tableName() {
    return 'synchronizations'
  }

  static get jsonSchema() {
    return mergeSchemas(timestampsSchema, jobModelSchema, {
      required: ['type'],
      properties: {
        userId: { type: 'string' },
        installationId: { type: 'string' },
        type: {
          type: 'string',
          enum: ['installation', 'user'],
        },
      },
    })
  }

  static get relationMappings() {
    return {
      installation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Installation,
        join: {
          from: 'synchronizations.installationId',
          to: 'installations.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'synchronizations.userId',
          to: 'users.id',
        },
      },
    }
  }
}
