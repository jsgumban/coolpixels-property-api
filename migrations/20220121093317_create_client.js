exports.up = function(knex, Promise) {
	return knex.schema.createTable('clients', table => {
		table.increments('id').unique().notNullable().primary();
		table.string('name').notNullable().unique();
		table.string('client_id').unique().notNullable();
		table.string('client_secret').unique().notNullable();
		table.timestamp('createdAt').defaultTo(knex.fn.now());
		table.timestamp('updatedAt').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('clients');
};
