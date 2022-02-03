
exports.up = function(knex) {
	return knex.schema.createTable('expenses', table => {
		table.increments('id').unique().notNullable().primary();
		table.integer('property_id').unsigned();
		table.integer('month').notNullable();
		table.string('value');
		
		table.foreign('property_id').references('properties.id');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('expenses');
};
