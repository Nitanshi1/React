import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";

import { useParams, useNavigate } from "react-router-dom";

function Editpost() {
  const [posts, setPost] = useState(null);
  const { slug } = useParams(); //url se humhe jb value leni h tb hum useparams k apne kam me le skte h
  const navigate = useNavigate();

  useEffect(
    () => {
      if (slug) {
        appwriteService.getPost(slug).then((post) => {
          if (post) {
            setPost(post);
          }
        });
      }
      else{
        navigate("/");
      }
    },
    { slug, navigate }
  );

  return posts ? (
    <div className="py-8">
      <Container>
        <PostForm post={posts} />
      </Container>
    </div>
  ) : null;
}

export default Editpost;
