const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    userId: { type: Schema.Types.Number, required: true, ref: 'User' }, // Reference to Users
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    completed: { type: Boolean, required: true },
});

const Todos = mongoose.model('Todos', TodoSchema);
module.exports = Todos;
