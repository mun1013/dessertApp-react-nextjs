import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from 'next/image';

function Introduction() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const imagePath = ['/images/cheese-cake.jpg', 
  '/images/cheese-cake1.jpg', 
  '/images/sponge-cake.jpg', 
  '/images/chocolate-cheese-cake.jpg', 
  '/images/Chocolate-Chip-Cookies.jpg', 
  '/images/chocolate-cookies.jpg',
  '/images/butter-cookies.jpg'];
  
  return (
    <div>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        customTransition=".5 all"
        transitionDuration={100}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {imagePath.map(image => {
          return <Image
            key={image}
            src={image}
            alt="dessert"
            width={400}
            height={300}
            layout='responsive'
          />
          })}
      </Carousel>
    </div>
  );

}

export default Introduction;