
exports.up = function(knex) {
  return knex.schema.createTable('sounds', table => {
    table.increments('id')
    table.integer('sound_rating')
    table.string('sound_title')
    table.string('sound_type')
    table.string('download_url')
    table.string('creator')
    table.timestamp('created_at')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sounds')
};
