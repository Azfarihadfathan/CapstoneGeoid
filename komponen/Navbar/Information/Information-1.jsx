import React from "react";
import { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

function Information1() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tableData = [
    {
      aspek: "Cakupan Wilayah",
      global: "Seluruh wilayah permukaan bumi",
      lokal: "Wilayah tertentu, misalnya satu negara",
    },
    {
      aspek: "Data",
      global:
        "Data gayaberat global dari satelit dan data global yang resolusinya lebih rendah",
      lokal:
        "Data gayaberat lokal yang diperoleh dari survei terestris, airborne, dan data ketinggian resolusi tinggi",
    },
    {
      aspek: "Resolusi dan Akurasi",
      global:
        "Resolusi lebih rendah dan kurang akurat untuk detail pada wilayah tertentu karena keterbatasan data dan cakupan wilayah yang sangat luas",
      lokal:
        "Resolusi lebih tinggi dan akurasi lebih baik karena terdapat lebih banyak data untuk pemodelan di wilayah yang lebih detail",
    },
    {
      aspek: "Metode",
      global:
        "Menggunakan model harmonik bola global dan metode matematis global",
      lokal: (
        // Menggunakan JSX untuk teks dengan format khusus
        <>
          Menggunakan metode kombinasi serta teknik seperti{" "}
          <i>Remove-Compute-Restore</i> (RCR) dan{" "}
          <i>Fast Fourier Transformation</i> (FFT) dengan menyesuaikan kondisi
          wilayah lokal
        </>
      ),
    },
    {
      aspek: "Tujuan Penggunaan",
      global:
        "Referensi tinggi vertikal secara global dan dasar pembuatan model geoid lokal",
      lokal:
        "Survei dan pemetaan, serta pembangunan infrastruktur yang memerlukan ketelitian tinggi",
    },
    {
      aspek: "Contoh",
      global: "EGM2008",
      lokal: "INAGEOID2020 versi 2.0",
    },
  ];

  const tableData2 = [
    { pulau: "Sumatra", validasi: "xxx", std: " 0.260" },
    { pulau: "Jawa", validasi: "xxx", std: "0.099" },
    { pulau: "Sulawesi", validasi: "xxx", std: "0.098" },
    { pulau: "Kalimantan", validasi: "xxx", std: "0.062" },
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
          Geoid, Datum, Vertikal Stabil
        </h1>
      </div>
      <div className="flex flex-col mx-[5vw] px-[2vw] py-[3vh] max-w-screen border-6 border-[#2fbaff] bg-white rounded-[10px] ">
        <h1 className="flex font-roboto font-semibold text-[18px]">
          Apa itu Geoid?
        </h1>
        <a className="font-roboto text-justify mt-[1vh]">
          Geoid merupakan bidang ekuipotensial medan gayaberat bumi yang
          berimpit dengan permukaan laut rata-rata global yang tidak terganggu
          oleh fenomena dinamika air laut. Geoid merupakan model bumi yang
          paling mendekati bentuk bumi yang sebenarnya. Model geoid dapat
          terbentuk karena adanya variasi gayaberat bumi sehingga untuk
          menghasilkan model geoid yang ideal dibutuhkan data gayaberat yang
          andal.
        </a>
        <br></br>
        <img
          src="/Information/Information1.png"
          alt=""
          className=" w-2/5 self-center "
        />
        <h1 className="font-roboto text-[10px] font-semibold italic text-center my-[1vh] mb-[2vh]">
          Gambar Ilustrasi Undulasi Geoid, Tinggi Ortometrik, dan Tinggi
          Ellipsoid (sumber: esri)
        </h1>
        <a className="font-roboto text-justify mt-[1vh]">
          Model geoid digunakan sebagai acuan untuk menentukan tinggi
          ortometrik. Penentuan tinggi ortometrik ini dapat dilakukan
          menggunakan perhitungan matematis undulasi geoid. Undulasi geoid
          merupakan selisih jarak vertikal antara permukaan geoid dengan
          permukaan ellipsoid referensi di suatu titik tertentu di bumi. Berikut
          merupakan persamaan matematis undulasi geoid.
        </a>
        <div className="my-[2vh] text-center">
          <InlineMath math={"N=H-h"} />
        </div>
        <a className="font-roboto">Di mana,</a>

        <div className="flex">
          <InlineMath math={"H"} />
          <a className="font-roboto"> : tinggi ortometrik</a>
        </div>

        <div className="flex">
          <InlineMath math={"h"} />
          <a className="font-roboto">: tinggi ellipsoid</a>
        </div>

        <h1 className="flex font-roboto font-semibold text-[18px] mt-[5vh]">
          Mengapa geoid penting?
        </h1>
        <a className="font-roboto text-justify mt-[1vh]">
          Model geoid dibutuhkan untuk mengetahui tinggi ortometrik suatu tempat
          secara fisik dan akurat. Tinggi ortometrik ini dapat digunakan dalam
          berbagai aplikasi survei dan pemetaan, serta pembangunan
          infrastruktur. Model geoid juga dapat menjadi penghubung antara data
          pengukuran menggunakan GNSS dan data yang sebenarnya di lapangan
          karena data pengukuran tinggi yang didapatkan menggunakan GNSS
          merupakan tinggi yang relatif terhadap ellipsoid sehingga tinggi GNSS
          dapat dikoreksi agar menghasilkan nilai tinggi ortometrik yang
          sebenarnya. Selain itu, model geoid juga dapat dijadikan standar
          tinggi nasional. Di Indonesia, acuan sistem tinggi geoid lokal adalah
          INAGEOID2020 versi 2.0.
        </a>

        <h1 className="flex font-roboto font-semibold text-[18px] mt-[5vh]">
          Model Geoid
        </h1>
        <a className="font-roboto text-justify mt-[1vh]">
          Model geoid dapat dikategorikan ke dalam dua jenis yaitu global dan
          lokal. Berikut merupakan perbedaan dari model geoid global dan lokal.
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
                      Global
                    </th>
                    <th scope="col" className="px-6 py-3 font-bold">
                      Lokal
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
                      <td className="px-6 py-4 align-top">{row.global}</td>
                      <td className="px-6 py-4 align-top">{row.lokal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <h1 className="flex font-roboto font-semibold text-[18px] mt-[5vh]">
          Ketelitian Geoid Versi Geoid-on-Dashboard
        </h1>
        <a className="font-roboto text-justify mt-[1vh]">
          Hasil pemodelan geoid versi Geoid-on-Dashboard secara keseluruhan
          memiliki ketelitian yang paling baik pada metode 1D Spherical FFT.
          Ketelitian model geoid di setiap pulau tertera pada tabel berikut.
        </a>

        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-xl overflow-hidden">
            {/* Wrapper untuk tabel agar responsif dengan scroll horizontal */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-bold w-1/4">
                      Pulau
                    </th>
                    <th scope="col" className="px-6 py-3 font-bold">
                      Jumlah Titik Validasi
                    </th>
                    <th scope="col" className="px-6 py-3 font-bold">
                      Standar Deviasi (meter)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapping data dari array ke dalam baris tabel */}
                  {tableData2.map((row, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      {/* Kolom Aspek dibuat tebal untuk penekanan */}
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 align-top"
                      >
                        {row.pulau}
                      </th>
                      <td className="px-6 py-4 align-top">{row.validasi}</td>
                      <td className="px-6 py-4 align-top">{row.std}</td>
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

export default Information1;
