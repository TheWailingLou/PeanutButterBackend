
exports.seed = function(knex) {
  return knex('sounds').del()
    .then(function () {
      return knex('sounds').insert([
        {
          "sound_rating": 5,
          "sound_title": 'Tester File',
          "sound_type": "full",
          "creator": "Louis",
          "download_url":"http://res.cloudinary.com/louman/raw/upload/v1497209276/e7untxiiu45vnktbup80.mp3"
        }
      ]);
    });
};
