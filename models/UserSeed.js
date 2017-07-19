const User = require('./User');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/icy-db')
  .then(() => {
    let users = [
      {
        username: 'admin',
        email: 'admin@icy.com',
        password: '1234',
        age: 1,
        address: 'New St. 10',
        isAdmin: true
      }
    ];

    let usersObj = users.map( p => new User(p));

    usersObj.forEach( p => p.save( (err, obj) =>{
      if(err){
        console.log(err);
      }else{
        console.log(`New user created [${obj.username}] with ID:${obj._id}`);
      }
    }));

    //mongoose.connection.close();
  });
