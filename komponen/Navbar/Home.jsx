import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Pricing from "./Pricing";
function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);

          observer.unobserve(elementRef.current);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-screen overflow-x-hidden p-6 rounded-[20px] space-y-2">
      <div
        className={`p-6 overflow-hidden rounded-[20px] bg-gradient-to-r from-cyan-600 via-cyan-200 to-white 
      transform transition-all duration-1000 ease-out
      ${visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
      >
        {" "}
        <h1 className="font-roboto font-bold text-white text-outline drop-shadow-[1px_1px_0_black] tracking-widest">
          Main Information
        </h1>
      </div>

      <div className="flex flex-wrap justify-between max-w-screen space-y-[2vh]">
        {/* Geoid, Datum, Vertikal Stabil*/}
        <Link to="/geoid-datum-vertikal-stabil">
          <div
            className="relative bg-gradient-to-r from-cyan-600 to-cyan-200 md:w-[30vw] w-[40vw] h-[40vh] border-2 rounded-[8px] shadow-md shadow-black
+ transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:scale-105"
          >
            <img
              src="/geoid.jpg"
              className="relative top-0 left-0 w-full h-1/2 object-cover rounded-t-[8px]"
              alt=""
            />
            <div className="relative bottom-4 left-0 w-full h-8 bg-gradient-to-r from-white to-white/50">
              <h1 className="font-roboto font-bold lg:text-[1.5vw] md:text-[2vw] sm:text-[2vw] text-[2vw] ml-1.5 place-content-center h-full">
                Geoid, Datum Vertikal Stabil
              </h1>

              <div className="px-2">
                <a className="font-roboto font-medium text-black lg:text-[12px] md:text-[10px] sm:text-[10px] text-[8px] place-content-center h-full">
                  Geoid merupakan bidang ekuipotensial medan gayaberat bumi yang
                  berimpit dengan permukaan laut rata-rata global yang tidak
                  terganggu oleh fenomena dinamika air laut. Geoid merupakan
                  model bumi yang paling mendekati ...
                </a>
              </div>
            </div>
          </div>
        </Link>

        {/* Alat Ukur gayaberat*/}
        <Link to="/alat-ukur-gaya-berat">
          <div
            className="relative bg-gradient-to-r from-cyan-600 to-cyan-200 md:w-[30vw] w-[40vw] h-[40vh] border-2 rounded-[8px] shadow-md shadow-black
+ transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:scale-105"
          >
            {" "}
            <img
              src="/Information/Information2-1.png"
              className="relative top-0 left-0 w-full h-1/2 object-cover rounded-t-[8px]"
              alt=""
            />
            <div className="relative bottom-4 left-0 w-full h-8 bg-gradient-to-r from-white to-white/50">
              <h1 className="font-roboto font-bold lg:text-[1.5vw] md:text-[2vw] sm:text-[2vw] text-[2vw] ml-1.5 place-content-center h-full">
                Alat Ukur Gayaberat
              </h1>

              <div className="px-2">
                <a className="font-roboto font-medium text-black lg:text-[12px] md:text-[10px] sm:text-[10px] text-[8px] place-content-center h-full">
                  Menurut Kamus Besar Bahasa Indonesia (KBBI), gayaberat adalah
                  gaya tarik bumi atau gravitasi yang menarik semua benda menuju
                  pusat bumi. Istilah ini juga digunakan untuk menyatakan berat
                  suatu benda, yaitu hasil dari gaya gravitasi ...
                </a>
              </div>
            </div>
          </div>
        </Link>

        {/*  Free Air Anomaly*/}
        <Link to="/free-air-anomaly-bouguer-anomaly">
          <div
            className="relative bg-gradient-to-r from-cyan-600 to-cyan-200 md:w-[30vw] w-[40vw] h-[40vh] border-2 rounded-[8px] shadow-md shadow-black
+ transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:scale-105"
          >
            {" "}
            <img
              src="/Free-air-anomaly.jpg"
              className="relative top-0 left-0 w-full h-1/2 object-cover rounded-t-[8px]"
              alt=""
            />
            <div className="relative bottom-4 left-0 w-full h-8 bg-gradient-to-r from-white to-white/50">
              <h1 className="font-roboto font-bold lg:text-[1.5vw] md:text-[1.5vw] sm:text-[2vw] text-[2vw] ml-1.5 place-content-center h-full">
                Free Air Anomaly & Bouguer Anomaly
              </h1>

              <div className="px-2">
                <a className="font-roboto font-medium text-black lg:text-[12px] md:text-[10px] sm:text-[10px] text-[8px] place-content-center h-full">
                  Free-Air Anomaly (FAA) merupakan perbedaan antara nilai
                  gravitasi observasi di suatu titik dengan gravitasi normal
                  yang dihitung pada permukaan referensi elipsoid, pada
                  prosesnya dilakukan koreksi elevasi tanpa ...
                </a>
              </div>
            </div>
          </div>
        </Link>

        {/* Metode Pengolahan*/}
        <Link to="/metode-pengolahan">
          <div
            className="relative bg-gradient-to-r from-cyan-600 to-cyan-200 md:w-[30vw] w-[40vw] h-[40vh] border-2 rounded-[8px] shadow-md shadow-black
+ transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:scale-105"
          >
            {" "}
            <img
              src="/metode-pengolahan.jpg"
              className="relative top-0 left-0 w-full h-1/2 object-cover rounded-t-[8px]"
              alt=""
            />
            <div className="relative bottom-4 left-0 w-full h-8 bg-gradient-to-r from-white to-white/50">
              <h1 className="font-roboto font-bold lg:text-[1.5vw] md:text-[2vw] sm:text-[2vw] text-[2vw] ml-1.5 place-content-center h-full">
                Metode Pengolahan
              </h1>

              <div className="px-2">
                <a className="font-roboto font-medium text-black lg:text-[12px] md:text-[10px] sm:text-[10px] text-[8px] place-content-center h-full">
                  Untuk membangun model geoid, terdapat beberapa pendekatan yang
                  umum digunakan dalam dunia geodesi dan geofisika, di antaranya
                  adalah metode Remove-Compute-Restore (RCR), Least Squares
                  Collocation ...
                </a>
              </div>
            </div>
          </div>
        </Link>

        {/* Geoid vs MSL*/}
        <Link to="/geoid-vs-msl">
          <div
            className="relative bg-gradient-to-r from-cyan-600 to-cyan-200 md:w-[30vw] w-[40vw] h-[40vh] border-2 rounded-[8px] shadow-md shadow-black
+ transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:scale-105"
          >
            {" "}
            <img
              src="/geoid-msl.jpg"
              className="relative top-0 left-0 w-full h-1/2 object-cover rounded-t-[8px]"
              alt=""
            />
            <div className="relative bottom-4 left-0 w-full h-8 bg-gradient-to-r from-white to-white/50">
              <h1 className="font-roboto font-bold lg:text-[1.5vw] md:text-[2vw] sm:text-[2vw] text-[2vw] ml-1.5 place-content-center h-full">
                Geoid vs MSL
              </h1>

              <div className="px-2">
                <a className="font-roboto font-medium text-black lg:text-[12px] md:text-[10px] sm:text-[10px] text-[8px] place-content-center h-full">
                  Geoid merupakan bidang ekuipotensial gayaberat yang berimpit
                  dengan permukaan laut rata-rata yang tidak terganggu dengan
                  fenomena dinamika laut. Sedangkan, Mean Sea Level (MSL)
                  merupakan ...
                </a>
              </div>
            </div>
          </div>
        </Link>

        {/* Aplikasi gayaberat*/}
        <Link to="/aplikasi-gaya-berat">
          <div
            className="relative bg-gradient-to-r from-cyan-600 to-cyan-200 md:w-[30vw] w-[40vw] h-[40vh] border-2 rounded-[8px] shadow-md shadow-black
+ transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:scale-105"
          >
            {" "}
            <img
              src="/Akuisisi-Metode-Gravity.webp"
              className="relative top-0 left-0 w-full h-1/2 object-cover rounded-t-[8px]"
              alt=""
            />
            <div className="relative bottom-4 left-0 w-full h-8 bg-gradient-to-r from-white to-white/50">
              <h1 className="font-roboto font-bold lg:text-[1.5vw] md:text-[2vw] sm:text-[2vw] text-[2vw] ml-1.5 place-content-center h-full">
                Aplikasi Gayaberat
              </h1>

              <div className="px-2">
                <a className="font-roboto font-medium text-black lg:text-[12px] md:text-[10px] sm:text-[10px] text-[8px] place-content-center h-full">
                  Data gayaberat sangat berguna dalam banyak aplikasi. Penentuan
                  tinggi ortometrik membutuhkan model geoid yang diturunkan dari
                  data gayaberat. Geoid adalah bidang ekuipotensial medan ...
                </a>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div
        ref={elementRef}
        className={`
        p-6 mt-[5vh] overflow-hidden rounded-[20px] bg-gradient-to-l from-cyan-600 via-cyan-200 to-white
        transition-all duration-1000 ease-in-out transform
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1/2"}
      `}
      >
        <h1 className="font-roboto font-bold text-white text-outline drop-shadow-[1px_1px_0_black] tracking-widest text-end">
          Acknowledgement
        </h1>
      </div>

      <div className="pl-[15vw] mt-[1vh] max-w-screen">
        <div className="flex flex-row py-[5vh] pl-[5vh] max-w-screen bg-gradient-to-r bg-cyan-600 border-2 rounded-[8px] shadow-md shadow-black">
          <div className=" relative text-justify px-4 content-center w-full">
            <a className="font-roboto font-medium text-white lg:text-[14px] md:text-[12px] sm:text-[12px] text-[10px] ">
              Dengan penuh hormat dan penghargaan, Tim GOD menyampaikan terima
              kasih yang sebesar-besarnya kepada Badan Informasi Geospasial
              (BIG) atas dukungan dan kontribusinya dalam penyelesaian tugas
              akhir ini. Ketersediaan data gayaberat yang berkualitas tinggi
              serta bantuan data untuk proses validasi sangat berperan penting
              dalam pengembangan dan evaluasi model geoid yang disusun dalam
              studi ini.{" "}
            </a>

            <br></br>
            <br></br>
            <div>
              <a className="font-roboto font-medium text-white lg:text-[14px] md:text-[12px] sm:text-[12px] text-[10px] ">
                Peran BIG sebagai lembaga otoritatif dalam penyediaan data
                geospasial nasional telah memberikan fondasi yang kuat bagi
                pelaksanaan tugas akhir ini. Tim GOD juga mengapresiasi semangat
                kolaborasi dan keterbukaan ilmiah yang senantiasa ditunjukkan
                oleh para ahli dan staf di lingkungan BIG. Semoga kerja sama ini
                dapat terus berlanjut dan memberi manfaat bagi pengembangan ilmu
                pengetahuan dan teknologi geospasial di Indonesia.
              </a>
            </div>
          </div>

          <div className="h-full w-full content-center place-self-center">
            <img
              src="/BIG_logo.png"
              className="relative lg:w-5/12 md:w-6/12 w-8/12 mr-6 justify-self-end place-self-center rounded-[8px]"
              alt=""
            />
          </div>
        </div>
      </div>

      <Pricing />
    </div>
  );
}

export default Home;
