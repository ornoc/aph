const mongoose = require('mongoose');
const Post = require('../models/post');

exports.createPost = async (req, res) => {
    try {
        const { titulo, conteudo } = req.body;
        
        // adicione logs para depuração
        console.log('Título recebido:', titulo);
        console.log('Conteúdo recebido:', conteudo);
        
        if (!titulo || !conteudo) {
            return res.status(400).json({ message: 'Título e conteúdo são obrigatórios.' });
        }
        
        const newPost = new Post({ titulo, conteudo });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Erro ao criar postagem:', error); // log detalhado do erro
        res.status(500).json({ message: 'Erro ao criar postagem', error });
    }
};

// função para atualizar uma postagem
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo } = req.body;

    // verifica se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido.' });
    }

    try {
        const post = await Post.findByIdAndUpdate(id, { titulo, conteudo }, { new: true });
        if (!post) return res.status(404).json({ message: 'Postagem não encontrada' });
        res.status(200).json(post);
    } catch (error) {
        console.error('Erro ao atualizar postagem:', error);
        res.status(500).json({ message: 'Erro ao atualizar postagem', error });
    }
};
  
// obter todas as postagens
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter postagens', error });
  }
};

// obter uma postagem específica
exports.getPost = async (req, res) => {
  const { id } = req.params;

  // Verifica se o ID é válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Postagem não encontrada' });
    res.status(200).json(post);
  } catch (error) {
    console.error('Erro ao obter postagem:', error);
    res.status(500).json({ message: 'Erro ao obter postagem', error });
  }
};


// excluir uma postagem
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  // Verificar se o ID é válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: 'Postagem não encontrada' });
    res.status(200).json({ message: 'Postagem excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir postagem:', error);
    res.status(500).json({ message: 'Erro ao excluir postagem', error });
  }
};


