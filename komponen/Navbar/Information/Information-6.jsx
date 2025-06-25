import React from "react";
import { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

function Information6() {
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
          Aplikasi Gayaberat
        </h1>
      </div>
      <div className="flex flex-col mx-[5vw] px-[2vw] py-[3vh] max-w-screen border-6 border-[#2fbaff] bg-white rounded-[10px] ">
        <h1 className="flex font-roboto font-semibold text-[18px]">
          Mengenal Aplikasi Data Gayaberat
        </h1>
        <p className="font-roboto text-justify mt-[1vh]">
          Data gayaberat sangat berguna dalam banyak aplikasi. Penentuan tinggi
          ortometrik membutuhkan model geoid yang diturunkan dari data gaya
          berat. Geoid adalah bidang ekuipotensial medan gayaberat yang
          membentuk muka air laut rata-rata sehingga perbedaan ketinggian antara
          ellipsoid (acuan GPS) dan geoid disebut undulasi geoid. Secara
          sederhana, hubungan antara ketinggian geodetik (GPS) (h), undulasi
          geoid (N), dan ketinggian ortometrik adalah h≈h-N. Dengan kata lain,
          data gayaberat dimanfaatkan untuk mengembangkan model geoid Indonesia
          seperti INAGEOID2020, yang berfungsi mengubah data GPS menjadi tinggi
          sebenarnya di atas permukaan daratan (Pahlevi dkk., 2024). Akses
          ketinggian ortometrik sangat penting untuk pemetaan geospasial,
          konstruksi infrastruktur, dan sistem referensi nasional (SRGI).
        </p>

        <br></br>
        <div className="flex flex-row w-full justify-center">
          <img
            src="/Information/Information6-1.png"
            alt=""
            className=" w-1/5 self-center "
          />
          <img
            src="/Information/Information6-2.png"
            alt=""
            className=" w-1/5 self-center "
          />
        </div>
        <h1 className="font-roboto text-[10px] font-semibold italic text-center my-[1vh] mb-[2vh]">
          Gambar Peta Bouguer gravity Hellenic subduction zone (densitas reduksi
          2,67 g/cm³, datum IGSN71). Warna terang menunjukkan anomali gravitasi
          tinggi, gelap menunjukkan rendah. Beberapa area seperti Anatolia dan
          pulau kecil tidak tercakup stasiun gravitasi (kiri); Penampang lintang
          gayaberat dan struktur densitas bawah permukaan di timur Pulau Kreta
          (kanan) (Sumber: Casten & Snopek, 2006)
        </h1>
        <br></br>

        <p className="font-roboto text-justify mt-[1vh]">
          Salah satu pemanfaatan penting data gayaberat adalah untuk mengenali
          struktur bawah permukaan. Variasi densitas batuan di dalam tanah akan
          memengaruhi medan gayaberat di permukaan. Struktur yang memiliki massa
          lebih besar, seperti kubah batuan padat atau cadangan mineral logam,
          akan menghasilkan anomali gayaberat positif. Sebaliknya, daerah yang
          lebih ringan seperti cekungan sedimen atau rongga bawah tanah
          cenderung menunjukkan anomali negatif. Para ahli geologi memanfaatkan
          peta anomali gayaberat untuk mengungkap formasi geologi tersembunyi
          dan mendeteksi keberadaan sumber daya alam, seperti misalnya minyak
          bumi dan mineral. Metode ini sangat umum digunakan dalam eksplorasi
          migas, batubara, logam, maupun panas bumi. Sebagai contoh, tim
          geosains Pertamina Geothermal Energy di lapangan panas bumi Kamojang
          memanfaatkan survei gayaberat untuk mengidentifikasi struktur bawah
          tanah dan mengurangi risiko eksplorasi. Mereka menyebut metode ini
          cukup efektif dalam pemetaan geothermal karena dapat membantu memantau
          perubahan massa bawah permukaan secara tidak langsung, sehingga
          eksplorasi menjadi lebih aman (antaranews.com).
        </p>

        <br></br>

        <p className="font-roboto text-justify mt-[1vh]">
          Selain untuk keperluan eksplorasi, data gayaberat juga memiliki peran
          krusial dalam pemetaan nasional dan upaya mitigasi bencana. Informasi
          nilai gayaberat digunakan dalam analisis gempa bumi dan pemahaman
          terhadap dinamika tektonik di wilayah Indonesia. Misalnya, distribusi
          anomali gayaberat dapat membantu mengidentifikasi potensi keberadaan
          patahan aktif atau cekungan tersembunyi yang menjadi zona rawan gempa
          (bmkg.go.id). Di sisi lain, data geoid yang dihasilkan dari pengukuran
          gayaberat turut mendukung perencanaan wilayah dan penanggulangan
          banjir karena memberikan informasi ketinggian yang lebih akurat
          dibanding sistem tradisional (Pahlevi dkk., 2024). Dengan kualitas
          data gayaberat yang semakin baik, para pengambil kebijakan dan
          instansi kebencanaan dapat memodelkan kondisi bawah permukaan dengan
          lebih akurat dan merancang strategi mitigasi yang lebih tepat sasaran.
        </p>

        <br></br>
      </div>
    </div>
  );
}

export default Information6;
