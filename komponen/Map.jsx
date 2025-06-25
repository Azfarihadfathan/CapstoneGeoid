import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
window.L = L;

import axios from "axios";
import * as turf from "@turf/turf";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import shp from "shpjs";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { auth, db } from "../util/config";
import { ref, get } from "firebase/database";
import wellknown from "wellknown";

const MapComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const [downloadUrl, setDownloadUrl] = useState("");
  const [geoJsonData, setGeoJsonData] = useState({});
  const [inputKoordinatTitik, setinputKoordinatTitik] = useState([
    { x: "", y: "" },
  ]);
  const [selectedPulau, setSelectedPulau] = useState("Jawa");
  const [selectedData, setSelectedData] = useState("Geoid");

  const [geoJsonDataUpload, setGeoJsonDataUpload] = useState(null);

  const [inputTitik, setInputTitik] = useState([1]);

  const [showDropDownTitik, setshowDropDownTitik] = useState(false);
  const [showDropDownTitikFile, setshowDropDownTitikFile] = useState(false);

  const [showDropDownArea, setshowDropDownArea] = useState(false);
  const [showDropDownAreaFile, setshowDropDownAreaFile] = useState(false);

  const [activeDownloadSource, setActiveDownloadSource] = useState(null);
  const [downloadText, setDownloadText] = useState("");
  const [polygonFileName, setPolygonFileName] = useState("");
  const [excelFileName, setExcelFileName] = useState("");
  const geoJsonLayerRef = useRef(null);
  const drawnItemsRef = useRef();

  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isSubscribed, setIsSubscribed] = useState(false);
  // Set Pulau di Map
  const mapSettings = {
    Jawa: {
      center: [-7, 109], // Titik tengah awal (misalnya di Jawa Tengah)
      zoom: 7.2, // Level zoom awal
      minZoom: 7.2,
      maxBounds: [
        [-11, 103], // Sudut barat daya (latitude, longitude)
        [-3.5, 117], // Sudut timur laut (latitude, longitude)
      ],
    },
    Sumatra: {
      center: [0, 101],
      maxBounds: [
        [-6.5, 90],
        [6.5, 111],
      ],
      zoom: 6.3, // Level zoom awal
      minZoom: 6.3,
    },
    Kalimantan: {
      center: [2, 114],
      maxBounds: [
        [-4.5, 108],
        [7.5, 120],
      ],
      zoom: 6.4, // Level zoom awal
      minZoom: 6.4,
    },
    Sulawesi: {
      center: [-2, 121],
      maxBounds: [
        [-7, 117],
        [4, 127],
      ],
      zoom: 6.9, // Level zoom awal
      minZoom: 6.9,
    },
  };

  const tabs = ["Geoid", "Free Air Anomaly", "Bouguer Anomaly"];

  const layerCodeMap = {
    Geoid: "Geoid",
    "Free Air Anomaly": "FAA",
    "Bouguer Anomaly": "BA",
  };

  const labelLegend = {
    Geoid: "Undulation(m)",
    "Free Air Anomaly": "FAA(mgal)",
    "Bouguer Anomaly": "BA(mGal)",
  };

  const lowerBBox = {
    Jawa: "103.0 -11.0",
    Sumatra: "94.0 -6.5",
    Kalimantan: "108.0 -4.5",
    Sulawesi: "117.0 -7.0",
  };

  const upperBBox = {
    Jawa: "117.0 -3.5",
    Sumatra: "107.0 6.5",
    Kalimantan: "120 7.5",
    Sulawesi: "127.0 4.0",
  };

  const getLayerName = (data, pulau) => {
    const dataCode = layerCodeMap[data];

    return `Capstone:${dataCode}_${pulau}_Hillshade,${dataCode}_${pulau}`;
  };

  const getLayerNameSingle = (data, pulau) => {
    const dataCode = layerCodeMap[data];

    return `Capstone:${dataCode}_${pulau}`;
  };

  // Cek apakah objek kosong
  const isEmptyObject = (obj) =>
    obj && typeof obj === "object" && Object.keys(obj).length === 0;

  // Ambil semua fitur dalam bentuk array
  const extractFeatures = (geoJson) => {
    if (!geoJson) return [];
    if (geoJson.type === "Feature") return [geoJson];
    if (geoJson.type === "FeatureCollection") return geoJson.features || [];
    return [];
  };

  // Cek jika semua fitur adalah polygon/multipolygon
  const isPolygon = (geoJson) => {
    const features = extractFeatures(geoJson);
    return (
      features.length > 0 &&
      features.every(
        (f) =>
          f.geometry?.type === "Polygon" || f.geometry?.type === "MultiPolygon"
      )
    );
  };

  // Cek jika semua fitur adalah titik
  const isPoint = (geoJson) => {
    const features = extractFeatures(geoJson);
    return (
      features.length > 0 && features.every((f) => f.geometry?.type === "Point")
    );
  };

  function toggleDropDownTitik() {
    setshowDropDownTitik(!showDropDownTitik);
    setshowDropDownTitikFile(false);
    setshowDropDownArea(false);
    setshowDropDownAreaFile(false);
  }

  function toggleDropDownTitikFile() {
    setshowDropDownTitik(false);
    setshowDropDownTitikFile(!showDropDownTitikFile);
    setshowDropDownArea(false);
    setshowDropDownAreaFile(false);
  }

  function toggleDropDownArea() {
    setshowDropDownTitik(false);
    setshowDropDownTitikFile(false);
    setshowDropDownArea(!showDropDownArea);
    setshowDropDownAreaFile(false);
  }

  function toggleDropDownAreaFile() {
    setshowDropDownTitik(false);
    setshowDropDownTitikFile(false);
    setshowDropDownArea(false);
    setshowDropDownAreaFile(!showDropDownAreaFile);
  }

  function inputTitikMax() {
    if (inputTitik.length == 10) return true;
    else if (inputTitik.length != 10) return false;
  }

  function inputTitikHandler() {
    setInputTitik((prev) => {
      const nextValue = prev.length + 1;
      return [...prev, nextValue];
    });
  }

  const clipRasterWithGeoJSON = async () => {
    const layerNameSingle = getLayerNameSingle(selectedData, selectedPulau);

    let geom = null;
    geom =
      geoJsonData.type === "FeatureCollection"
        ? geoJsonData.features[0].geometry
        : geoJsonData.geometry ?? geoJsonData;

    const wktString = wellknown.stringify(geom);
    if (wktString) {
      const wpsRequest = `
    <wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>ras:CropCoverage</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>coverage</ows:Identifier>
      <wps:Reference mimeType="image/tiff" xlink:href="http://geoserver/wcs" method="POST">
        <wps:Body>
          <wcs:GetCoverage service="WCS" version="1.1.1">
            <ows:Identifier>${layerNameSingle}</ows:Identifier>
            <wcs:DomainSubset>
              <ows:BoundingBox crs="http://www.opengis.net/gml/srs/epsg.xml#4326">
                <ows:LowerCorner>${lowerBBox[selectedPulau]}</ows:LowerCorner>
                <ows:UpperCorner>${upperBBox[selectedPulau]}</ows:UpperCorner>
              </ows:BoundingBox>
            </wcs:DomainSubset>
            <wcs:Output format="image/tiff"/>
          </wcs:GetCoverage>
        </wps:Body>
      </wps:Reference>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>cropShape</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="application/wkt">
        <![CDATA[${wktString}]]>
      </wps:ComplexData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="application/arcgrid">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>
`;
      try {
        setIsGenerating(true);
        const response = await axios.post(
          "http://167.205.195.168/geoserver/ows?",
          wpsRequest,
          {
            headers: {
              "Content-Type": "application/xml",
            },
            responseType: "blob", // Agar hasilnya bisa di-download
          }
        );

        // Buat URL untuk download hasil raster
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "image/geotiff" })
        );
        const blob = new Blob([response.data], { type: "application/xml" });

        blob.text().then((text) => {
          console.log("Isi Blob:", text);
        });
        console.log(response.data);
        setDownloadUrl(url);
      } catch (error) {
        console.error("Gagal mengekstrak raster:", error);
      }
      console.log(JSON.stringify(geoJsonData));
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const { center, maxBounds, zoom } = mapSettings[selectedPulau];
      const map = L.map(mapRef.current, {
        center,
        zoom,
        minZoom: zoom,
        maxBounds,
        maxBoundsViscosity: 1.0,
      });

      window.L = L; // dibutuhkan plugin lama

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      mapInstanceRef.current = map;
      map.zoomControl.setPosition("topright");

      const baseMap = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "&copy; OpenStreetMap contributors",
        }
      ).addTo(map);

      const layerName = getLayerName(selectedData, selectedPulau);
      const geoidJawaHillshadeLayer = L.tileLayer.wms(
        "http://167.205.195.168/geoserver/Capstone/wms",
        {
          format: "image/png",
          layers: layerName,
          transparent: true,
        }
      );

      // GridLayer
      L.GridLayer.CustomGrid = L.GridLayer.extend({
        createTile: function (coords) {
          const tile = document.createElement("div");
          tile.style.width = this.getTileSize().x + "px";
          tile.style.height = this.getTileSize().y + "px";
          tile.style.opacity = "0.5";
          tile.style.border = "1px solid white";
          return tile;
        },
      });

      const customGrid = new L.GridLayer.CustomGrid();

      geoidJawaHillshadeLayer.addTo(map);
      customGrid.addTo(map);
      L.control.scale().addTo(map);

      const coordControl = L.control({ position: "bottomright" });
      coordControl.onAdd = function () {
        this._div = L.DomUtil.create(
          "div",
          "bg-black/70 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md min-w-[180px] text-center"
        );
        this._div.innerHTML =
          "<span className='font-mono tracking-wide'>Koordinat: -</span>";
        return this._div;
      };
      coordControl.addTo(map);

      map.on("mousemove", (e) => {
        coordControl._div.innerHTML = `<span className='font-mono tracking-wide'>Koordinat: ${e.latlng.lat.toFixed(
          5
        )}, ${e.latlng.lng.toFixed(5)}</span>`;
      });

      // 🔥 IMPORT DINAMIS plugin-plugin lama
      // 🔥 IMPORT DINAMIS plugin-plugin lama
      await Promise.all([
        import("leaflet/dist/leaflet.css"),
        import("leaflet-control-geocoder/dist/Control.Geocoder.css"),
        import("leaflet-draw/dist/leaflet.draw-src.css"),
        import("leaflet-draw"),
        import("leaflet-control-geocoder"),
      ]);

      L.Control.geocoder().addTo(map);
      // Toolbar gambar
      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
      drawnItemsRef.current = drawnItems;

      const drawControl = new L.Control.Draw({
        position: "topright",
        draw: {
          polyline: false,
          circlemarker: false,
          rectangle: false,
          circle: false,
        },
        edit: {
          featureGroup: drawnItems,
        },
      });

      map.addControl(drawControl);

      map.on("draw:created", (e) => {
        const layer = e.layer;
        drawnItems.addLayer(layer);
        setGeoJsonData(layer.toGeoJSON());
        setExcelFileName("");
        setPolygonFileName("");
      });

      map.on("draw:edited", (e) => {
        const updated = [];
        e.layers.eachLayer((layer) => updated.push(layer.toGeoJSON()));
        setGeoJsonData({ type: "FeatureCollection", features: updated });
        setExcelFileName("");
        setPolygonFileName("");
      });

      map.on("draw:deleted", () => {
        const remaining = [];
        drawnItems.eachLayer((layer) => remaining.push(layer.toGeoJSON()));
        setGeoJsonData({ type: "FeatureCollection", features: remaining });
        setExcelFileName("");
        setPolygonFileName("");
        setDownloadText(null);
      });

      // Layer control
      L.control
        .layers(
          { "Open Street Map": baseMap },
          { [selectedData + " " + selectedPulau]: geoidJawaHillshadeLayer },
          { collapse: false }
        )
        .addTo(map);

      // Legend
      const legend = L.control({ position: "topright" });
      const layerNameSingle = getLayerNameSingle(selectedData, selectedPulau);
      const labelText = labelLegend[selectedData];

      legend.onAdd = function () {
        const div = L.DomUtil.create(
          "div",
          "bg-white/80 border border-gray-300 rounded-lg p-2 shadow-md"
        );
        div.innerHTML = `
          <div className="text-sm text-gray-700 font-medium">
            <strong>${labelText}</strong>
            <img className="w-full h-auto mt-2" src="http://167.205.195.168/geoserver/Capstone/wms?REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=${layerNameSingle}" alt="Legend">
          </div>`;
        return div;
      };

      legend.addTo(map);
    };

    initMap();
  }, [selectedPulau, selectedData, loading]);

  useEffect(() => {
    const geoJsonDataCheck = (obj) => {
      return obj && Object.keys(obj).length > 0 && obj.constructor === Object;
    };

    if (geoJsonDataCheck(geoJsonData) && drawnItemsRef.current) {
      const drawnItems = drawnItemsRef.current;
      drawnItems.clearLayers(); // bersihkan layer sebelumnya

      let geoJsonLayer = null;

      if (geoJsonData.type === "Feature") {
        geoJsonLayer = L.geoJSON(geoJsonData).eachLayer((layer) => {
          drawnItems.addLayer(layer);
        });
      } else {
        geoJsonLayer = L.geoJSON(geoJsonData, {
          onEachFeature: function (feature, layer) {
            drawnItems.addLayer(layer);
          },
        });
      }

      if (drawnItems.getLayers().length > 0) {
        mapInstanceRef.current.fitBounds(drawnItems.getBounds());
      }
    }

    console.log(geoJsonData);
  }, [geoJsonData]);

  const handleFileUpload = (e) => {
    setActiveDownloadSource(null);
    const file = e.target.files[0];

    if (!file) return; // Tidak ada file diupload
    if (file) {
      setPolygonFileName(file.name); // Simpan nama file di state
      setExcelFileName("");
    }

    const allowedExtensions = ["zip"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert("Format file harus ZIP.");
      return;
    }

    // Kalau file sudah benar (ZIP), parse file tersebut
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      try {
        const geojson = await shp(arrayBuffer);
        // console.log("GeoJSON:", geojson);
        setGeoJsonData(geojson); // contoh: masuk ke state
      } catch (err) {
        console.error("Gagal membaca file:", err);
        alert("Gagal membaca file. Pastikan ZIP berisi .shp, .shx, .dbf!");
      }
    };

    reader.readAsArrayBuffer(file);
    e.target.value = null;
  };

  useEffect(() => {
    if (downloadUrl) {
      // Update teks sesuai dengan asalnya (manual / file)
      if (activeDownloadSource === "manual") {
        setDownloadText("Unduh Raster Hasil Poligon Manual");
      } else if (activeDownloadSource === "file") {
        setDownloadText(`Unduh Raster Hasil ${polygonFileName || ""}`);
      }
    }
  }, [downloadUrl]);

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop().toLowerCase();
    if (!file) return; // Tidak ada file diupload
    if (file) {
      setExcelFileName(file.name); // Simpan nama file di state
      setPolygonFileName("");
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;

      if (fileExt === "csv") {
        const parsed = Papa.parse(data, { header: true });
        const geojson = convertToGeoJSON(parsed.data);
        setGeoJsonData(geojson);
      } else if (fileExt === "xlsx") {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const geojson = convertToGeoJSON(jsonData);
        setGeoJsonData(geojson);
      } else {
        alert("File harus .csv atau .xlsx");
      }
    };

    if (fileExt === "csv") {
      reader.readAsText(file);
    } else if (fileExt === "xlsx") {
      reader.readAsBinaryString(file);
    }
    e.target.value = null; // reset input supaya bisa upload file yang sama
    console.log(geoJsonData);
  };

  const convertToGeoJSON = (data) => {
    const features = data
      .filter((item) => item.lat && item.lon) // pastikan ada lat/lon
      .map((item) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [parseFloat(item.lon), parseFloat(item.lat)],
        },
        properties: { ...item },
      }));

    return {
      type: "FeatureCollection",
      features: features,
    };
  };

  const extractRastertoExcel = async (geoJsonData) => {
    console.log(geoJsonData);
    const results = [];

    for (let i = 0; i < geoJsonData.features.length; i++) {
      const feature = geoJsonData.features[i];
      const [lon, lat] = feature.geometry.coordinates;
      const value = await getValueFromWMS(lat, lon);

      results.push({
        id: feature.properties.id || i,
        lat,
        lon,
        value,
      });
    }

    exportToExcel(results);
  };

  const layerNameSingle = getLayerNameSingle(selectedData, selectedPulau);
  const getValueFromWMS = async (lat, lon) => {
    const url = ` http://167.205.195.168/geoserver/Capstone/wms?REQUEST=GetFeatureInfo&layers=${layerNameSingle}
      &query_layers=${layerNameSingle}
      &info_format=application/json
      &width=101&height=101
      &x=50&y=50
      &srs=EPSG:4326
      &bbox=${lon - 0.0005},${lat - 0.0005},${lon + 0.0005},${lat + 0.0005}`;

    try {
      setIsGenerating(true);
      const response = await axios.get(url);
      const data = response.data;

      if (data && data.GRAY_INDEX !== undefined) {
        return data.GRAY_INDEX;
      } else if (data.features && data.features[0]) {
        return data.features[0].properties.GRAY_INDEX || null;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Gagal GetFeatureInfo:", error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ekstrak Data");
    XLSX.writeFile(workbook, "Result-Point.xlsx");
  };

  const handleInputChange = (index, field, value) => {
    setinputKoordinatTitik((prev) => {
      const updated = [...prev];

      // Pastikan titik di index tersebut ada, kalau belum kita inisialisasi
      if (!updated[index]) {
        updated[index] = { x: "", y: "" };
      }

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
    console.log(geoJsonData);
  };

  const convertToGeoJsonTitikManual = () => {
    setExcelFileName("");
    setPolygonFileName("");
    const features = inputKoordinatTitik
      .map((titik) => {
        const x = parseFloat(titik.x);
        const y = parseFloat(titik.y);

        if (isNaN(x) || isNaN(y)) return null;

        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [x, y],
          },
          properties: {}, // Tambahkan properti jika perlu
        };
      })
      .filter((f) => f !== null); // Filter titik yang tidak valid

    const geoJson = {
      type: "FeatureCollection",
      features: features,
    };

    setGeoJsonData(geoJson);
  };

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const encodedEmail = user.email.replace(/\./g, ",");
      const userRef = ref(db, `users/${encodedEmail}/isSubscribed`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setIsSubscribed(snapshot.val() === true);
          } else {
            setIsSubscribed(false);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Gagal mengambil data:", error);
          setLoading(false);
        });
    }
  }, []);

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-blue-500 text-sm font-medium animate-pulse">
            Memuat data...
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="absolute z-[1000] flex ">
          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 m-2 z-20 text-white bg-gray-900/90 rounded-md"
          >
            {isOpen ? <X /> : <Menu />}
          </button>

          {/* Sidebar */}
          <div className="h-screen py-2">
            <div
              className={`lg:static z-10 top-0 left-0 h-full bg-gray-900/90 text-white transition-all duration-300 ease-in-out 
        ${isOpen ? "w-70" : "w-0 overflow-hidden"} `}
            >
              <div className="p-4">
                <label className="block text-lg font-bold mb-2">
                  Data Type
                </label>
                <div className="flex flex-wrap flex-col gap-2">
                  {tabs.map((tab) => {
                    const isDisabled = !isSubscribed && tab !== "Geoid";

                    return (
                      <button
                        key={tab}
                        onClick={() => {
                          if (!isDisabled) setSelectedData(tab);
                        }}
                        disabled={isDisabled}
                        className={`px-3 py-1 rounded-lg transition-all duration-200 text-[15px]
            ${
              selectedData === tab && !isDisabled
                ? "bg-blue-500 text-white"
                : isDisabled
                ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }
          `}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-col ">
                  {/* Radio Button Pulau */}
                  <label className="block text-lg font-bold mt-3">Region</label>
                  <div className="flex flex-wrap flex-col">
                    {["Jawa", "Sumatra", "Kalimantan", "Sulawesi"].map(
                      (pulau) => (
                        <label
                          key={pulau}
                          className="inline-flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="pulau"
                            value={pulau}
                            checked={selectedPulau === pulau}
                            onChange={(e) => setSelectedPulau(e.target.value)}
                            className="form-radio text-blue-600 h-4 w-4"
                          />
                          <span className="ml-2 capitalize">{pulau}</span>
                        </label>
                      )
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center rounded">
                    {/* Tombol Dropdown */}
                    <div className="relative w-full mt-2">
                      <div className="flex flex-row">
                        <button
                          onClick={toggleDropDownTitik}
                          className="flex flex-row items-center py-2 rounded w-full transition"
                        >
                          {showDropDownTitik ? <ChevronUp /> : <ChevronDown />}
                          <span className="font-bold text-[16px]">Point</span>
                        </button>
                        <div className="relative flex items-center group">
                          {/* Ini adalah trigger-nya (ikon tanda tanya) */}
                          <div className="flex items-center justify-center h-6 w-6 bg-blue-500 text-white rounded-full cursor-pointer">
                            <span className="font-bold text-sm">?</span>
                          </div>

                          {/* Ini adalah kontainer tooltip yang akan muncul */}
                          <div
                            className="
          absolute text-center bottom-full left-1/2 -translate-x-1/2 mb-2 w-64
          bg-gray-800 text-white border-white border-2 text-sm rounded-lg p-3
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          invisible group-hover:visible
          pointer-events-none group-hover:pointer-events-auto
        "
                          >
                            {/* Konten tutorial Anda akan muncul di sini */}
                            <a className="">
                              Inputkan koordinat geodetik WGS 84
                            </a>
                            {/* Segitiga kecil di bawah tooltip (opsional, untuk estetika) */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white"></div>
                          </div>
                        </div>
                      </div>

                      {/* Isi Dropdown */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          showDropDownTitik
                            ? "max-h-dvh opacity-100"
                            : "max-h-0 opacity-0"
                        }  shadow rounded`}
                      >
                        <form action="" className="flex flex-col ">
                          <div className="max-h-[150px] overflow-y-auto space-y-4 p-2 border rounded-lg">
                            {inputTitik.map((titik, index) => (
                              <div
                                key={index}
                                className="flex flex-row space-x-4"
                              >
                                <label className="flex flex-col w-1/2">
                                  <span className="mb-1 after:text-pink-500 after:content-['*'] after:ml-0.5">
                                    Longitude
                                  </span>
                                  <input
                                    type="number"
                                    value={titik.x}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "x",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Masukkan nilai.."
                                    className="border-sky-700 border-2 w-full focus:ring-1 focus:outline-none focus:ring-sky-700 rounded-[10px] px-2 py-2 mb-[2px] text-[12px] placeholder:text-xs"
                                  />
                                </label>

                                <label className="flex flex-col w-1/2">
                                  <span className="mb-1 after:text-pink-500 after:content-['*'] after:ml-0.5">
                                    Latitude
                                  </span>
                                  <input
                                    type="number"
                                    value={titik.y}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "y",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Masukkan nilai.."
                                    className="border-sky-700 border-2 w-full focus:ring-1 focus:outline-none focus:ring-sky-700 rounded-[10px] px-2 py-2 mb-[2px] text-[12px] placeholder:text-xs"
                                  />
                                </label>
                              </div>
                            ))}
                          </div>
                        </form>

                        <div className="flex-row flex place-self-start w-full">
                          <button
                            onClick={convertToGeoJsonTitikManual}
                            className="bg-blue-500  hover:bg-blue-700 cursor-pointer text-[12px] px-4 py-2 mt-2 mr-2 w-full place-self-start rounded"
                          >
                            {" "}
                            Preview
                          </button>
                          <button
                            onClick={inputTitikMax() ? null : inputTitikHandler}
                            className={` ${
                              inputTitikMax()
                                ? "bg-gray-400"
                                : "bg-blue-500 hover:bg-blue-700  cursor-pointer"
                            }   text-[12px] px-4 py-2 mt-2 rounded`}
                          >
                            {" "}
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => extractRastertoExcel(geoJsonData)}
                          className={`${
                            isGenerating || !isPoint(geoJsonData)
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-700 cursor-pointer"
                          }  text-[12px] px-4 py-2 mt-2 mr-2 w-full place-self-start rounded`}
                          disabled={isGenerating || !isPoint(geoJsonData)}
                        >
                          {" "}
                          {isGenerating ? "Loading..." : "Generate"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Dropdown */}
                  <div className="relative w-full ">
                    <div className="flex flex-row">
                      <button
                        onClick={toggleDropDownTitikFile}
                        className="flex flex-row items-center py-2 rounded w-full transition"
                      >
                        {showDropDownTitikFile ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        )}
                        <span className="font-bold text-[16px]">
                          Point File
                        </span>
                      </button>
                      <div className="relative flex items-center group">
                        {/* Ini adalah trigger-nya (ikon tanda tanya) */}
                        <div className="flex items-center justify-center h-6 w-6 bg-blue-500 text-white rounded-full cursor-pointer">
                          <span className="font-bold text-sm">?</span>
                        </div>

                        {/* Ini adalah kontainer tooltip yang akan muncul */}
                        <div
                          className="
          absolute text-center bottom-full left-1/2 -translate-x-1/2 mb-2 w-64
          bg-gray-800 text-white border-white border-2 text-sm rounded-lg p-3
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          invisible group-hover:visible
          pointer-events-none group-hover:pointer-events-auto
        "
                        >
                          {/* Konten tutorial Anda akan muncul di sini */}
                          <a className="">
                            Inputkan file koordinat geodetik WGS 84 dengan
                            atribut "name", "lat", "lon"
                          </a>
                          {/* Segitiga kecil di bawah tooltip (opsional, untuk estetika) */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white"></div>{" "}
                        </div>
                      </div>
                    </div>
                    {/* Isi Dropdown */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        showDropDownTitikFile
                          ? "max-h-dvh opacity-100"
                          : "max-h-0 opacity-0"
                      }  shadow rounded`}
                    >
                      <div className="flex flex-col place-self-start w-full">
                        <span>Point Vector File(.xlsx , .csv)</span>
                        <div className="flex flex-row w-full">
                          <form action="" className="mr-2 w-full">
                            <label
                              htmlFor="file-excel"
                              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded cursor-pointer w-full hover:bg-blue-700 transition"
                            >
                              <span className="text-[12px] text-center w-full ">
                                Upload File
                              </span>
                              <input
                                id="file-excel"
                                type="file"
                                accept=".csv,.xlsx"
                                onChange={handleExcelUpload}
                                className="w-full hidden center"
                              />
                            </label>
                          </form>

                          <button
                            id="generate-xlsx"
                            onClick={() => extractRastertoExcel(geoJsonData)}
                            disabled={isGenerating || !isPoint(geoJsonData)}
                            className={`flex items-center px-4 py-2 text-white rounded justify-center text-[12px] transition ${
                              isGenerating || !isPoint(geoJsonData)
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-700 cursor-pointer"
                            }`}
                          >
                            {isGenerating ? "Loading..." : "Generate"}
                          </button>
                        </div>
                        {excelFileName && (
                          <p className="font-light text-[12px] mt-[2px]">
                            {[excelFileName]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-col items-center justify-center rounded">
                    {/* Tombol Dropdown */}
                    <div className="relative w-full">
                      <div className="flex flex-row">
                        <button
                          onClick={toggleDropDownArea}
                          className="flex flex-row items-center py-2 rounded w-full transition"
                        >
                          {showDropDownArea ? <ChevronUp /> : <ChevronDown />}
                          <span className="font-bold text-[16px]">Area</span>
                        </button>
                        <div className="relative flex items-center group">
                          {/* Ini adalah trigger-nya (ikon tanda tanya) */}
                          <div className="flex items-center justify-center h-6 w-6 bg-blue-500 text-white rounded-full cursor-pointer">
                            <span className="font-bold text-sm">?</span>
                          </div>

                          {/* Ini adalah kontainer tooltip yang akan muncul */}
                          <div
                            className="
          absolute text-center bottom-full left-1/2 -translate-x-1/2 mb-2 w-64
          bg-gray-800 text-white border-white border-2 text-sm rounded-lg p-3
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          invisible group-hover:visible
          pointer-events-none group-hover:pointer-events-auto
        "
                          >
                            {/* Konten tutorial Anda akan muncul di sini */}
                            <a className="">
                              Buatlah geometri poligon dari fitur yang ada di
                              sisi kanan.
                            </a>
                            {/* Segitiga kecil di bawah tooltip (opsional, untuk estetika) */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white"></div>{" "}
                          </div>
                        </div>
                      </div>
                      {/* Isi Dropdown */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          showDropDownArea
                            ? "max-h-dvh opacity-100"
                            : "max-h-0 opacity-0"
                        }  shadow rounded`}
                      >
                        <span>Manual Polygon</span>
                        <button
                          id="generate-area"
                          onClick={() => {
                            setActiveDownloadSource("manual");
                            clipRasterWithGeoJSON();
                          }}
                          disabled={isGenerating || !isPolygon(geoJsonData)}
                          className={`flex items-center px-4 py-2 text-white rounded justify-center w-full  text-[12px] transition ${
                            isGenerating || !isPolygon(geoJsonData)
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-700 cursor-pointer"
                          }`}
                        >
                          {isGenerating ? "Loading..." : "Generate"}
                        </button>

                        {downloadUrl && activeDownloadSource === "manual" && (
                          <a
                            href={downloadUrl}
                            download="raster_output.tif"
                            className="block mt-2 text-blue-600 underline place-self-center text-center"
                          >
                            {downloadText}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Tombol Dropdown */}
                    <div className="relative w-full">
                      <div className="flex flex-row">
                        <button
                          onClick={toggleDropDownAreaFile}
                          className="flex flex-row items-center py-2 rounded w-full transition"
                        >
                          {showDropDownAreaFile ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                          <span className="font-bold text-[16px]">
                            Area File
                          </span>
                        </button>
                        <div className="relative flex items-center group">
                          {/* Ini adalah trigger-nya (ikon tanda tanya) */}
                          <div className="flex items-center justify-center h-6 w-6 bg-blue-500 text-white rounded-full cursor-pointer">
                            <span className="font-bold text-sm">?</span>
                          </div>

                          {/* Ini adalah kontainer tooltip yang akan muncul */}
                          <div
                            className="
          absolute text-center bottom-full left-1/2 -translate-x-1/2 mb-2 w-64
          bg-gray-800 text-white border-white border-2 text-sm rounded-lg p-3
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          invisible group-hover:visible
          pointer-events-none group-hover:pointer-events-auto
        "
                          >
                            {/* Konten tutorial Anda akan muncul di sini */}
                            <a className="">
                              Inputkan file geometri poligon .zip yang berisi
                              exstensi pendukung shapefile ".shp", ".shx",
                              ".qix", ".prj", ".dbf", ".cpg"
                            </a>
                            {/* Segitiga kecil di bawah tooltip (opsional, untuk estetika) */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white"></div>{" "}
                          </div>
                        </div>
                      </div>

                      {/* Isi Dropdown */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          showDropDownAreaFile
                            ? "max-h-dvh opacity-100"
                            : "max-h-0 opacity-0"
                        }  shadow rounded`}
                      >
                        <div className="flex flex-col place-self-start w-full">
                          <span>Polygon Vector File(.zip)</span>
                          <div className="flex flex-row w-full">
                            <form action="" className="mr-2 w-full">
                              <label
                                htmlFor="file-shp"
                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded cursor-pointer w-full hover:bg-blue-700 transition"
                              >
                                <span className="text-[12px] text-center w-full ">
                                  Upload File
                                </span>
                                <input
                                  id="file-shp"
                                  type="file"
                                  accept=".zip"
                                  onChange={handleFileUpload}
                                  className="w-full hidden center"
                                />
                              </label>
                            </form>

                            <button
                              id="generate-shp"
                              onClick={() => {
                                setActiveDownloadSource("file");
                                clipRasterWithGeoJSON();
                              }}
                              disabled={isGenerating || !isPolygon(geoJsonData)}
                              className={`flex items-center px-4 py-2 text-white rounded justify-center  text-[12px] transition ${
                                isGenerating || !isPolygon(geoJsonData)
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-blue-500 hover:bg-blue-700 cursor-pointer"
                              }`}
                            >
                              {isGenerating ? "Loading..." : "Generate"}
                            </button>
                          </div>
                          {polygonFileName && (
                            <p className="font-light text-[12px] mt-[2px]">
                              {[polygonFileName]}
                            </p>
                          )}
                        </div>

                        {downloadUrl && activeDownloadSource === "file" && (
                          <a
                            href={downloadUrl}
                            download="raster_output.tif"
                            className="block mt-2 text-blue-600 underline place-self-center text-center"
                          >
                            {downloadText}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!loading && (
          <div id="map" ref={mapRef} className="w-screen h-screen" />
        )}
      </div>
    </div>
  );
  // return (
  //   <MapContainer
  //     center={[-6.2088, 106.8456]}
  //     zoom={10}
  //     className="w-screen h-screen"
  //   >
  //     {/* Tile Layer untuk OpenStreetMap */}
  //     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

  //     <WMSTileLayer
  //       url="http://167.205.195.168/geoserver/Capstone/wms"
  //       params={{
  //         format: "image/png",
  //         layers: "Capstone:Geoid_Jawa",
  //         transparent: true,
  //       }}
  //     />
  //     <WMSTileLayer
  //       url="http://167.205.195.168/geoserver/Capstone/wms"
  //       params={{
  //         format: "image/png",
  //         layers: "Capstone:HLS.S30.T50MRE.2018260T022319.v2.0.B02",
  //         transparent: true,
  //       }}
  //     />
  //     {/* Marker di lokasi tertentu */}
  //   </MapContainer>
  // );
};

export default MapComponent;
