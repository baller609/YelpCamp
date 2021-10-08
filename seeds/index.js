const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '615b12d348aaa841a8fa7b3e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
              ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dsgajs7e1/image/upload/v1633435360/YelpCamp/yqmyl7sc9iu73cqyqx1q.png',
                  filename: 'YelpCamp/yqmyl7sc9iu73cqyqx1q'
                },
                {
                  url: 'https://res.cloudinary.com/dsgajs7e1/image/upload/v1633435360/YelpCamp/daxiidcm6cpbawgp26ti.png',
                  filename: 'YelpCamp/daxiidcm6cpbawgp26ti'
                },
                {
                  url: 'https://res.cloudinary.com/dsgajs7e1/image/upload/v1633435361/YelpCamp/eo6ecfospn05a96zrlon.jpg',
                  filename: 'YelpCamp/eo6ecfospn05a96zrlon'
                },
                {
                  url: 'https://res.cloudinary.com/dsgajs7e1/image/upload/v1633435364/YelpCamp/ab0lp3dhh731pk5bql3y.jpg',
                  filename: 'YelpCamp/ab0lp3dhh731pk5bql3y'
                },
                {
                  url: 'https://res.cloudinary.com/dsgajs7e1/image/upload/v1633435366/YelpCamp/vkh7puhqmvqruxzi99pu.jpg',
                  filename: 'YelpCamp/vkh7puhqmvqruxzi99pu'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

