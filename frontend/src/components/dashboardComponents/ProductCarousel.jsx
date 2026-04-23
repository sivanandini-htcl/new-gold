import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

function ProductCarousel({ products, renderCard }) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}   // 👈 IMPORTANT for left + right visibility
      loop={false}        // ❌ no infinite loop (clean UX)
      allowTouchMove={true} // ✔ manual swipe
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 120,
        modifier: 2.5,
        slideShadows: false,
      }}
      modules={[EffectCoverflow]}
      className="w-full py-8"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          {renderCard(product)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ProductCarousel;