import React from "react";
import { useEffect, useRef, useState } from "react";

function Pricing() {
  const [priceIsVisible, setPriceIsVisible] = useState(false);

  const pricingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setPriceIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const currentRef = pricingRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  function OrderWhatsAppButton() {
    const whatsappNumber = "6282128295221";

    const messageTemplate = `
Halo, saya tertarik dengan produk Anda. Bisa minta info lebih lanjut?

Nama: (isi nama Anda)
Email: (isi alamat email Anda)
Instansi/Organisasi: (Isi apabila berasal dari suatu instansi atau organisasi)
Keperluan: (Isi deskripsi produk digunakan untuk apa)
Lampiran: (Lampirkan bukti file transfer)

Metode pembayaran bisa melalui rekening BRI dengan no. rek xxx a.n. Admin Geoid-on-Dashboard. Kami akan balas segera dalam waktu 1x24 jam pukul 09.00 - 17.00.
  `.trim();

    const encodedMessage = encodeURIComponent(messageTemplate);

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    return (
      <div className="place-self-center mt-[5vh]">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-x-3 bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
        >
          {/* Ikon WhatsApp SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.433-9.894-9.892-9.895-5.458 0-9.887 4.434-9.889 9.888.001 2.268.622 4.398 1.772 6.278l-.382 1.392 1.442-.383z" />
          </svg>
          <span>Order via WhatsApp</span>
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-screen overflow-x-hidden p-6 rounded-[20px] space-y-2 mt-[5vh]">
      <div
        ref={pricingRef}
        className={`p-6 overflow-hidden rounded-[20px] bg-gradient-to-r from-cyan-600 via-cyan-200 to-white 
      transform transition-all duration-1000 ease-out
      ${
        priceIsVisible
          ? "translate-y-0 opacity-100" //
          : "translate-y-10 opacity-0" //
      }`}
      >
        <h1 className="font-roboto font-bold text-white text-outline drop-shadow-[1px_1px_0_black] tracking-widest">
          Our Best Offering!
        </h1>
      </div>

      <div className="flex md:flex-row flex-col w-max-screen md:h-[70vh] h-[145vh] mt-[5vh] md:place-content-center place-self-center md:space-x-[15vw] space-y-[15vh]">
        <div className="relative flex flex-col md:w-[30vw] w-[60vw] h-[60vh] rounded-[50px] place-content-center place-items-center bg-gradient-to-r from-[#006293] to-[#2fbaff]">
          <div className="relative h-2/10 w-19/20 rounded-sm top-1/15 bg-white place-content-center">
            <h1 className="font-roboto-slab text-center font-bold italic md:text-[40px] text-[30px] text-[#006293]">
              BASIC
            </h1>
          </div>

          <div className="w-18/20 h-2/3 pt-15">
            <div className="flex flex-wrap place-content-center w-full border-b-2 border-white mb-5 px-5">
              <h2 className="text-center font-roboto italic lg:text-[18px] text-[#FFD700] ">
                Akses data model undulasi geoid
              </h2>
            </div>

            <div className="flex flex-wrap place-content-center w-full border-b-2 border-white mb-5 px-5">
              <h2 className="text-center font-roboto italic lg:text-[18px] text-white line-through ">
                Akses data free air anomaly dan bouguer anomaly
              </h2>
            </div>
          </div>
          <div className="absolute place-content-center md:w-[200px] md:h-[200px] w-[120px] h-[120px] md:top-80 top-95 border-8 border-[#2fbaff] bg-white rounded-full">
            <h2 className="text-center font-roboto md:text-[40px] text-[25px] text-[#006293] ">
              Free Access
            </h2>
          </div>
        </div>

        <div className="relative flex flex-col md:w-[30vw] w-[60vw] h-[60vh] rounded-[50px] place-content-center place-items-center bg-gradient-to-r from-[#006293] to-[#2fbaff]">
          <div className="relative h-2/10 w-19/20 rounded-sm top-1/15 bg-white place-content-center">
            <h1 className="font-roboto-slab text-center font-bold italic md:text-[40px] text-[30px] text-[#006293]">
              PREMIUM
            </h1>
          </div>
          <div className="w-18/20 h-2/3 pt-15">
            <div className="flex flex-wrap place-content-center w-full border-b-2 border-white mb-5 px-5">
              <h2 className="text-center font-roboto italic lg:text-[18px] text-[#FFD700] ">
                Akses data model undulasi geoid
              </h2>
            </div>

            <div className="flex flex-wrap place-content-center w-full border-b-2 border-white mb-5 px-5">
              <h2 className="text-center font-roboto italic lg:text-[18px] text-[#FFD700] ">
                Akses data free air anomaly dan bouguer anomaly
              </h2>
            </div>
          </div>
          <div className="absolute place-content-center md:w-[200px] md:h-[200px] w-[120px] h-[120px] md:top-80 top-95 border-8 border-[#2fbaff] bg-white rounded-full">
            <h2 className="text-center font-roboto md:text-[40px] text-[25px] text-[#006293] ">
              Contact Us!
            </h2>
          </div>
        </div>
      </div>
      <OrderWhatsAppButton />
    </div>
  );
}

export default Pricing;
