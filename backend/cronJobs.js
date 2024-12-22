import cron from 'node-cron';
import Post from './models/post.model.js';
import User from './models/user.model.js';

const automatePost = () => {
    cron.schedule('0 * * * *', async () => {
        try {
            // Fetch a random user ID from the User collection
            const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);  // Get one random user
            if (!randomUser || randomUser.length === 0) {
                console.log('No users found!');
                return;
            }

            const userId = randomUser[0]._id;  // Extract user ID

            // Example post content
            const postContent = {
                user: userId,  // Use the random user ID
                text: 'Automated Post: Stay tuned for more updates!',
            };

            // Create and save the new post
            const newPost = new Post(postContent);
            await newPost.save();
            console.log('Automated post created!');
        } catch (err) {
            console.error('Error creating automated post:', err);
        }
    });
};

export default automatePost;


