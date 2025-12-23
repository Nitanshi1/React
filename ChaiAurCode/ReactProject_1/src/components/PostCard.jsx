import React from "react";
import { Link } from "react-router-dom";
import appWriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="block border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg duration-200"
    >
      <div className="w-full bg-gray-200 h-48 flex items-center justify-center overflow-hidden">
        <div className="w-full justify-center mb-2">
          <img
            src={appWriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl "
          />
        </div>
        <h2 className="text-xl font-bold text-zinc-700">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
