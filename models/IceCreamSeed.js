const IceCream = require('./IceCream');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/icy-db')
  .then(() => {
    let iceCreams = [
      {
        name: 'Chocolate',
        flavour: 'chocolate',
        description: '',
        hasLactose: true,
        hasEgg: true,
        hasNuts: false,
      },
      {
        name: 'Gianduia',
        flavour: 'gianduia',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: true,
      },
      {
        name: 'Chocolate sorbet',
        flavour: 'chocolate sorbet',
        description: '',
        hasLactose: false,
        hasEgg: false,
        hasNuts: false,
      },
      {
        name: 'Vanilla',
        flavour: 'vanilla',
        description: '',
        hasLactose: true,
        hasEgg: true,
        hasNuts: false,
      },
      {
        name: 'Hazelnut',
        flavour: 'hazelnut',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: true,
      },
      {
        name: 'Pistachio',
        flavour: 'pistachio',
        description: '',
        hasLactose: false,
        hasEgg: true,
        hasNuts: true,
      },
      {
        name: 'Mascarpone',
        flavour: 'mascarpone',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: false,
      },
      {
        name: 'Coffee',
        flavour: 'coffee',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: false,
      },
      {
        name: 'Cinnamon',
        flavour: 'cinnamon',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: false,
      },
      {
        name: 'Nougat',
        flavour: 'nougat',
        description: '',
        hasLactose: true,
        hasEgg: true,
        hasNuts: true,
      },
      {
        name: 'Dulce de leche',
        flavour: 'dulce de leche',
        description: '',
        hasLactose: false,
        hasEgg: true,
        hasNuts: false,
      },
      {
        name: 'Milk',
        flavour: 'milk',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: false,
      },
      {
        name: 'Banana',
        flavour: 'banana',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: false,
      },
      {
        name: 'Lemon',
        flavour: 'lemon',
        description: '',
        hasLactose: false,
        hasEgg: false,
        hasNuts: false,
      },
      {
        name: 'Strawberry',
        flavour: 'strawberry',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: false,
      },
      {
        name: 'Raspberry',
        flavour: 'raspberry',
        description: '',
        hasLactose: false,
        hasEgg: false,
        hasNuts: false,
      },
      {
        name: 'Coconut',
        flavour: 'coconut',
        description: '',
        hasLactose: true,
        hasEgg: false,
        hasNuts: true,
      },
      {
        name: 'Mint',
        flavour: 'mint',
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
