import React from "react";
import { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

function Information2() {
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
          Alat Ukur Gayaberat
        </h1>
      </div>
      <div className="flex flex-col mx-[5vw] px-[2vw] py-[3vh] max-w-screen border-6 border-[#2fbaff] bg-white rounded-[10px] ">
        <h1 className="flex font-roboto font-semibold text-[18px]">
          Mengenal Alat Ukur Gayaberat
        </h1>
        <p className="font-roboto text-justify mt-[1vh]">
          Menurut Kamus Besar Bahasa Indonesia (KBBI), gayaberat adalah gaya
          tarik bumi atau gravitasi yang menarik semua benda menuju pusat bumi.
          Istilah ini juga digunakan untuk menyatakan berat suatu benda, yaitu
          hasil dari gaya gravitasi yang bekerja pada massa benda tersebut.
          Untuk mengukurnya, secara sederhana kita bisa menggunakan neraca pegas
          (dinamometer) seperti timbangan, di mana massa yang digantung membuat
          pegas memanjang sesuai beratnya. Namun, untuk keperluan geodesi dan
          geologi yang sangat presisi, digunakan alat khusus bernama gravimeter.
          Gravimeter adalah alat yang sangat sensitif untuk mengukur percepatan
          gayaberat bumi, dengan ketelitian bisa mencapai perbedaan &lt;0,01
          mGal. Prinsip dasar gravimeter mirip neraca pegas, yakni massa kecil
          digantung pada pegas, dan perubahan panjang pegas diukur bila nilai
          percepatan gayaberat berubah (Reza dkk., 2021).
        </p>

        <br></br>

        <p className="font-roboto text-justify mt-[1vh]">
          Jenis-jenis utama gravimeter dibagi menjadi absolut dan relatif.
          Gravimeter absolut mengukur langsung percepatan gayaberat di suatu
          titik dengan metode fisik seperti benda jatuh bebas atau pendulum
          (Hartanto dkk., 2019). Contohnya, instrumen modern seperti Micro-g
          Lacoste A-10 atau FG5 menjatuhkan massa uji dalam ruang hampa dan
          mengukur posisinya dengan laser/interferometer. Dengan cara ini,
          diperoleh nilai gayaberat absolut di titik pengamatan. Sebaliknya,
          gravimeter relatif hanya mengukur selisih gayaberat antar dua titik
          dengan menggunakan acuan (base point) yang sudah diketahui gaya
          beratnya (Hartanto dkk., 2019). Gravimeter relatif klasik (misalnya
          Lacoste & Romberg atau Scintrex CG-5) bekerja seperti neraca pegas
          ultra-sensitif, di mana pegas akan mengembang atau mengerut saat
          digerakkan ke lokasi baru, dan perbedaan pembacaan dibanding titik
          referensi menunjukkan anomali gayaberat.
        </p>

        <br></br>
        <div className="flex flex-row w-full justify-center">
          <img
            src="/Information/Information2-1.png"
            alt=""
            className=" w-1/5 self-center "
          />
          <img
            src="/Information/Information2-2.png"
            alt=""
            className=" w-1/5 self-center "
          />
          <img
            src="/Information/Information2-3.png"
            alt=""
            className=" w-1/5 self-center "
          />
        </div>
        <h1 className="font-roboto text-[10px] font-semibold italic text-center my-[1vh] mb-[2vh]">
          Gambar Gravimeter Micro-g LaCoste A-10 (sumber: microglacoste.com)
          (kiri); Gravimeter Micro-g LaCoste FG5-X (sumber: microglacoste.com)
          (tengah); Gravimeter Scintrex CG-5 (sumber: agtsys.ru) (kanan)
        </h1>
        <br></br>

        <p className="font-roboto text-justify mt-[1vh]">
          Beberapa contoh alat pengukur gayaberat (gravimeter) antara lain
          adalah dinamometer sederhana yang biasa digunakan untuk keperluan
          non-ilmiah, gravimeter relatif berbasis pegas seperti Scintrex CG-5
          yang umum dipakai dalam survei lapangan, serta gravimeter absolut
          portabel seperti A-10 yang memiliki keunggulan dalam hal bobot yang
          ringan dan tingkat akurasi yang tinggi. Teknologi terbaru kini antara
          lain gravimeter kuantum (menggunakan atom ultra-dingin) dan satelit
          pengukur gayaberat (misalnya misi GRACE/GOCE) yang memetakan medan
          gayaberat bumi secara global. Sebagai contoh, Absolute Quantum
          Gravimeter (AQG) memanfaatkan jatuhan atom terperangkap dan laser
          untuk mengukur gayaberat dengan akurasi sangat tinggi (sekitar 1
          μGal).
        </p>

        <br></br>

        <p className="font-roboto text-justify mt-[1vh]">
          Di Indonesia, beberapa lembaga resmi menyediakan data gayaberat. Badan
          Informasi Geospasial (BIG) mengelola Jaring Kontrol Geodesi (JKG) yang
          mencakup titik-titik pengukuran gayaberat nasional. Pada tahun 2017,
          BIG melakukan pengukuran gayaberat absolut di beberapa pilar utama
          (contohnya di Jakarta dan Makassar) menggunakan gravimeter A-10.
          Sementara itu, BMKG juga menyelenggarakan jaringan titik dasar
          gayaberat; per 2024 BMKG memiliki 142 lokasi titik dasar gayaberat di
          seluruh Indonesia. Data geoid nasional (INAGEOID2020) yang digunakan
          untuk konversi ketinggian pun dihasilkan dari kompilasi data gayaberat
          serta data satelit (Pahlevi dkk., 2024). Semua instansi ini diminta
          saling berbagi data melalui Konsorsium gayaberat Indonesia (KGI) agar
          pemanfaatan data gayaberat dapat luas dan efisien. Secara umum, data
          gayaberat diakses melalui situs resmi BIG/BMKG atau portal data
          geospasial nasional yang menyediakan model geoid dan peta gaya berat
          regional.
        </p>
      </div>
    </div>
  );
}

export default Information2;
