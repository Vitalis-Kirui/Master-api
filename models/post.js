const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    post:{
        type:String,
        require : true
    },
    image:{
        type:String
    },
    comments:{
        type: [String],
        default:[]
    }
});

const postModel = mongoose.model('Post', postSchema, 'posts');

module.exports = {
    postModel
};