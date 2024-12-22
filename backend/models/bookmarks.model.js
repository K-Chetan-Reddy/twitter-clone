import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    Post: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true },

    createdAt: { type: Date, default: Date.now },

  });

  const Bookmarks = mongoose.model('Bookmarks', bookmarkSchema);

  export default Bookmarks;
