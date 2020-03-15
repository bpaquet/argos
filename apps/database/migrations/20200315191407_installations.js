exports.up = async knex => {
  return knex
    .createTable('installations', table => {
      table.bigincrements('id').primary()
      table.timestamps(false, true)
      table
        .integer('github_id')
        .notNullable()
        .index()
      table
        .boolean('deleted')
        .notNullable()
        .defaultTo(false)
    })
    .table('synchronizations', table => {
      table.bigInteger('installation_id').index()
      table.foreign('installation_id').references('installations.id')
    })
    .createTable('user_installation_rights', table => {
      table.bigincrements('id').primary()
      table.timestamps(false, true)
      table
        .bigInteger('user_id')
        .notNullable()
        .index()
      table.foreign('user_id').references('users.id')
      table
        .bigInteger('installation_id')
        .notNullable()
        .index()
      table.foreign('installation_id').references('installations.id')
    })
    .createTable('build_checks', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'))
      table.timestamps(false, true)
      table.integer('github_id').index()
      table.uuid('build_id').index()
      table.foreign('build_id').references('builds.id')
      table.string('conclusion')
      table.string('name')
      table
        .string('job_status')
        .notNullable()
        .index()
    })
}

exports.down = async knex => {
  return knex
    .table('synchronizations', table => {
      table.dropColumn('installation_id')
    })
    .dropTable('installations')
    .dropTable('user_installation_rights')
    .dropTable('build_checks')
}
