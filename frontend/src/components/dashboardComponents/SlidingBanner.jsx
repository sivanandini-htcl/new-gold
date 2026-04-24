import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef } from "react";

import banner from "../../assets/banner.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";

const banners = [
  {
    title: "Invest in Digital Gold",
    subtitle: "Secure • 24K • 99.9% Pure",
    image: banner3,
  },
  {
    title: "Silver Prices Rising",
    subtitle: "Start investing from ₹10",
    image: banner,
  },
  {
    title: "Instant Buy & Sell",
    subtitle: "No storage worries",
    image: banner4,
  },
];

export default function SlidingBanner() {
  return (
    <div className="rounded-2xl overflow-hidden mb-6">

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={false}
        loop={true}
      >

        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-40 md:h-120">

              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-fill"
              />

              <div className="absolute "></div>

              <div className="absolute inset-0 flex flex-col justify-center px-6 text-white">
                <h2 className="text-lg md:text-3xl font-bold">
                  {banner.title}
                </h2>
                <p className="text-sm md:text-lg opacity-90">
                  {banner.subtitle}
                </p>
              </div>
              <button className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 text-yellow-400 flex items-center justify-center">
  ←
</button>

<button className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 text-yellow-400 flex items-center justify-center">
  →
</button>

            </div>
          </SwiperSlide>
        ))}

      </Swiper>

    </div>
  );

}