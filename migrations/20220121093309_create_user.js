
exports.up = function(knex) {
	return knex.schema.createTable('users', table => {
		table.increments('id').unique().notNullable().primary();
		table.string('email').notNullable().unique();
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.text('password').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users');
};
