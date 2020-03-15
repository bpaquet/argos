import { Model, mergeSchemas, timestampsSchema, jobModelSchema } from '../util'
import { Build } from './Build'

export class BuildCheck extends Model {
  static get tableName() {
    return 'build_checks'
  }

  static get jsonSchema() {
    return mergeSchemas(timestampsSchema, jobModelSchema, {
      required: ['buildId'],
      properties: {
        buildId: { type: 'string' },
        conclusion: {
          type: 'string',
          enum: ['success', 'failure', 'neutral'],
        },
        number: { type: 'integer' },
        githubId: { type: 'integer' },
      },
    })
  }

  static get relationMappings() {
    return {
      build: {
        relation: Model.BelongsToOneRelation,
        modelClass: Build,
        join: {
          from: 'build_checks.buildId',
          to: 'builds.id',
        },
      },
    }
  }
}
