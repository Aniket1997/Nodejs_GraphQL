const mongoose = require('mongoose');
const axios = require('axios');
const connectDB = require('./config/db');
const Users = require('./model/Users');
const Todos = require('./model/Todos');

const seedData = async () => {
    try {
        await connectDB(); // Connect to MongoDB

        // Fetch Users
        const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        const usersData = usersResponse.data;

        // Save Users to MongoDB
        for (const user of usersData) {
            const newUser = new Users({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                address: {
                    street: user.address.street,
                    suite: user.address.suite,
                    city: user.address.city,
                    zipcode: user.address.zipcode,
                    geo: {
                        lat: user.address.geo.lat,
                        lng: user.address.geo.lng,
                    },
                },
                phone: user.phone,
                website: user.website,
                company: {
                    name: user.company.name,
                    catchPhrase: user.company.catchPhrase,
                    bs: user.company.bs,
                },
            });
            await newUser.save();
        }

        console.log('Users data saved successfully');

        // Fetch Todos
        const todosResponse = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const todosData = todosResponse.data;

        // Save Todos to MongoDB
        for (const todo of todosData) {
            const newTodo = new Todos({
                userId: todo.userId,
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
            });
            await newTodo.save();
        }

        console.log('Todos data saved successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close(); // Close MongoDB connection
    }
};

seedData();