import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { username, application_password, API_URL } from "../../../utils/const";

function PostCard(props) {
  const { post } = props;
  const [card, setCard] = useState(post);
//   const [likes, setLikes] = useState("");
  const likesSpan = useRef(null);

  return (
    <div >
      <Link to={`/blog/${post.slug}`}>
        <div className="post-card">
          <div className="post-card-banner">
            {post.featured_media &&
            post._embedded["wp:featuredmedia"][0].media_details.sizes
              .medium ? (
              <img
                src={
                  post._embedded["wp:featuredmedia"][0].media_details.sizes
                    .medium.source_url
                }
              />
            ) : (
              <img src="/img/default.webp" />
            )}
          </div>
          <div className="post-card-title">
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
          </div>
          <div
            className="post-card-excerpt"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          ></div>
        </div>
      </Link> 
      <div
        className="d-flex justify-between items-center"
        style={{ margin: "0px 10px" }}
      >
        <div className="post-card-date">
          <span>{post.date.split("T")[0]}</span>
        </div>
        <div className="d-flex counts">

        </div>
      </div>
    </div>
  );
}

export default PostCard;
