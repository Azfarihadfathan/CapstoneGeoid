import React from "react";
import { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

function Information5() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tableData = [
    {
      aspek: "Definisi",
      geoid: "Model matematis ekuipotensial",
      msl: "Hasil pengukuran empiris",
    },
    {
      aspek: "Sifat",
      geoid: "Permukaan teoritis berbasis gayaberat",
      msl: "Rata-rata statistik pengamatan fisik permukaan laut",
    },
    {
      aspek: "Fungsi dan Penggunaan",
      geoid: "Referensi untuk menentukan tinggi ortometrik",
      msl: "Acuan praktis untuk pengukuran tinggi permukaan laut",
    },
    {
      aspek: "Pengaruh",
      geoid: "Tidak dipengaruhi dinamika laut",
      msl: "Dipengaruhi oleh dinamika laut",
    },
  ];

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
          Geoid vs MSL
        </h1>
      </div>
      <div className="flex flex-col mx-[5vw] px-[2vw] py-[3vh] max-w-screen border-6 border-[#2fbaff] bg-white rounded-[10px] ">
        <h1 className="flex font-roboto font-semibold text-[18px]">
          Definisi Geoid dan MSL
        </h1>
        <a className="font-roboto text-justify mt-[1vh]">
          Geoid merupakan bidang ekuipotensial gayaberat yang berimpit dengan
          permukaan laut rata-rata yang tidak terganggu dengan fenomena dinamika
          laut. Sedangkan, Mean Sea Level (MSL) merupakan rata-rata tinggi
          permukaan laut yang diukur selama 18,6 tahun dan digunakan sebagai
          referensi pengukuran ketinggian vertikal. Penentuan MSL diukur selama
          rentang waktu 18,6 tahun karena banyak faktor yang memengaruhi
          dinamika laut, seperti pasang surut, angin, suhu, dan sebagainya.
        </a>

        <h1 className="flex font-roboto font-semibold text-[18px] mt-[5vh]">
          Perbandingan Geoid dan MSL
        </h1>
        <a className="font-roboto text-justify mt-[1vh]">
          Geoid dan Mean Sea Level (MSL) saling terkait karena pembuatan model
          geoid dilakukan untuk mendekati nilai MSL yang ideal. Keduanya dapat
          digunakan sebagai datum vertikal dalam bidang geodesi. Geoid merupakan
          datum vertikal referensi yang digunakan di Indonesia, sedangkan MSL
          merupakan datum vertikal praktis yang digunakan untuk pemetaan,
          navigasi, pelayaran, dan lain sebagainya.
        </a>
        <br></br>

        <a className="font-roboto text-justify mt-[1vh]">
          Meskipun keduanya cukup serupa, geoid dan MSL tetap memiliki
          perbedaan. Berikut merupakan perbedaan antara geoid dan MSL.{" "}
        </a>

        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-xl overflow-hidden">
            {/* Wrapper untuk tabel agar responsif dengan scroll horizontal */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-bold w-1/4">
                      Aspek
                    </th>
                    <th scope="col" className="px-6 py-3 font-bold">
                      Geoid
                    </th>
                    <th scope="col" className="px-6 py-3 font-bold">
                      Mean Sea Level (MSL)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapping data dari array ke dalam baris tabel */}
                  {tableData.map((row, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      {/* Kolom Aspek dibuat tebal untuk penekanan */}
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 align-top"
                      >
                        {row.aspek}
                      </th>
                      <td className="px-6 py-4 align-top">{row.geoid}</td>
                      <td className="px-6 py-4 align-top">{row.msl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information5;
