// models/post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  conteudo: {
    type: String,
    required: true
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
