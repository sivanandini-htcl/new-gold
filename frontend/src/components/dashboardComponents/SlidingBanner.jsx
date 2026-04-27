

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef } from "react";

import banner from "../../assets/banner5.png";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.png";

const banners = [
  {
    title: "",
    subtitle: "",
    badge: "",
    cta: "",
    image: banner3,
    accent: "from-amber-900/80 via-amber-900/40 to-transparent",
  },
  {
    title: "",
    subtitle: "",
    badge: "",
    cta: "",
    image: banner,
    accent: "from-slate-900/80 via-slate-900/40 to-transparent",
  },
  {
    title: "",
    subtitle: "",
    badge: "",
    cta: "",
    image: banner4,
    accent: "from-stone-900/80 via-stone-900/40 to-transparent",
  },
];

export default function SlidingBanner() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className=" overflow-hidden  2xl:mb-7 relative group lg-">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-amber-300/60 !w-2 !h-2",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white !w-5 !rounded-full",
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        loop={true}
        className="w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-44 sm:h-56 md:h-72 lg:h-80 xl:h-125 2xl:h-[28rem]">

              <img
                src={banner.image}
                alt={banner.title}
                className="h-full w-full   object-fill"
              />

              {/* Gradient overlay */}
             

              {/* Content */}
         

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        ref={prevRef}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 2xl:w-11 2xl:h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/10"
        aria-label="Previous"
      >
        ←
      </button>
      <button
        ref={nextRef}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 2xl:w-11 2xl:h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/10"
        aria-label="Next"
      >
        →
      </button>
    </div>
  );
}