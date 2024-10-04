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
  },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // relação com usuário
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
