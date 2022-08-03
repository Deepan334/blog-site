/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('id').primary()
            table.string('username', 255).notNullable()
            table.string('password', 255).notNullable()
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
        .createTable('blogs', function (table) {
            table.increments('blog_id').primary()
            table.string('title').notNullable()
            table.string('description').notNullable()
            table
                .integer('userid')
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        }).createTable('comments', function (table) {
            table.increments('comment_id').primary()

            table.string('comment').notNullable()

            table.integer('blogid')
                .references('blog_id')
                .inTable('blogs')
                .onDelete('CASCADE')
            
            table.integer('userid')
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
        .createTable('reactions', function (table) {
            table.increments('reaction_id').primary()

            table.string('reaction').notNullable()

            table.integer('blogid')
                .references('blog_id')
                .inTable('blogs')
                .onDelete('CASCADE')
            
            table.integer('userid')
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
            table.integer('commentid')
                
                .references('comment_id')
                .inTable('comments')
                .onDelete('CASCADE')
        })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('reactions').dropTable('comments').dropTable('blogs')
};
