exports.seed =async  function(knex, Promise) {
  await knex("users")
    .del()
    .then(function() {
      return knex("users").insert(
        [{
          id: 1,
          first_name: "daniel",
          last_name:"zhou",
          email: "daniel@test.com",
          password: "password",
          phone: "4033973186",
          locale:"en-GB"
        }]
    );
   })

   await knex('tasks').del()
    .then(function () {

      return knex('tasks').insert([
        {id: 1, description: "buy a pair of glasses", completed: false, user_id: 1},
        {id: 2, description: "build taks manager with postgres", completed: false, user_id: 1},
      ]);
    });
};
