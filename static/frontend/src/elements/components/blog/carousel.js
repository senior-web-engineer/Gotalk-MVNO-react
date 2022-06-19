import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom'

function Carousel(props) {
  const {featuredPosts} = props
  let settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 1200,
    autoplay: true,
    customPaging: i => (
      <div>&nbsp;</div>
    )
  };
  return (
    <div>
      <Slider {...settings} className="container slider-container">
        {
          featuredPosts ? featuredPosts.filter(post => post.meta.featured == 'true').map((post) => {
            return (
              <Link to={`/${post.slug}`} key={`sliderCard${post.id}`} className='sliderCard'>
                  <div className="slider-card-banner">
                    {
                      post.featured_media && post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail ?
                        <img src={post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url} />
                        :
                        <img src="/img/placebo-effect.webp"/>
                    }
                  </div>
                  <div className="slider-card-info">
                    <div className="slider-card-title">
                      <h2 dangerouslySetInnerHTML={{__html: post.title.rendered}}></h2>
                    </div>
                    <div className="slider-card-excerpt" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}>

                    </div>
                    <div className="slider-card-date">
                      <span>{post.date.split('T')[0]}</span>
                    </div>
                  </div>
            </Link>
            )
          }) : ''
        }
      </Slider>
    </div>
  );
}

export default Carousel;