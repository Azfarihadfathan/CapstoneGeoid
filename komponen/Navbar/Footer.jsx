import React from "react";
import { useState } from "react";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { MapPin } from "lucide-react";

function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
      timestamp: new Date().toLocaleString("id-ID"),
    };

    try {
      const response = await fetch(
        "https://api.sheetbest.com/sheets/55f03989-86d7-4a24-8cf4-6cb312b7b256",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Data berhasil dikirim ke Spreadsheet!");
        e.target.reset();
      } else {
        alert("Gagal mengirim data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi error saat mengirim data.");
    } finally {
      setIsSubmitting(false);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="w-full mt-[10vh] py-[4vh] bg-gradient-to-t from-[#004466] to-[#006699]">
      <div className="w-full h-2/12 text-center content-center px-[5vw] mb-[3vh]">
        <a className="text-white">
          Have questions? We're here to help. Fill out the form below and we'll
          get back to you as soon as possible
        </a>
      </div>

      <div className="flex md:flex-row flex-col md:w-10/12 w-5/12 h-9/12 md:h-8/12 justify-self-center md:space-x-[5vw] space-y-[5vh]">
        <div className="flex flex-col w-[50vw] md:h-full h-1/2 rounded-lg bg-[#3d82b0] center">
          <h1 className="text-white tracking-wide ml-6 mt-4 font-bold">
            Contact Information
          </h1>

          <div className="flex flex-row">
            <div className="relative bottom-1 ml-5 mt-2 w-10 h-10">
              <svg className="absolute top-0 left-0 w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="42%"
                  stroke="#ffffff"
                  strokeWidth="2"
                  fill="transparent"
                />
              </svg>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                <Phone className="w-5" />
              </div>
            </div>
            <a className="ml-2 place-self-center font-roboto md:text-[14px] text-[12px] text-white">
              08882746033
            </a>
          </div>

          <div className="flex flex-row">
            <div className="relative bottom-1 ml-5 mt-2 w-10 h-10">
              <svg className="absolute top-0 left-0 w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="42%"
                  stroke="#ffffff"
                  strokeWidth="2"
                  fill="transparent"
                />
              </svg>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                <Mail className="w-5" />
              </div>
            </div>
            <a className="ml-2 place-self-center font-roboto md:text-[14px] text-[12px] text-white">
              capstonegeoid@gmail.com
            </a>
          </div>

          <div className="flex flex-row">
            <div className="relative bottom-1 ml-5 mt-2 w-10 h-10">
              <svg className="absolute top-0 left-0 w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="42%"
                  stroke="#ffffff"
                  strokeWidth="2"
                  fill="transparent"
                />
              </svg>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                <MapPin className="w-5" />
              </div>
            </div>
            <a className="ml-2 place-self-center font-roboto md:text-[14px] text-[12px] text-white">
              Labtek IX C, Institut Teknologi Bandung
            </a>
          </div>

          <img
            src="/geoid_logo_white.png"
            className="-m-4 -mb-1 relative bottom-1/11 left-0 w-1/2 h-3/8 object-cover rounded-t-[8px] place-self-center"
            alt=""
          />
        </div>
        <div className="w-[50vw] md:h-full h-1/2 rounded-lg bg-[#3d82b0] px-8 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
            {/* Input untuk Nama */}
            <div>
              <label htmlFor="name" className="block text-white font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                className="w-full p-3 rounded-md bg-[#5A94B8] text-white placeholder:text-gray-300 border-0 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>

            {/* Input untuk Email */}
            <div>
              <label htmlFor="email" className="block text-white font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your@email.com"
                required
                className="w-full p-3 rounded-md bg-[#5A94B8] text-white placeholder:text-gray-300 border-0 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>

            {/* Input untuk Pesan */}
            <div>
              <label htmlFor="message" className="block text-white font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                required
                className="w-full p-3 rounded-md bg-[#5A94B8] text-white placeholder:text-gray-300 border-0 focus:outline-none focus:ring-2 focus:ring-sky-400 transition resize-none"
              ></textarea>
            </div>

            {/* Tombol Submit */}
            <div className="text-center">
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-[#2C5B7C] text-white font-bold py-3 px-10 rounded-md hover:bg-[#254e6b] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[#3d82b0] transition-colors"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Footer;
