const IceCream = require('./IceCream');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/icy-db')
  .then(() => {
    let iceCreams = [
      {
        flavour: 'Chocolate',
        description: '',
        hasLactose: true,
        hasEgg: true,
        hasNuts: false,
      },
      {
        flavour: 'Gianduia',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: true,
      },
      {
        flavour: 'Chocolate sorbet',
        description: '',
        hasLactose: false,
        hasEgg: false,
        hasNuts: false,
      },
      {
        flavour: 'Vanilla',
        description: '',
        hasLactose: true,
        hasEgg: true,
        hasNuts: false,
      },
      {
        flavour: 'Hazelnut',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: true,
      },
      {
        flavour: 'Pistachio',
        description: '',
        hasLactose: false,
        hasEgg: true,
        hasNuts: true,
      },
      {
        flavour: 'Mascarpone',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: false,
      },
      {
        flavour: 'Coffee',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: false,
      },
      {
        flavour: 'Cinnamon',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: false,
      },
      {
        flavour: 'Nougat candy',
        description: '',
        hasLactose: true,
        hasEgg: true,
        hasNuts: true,
      },
      {
        flavour: 'Dulce de leche',
        description: '',
        hasLactose: false,
        hasEgg: true,
        hasNuts: false,
      },
      {
        flavour: 'Milk',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: false,
      },
      {
        flavour: 'Banana',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: false,
      },
      {
        flavour: 'Lemon',
        description: '',
        hasLactose: false,
        hasEgg: false,
        hasNuts: false,
      },
      {
        flavour: 'Strawberry',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: false,
      },
      {
        flavour: 'Raspberry',
        description: '',
        hasLactose: false,
        hasEgg: false,
        hasNuts: false,
      },
      {
        flavour: 'Coconut',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: true,
      },
      {
        flavour: 'Mint',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: false,
      },
    ];

    let iceCreamObj = iceCreams.map( p => new IceCream(p));

    iceCreamObj.forEach( p => p.save( (err, obj) =>{
      if(err){
        console.log(err);
      }else{
        console.log(`New product created [${obj.name}] with ID:${obj._id}`);
      }
    }));

    //mongoose.connection.close();
  });
