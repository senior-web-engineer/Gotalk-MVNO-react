import React from 'react';
import Slider from 'react-slick';
import './carousel.scss';

function Carousel(props) {
  const {feeds} = props
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  return (
    <section className="instagram-section">
      <Slider {...settings} className="container carousel-container margin-auto">
        {feeds
          ? feeds.map((slide, index) => {
              return (
                <a href={`${slide.media_url}`} key={`${index}`} className={index%2==0?"carouselCardOdd":"carouselCard"}>
                  <div className="carousel-card-banner">
                    <img src={slide.thumbnail_url?slide.thumbnail_url:slide.media_url} />
                  </div>
                  <div className="carousel-card-info">
                    <div className="carousel-card-title">
                      {/* <h2>{slide.media_type}</h2> */}
                    </div>
                    <div className="carousel-card-excerpt">{slide.media_type}</div>
                    <div className="carousel-card-date">
                      <span>Gotalkwireless.com</span>
                    </div>
                  </div>
                </a>
              );
            })
          : ''}
      </Slider>
    </section>
  );
}

export default Carousel;
