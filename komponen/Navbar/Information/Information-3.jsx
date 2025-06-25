import React from "react";
import { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

function Information3() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const descriptions = [
    {
      symbol: "\\Delta g_{FA}",
      text: (
        <>
          : <i>free-air anomaly</i> (mGal)
        </>
      ),
    },
    {
      symbol: "g_{obs}",
      text: ": Gayaberat observasi (mGal)",
    },
    {
      symbol: "\\gamma",
      text: ": Gayaberat teoritis di permukaan elipsoid (mGal)",
    },
    {
      symbol: "FAC",
      text: (
        <>
          : <i>free-air correction</i> (mGal)
        </>
      ),
    },
    {
      symbol: "H",
      text: ": Tinggi Ortometrik (di atas permukaan geoid) (m)",
    },
  ];

  const descriptions2 = [
    {
      symbol: "\\Delta g_{BA}",
      text: (
        <>
          : <i>bouguer anomaly</i> (mGal)
        </>
      ),
    },
    {
      symbol: "\\Delta g_{FA}",
      text: (
        <>
          : <i>free-air anomaly</i> (mGal)
        </>
      ),
    },
    {
      symbol: "SBC",
      text: (
        <>
          : <i>simple bouguer correction</i> (<InlineMath math="\text{m/s}^2" />{" "}
          atau di kali <InlineMath math="10^5" /> menjadi mGal)
        </>
      ),
    },
    {
      symbol: "\\rho",
      text: (
        <>
          : densitas kerak bumi (2,67 <InlineMath math="\text{kg/m}^3" />)
        </>
      ),
    },
    {
      symbol: "G",
      text: (
        <>
          : konstanta gayaberat universal (
          <InlineMath math="6,6743 \times 10^{-11} \text{ m}^3\text{/kg} \cdot \text{s}^2" />
          )
        </>
      ),
    },
    {
      symbol: "H",
      text: ": Tinggi Ortometrik (di atas permukaan geoid) (m)",
    },
  ];

  return (
    <div className="max-w-screen overflow-x-hidden p-6 rounded-[20px] space-y-2">
      <div
        className={`p-6 overflow-hidden rounded-[20px] bg-gradient-to-r from-cyan-600 via-cyan-200 to-white 
      transform transition-all duration-1000 ease-out
      ${visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
      >
        {" "}
        <h1 className="font-roboto font-bold text-white text-outline drop-shadow-[1px_1px_0_black] tracking-widest">
          Free Air Anomaly & Bouguer Anomaly
        </h1>
      </div>
      <div className="flex flex-col mx-[5vw] px-[2vw] py-[3vh] max-w-screen border-6 border-[#2fbaff] bg-white rounded-[10px] ">
        <h1 className="flex font-roboto font-semibold text-[18px]">
          Apa itu Free Air Anomaly?
        </h1>
        <a className="font-roboto text-justify mt-[1vh]">
          Free-Air Anomaly (FAA) merupakan perbedaan antara nilai gravitasi
          observasi di suatu titik dengan gravitasi normal yang dihitung pada
          permukaan referensi elipsoid, pada prosesnya dilakukan koreksi elevasi
          tanpa memperhitungkan massa antara titik tersebut dan permukaan laut
          atau bidang geoid. Koreksi ini diasumsikan seolah pengukuran dilakukan
          di kondisi “free air” atau “udara bebas”, sehingga banyak digunakan
          studi variasi regional distribusi massa mantel bumi dan keadaan
          isostasi (Haxby & Turcotte, 1978). Berikut ini merupakan formula dalam
          menghitung free air anomaly.
        </a>

        <div className="my-[2vh] text-center">
          <BlockMath
            math={String.raw`\Delta g_{FA} = g_{obs} - \gamma + FAC`}
          />
        </div>
        <a className="font-roboto">Dengan</a>

        <div className="my-[2vh] text-center">
          <BlockMath
            math={String.raw`FAC = 0,3086 \left(\frac{\text{mGal}}{\text{m}}\right) H(\text{m})`}
          />
        </div>

        <a className="font-roboto">Di mana,</a>
        <div className="space-y-3 text-base">
          {descriptions.map((item, index) => (
            <div key={index} className="flex items-start">
              {/* Kolom Simbol dengan lebar tetap untuk perataan */}
              <div className="w-32 flex-shrink-0">
                <InlineMath math={item.symbol} />
              </div>
              {/* Kolom Teks Keterangan */}
              <div className="font-roboto">{item.text}</div>
            </div>
          ))}
        </div>

        <br></br>
        <h1 className="flex font-roboto font-semibold text-[18px] mt-[5vh]">
          Apa itu Bouguer Anomaly?
        </h1>
        <a className="font-roboto text-justify mt-[1vh]">
          Bouguer anomaly yang digunakan pada project ini adalah simple bouguer
          anomaly. Simple Bouguer Anomaly merupakan tahap lanjutan setelah FAA
          dengan tambahan koreksi massa batuan di bawah titik pengukuran ke
          bidang geoid, yang dianggap sebagai pelat horizontal homogen dengan
          densitas sekitar 2,670 kg/m³. Melalui perhitungan ini dapat memberikan
          pendekatan terhadap distribusi massa dangkal, sehingga metode
          perhitungan ini cocok untuk tahap awal survei geologi dan eksplorasi
          karena cukup sensitif terhadap perbedaan lapisan bawah permukaan
          (Hinze et al., 2013). Berikut ini merupakan formula dalam menghitung
          free air anomaly.
        </a>

        <div className="my-[2vh] text-center">
          <BlockMath math={String.raw`\Delta g_{BA} = \Delta g_{FA} - SBC`} />
        </div>
        <a className="font-roboto">Dengan</a>

        <div className="my-[2vh] text-center">
          <BlockMath math={String.raw`SBC = 2\pi\rho GH`} />
        </div>

        <a className="font-roboto">Di mana,</a>
        <div className="space-y-3 text-base">
          {descriptions2.map((item, index) => (
            <div key={index} className="flex items-start">
              {/* Kolom Simbol dengan lebar tetap untuk perataan */}
              <div className="w-32 flex-shrink-0">
                <InlineMath math={item.symbol} />
              </div>
              {/* Kolom Teks Keterangan */}
              <div className="font-roboto">{item.text}</div>
            </div>
          ))}
        </div>

        <h1 className="flex font-roboto font-semibold text-[18px] mt-[5vh]">
          Apa itu Residual Terrain Model
        </h1>
        <a className="font-roboto text-justify mt-[1vh]">
          Residual Terrain Model (RTM) menjadi komponen dalam menghitung
          gayaberat frekuensi tinggi, yaitu dengan membandingkan model topografi
          resolusi tinggi (SRTM 3-arc second) dan model yang lebih halus atau
          resolusinya lebih rendah (SRTM 15 arc second). Perbedaan keduanya
          diubah menjadi distribusi massa prismatik dan dihitung kontribusi
          gayaberatnya melalui pendekatan numerik. Melalui metode ini diupayakan
          untuk mengatasi keterbatasan model global dalam menghasilkan relief
          lokal dan menghindari kesalahan spektral, sehingga memungkinkan
          pemodelan medan gravitasi dan geoid dengan akurasi lebih tinggi (Hirt
          et al., 2019). Melalui perbedaan antara model topografi resolusi
          tinggi dan model topografi resolusi rendah diturunkan menjadi anomali
          gayaberat dan anomali tinggi menggunakan perangkat lunak MATLAB TGF
          (Terrain Gravity Field).
        </a>
      </div>
    </div>
  );
}

export default Information3;
