import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './carousel.scss';
function Carousel(props) {
  const slides = [
    {
      title: 'Machu Picchu',
      subtitle: 'Peru',
      description: 'Adventure is never far away',
      image:
      'https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
    {
      title: 'Chamonix',
      subtitle: 'France',
      description: 'Let your dreams come true',
      image:
      'https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
    {
      title: 'Mimisa Rocks',
      subtitle: 'Australia',
      description: 'A piece of heaven',
      image:
      'https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
    {
      title: 'Four',
      subtitle: 'Australia',
      description: 'A piece of heaven',
      image:
        'https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
    {
      title: 'Five',
      subtitle: 'Australia',
      description: 'A piece of heaven',
      image:
      'https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
  ];
  let settings = {
    dots: true,
    infinite: false,
    speed: 300,
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
    <section className="blueBg">
      <Slider {...settings} className="container carousel-container margin-auto">
        {slides
          ? slides.map((slide, index) => {
              return (
                <Link to={`#`} key={`${index}`} className={index%2==0?"carouselCardOdd":"carouselCard"}>
                  <div className="carousel-card-banner">
                    <img src={slide.image} />
                  </div>
                  <div className="carousel-card-info">
                    <div className="carousel-card-title">
                      <h2>{slide.title}</h2>
                    </div>
                    {/* <div className="carousel-card-excerpt">{slide.subtitle}</div> */}
                    <div className="carousel-card-date">
                      <span>{slide.subtitle}</span>
                    </div>
                  </div>
                </Link>
              );
            })
          : ''}
      </Slider>
    </section>
  );
}

export default Carousel;
