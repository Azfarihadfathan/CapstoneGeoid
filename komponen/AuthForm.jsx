import { useState } from "react";
import { auth, db } from "../util/config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import { ArrowLeft } from "lucide-react";

function AuthForm() {
  const [clickedLoginForm, setClickedLoginForm] = useState(true);

  const [clickedForgetPassword, setClickedForgetPassword] = useState(false);
  function clickedLoginFormHandler() {
    setClickedLoginForm(true);
  }
  function clickedSignupFormHandler() {
    setClickedLoginForm(false);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailForgetPassword, setEmailForgetPassword] = useState("");
  const navigate = useNavigate();

  const [formDataSignUp, setformDataSignUp] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "individu",
    instansi: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Nama lengkap
    if (!formDataSignUp.fullname.trim()) {
      newErrors.fullname = "Nama lengkap wajib diisi.";
    } else if (formDataSignUp.fullname.trim().length < 3) {
      newErrors.fullname = "Nama lengkap minimal 3 karakter.";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formDataSignUp.email.trim()) {
      newErrors.email = "Email wajib diisi.";
    } else if (!emailRegex.test(formDataSignUp.email.trim())) {
      newErrors.email = "Format email tidak valid.";
    }

    // Password
    if (!formDataSignUp.password) {
      newErrors.password = "Password wajib diisi.";
    } else if (formDataSignUp.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter.";
    }

    // Konfirmasi password
    if (formDataSignUp.confirmPassword !== formDataSignUp.password) {
      newErrors.confirmPassword = "Konfirmasi password tidak sama.";
    }

    // Instansi
    if (
      formDataSignUp.userType === "instansi" &&
      !formDataSignUp.instansi.trim()
    ) {
      newErrors.instansi = "Nama instansi wajib diisi.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // async function SignUpHandler({ email, password }, profileData) {
  //   setIsAuthenticating(true);
  //   try {
  //     await createUserFB(email, password);

  //     const user = firebase.auth().currentUser;

  //     const token = await user.getIdToken();
  //     await storeDataAccount(profileData, token);

  //     navigation.replace("VerifikasiEmail", {
  //       email: email,
  //     });
  //   } catch (error) {
  //     Alert.alert(
  //       "Email sudah terdaftar",
  //       "Tolong pakai alamat email lain Kamu, ya!."
  //     );
  //     setIsAuthenticating(false);

  //     return;
  //   }
  //   setIsAuthenticating(false);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formDataSignUp.email,
          formDataSignUp.password
        );
        const user = userCredential.user;

        const emailKey = formDataSignUp.email.replace(/\./g, ",");

        await set(ref(db, `users/${emailKey}`), {
          email: formDataSignUp.email,
          nama: formDataSignUp.fullname,
          instansi:
            formDataSignUp.userType === "instansi"
              ? formDataSignUp.instansi
              : "",
          isSubscribed: false,
        });

        await sendEmailVerification(user);

        alert("Pendaftaran berhasil! Cek e-mail Anda untuk verifikasi!");
      } catch (error) {
        alert("Gagal mendaftar: " + error.message);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Akun Anda belum diverifikasi. Silakan cek email Anda.");
        return;
      }
      navigate("/dashboard");
    } catch (error) {
      alert("Email atau password salah! atau coba lagi lain kali!");
    }
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, emailForgetPassword);
      alert("Link reset password telah dikirim ke email Anda.");
    } catch (error) {
      alert("Gagal mengirim email: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformDataSignUp((prev) => ({ ...prev, [name]: value }));
  };

  return (
    //   <div className="w-screen mx-auto">
    //     <div className="border-4">
    //       <a href="https://vite.dev" target="_blank">
    //         <img src={viteLogo} className="logo" alt="Vite logo" />
    //       </a>
    //       <a href="https://react.dev" target="_blank">
    //         <img src={reactLogo} className="logo react" alt="React logo" />
    //       </a>
    //     </div>
    //     <h1>Vite + React</h1>
    //     <div className="card">
    //       <button onClick={() => setCount((count) => count + 1)}>
    //         count is {count}
    //       </button>
    //       <p class="sm:my-5 md:my-12 text-[41px] font-bold underline font-roboto bg-test ">
    //         Edit{" "}
    //         <span className="bg-gradient-to-r from-blue-400 via-yellow-500 to-teal-600 bg-clip-text text-transparent">
    //           src/App.jsx
    //         </span>{" "}
    //         and save to test HMR
    //       </p>
    //     </div>
    //     <p className="read-the-docs">
    //       Click on the Vite and React logos to learn more
    //     </p>
    //     <div
    //       className="max-w-xl h-80 bg-amber-400 mx-auto my-50 bg-[url('https://picsum.photos/1920/1080?random')]
    //     bg-cover bg-center overflow-y-scroll bg-fixed rounded-2xl shadow-xl shadow-slate-500"
    //     >
    //       <p className="p-5 text-2xl ">
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
    //         inventore dolor ex autem magni, minima quo velit nobis provident iusto
    //         magnam at quam accusamus quos commodi eum aspernatur quibusdam
    //         voluptates veniam saepe? Nisi quisquam eum, velit voluptas reiciendis
    //         dicta dolorum esse provident sequi nam ad error maxime atque
    //         distinctio rem enim! Tempora vel accusantium inventore quaerat
    //         recusandae voluptatum perferendis sit, at, quasi non quidem possimus
    //         ea facere saepe labore quo mollitia sequi. Repellendus culpa
    //         asperiores quam deleniti mollitia optio unde, hic accusantium commodi
    //         accusamus ut quaerat, temporibus similique est qui quibusdam ipsam rem
    //         debitis illum. Beatae quas repellat dolore praesentium similique!
    //         Recusandae officiis nesciunt ut voluptates doloremque itaque fuga quas
    //         libero atque beatae quae sapiente, numquam ad quasi sequi eaque nihil
    //         incidunt, corporis quos rerum consequuntur sit? Deleniti dolorum natus
    //         soluta aliquid, sapiente impedit fugiat ullam dignissimos, voluptas
    //         inventore ratione quis alias nemo, sit iure vitae veniam reprehenderit
    //         quas delectus. Dicta, possimus reiciendis soluta reprehenderit quia
    //         quam unde provident qui at vitae maxime atque ut consequatur nostrum
    //         veniam ad omnis iure itaque eaque ipsam odio, similique sapiente!
    //         Nihil nesciunt placeat ipsum eligendi, harum ducimus consequatur
    //         commodi reprehenderit debitis assumenda odio doloremque animi rerum
    //         doloribus provident perferendis expedita delectus blanditiis
    //         explicabo.
    //       </p>
    //     </div>
    //   </div>

    <div className="w-screen h-screen bg-linear-60/oklch from-blue-500 via-cyan-400 to-sky-300 flex items-center">
      <div className="w-lg h-120 mx-auto bg-amber-50 rounded-2xl shadow-lg shadow-gray-600 flex flex-col overflow-y-hidden overflow-x-visible">
        <section className="shrink-0">
          <img
            src="/geoid_logo.png"
            alt=""
            className="w-40 bg-cover place-self-center mt-2 mb-1"
          />
          <h2 className="text-center mb-2 font-medium">Selamat Datang!</h2>
          <div className="px-15 flex flex-row justify-center">
            <button
              onClick={clickedLoginFormHandler}
              className={
                clickedLoginForm
                  ? "border-b-2 rounded-[2px] mr-10 w-50 h-10 text-center"
                  : "hover:bg-slate-300/50 rounded-[2px] cursor-pointer mr-10 w-50 h-10 text-center"
              }
            >
              <span>Login</span>
            </button>
            <button
              onClick={clickedSignupFormHandler}
              className={
                clickedLoginForm
                  ? "hover:bg-slate-300/50 rounded-[2px] cursor-pointer w-50 h-10 text-center"
                  : "border-b-2 rounded-[2px] w-50 h-10 text-center"
              }
            >
              <span>Sign Up</span>
            </button>
          </div>
        </section>
        {clickedLoginForm && !clickedForgetPassword && (
          <form onSubmit={handleLogin} className="px-8">
            {/* Email */}
            <label htmlFor="email-login" className="flex flex-col mt-4">
              <span className="mb-1 after:text-pink-500 after:content-['*'] after:ml-0.5">
                Email
              </span>
              <input
                type="email"
                id="email-login"
                placeholder="Masukkan email.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" border-sky-700 border-2 focus:ring-1 focus:outline-none focus:ring-sky-700 rounded-[10px] invalid:border-red-500 invalid:focus:ring-red-500 px-2 py-2 text-[12px]  placeholder:text-xs"
                required
              />
            </label>

            {/* Password */}
            <label htmlFor="password-login" className="flex flex-col mt-4">
              <span className="mb-1 after:text-pink-500 after:content-['*'] after:ml-0.5">
                Password
              </span>
              <input
                type="password"
                id="password-login"
                placeholder="Masukkan password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" border-sky-700 border-2 focus:ring-1 focus:outline-none focus:ring-sky-700 rounded-[10px] invalid:border-red-500 invalid:focus:ring-red-500 px-2 py-2 text-[12px]  placeholder:text-xs"
                required
              />
            </label>

            {/* Checkbox + Lupa Sandi */}
            <div className="w-full flex flex-row justify-between items-center ">
              <label
                htmlFor="remember"
                className="max-w-25 flex flex-row ml-[1px] ml mb-5 mt-4 items-center cursor-pointer group"
              ></label>
              <button
                onClick={() => setClickedForgetPassword(true)}
                className="mt-2 mb-6 h-min text-[12px] text-slate-500 hover:text-slate-700 active:text-slate-900 cursor-pointer"
              >
                Lupa Sandi?
              </button>
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="bg-sky-600 rounded-[20px] w-4/5 flex place-self-center justify-center text-white p-2 hover:bg-sky-700 focus:bg-sky-800 active:bg-sky-800 cursor-pointer"
            >
              Login
            </button>
          </form>
        )}

        {clickedLoginForm && clickedForgetPassword && (
          <form onSubmit={handleForgetPassword} className="px-8">
            <button
              type="button"
              onClick={() => setClickedForgetPassword(false)}
              className="flex items-center text-sm text-sky-600 hover:text-sky-800 mt-2 mb-1"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
            </button>

            <label
              htmlFor="email-forget-password"
              className="flex flex-col mt-2"
            >
              <span className="mb-1 after:text-pink-500 after:content-['*'] after:ml-0.5">
                Email
              </span>
              <input
                type="email"
                id="email-forgetpassword"
                placeholder="Masukkan email.."
                value={emailForgetPassword}
                onChange={(e) => setEmailForgetPassword(e.target.value)}
                className=" border-sky-700 border-2 focus:ring-1 focus:outline-none focus:ring-sky-700 rounded-[10px] invalid:border-red-500 invalid:focus:ring-red-500 px-2 py-2 text-[12px]  placeholder:text-xs"
                required
              />
            </label>
            <button
              type="submit"
              className="bg-sky-600 rounded-[20px] w-4/5 mt-29 flex place-self-center justify-center text-white p-2 hover:bg-sky-700 focus:bg-sky-800 active:bg-sky-800 cursor-pointer"
            >
              Reset Password
            </button>
          </form>
        )}

        {!clickedLoginForm && (
          <form onSubmit={handleSubmit} className="flex flex-col px-8 h-6/11">
            {/* Nama Lengkap */}
            <div className="flex flex-col h-full custom-scrollbar overflow-y-auto rounded-[6px] pb-2">
              <div className="flex flex-col mt-1 ">
                <label
                  htmlFor="fullname"
                  className="mb-1 after:text-pink-500 after:content-['*'] after:ml-0.5"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formDataSignUp.fullname}
                  onChange={handleChange}
                  className={`border-2 focus:ring-1 ${
                    errors.fullname
                      ? "focus:outline-none focus:ring-red-500 border-red-500"
                      : "focus:outline-none focus:ring-sky-700 border-sky-700 "
                  } rounded-[10px] px-2 py-2 text-[12px]  placeholder:text-xs`}
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm">{errors.fullname}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col mt-4">
                <label
                  htmlFor="email"
                  className="mb-1 after:text-pink-500 after:content-['*'] after:ml-0.5"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formDataSignUp.email}
                  onChange={handleChange}
                  className={`border-2 focus:ring-1 ${
                    errors.email
                      ? "focus:outline-none focus:ring-red-500 border-red-500"
                      : "focus:outline-none focus:ring-sky-700 border-sky-700 "
                  } rounded-[10px] px-2 py-2 text-[12px]  placeholder:text-xs`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col mt-4">
                <label
                  htmlFor="password"
                  className="mb-1 after:text-pink-500 after:content-['*'] after:ml-0.5"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formDataSignUp.password}
                  onChange={handleChange}
                  className={`border-2 focus:ring-1 ${
                    errors.password
                      ? "focus:outline-none focus:ring-red-500 border-red-500"
                      : "focus:outline-none focus:ring-sky-700 border-sky-700 "
                  } rounded-[10px] px-2 py-2 text-[12px]  placeholder:text-xs`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Konfirmasi Password */}
              <div className="flex flex-col mt-4">
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 after:text-pink-500 after:content-['*'] after:ml-0.5"
                >
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formDataSignUp.confirmPassword}
                  onChange={handleChange}
                  className={`border-2 focus:ring-1 ${
                    errors.confirmPassword
                      ? "focus:outline-none focus:ring-red-500 border-red-500"
                      : "focus:outline-none focus:ring-sky-700 border-sky-700 "
                  } rounded-[10px] px-2 py-2 text-[12px]  placeholder:text-xs`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Tipe Pengguna */}
              <div className="flex flex-col mt-4">
                <span className="after:text-pink-500 after:content-['*'] after:ml-0.5">
                  Anda mendaftar sebagai:{" "}
                </span>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="individu"
                      checked={formDataSignUp.userType === "individu"}
                      onChange={handleChange}
                    />
                    Individu
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="instansi"
                      checked={formDataSignUp.userType === "instansi"}
                      onChange={handleChange}
                    />
                    Instansi
                  </label>
                </div>
              </div>

              {/* Nama Instansi (opsional) */}
              {formDataSignUp.userType === "instansi" && (
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="instansi"
                    className="mb-1 after:text-pink-500 after:content-['*'] after:ml-0.5"
                  >
                    Nama Instansi
                  </label>
                  <input
                    type="text"
                    name="instansi"
                    value={formDataSignUp.instansi}
                    onChange={handleChange}
                    className={`border-2 focus:ring-1 ${
                      errors.instansi
                        ? "focus:outline-none focus:ring-red-500 border-red-500"
                        : "focus:outline-none focus:ring-sky-700 border-sky-700 "
                    } rounded-[10px] px-2 py-2 text-[12px]  placeholder:text-xs`}
                  />
                  {errors.instansi && (
                    <p className="text-red-500 text-sm">{errors.instansi}</p>
                  )}
                </div>
              )}
            </div>
            <div className="border-1 w-5/5 h-0.5 bg-blue-500 self-center" />
            {/* Submit */}
            <button
              type="submit"
              className="bg-sky-600 rounded-[20px] w-4/5 mt-4 flex place-self-center justify-center text-white p-2 hover:bg-sky-700 focus:bg-sky-800 active:bg-sky-800 cursor-pointer"
            >
              Daftar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
