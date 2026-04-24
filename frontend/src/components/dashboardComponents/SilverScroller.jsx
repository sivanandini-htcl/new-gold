import { useState } from "react";
import img1 from "../../assets/silverC1.jpg";
import img2 from "../../assets/silverC2.jpg";
import img3 from "../../assets/silverC2.jpg";
import img4 from "../../assets/silveC4.jpg";

const slides = [
  {
    title: "Silver Collection",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad molestiae maiores distinctio! Quas commodi aperiam delectus vero distinctio similique soluta reprehenderit cupiditate maxime corporis quasi recusandae, reiciendis cum voluptas non.",
    img: img1,
  },
  {
    title: "Premium Bars",
    desc: "High quality silver bars for investment and gifting...",
    img: img2,
  },
  {
    title: "Luxury Coins",
    desc: "Exclusive collectible coins with elegant finish...",
    img: img3,
  },
  {
    title: "Gift Edition",
    desc: "Perfect corporate gifting silver items...",
    img: img4,
  },
];

export default function Section() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex items-center justify-between px-10 py-10 mb-20 transition-all duration-500">

      {/* LEFT TEXT (changes with slide) */}
      <div className="w-1/2 transition-all duration-500">
        <h1 className="text-6xl font-serif mb-4">
          {slides[index].title}
        </h1>
        <p className="text-gray-600">
          {slides[index].desc}
        </p>
      </div>

      {/* RIGHT IMAGE + ARROWS */}
      <div className="w-1/2 flex flex-col items-center relative">

        {/* ARROWS ABOVE IMAGE */}
        <div className="flex gap-6 mb-4">
          <button
            onClick={prev}
            className="bg-black/70 text-white w-10 h-10 rounded-full"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="bg-black/70 text-white w-10 h-10 rounded-full"
          >
            ›
          </button>
        </div>

        {/* IMAGE (ROTATING EFFECT) */}
        <div className="w-[250px] h-[250px] rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 rotate-0">
          <img
            src={slides[index].img}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}