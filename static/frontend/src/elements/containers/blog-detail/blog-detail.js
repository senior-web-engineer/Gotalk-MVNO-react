import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { blogs } from '../../../data/meta-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { fetchRelatedPosts } from '../../../utils/wp-api';
import SocialShare from '../../components/blog/social-share';
import { username, application_password, API_URL } from '../../../utils/const';
import './blog-detail.scss';


function Post() {
  let params = useParams();
  const [post, setPost] = useState([]);
  const [media, setMedia] = useState();
  const [tags, setTags] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [avg_time, setAvgTime] = useState();
  const [card, setCard] = useState(post);
//   const [likes, setLikes] = useState('');
  const likesSpan = useRef(null);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    setIsLoading(true)
    let res = await fetch(API_URL+`/wp/v2/posts?_embed&slug=${params.slug}`);
    const postRes = await res.json();
    setPost(postRes);
    let resMedia = {};
    if (postRes[0]._embedded['wp:featuredmedia']) {
      resMedia = postRes[0]._embedded['wp:featuredmedia'][0].media_details.sizes.full;
      setMedia(resMedia);
    }
    res = await fetch(API_URL+`/wp/v2/tags?post=${postRes[0].id}`);
    const resTags = await res.json();
    setTags(resTags);

    const resRelatedPosts = await fetchRelatedPosts(postRes[0].tags);
    setRelatedPosts(resRelatedPosts);
    
    let words = postRes[0].content.rendered
      .replace(/(<([^>]+)>)/gi, '')
      .replace(/\s+/g, ' ')
      .replace(/\n/g, '')
      .trim()
      .match(/(\w+)/g).length;
    const resAvg_time = Math.ceil(words / 250);
    setAvgTime(resAvg_time);

    setIsLoading(false)
  }, [params]);

  useEffect(() => {
    setUrl(window.location.href);
  }, [post]);

 return (
    <>
      <Helmet>
        {blogs.map(({ key, value }) => (
          <meta key={key} name={key} content={value} />
        ))}
      </Helmet>

      <div className="container single-post-container">
        <article>
          <h1 dangerouslySetInnerHTML={{ __html: post[0]?.title.rendered }}></h1>
          <span className="single-post-date">{post[0]?.date.split('T')[0]}</span>
          <div className="d-flex f-right">

          </div>
          <p className="average_time">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              width={14}
              height={14}
              fill="#707a8a"
            >
              <path d="M0 24C0 10.75 10.75 0 24 0H360C373.3 0 384 10.75 384 24C384 37.25 373.3 48 360 48H352V66.98C352 107.3 335.1 145.1 307.5 174.5L225.9 256L307.5 337.5C335.1 366 352 404.7 352 445V464H360C373.3 464 384 474.7 384 488C384 501.3 373.3 512 360 512H24C10.75 512 0 501.3 0 488C0 474.7 10.75 464 24 464H32V445C32 404.7 48.01 366 76.52 337.5L158.1 256L76.52 174.5C48.01 145.1 32 107.3 32 66.98V48H24C10.75 48 0 37.25 0 24V24zM99.78 384H284.2C281 379.6 277.4 375.4 273.5 371.5L192 289.9L110.5 371.5C106.6 375.4 102.1 379.6 99.78 384H99.78zM284.2 128C296.1 110.4 304 89.03 304 66.98V48H80V66.98C80 89.03 87 110.4 99.78 128H284.2z" />
            </svg>
            <span style={{ marginLeft: '8px' }}>{avg_time} mins</span>
          </p>
          <div id="single-post-tags">
            <ul>
              {tags.length >0
                ? tags.map((tag, index) => {
                    return <li key={index}>{tag.name}</li>;
                  })
                : ''}
            </ul>
          </div>
          {/* {media ? (
            <div className="single-post-banner">
              <img src={media.source_url.replace('http://', 'https://')} />
            </div>
          ) : (
            <div className="single-post-banner">
              <img src="/img/default.webp" />
            </div>
          )} */}
          <div
            className="single-post-content"
            dangerouslySetInnerHTML={{ __html: post[0]?.content.rendered }}
          ></div>
        </article>
        <aside>
          {post[0]?.meta.iframe1 ? (
            <iframe
              width={120}
              height={240}
              style={{
                width: '120px',
                height: '240px',
                display: 'block !important',
              }}
              marginWidth="0"
              marginHeight="0"
              scrolling="no"
              frameBorder="0"
              src={`https:${post[0]?.meta.iframe1}`}
            ></iframe>
          ) : (
            ''
          )}

          {post[0]?.meta.iframe2 ? (
            <iframe
              width={120}
              height={240}
              style={{
                width: '120px',
                height: '240px',
                display: 'block !important',
              }}
              marginWidth="0"
              marginHeight="0"
              scrolling="no"
              frameBorder="0"
              src={`https:${post[0]?.meta.iframe2}`}
            ></iframe>
          ) : (
            ''
          )}

          {post[0]?.meta.iframe3 ? (
            <iframe
              width={120}
              height={240}
              style={{
                width: '120px',
                height: '240px',
                display: 'block !important',
              }}
              marginWidth="0"
              marginHeight="0"
              scrolling="no"
              frameBorder="0"
              src={`https:${post[0]?.meta.iframe3}`}
            ></iframe>
          ) : (
            ''
          )}

          {post[0] && <SocialShare post={post[0]} url={url} />}
          <h6>Related Posts</h6>
          <div className="sidebar-related-posts">
            {relatedPosts?.length > 0 ? (
              relatedPosts.map((post,key) => {
                return (
                  <Link to={`/blog/${post.slug}`} className='related-post' key={key}>
                      <div>
                      {post.featured_media ? (
                        <img
                          src={
                            post._embedded['wp:featuredmedia'][0].media_details.sizes.medium
                              .source_url.replace('http://', 'https://')
                          }
                        />
                      ) : (
                        <img src="/img/default.webp" />
                      )}
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      ></h3>
                      </div>
                  </Link>
                );
              })
            ) : (
              !isLoading ? <h1 className="not-found">No posts found</h1>:<h1 className="not-found">Loading...</h1>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

export default Post;
