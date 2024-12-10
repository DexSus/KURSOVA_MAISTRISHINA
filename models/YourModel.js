import mongoose from 'mongoose';

const YourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});

const YourModel = mongoose.model('YourModel', YourSchema);

export default YourModel;