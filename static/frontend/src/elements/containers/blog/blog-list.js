import React, { useEffect, useState} from "react";
import Carousel from "../../components/blog/carousel";
import Categories from "../../components/blog/categories";
import PostCard from "../../components/blog/post-card";
import {fetchCategories, fetchFeaturedPosts, fetchPosts} from "../../../utils/wp-api";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from 'lodash.debounce'
import { useSelector } from "react-redux";

function BlogList() {
  const category = useSelector((state) => state.mainReducer.category);
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [categories, setCategories] = useState([])
  const [initialPosts, setInitialPosts] = useState([])
  const [featuredPosts, setFeaturedPosts] = useState([])
  

  useEffect(async () => {
    const categories = await fetchCategories()
    const initialPosts = await fetchPosts(1, 'All')
    const featuredPosts = await fetchFeaturedPosts()

    setCategories(categories)
    setInitialPosts(initialPosts)
    setFeaturedPosts(featuredPosts)

    setPosts(initialPosts)
    setPage(2)
  },[])

  useEffect(async () => {
    let posts = await fetchPosts(1, category)
    setPosts(posts)
    setPage(2)
    if(posts.length) {
      setHasMore(true)
    }else {
      setHasMore(false)
    }
  }, [category])

  useEffect(async () => {
    await searchPosts()
  }, [keyword])

  async function getMorePosts() {
    let nextPosts = await fetchPosts(page, category, keyword)
    if(Array.isArray(nextPosts) && nextPosts.length) {
      setPosts([...posts, ...nextPosts])
      setPage(page+1)
    }else {
      setHasMore(false)
    }
  }

  const searchPosts = debounce(async () => {
    let posts = await fetchPosts(1, category, keyword)
    if(posts.length) {
      setPosts(posts)
      setPage(2)
      setHasMore(true)
    }else {
      setPosts([])
      setHasMore(false)
    }
  }, 500)
  return (
    <>
      <div id="mainContainer">
        <Carousel featuredPosts={featuredPosts} />
        <div id="searchMobile" className="container">
          <div className="search-container">
            <input className="search-input" type="search" placeholder="Search" />
          </div>
        </div>
        <div className="catNav container">
          <Categories categories={categories} />
          <div id="searchDesktop" className="search-container">
            <input className="search-input" type="search" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          </div>
        </div>
        <InfiniteScroll
          className="my-scroll"
          next={() => getMorePosts()}
          hasMore={hasMore}
          loader={<h4 className="not-found">Loading...</h4>}
          dataLength={posts.length}>
        <div className="postsRow container">
          {posts.length ?
            posts.map((post,index) => {
              return (
                <PostCard key={`post_${post.id}`} post={post} />
              )
            })
            : <h1 className="not-found">No posts found</h1>
          }
        </div>
        </InfiniteScroll>
      </div>
    </>
  )
}

export default BlogList;