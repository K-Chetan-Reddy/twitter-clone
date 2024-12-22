import Bookmarks from "../models/bookmarks.model.js";
import Post from "../models/post.model.js";

export const addBookmarks = async (req, res) => {
  try {
    const { postId } = req.body;
    const user = req.user._id;

    const existingBookmark = await Bookmarks.findOne({ user, Post: postId });

    if (existingBookmark) {
      return res.status(400).json({ message: 'Tweet already bookmarked' });
    }

    const bookmark = await Bookmarks.create({ user, Post: postId });

    res.status(201).json(bookmark);
  } catch (error) {
    console.log("Error in addBookmarks function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteBookmarks = async (req, res) => {
    try {
        const bookmark = await Bookmarks.findById(req.params.id);
    
        if (!bookmark) {
          return res.status(404).json({ message: 'Bookmark not found' });
        }
    
        if (bookmark.user.toString() !== req.user._id) {
          return res.status(403).json({ message: 'Unauthorized' });
        }
    
        await bookmark.remove();
        res.status(200).json({ message: 'Bookmark removed' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmarks.find({ user: req.user._id }).populate('Post');
        res.status(200).json(bookmarks);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}