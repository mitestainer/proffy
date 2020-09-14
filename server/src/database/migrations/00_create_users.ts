import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('firstName').notNullable()
        table.string('lastName').notNullable()
        table.string('email').notNullable()
        table.string('password').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users')
}