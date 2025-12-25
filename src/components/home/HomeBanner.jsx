import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import './HomeBanner.css';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';

function Homebanner(){

  const bannerList = [
                          {
                          id: 1,
                          image: "https://embarkx.com/sample/placeholder.png",
                          title: "Home Comfort",
                          subtitle: "Living Room",
                          description: "Upgrade your space with cozy and stylish sofas",
                        },
                        {
                          id: 2,
                          image: "https://embarkx.com/sample/placeholder.png",
                          title: "Entertainment Hub",
                          subtitle: "Smart TV",
                          description: "Experience the latest in home entertainment",
                        },
                        {
                          id: 3,
                          image: "https://embarkx.com/sample/placeholder.png",
                          title: "Playful Picks",
                          subtitle: "Kids' Clothing",
                          description: "Bright and fun styles for kids, up to 20% off",
                      },
                      {
                          id: 4,
                          image: "https://embarkx.com/sample/placeholder.png",
                          title: "Office Essentials",
                          subtitle: "Work From Home",
                          description: "Ergonomic chairs and desks for a productive workspace",
                      }
  ];


  return (

    

    <Swiper
      slidesPerView={'1'}
      grabCursor={true}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
  
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {bannerList.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="flex flex-row items-center justify-between w-full h-64 sm:h-96 lg:h-128 bg-blue-500 rounded-lg overflow-hidden p-5">
            
            <div className="flex flex-col bg-blue-500 bg-opacity-70   items-center p-6 sm:p-12 lg:p-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{banner.title}</h2>
              <h3 className="text-xl sm:text-2xl lg:text-3xl text-white mb-4">{banner.subtitle}</h3>
              <p className="text-md sm:text-lg lg:text-xl text-white max-w-lg">{banner.description}</p>
              <Link to="/products">
                <button className="mt-6 px-4 py-2 bg-white text-blue-500 font-semibold rounded hover:bg-gray-200 cursor-pointer transition">
                  Shop Now
                </button>
              </Link>
            </div>
            <div> <img src={banner.image} alt={banner.title}/> </div>
          </div>
          
        </SwiperSlide>
      ))} 
   
     
    </Swiper>
  );
};

export default Homebanner;