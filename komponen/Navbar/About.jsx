import React from "react";
import { useEffect, useRef, useState } from "react";
import { Circle } from "lucide-react";
import { RectangleHorizontal } from "lucide-react";

function About() {
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
          Our Teams
        </h1>
      </div>

      <div className="flex lg:flex-row flex-col max-w-screen ">
        <div className="flex flex-wrap lg:flex-row flex-col pl-[5vw] ">
          <div className="relative mt-2 w-[45vw] h-[40vh] ">
            <div
              className="absolute w-[200px] h-[200px] top-[20px] z-10 border-2
                   rounded-full overflow-hidden bg-gradient-to-l from-sky-200 to-sky-50"
            >
              <img
                src="/Angga.png"
                alt=""
                className="object-cover w-full h-full scale-130"
              />
            </div>

            <div
              className="absolute w-120 h-50 -z-5 top-[20px] -left-12 content-center bg-gradient-to-l from-[#3d82b0] via-[#9ed7fd] to-[#bfe5ff]"
              style={{
                clipPath: "circle(94% at 100% 50%)",
              }}
            >
              <div className="pl-70">
                <h1 className="place-self-start font-bold mb-2">
                  M. Angga Hadi Pratama
                </h1>
                <h2 className="place-self-start text-xs text-white italic ">
                  S1 Teknik Geodesi dan Geomatika <br></br>
                  anggahadypratama@gmail.com <br></br>Project Manager
                </h2>
              </div>
            </div>
            <Circle
              className="absolute w-[240px] h-[240px] left-79 -z-10 stroke-0"
              style={{ fill: "#3d82b0" }}
            />
          </div>

          <div className="relative mt-2 w-[45vw] h-[40vh]">
            <div
              className="absolute w-[200px] h-[200px] top-[20px] z-10 border-2
                   rounded-full overflow-hidden bg-gradient-to-l from-sky-200 to-sky-50"
            >
              <img
                src="/Syifa.png"
                alt=""
                className="object-cover w-full h-full scale-130 -translate-y-2"
              />
            </div>

            <div
              className="absolute w-120 h-50 -z-5 top-[20px] -left-12 content-center bg-gradient-to-l from-[#3d82b0] via-[#9ed7fd] to-[#bfe5ff]"
              style={{
                clipPath: "circle(94% at 100% 50%)",
              }}
            >
              <div className="pl-70">
                <h1 className="place-self-start font-bold mb-2">
                  Syifa Kamiliya Rosyad
                </h1>
                <h2 className="place-self-start text-xs text-white italic ">
                  S1 Teknik Geodesi dan Geomatika <br></br>
                  syifa.kamiliya26@gmail.com <br></br>Data Manager
                </h2>
              </div>
            </div>
            <Circle
              className="absolute w-[240px] h-[240px] left-79 -z-10 stroke-0"
              style={{ fill: "#3d82b0" }}
            />
          </div>

          <div className="relative mt-2 w-[45vw] h-[40vh]">
            <div
              className="absolute w-[200px] h-[200px] top-[20px] z-10 border-2
                   rounded-full overflow-hidden bg-gradient-to-l from-sky-200 to-sky-50"
            >
              <img
                src="/Zulfia.png"
                alt=""
                className="object-cover w-full h-full scale-130 translate-x-2"
              />
            </div>

            <div
              className="absolute w-120 h-50 -z-5 top-[20px] -left-12 content-center bg-gradient-to-l from-[#3d82b0] via-[#9ed7fd] to-[#bfe5ff]"
              style={{
                clipPath: "circle(94% at 100% 50%)",
              }}
            >
              <div className="pl-70">
                <h1 className="place-self-start font-bold mb-2">
                  Zulfia Tri Tungga Dewi
                </h1>
                <h2 className="place-self-start text-xs text-white italic ">
                  S1 Teknik Geodesi dan Geomatika <br></br>
                  zulfiatri25@gmail.com <br></br>Data Processor
                </h2>
              </div>
            </div>
            <Circle
              className="absolute w-[240px] h-[240px] left-79 -z-10 stroke-0"
              style={{ fill: "#3d82b0" }}
            />
          </div>

          <div className="relative mt-2 w-[45vw] h-[40vh]">
            <div
              className="absolute w-[200px] h-[200px] top-[20px] z-10 border-2
                   rounded-full overflow-hidden bg-gradient-to-l from-sky-200 to-sky-50"
            >
              <img
                src="/Azfa.png"
                alt=""
                className="object-cover w-full h-full scale-130 translate-x-1"
              />
            </div>

            <div
              className="absolute w-120 h-50 -z-5 top-[20px] -left-12 content-center bg-gradient-to-l from-[#3d82b0] via-[#9ed7fd] to-[#bfe5ff]"
              style={{
                clipPath: "circle(94% at 100% 50%)",
              }}
            >
              <div className="pl-70">
                <h1 className="place-self-start font-bold mb-2">
                  Azfa Rihad Fathan
                </h1>
                <h2 className="place-self-start text-xs text-white italic ">
                  S1 Teknik Geodesi dan Geomatika <br></br>
                  azfa28rihad@gmail.com <br></br>Web Developer
                </h2>
              </div>
            </div>
            <Circle
              className="absolute w-[240px] h-[240px] left-79 -z-10 stroke-0"
              style={{ fill: "#3d82b0" }}
            />
          </div>

          <div className="relative mt-2 w-[45vw] h-[40vh]">
            <div
              className="absolute w-[200px] h-[200px] top-[20px] z-10 border-2
                   rounded-full overflow-hidden bg-gradient-to-l from-sky-200 to-sky-50"
            >
              <img
                src="/Rafly.png"
                alt=""
                className="object-cover w-full h-full scale-130 translate-y-4"
              />
            </div>

            <div
              className="absolute w-120 h-50 -z-5 top-[20px] -left-12 content-center bg-gradient-to-l from-[#3d82b0] via-[#9ed7fd] to-[#bfe5ff]"
              style={{
                clipPath: "circle(94% at 100% 50%)",
              }}
            >
              <div className="pl-70">
                <h1 className="place-self-start font-bold mb-2">
                  Rafly Maharazi
                </h1>
                <h2 className="place-self-start text-xs text-white italic ">
                  S1 Teknik Geodesi dan Geomatika <br></br>
                  raflymaharazi11@gmail.com <br></br>Data Processor
                </h2>
              </div>
            </div>
            <Circle
              className="absolute w-[240px] h-[240px] left-79 -z-10 stroke-0"
              style={{ fill: "#3d82b0" }}
            />
          </div>
        </div>
      </div>

      {/*Dosen Pembimbing*/}
      <div
        ref={elementRef}
        className={`
        p-6 mt-[5vh] overflow-hidden rounded-[20px] bg-gradient-to-r from-cyan-600 via-cyan-200 to-white
        transition-all duration-1000 ease-in-out transform
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1/2"}
      `}
      >
        {" "}
        <h1 className="font-roboto font-bold text-white text-outline drop-shadow-[1px_1px_0_black] tracking-widest">
          Our Supervisors
        </h1>
      </div>
      <div className="flex lg:flex-row flex-col max-w-screen ">
        <div className="flex flex-wrap lg:flex-row flex-col pl-[5vw] ">
          <div className="relative mt-2 w-[45vw] h-[40vh] ">
            <div
              className="absolute w-[200px] h-[200px] top-[20px] z-10 border-2
                   rounded-full overflow-hidden bg-gradient-to-l from-sky-200 to-sky-50"
            >
              <img
                src="/Pembimbing-1.png"
                alt=""
                className="object-cover w-full h-full scale-90 translate-y-3"
              />
            </div>

            <div
              className="absolute w-120 h-50 -z-5 top-[20px] -left-12 content-center bg-gradient-to-l from-[#3d82b0] via-[#9ed7fd] to-[#bfe5ff]"
              style={{
                clipPath: "circle(94% at 100% 50%)",
              }}
            >
              <div className="pl-70">
                <h1 className="place-self-start font-bold mb-2">
                  Brian Bramanto, S.T., M.T.,<br></br> Ph.D.
                </h1>
                <h2 className="place-self-start text-xs text-white italic ">
                  Dosen Teknik Geodesi dan Geomatika <br></br>
                  brian.bramanto@itb.ac.id <br></br>Kelompok Keahlian Sains
                  Rekayasa dan Inovasi Geodesi
                </h2>
              </div>
            </div>
            <Circle
              className="absolute w-[240px] h-[240px] left-79 -z-10 stroke-0"
              style={{ fill: "#3d82b0" }}
            />
          </div>

          <div className="relative mt-2 w-[45vw] h-[40vh]">
            <div
              className="absolute w-[200px] h-[200px] top-[20px] z-10 border-2
                   rounded-full overflow-hidden bg-gradient-to-l from-sky-200 to-sky-50"
            >
              <img
                src="/Pembimbing-2.png"
                alt=""
                className=" w-full  -translate-y-8 scale-60"
              />
            </div>

            <div
              className="absolute w-120 h-50 -z-5 top-[20px] -left-12 content-center bg-gradient-to-l from-[#3d82b0] via-[#9ed7fd] to-[#bfe5ff]"
              style={{
                clipPath: "circle(94% at 100% 50%)",
              }}
            >
              <div className="pl-70">
                <h1 className="place-self-start font-bold mb-2">
                  Dr. techn. Dudy Darmawan Wijaya, S.T., M.Sc.
                </h1>
                <h2 className="place-self-start text-xs text-white italic ">
                  Dosen Teknik Geodesi dan Geomatika <br></br>
                  dudy.wijaya@itb.ac.id <br></br>Kelompok Keahlian Sains
                  Rekayasa dan Inovasi Geodesi
                </h2>
              </div>
            </div>
            <Circle
              className="absolute w-[240px] h-[240px] left-79 -z-10 stroke-0"
              style={{ fill: "#3d82b0" }}
            />
          </div>

          <div className="relative mt-2 w-[45vw] h-[40vh]">
            <div
              className="absolute w-[200px] h-[200px] top-[20px] z-10 border-2
                   rounded-full overflow-hidden bg-gradient-to-l from-sky-200 to-sky-50"
            >
              <img
                src="/Pembimbing-3.png"
                alt=""
                className="object-cover w-full h-full scale-80 translate-y-5"
              />
            </div>

            <div
              className="absolute w-120 h-50 -z-5 top-[20px] -left-12 content-center bg-gradient-to-l from-[#3d82b0] via-[#9ed7fd] to-[#bfe5ff]"
              style={{
                clipPath: "circle(94% at 100% 50%)",
              }}
            >
              <div className="pl-70">
                <h1 className="place-self-start font-bold mb-2">
                  Prof. Ir. Hasanuddin Zainal <br></br> Abidin, M.Sc., Ph.D.
                </h1>
                <h2 className="place-self-start text-xs text-white italic ">
                  Dosen Teknik Geodesi dan Geomatika <br></br>
                  hzabidin@itb.ac.id <br></br>Kelompok Keahlian Sains Rekayasa
                  dan Inovasi Geodesi
                </h2>
              </div>
            </div>
            <Circle
              className="absolute w-[240px] h-[240px] left-79 -z-10 stroke-0"
              style={{ fill: "#3d82b0" }}
            />
          </div>

          <div className="relative mt-2 w-[45vw] h-[40vh]">
            <div
              className="absolute w-[200px] h-[200px] top-[20px] z-10 border-2
                   rounded-full overflow-hidden bg-gradient-to-l from-sky-200 to-sky-50"
            >
              <img
                src="/Pembimbing-4.png"
                alt=""
                className="object-cover w-full h-full scale-85 translate-y-4"
              />
            </div>

            <div
              className="absolute w-120 h-50 -z-5 top-[20px] -left-12 content-center bg-gradient-to-l from-[#3d82b0] via-[#9ed7fd] to-[#bfe5ff]"
              style={{
                clipPath: "circle(94% at 100% 50%)",
              }}
            >
              <div className="pl-70">
                <h1 className="place-self-start font-bold mb-2">
                  Dr. rer. n Wiwin <br></br> Windupranata, S.T, M.Si.
                </h1>
                <h2 className="place-self-start text-xs text-white italic ">
                  Dosen Teknik Geodesi dan Geomatika <br></br>
                  w.windupranata@itb.ac.id<br></br>Kelompok Keahlian Hidrografi
                </h2>
              </div>
            </div>
            <Circle
              className="absolute w-[240px] h-[240px] left-79 -z-10 stroke-0"
              style={{ fill: "#3d82b0" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
