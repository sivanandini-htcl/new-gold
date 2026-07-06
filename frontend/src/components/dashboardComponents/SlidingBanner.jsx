

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef } from "react";

import banner from "../../assets/banner5.png";
import banner3 from "../../assets/banner3.png";
import banner4 from "../../assets/banner4.png";

const banners = [
  {
    title: "",
    subtitle: "",
    badge: "",
    cta: "Shop Now",
    image: banner3,
    accent: "from-amber-900/80 via-amber-900/40 to-transparent",
    position: "bottom-7 right-2 md:bottom-16 md:right-8 lg:bottom-20 lg:right-12 xl:bottom-40 xl:right-16 2xl:bottom-24 2xl:right-20",
    buttonClass:
      "bg-[#e0d8d8] text-[#641e1e] text-xs px-1 py-0.5 rounded-md  hover:scale-105  transition md:text-sm md:px-2 md:py-2 xl:px-9 xl:py-3 xl:text-lg",
  
  
  },
  {
    title: "View your collection",
    subtitle: "",
    badge: "",
    cta: "Invest Now",
    image: banner,
    accent: "from-slate-900/80 via-slate-900/40 to-transparent",
      position: "bottom-1 left-10 md:bottom-5 md:left-29 lg:bottom-4 lg:left-39 xl:bottom-12 xl:left-49 2xl:bottom-24 2xl:right-20",
    buttonClass:
      "bg-[#550707] text-xs text-[#ac8c47] px-1 py-0.5 rounded-md  hover:scale-105  transition md:text-sm md:px-2 md:py-2 xl:px-9 xl:py-3 xl:text-lg",
  
  
  },
  {
    title: "",
    subtitle: "",
    badge: "",
    cta: "Show Now",
    image: banner4,
    accent: "from-stone-900/80 via-stone-900/40 to-transparent",
    position: "bottom-9 right-10 md:bottom-22 md:right-26 lg:bottom-25 lg:right-39 xl:bottom-50 xl:right-49 2xl:bottom-24 2xl:right-20",
   buttonClass:
      "bg-black text-xs text-secondary px-1 py-0.5 rounded-md  hover:scale-105  transition md:text-sm md:px-2 md:py-2 xl:px-9 xl:py-3 xl:text-lg",
  
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
        pagination={{ clickable: true, bulletClass: "swiper-pagination-bullet !bg-amber-300/60 !w-2 !h-2",bulletActiveClass: "swiper-pagination-bullet-active !bg-white !w-5 !rounded-full",
        }}
        navigation={{prevEl: prevRef.current,nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => { swiper.params.navigation.prevEl = prevRef.current; swiper.params.navigation.nextEl = nextRef.current;
        }}
        loop={true}
        className="w-full"
      >
        {banners.map((banner, index) => (
  <SwiperSlide
    key={index}
    className="relative h-44 sm:h-56 md:h-72 lg:h-[80px] xl:h-[137px] 2xl:h-[28rem]"
  >
    <img
      src={banner.image}
      alt={banner.title}
      className="h-full w-full object-fill"
    />

    <div className={`absolute ${banner.position}`}>
      <button className={banner.buttonClass}>
        {banner.cta}
      </button>
    </div>
  </SwiperSlide>
))}
      </Swiper>     
    </div>
  );
}