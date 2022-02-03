exports.up = function(knex, Promise) {
	return knex.schema.createTable('properties', table => {
		table.increments('id').unique().notNullable().primary();
		table.string('name').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('properties');
};
