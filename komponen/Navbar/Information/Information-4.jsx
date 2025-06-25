import React from "react";
import { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

function Information4() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
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
          Metode Pengolahan
        </h1>
      </div>
      <div className="flex flex-col mx-[5vw] px-[2vw] py-[3vh] max-w-screen border-6 border-[#2fbaff] bg-white rounded-[10px] ">
        <h1 className="flex font-roboto font-semibold text-[18px]">
          Mengenal Metode Pengolahan yang Digunakan
        </h1>
        <a className="font-roboto text-justify mt-[1vh]">
          Model geoid adalah representasi matematis dari permukaan rata-rata air
          laut (mean sea level) yang diperpanjang ke daratan, dan digunakan
          secara luas sebagai acuan tinggi dalam berbagai aplikasi geospasial,
          mulai dari pemetaan topografi presisi, pemantauan perubahan muka air
          laut, hingga perencanaan infrastruktur. Untuk membangun model geoid,
          terdapat beberapa pendekatan yang umum digunakan dalam dunia geodesi
          dan geofisika, di antaranya adalah metode Remove-Compute-Restore
          (RCR), Least Squares Collocation (LSC), serta metode direct
          integration berbasis kernel Stokes atau Molodensky.
        </a>

        <br></br>

        <a className="font-roboto text-justify mt-[1vh]">
          Metode LSC mengandalkan teori statistik dan fungsi kovarians untuk
          menginterpolasi atau mengevaluasi nilai tinggi geoid dari titik
          pengamatan di sekitar, sangat cocok ketika distribusi data padat dan
          homogen. Sementara itu, metode direct integration biasanya digunakan
          pada skala regional hingga global, dengan menghitung konvolusi dari
          anomali gravitasi menggunakan fungsi Stokes, namun bisa cukup sensitif
          terhadap kualitas dan distribusi data. Di sisi lain, metode
          Remove-Compute-Restore (RCR) secara sistematis mengeliminasi komponen
          panjang gelombang (misalnya dari model global EGM2008 dan pengaruh
          topografi lokal melalui Residual Terrain Model/RTM), lalu menghitung
          konversi anomali gravitasi residu menjadi tinggi geoid menggunakan
          transformasi spektral (FFT), sebelum komponen yang dihilangkan
          dikembalikan untuk menghasilkan permukaan quasi-geoid utuh.
        </a>

        <br></br>

        <a className="font-roboto text-justify mt-[1vh]">
          Modul ini merupakan contoh tutorial lengkap pemodelan geoid lokal
          menggunakan metode RCR berbasis data gravitasi terestris, sebagaimana
          diterapkan di wilayah Semarang dan Yogyakarta. Seluruh tahapan teknis,
          mulai dari pengumpulan data gravitasi lapangan, integrasi dengan model
          global, pembuatan RTM, interpolasi spasial menggunakan kriging,
          transformasi frekuensi dengan FFT, hingga validasi dengan data
          GNSS/levelling, disajikan secara rinci dengan bantuan software QGIS,
          MATLAB, dan Gravsoft.
        </a>

        <br></br>

        <a className="font-roboto text-justify mt-[1vh]">
          Perlu digarisbawahi bahwa modul ini bukan representasi dari metode
          yang digunakan dalam model geoid utama yang kami sajikan di website
          ini. Model geoid aktual kami berasal dari pemrosesan data airborne
          gravity, yang memiliki karakteristik dan tantangan tersendiri. Data
          yang kami gunakan merupakan data gravity airborne sehingga diperlukan
          proses downward continuation untuk mentransformasikan data dari
          ketinggian terbang ke permukaan bumi, serta penerapan Gaussian filter
          untuk meredam noise frekuensi tinggi yang muncul akibat
          ketidakstabilan numerik dalam proses tersebut. Pendekatan ini sangat
          efektif untuk menghasilkan model geoid yang presisi dan luas
          cakupannya, terutama di wilayah dengan keterbatasan data terestris.
        </a>

        <br></br>

        <a className="font-roboto text-justify mt-[1vh]">
          Dengan demikian, meskipun isi modul ini menggunakan metode RCR dengan
          data darat sebagai ilustrasi pembelajaran, prinsip dan alur logika
          pengolahannya tetap relevan sebagai pengantar memahami proses
          pembentukan model geoid yang lebih kompleks berbasis data udara.
          Silakan unduh modul ini sebagai referensi awal sebelum mengeksplorasi
          hasil akhir model geoid kami yang telah diolah secara penuh
          dengan data airborne.
        </a>

        <br></br>
        <a
          href="http://167.205.195.168/downloads/modul_pemodelan_geoid.pdf"
          download="Modul-Pemodelan-Geoid.pdf"
          class="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Download Modul Pemodelan Geoid
        </a>
      </div>
    </div>
  );
}

export default Information4;
