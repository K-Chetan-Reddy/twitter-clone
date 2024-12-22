import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "../../components/common/Post";

const fetchBookmarks = async () => {
  const { data } = await axios.get("/api/bookmarks");
  return data;
};

const BookmarkPosts = () => {
  const { data: bookmarks, isLoading, isError } = useQuery(["bookmarks"], fetchBookmarks);

  if (isLoading) return <p>Loading bookmarks...</p>;
  if (isError) return <p>Error loading bookmarks</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Bookmarked Posts</h1>
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((bookmark) => (
            <Post key={bookmark._id} post={bookmark.Post} isBookmarked={true} />
          ))}
        </div>
      ) : (
        <p>No bookmarks yet!</p>
      )}
    </div>
  );
};

export default BookmarkPosts;
