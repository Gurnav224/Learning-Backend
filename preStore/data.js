const {faker } = require('@faker-js/faker');
faker.seed(123)

 const categories = [
  { name: "Men's Swim Shorts" },
  { name: "Floatation Devices" },
  { name: "Training Kickboards" },
  { name: "Kiddie Pools" },
  { name: "Swimming Kits" },
];


  // Generate fake products
  const products = [...Array(20)].map((_) => ({
      name: faker.commerce.productName(),
      image: faker.image.url(),
      price: faker.commerce.price(), // Use faker.random.number for generating random numbers
      material: faker.commerce.productMaterial(),
      brand: faker.company.name(),
      inStock: faker.datatype.boolean(),
      fastDelivery: faker.datatype.boolean(),
      
      ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]), // Use faker.random.arrayElement to select a random element from an array
      offer: faker.helpers.arrayElement(['Save 50', '70% bonanza', 'Republic Day Sale']),
      idealFor: faker.helpers.arrayElement(['Men', 'Women', 'Girl', 'Boy', 'Senior']),
      category: faker.helpers.arrayElement(categories),
      level: faker.helpers.arrayElement(['Beginner', 'Amateur', 'Intermediate', 'Advanced', 'Professional']),
      color: faker.color.space(),
  }));

const users = [
    {
        _id: "608a50e395c4ab044f7a7944",
        wishList:[],
        cart:[]
    }
]

const auth = [
    {
      username: "admin",
      email: "admin@gmail.com",
      password: "admin",
    },
  ];

module.exports = {users , auth , products,categories} 