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
              .thumbnail ? (
              <img
                src={
                  post._embedded["wp:featuredmedia"][0].media_details.sizes
                    .thumbnail.source_url
                }
              />
            ) : (
              <img src="/img/placebo-effect.webp" />
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
          <span className="views">
            <p>{post.views_count}&nbsp; </p>
            <FontAwesomeIcon icon={faEye} />
          </span>

          {/* <span className="likes" onClick={() => likesCount(post)}>
            <p ref={likesSpan}>{post.likes_count}&nbsp; </p>
            <FontAwesomeIcon icon={faHeart} className={likes} />
          </span> */}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
