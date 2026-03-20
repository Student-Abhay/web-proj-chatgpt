// import { useState } from "react";
// import { loginUser } from "../api";
// import { useNavigate, Link } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const res = await loginUser({ email, password });
//       sessionStorage.setItem("token", res.data.token);
//       toast.success("Login successful!");
//       navigate("/");
//     } catch(error) {
//       toast.error(error.message || "Login Failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <Toaster position="top-right" />
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-center text-gray-500 mt-4 text-sm">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-blue-500 font-semibold hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// import React, { useRef, useState, useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// /* ───────── SVG Icons ───────── */
// const Icons = {
//   eye: (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   ),
//   eyeOff: (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
//       <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
//       <line x1="1" y1="1" x2="23" y2="23" />
//     </svg>
//   ),
//   chevronDown: (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <polyline points="6 9 12 15 18 9" />
//     </svg>
//   ),
// };

// /* ───────── Product Data ───────── */
// const products = [
//   { id: 1, name: "Nebula Headset", price: "$129", img: "https://placehold.co/280x200/1a1a2e/e0e0ff?text=Headset" },
//   { id: 2, name: "Photon Keyboard", price: "$89", img: "https://placehold.co/280x200/1a1a2e/e0e0ff?text=Keyboard" },
//   { id: 3, name: "Quasar Mouse", price: "$59", img: "https://placehold.co/280x200/1a1a2e/e0e0ff?text=Mouse" },
//   { id: 4, name: "Eclipse Monitor", price: "$349", img: "https://placehold.co/280x200/1a1a2e/e0e0ff?text=Monitor" },
// ];

// /* ───────── Styles ───────── */
// const styles = {
//   /* --- Global --- */
//   page: {
//     margin: 0,
//     padding: 0,
//     fontFamily: "'Inter', 'Segoe UI', sans-serif",
//     background: "linear-gradient(135deg, #0b0b1a 0%, #121230 50%, #0b0b1a 100%)",
//     color: "#e0e0ff",
//     overflowX: "hidden",
//     minHeight: "100vh",
//   },

//   /* --- Hero --- */
//   heroSection: {
//     position: "relative",
//     height: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
//     overflow: "hidden",
//   },
//   heroTitle: {
//     fontSize: "clamp(2.5rem, 6vw, 5rem)",
//     fontWeight: 800,
//     letterSpacing: "-0.03em",
//     lineHeight: 1.1,
//     background: "linear-gradient(90deg, #a78bfa, #60a5fa, #a78bfa)",
//     backgroundSize: "200% auto",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     marginBottom: "1rem",
//     opacity: 0,
//     transform: "translateY(40px)",
//   },
//   heroSub: {
//     fontSize: "clamp(1rem, 2vw, 1.25rem)",
//     color: "#9898c8",
//     maxWidth: 540,
//     opacity: 0,
//     transform: "translateY(30px)",
//   },
//   scrollCue: {
//     position: "absolute",
//     bottom: 40,
//     opacity: 0,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: 6,
//     color: "#7878aa",
//     fontSize: "0.75rem",
//     letterSpacing: "0.1em",
//     textTransform: "uppercase",
//   },

//   /* --- Floating Orbs --- */
//   orbContainer: {
//     position: "fixed",
//     inset: 0,
//     pointerEvents: "none",
//     zIndex: 0,
//   },
//   orb: {
//     position: "absolute",
//     borderRadius: "50%",
//     filter: "blur(80px)",
//     opacity: 0.18,
//   },

//   /* --- Marquee --- */
//   marqueeWrap: {
//     overflow: "hidden",
//     padding: "2rem 0",
//     borderTop: "1px solid rgba(160,160,220,0.08)",
//     borderBottom: "1px solid rgba(160,160,220,0.08)",
//   },
//   marqueeTrack: {
//     display: "flex",
//     gap: "3rem",
//     whiteSpace: "nowrap",
//     willChange: "transform",
//   },
//   marqueeItem: {
//     fontSize: "clamp(1rem, 2vw, 1.4rem)",
//     fontWeight: 600,
//     color: "#5a5a8a",
//     flexShrink: 0,
//   },

//   /* --- Products --- */
//   productsSection: {
//     padding: "6rem 2rem",
//     maxWidth: 1200,
//     margin: "0 auto",
//   },
//   productsHeading: {
//     fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
//     fontWeight: 700,
//     marginBottom: "3rem",
//     textAlign: "center",
//     color: "#c8c8ff",
//   },
//   productsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
//     gap: "2rem",
//   },
//   productCard: {
//     background: "rgba(255,255,255,0.03)",
//     border: "1px solid rgba(160,160,220,0.1)",
//     borderRadius: 16,
//     overflow: "hidden",
//     opacity: 0,
//     transform: "translateY(50px)",
//     transition: "border-color 0.3s",
//   },
//   productCardHover: {
//     borderColor: "rgba(167,139,250,0.4)",
//   },
//   productImg: {
//     width: "100%",
//     height: 200,
//     objectFit: "cover",
//     display: "block",
//   },
//   productInfo: {
//     padding: "1.25rem",
//   },
//   productName: {
//     fontSize: "1.1rem",
//     fontWeight: 600,
//     marginBottom: "0.4rem",
//   },
//   productPrice: {
//     color: "#a78bfa",
//     fontWeight: 700,
//     fontSize: "1rem",
//   },

//   /* --- Login Section --- */
//   loginSection: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "6rem 2rem 8rem",
//     position: "relative",
//     zIndex: 1,
//   },
//   loginCard: {
//     background: "rgba(18,18,48,0.85)",
//     backdropFilter: "blur(20px)",
//     border: "1px solid rgba(160,160,220,0.12)",
//     borderRadius: 20,
//     padding: "3rem 2.5rem",
//     width: "100%",
//     maxWidth: 400,
//     opacity: 0,
//     transform: "translateY(60px) scale(0.95)",
//   },
//   loginTitle: {
//     fontSize: "1.6rem",
//     fontWeight: 700,
//     marginBottom: "0.4rem",
//     color: "#e0e0ff",
//   },
//   loginSubtitle: {
//     fontSize: "0.9rem",
//     color: "#7878aa",
//     marginBottom: "2rem",
//   },
//   fieldGroup: {
//     marginBottom: "1.4rem",
//     opacity: 0,
//     transform: "translateY(20px)",
//   },
//   label: {
//     display: "block",
//     fontSize: "0.8rem",
//     fontWeight: 600,
//     color: "#9898c8",
//     marginBottom: "0.45rem",
//     letterSpacing: "0.04em",
//     textTransform: "uppercase",
//   },
//   inputWrap: {
//     position: "relative",
//   },
//   input: {
//     width: "100%",
//     padding: "0.75rem 1rem",
//     fontSize: "0.95rem",
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(160,160,220,0.15)",
//     borderRadius: 10,
//     color: "#e0e0ff",
//     outline: "none",
//     transition: "border-color 0.3s, box-shadow 0.3s",
//     boxSizing: "border-box",
//   },
//   inputFocus: {
//     borderColor: "#a78bfa",
//     boxShadow: "0 0 0 3px rgba(167,139,250,0.15)",
//   },
//   eyeToggle: {
//     position: "absolute",
//     right: 12,
//     top: "50%",
//     transform: "translateY(-50%)",
//     background: "none",
//     border: "none",
//     color: "#7878aa",
//     cursor: "pointer",
//     padding: 4,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   submitBtn: {
//     width: "100%",
//     padding: "0.85rem",
//     fontSize: "1rem",
//     fontWeight: 700,
//     color: "#fff",
//     background: "linear-gradient(135deg, #7c3aed, #6366f1)",
//     border: "none",
//     borderRadius: 12,
//     cursor: "pointer",
//     letterSpacing: "0.02em",
//     marginTop: "0.5rem",
//     transition: "transform 0.2s, box-shadow 0.3s, background 0.3s",
//     position: "relative",
//     overflow: "hidden",
//   },
//   submitBtnHover: {
//     background: "linear-gradient(135deg, #6d28d9, #4f46e5)",
//     boxShadow: "0 6px 24px rgba(124,58,237,0.4)",
//     transform: "translateY(-1px)",
//   },
//   forgotLink: {
//     display: "block",
//     textAlign: "center",
//     marginTop: "1.2rem",
//     fontSize: "0.82rem",
//     color: "#7878aa",
//     textDecoration: "none",
//     transition: "color 0.2s",
//   },
// };

// /* ───────── Component ───────── */
// const LoginPage = () => {
//   /* Refs */
//   const heroTitleRef = useRef(null);
//   const heroSubRef = useRef(null);
//   const scrollCueRef = useRef(null);
//   const heroSectionRef = useRef(null);
//   const marqueeTrackRef = useRef(null);
//   const productCardsRef = useRef([]);
//   const loginCardRef = useRef(null);
//   const fieldGroupsRef = useRef([]);
//   const orbsRef = useRef([]);
//   const submitBtnRef = useRef(null);

//   /* State */
//   const [showPassword, setShowPassword] = useState(false);
//   const [btnHover, setBtnHover] = useState(false);
//   const [focusedField, setFocusedField] = useState(null);
//   const [cardHover, setCardHover] = useState(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   /* ── GSAP Animations ── */
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       /* Hero Entrance */
//       const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
//       heroTl
//         .to(heroTitleRef.current, { opacity: 1, y: 0, duration: 1.0 })
//         .to(heroSubRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
//         .to(scrollCueRef.current, { opacity: 1, duration: 0.6 }, "-=0.3");

//       /* Scroll Cue Bounce */
//       gsap.to(scrollCueRef.current, {
//         y: 10,
//         repeat: -1,
//         yoyo: true,
//         duration: 1.2,
//         ease: "sine.inOut",
//       });

//       /* Hero Parallax */
//       gsap.to(heroSectionRef.current, {
//         scrollTrigger: {
//           trigger: heroSectionRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: true,
//         },
//         y: -100,
//         opacity: 0.3,
//       });

//       /* Marquee Scroll */
//       if (marqueeTrackRef.current) {
//         const trackWidth = marqueeTrackRef.current.scrollWidth / 2;
//         gsap.to(marqueeTrackRef.current, {
//           x: -trackWidth,
//           repeat: -1,
//           duration: 30,
//           ease: "none",
//         });
//       }

//       /* Product Card Stagger */
//       if (productCardsRef.current.length) {
//         gsap.to(productCardsRef.current, {
//           scrollTrigger: {
//             trigger: productCardsRef.current[0]?.parentElement,
//             start: "top 80%",
//           },
//           opacity: 1,
//           y: 0,
//           duration: 0.7,
//           stagger: 0.15,
//           ease: "power2.out",
//         });
//       }

//       /* Login Card Reveal */
//       gsap.to(loginCardRef.current, {
//         scrollTrigger: {
//           trigger: loginCardRef.current,
//           start: "top 85%",
//         },
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         duration: 0.9,
//         ease: "back.out(1.4)",
//       });

//       /* Login Fields Stagger */
//       if (fieldGroupsRef.current.length) {
//         gsap.to(fieldGroupsRef.current, {
//           scrollTrigger: {
//             trigger: loginCardRef.current,
//             start: "top 80%",
//           },
//           opacity: 1,
//           y: 0,
//           duration: 0.5,
//           stagger: 0.12,
//           delay: 0.4,
//           ease: "power2.out",
//         });
//       }

//       /* Floating Orbs Drift */
//       orbsRef.current.forEach((orb) => {
//         if (!orb) return;
//         gsap.to(orb, {
//           x: `random(-60, 60)`,
//           y: `random(-60, 60)`,
//           repeat: -1,
//           yoyo: true,
//           duration: `random(6, 14)`,
//           ease: "sine.inOut",
//         });
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//    /* ── Submit Handler ── */
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!submitBtnRef.current) return;

//     gsap
//       .timeline()
//       .to(submitBtnRef.current, {
//         scale: 0.95,
//         duration: 0.1,
//         ease: "power2.in",
//       })
//       .to(submitBtnRef.current, {
//         scale: 1,
//         duration: 0.4,
//         ease: "elastic.out(1, 0.4)",
//       });

//     console.log("Login submitted:", { email, password });
//   };

//   /* ── Marquee items (doubled for seamless loop) ── */
//   const marqueeWords = ["Nebula", "Photon", "Quasar", "Eclipse", "Vortex", "Zenith", "Prism", "Aurora"];
//   const doubled = [...marqueeWords, ...marqueeWords];

//   /* ── Orb config ── */
//   const orbData = [
//     { size: 300, top: "10%", left: "5%", bg: "radial-gradient(circle, #7c3aed, transparent)" },
//     { size: 250, top: "60%", left: "75%", bg: "radial-gradient(circle, #6366f1, transparent)" },
//     { size: 200, top: "30%", left: "50%", bg: "radial-gradient(circle, #a78bfa, transparent)" },
//   ];

//   return (
//     <div style={styles.page}>
//       {/* Floating Orbs */}
//       <div style={styles.orbContainer}>
//         {orbData.map((o, i) => (
//           <div
//             key={i}
//             ref={(el) => (orbsRef.current[i] = el)}
//             style={{
//               ...styles.orb,
//               width: o.size,
//               height: o.size,
//               top: o.top,
//               left: o.left,
//               background: o.bg,
//             }}
//           />
//         ))}
//       </div>

//       {/* Hero */}
//       <section ref={heroSectionRef} style={styles.heroSection}>
//         <h1 ref={heroTitleRef} style={styles.heroTitle}>
//           The Future of Gear
//         </h1>
//         <p ref={heroSubRef} style={styles.heroSub}>
//           Premium peripherals engineered for those who refuse to settle. Precision meets artistry.
//         </p>
//         <div ref={scrollCueRef} style={styles.scrollCue}>
//           <span>Scroll</span>
//           {Icons.chevronDown}
//         </div>
//       </section>

//       {/* Marquee */}
//       <div style={styles.marqueeWrap}>
//         <div ref={marqueeTrackRef} style={styles.marqueeTrack}>
//           {doubled.map((word, i) => (
//             <span key={i} style={styles.marqueeItem}>
//               {word} ✦
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Products */}
//       <section style={styles.productsSection}>
//         <h2 style={styles.productsHeading}>Featured Collection</h2>
//         <div style={styles.productsGrid}>
//           {products.map((p, i) => (
//             <div
//               key={p.id}
//               ref={(el) => (productCardsRef.current[i] = el)}
//               style={{
//                 ...styles.productCard,
//                 ...(cardHover === p.id ? styles.productCardHover : {}),
//               }}
//               onMouseEnter={() => setCardHover(p.id)}
//               onMouseLeave={() => setCardHover(null)}
//             >
//               <img src={p.img} alt={p.name} style={styles.productImg} />
//               <div style={styles.productInfo}>
//                 <div style={styles.productName}>{p.name}</div>
//                 <div style={styles.productPrice}>{p.price}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Login */}
//       <section style={styles.loginSection}>
//         <div ref={loginCardRef} style={styles.loginCard}>
//           <h2 style={styles.loginTitle}>Welcome back</h2>
//           <p style={styles.loginSubtitle}>Sign in to your account</p>

//           <form onSubmit={handleSubmit}>
//             {/* Email */}
//             <div
//               ref={(el) => (fieldGroupsRef.current[0] = el)}
//               style={styles.fieldGroup}
//             >
//               <label style={styles.label} htmlFor="email">
//                 Email
//               </label>
//               <div style={styles.inputWrap}>
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   onFocus={() => setFocusedField("email")}
//                   onBlur={() => setFocusedField(null)}
//                   style={{
//                     ...styles.input,
//                     ...(focusedField === "email" ? styles.inputFocus : {}),
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div
//               ref={(el) => (fieldGroupsRef.current[1] = el)}
//               style={styles.fieldGroup}
//             >
//               <label style={styles.label} htmlFor="password">
//                 Password
//               </label>
//               <div style={styles.inputWrap}>
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onFocus={() => setFocusedField("password")}
//                   onBlur={() => setFocusedField(null)}
//                   style={{
//                     ...styles.input,
//                     ...(focusedField === "password" ? styles.inputFocus : {}),
//                     paddingRight: "2.8rem",
//                   }}
//                 />
//                 <button
//                   type="button"
//                   style={styles.eyeToggle}
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? Icons.eyeOff : Icons.eye}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div
//               ref={(el) => (fieldGroupsRef.current[2] = el)}
//               style={styles.fieldGroup}
//             >
//               <button
//                 ref={submitBtnRef}
//                 type="submit"
//                 style={{
//                   ...styles.submitBtn,
//                   ...(btnHover ? styles.submitBtnHover : {}),
//                 }}
//                 onMouseEnter={() => setBtnHover(true)}
//                 onMouseLeave={() => setBtnHover(false)}
//               >
//                 Sign In
//               </button>
//             </div>
//           </form>

//           <a href="#!" style={styles.forgotLink}>
//             Forgot your password?
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "../api"; // adjust path if needed
 
gsap.registerPlugin(ScrollTrigger);
 
/* ───────── SVG Icons ───────── */
const Icons = {
  eye: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  eyeOff: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  chevronDown: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
};
 
/* ───────── Product Data ───────── */
const products = [
  { id: 1, name: "Nebula Headset",   price: "$129", img: "https://placehold.co/280x200/1a1a2e/e0e0ff?text=Headset"  },
  { id: 2, name: "Photon Keyboard",  price: "$89",  img: "https://placehold.co/280x200/1a1a2e/e0e0ff?text=Keyboard" },
  { id: 3, name: "Quasar Mouse",     price: "$59",  img: "https://placehold.co/280x200/1a1a2e/e0e0ff?text=Mouse"    },
  { id: 4, name: "Eclipse Monitor",  price: "$349", img: "https://placehold.co/280x200/1a1a2e/e0e0ff?text=Monitor"  },
];
 
/* ───────── Styles ───────── */
const styles = {
  page: {
    margin: 0,
    padding: 0,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    background: "linear-gradient(135deg, #0b0b1a 0%, #121230 50%, #0b0b1a 100%)",
    color: "#e0e0ff",
    overflowX: "hidden",
    minHeight: "100vh",
  },
  heroSection: {
    position: "relative",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    overflow: "hidden",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 6vw, 5rem)",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
    background: "linear-gradient(90deg, #a78bfa, #60a5fa, #a78bfa)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1rem",
    opacity: 0,
    transform: "translateY(40px)",
  },
  heroSub: {
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    color: "#9898c8",
    maxWidth: 540,
    opacity: 0,
    transform: "translateY(30px)",
  },
  scrollCue: {
    position: "absolute",
    bottom: 40,
    opacity: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    color: "#7878aa",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  orbContainer: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  orb: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: 0.18,
  },
  marqueeWrap: {
    overflow: "hidden",
    padding: "2rem 0",
    borderTop: "1px solid rgba(160,160,220,0.08)",
    borderBottom: "1px solid rgba(160,160,220,0.08)",
  },
  marqueeTrack: {
    display: "flex",
    gap: "3rem",
    whiteSpace: "nowrap",
    willChange: "transform",
  },
  marqueeItem: {
    fontSize: "clamp(1rem, 2vw, 1.4rem)",
    fontWeight: 600,
    color: "#5a5a8a",
    flexShrink: 0,
  },
  productsSection: {
    padding: "6rem 2rem",
    maxWidth: 1200,
    margin: "0 auto",
  },
  productsHeading: {
    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
    fontWeight: 700,
    marginBottom: "3rem",
    textAlign: "center",
    color: "#c8c8ff",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "2rem",
  },
  productCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(160,160,220,0.1)",
    borderRadius: 16,
    overflow: "hidden",
    opacity: 0,
    transform: "translateY(50px)",
    transition: "border-color 0.3s",
  },
  productCardHover: {
    borderColor: "rgba(167,139,250,0.4)",
  },
  productImg: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    display: "block",
  },
  productInfo: { padding: "1.25rem" },
  productName: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.4rem" },
  productPrice: { color: "#a78bfa", fontWeight: 700, fontSize: "1rem" },
 
  /* --- Login Section --- */
  loginSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "6rem 2rem 8rem",
    position: "relative",
    zIndex: 1,
  },
  loginCard: {
    background: "rgba(18,18,48,0.85)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(160,160,220,0.12)",
    borderRadius: 20,
    padding: "3rem 2.5rem",
    width: "100%",
    maxWidth: 400,
    opacity: 0,
    transform: "translateY(60px) scale(0.95)",
  },
  loginTitle:    { fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.4rem", color: "#e0e0ff" },
  loginSubtitle: { fontSize: "0.9rem", color: "#7878aa", marginBottom: "2rem" },
  fieldGroup: {
    marginBottom: "1.4rem",
    opacity: 0,
    transform: "translateY(20px)",
  },
  label: {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#9898c8",
    marginBottom: "0.45rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  inputWrap: { position: "relative" },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    fontSize: "0.95rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(160,160,220,0.15)",
    borderRadius: 10,
    color: "#e0e0ff",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    boxSizing: "border-box",
  },
  inputFocus: {
    borderColor: "#a78bfa",
    boxShadow: "0 0 0 3px rgba(167,139,250,0.15)",
  },
  eyeToggle: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#7878aa",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotLink: {
    display: "block",
    textAlign: "center",
    marginTop: "1.2rem",
    fontSize: "0.82rem",
    color: "#7878aa",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  registerLink: {
    display: "block",
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "0.85rem",
    color: "#7878aa",
  },
  registerLinkAnchor: {
    color: "#a78bfa",
    fontWeight: 600,
    textDecoration: "none",
  },
};
 
/* ───────── Component ───────── */
const LoginPage = () => {
  const navigate = useNavigate();
 
  /* ── Refs ── */
  const heroTitleRef    = useRef(null);
  const heroSubRef      = useRef(null);
  const scrollCueRef    = useRef(null);
  const heroSectionRef  = useRef(null);
  const marqueeTrackRef = useRef(null);
  const productCardsRef = useRef([]);
  const loginCardRef    = useRef(null);
  const fieldGroupsRef  = useRef([]);
  const orbsRef         = useRef([]);
  const submitBtnRef    = useRef(null);
 
  /* ── State ── */
  const [showPassword, setShowPassword] = useState(false);
  const [btnHover,     setBtnHover]     = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [cardHover,    setCardHover]    = useState(null);
  const [isLoading,    setIsLoading]    = useState(false);
  const [formData,     setFormData]     = useState({ email: "", password: "" });
 
  /* ── GSAP Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero Entrance */
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .to(heroTitleRef.current,  { opacity: 1, y: 0, duration: 1.0 })
        .to(heroSubRef.current,    { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(scrollCueRef.current,  { opacity: 1, duration: 0.6 }, "-=0.3");
 
      /* Scroll Cue Bounce */
      gsap.to(scrollCueRef.current, {
        y: 10, repeat: -1, yoyo: true, duration: 1.2, ease: "sine.inOut",
      });
 
      /* Hero Parallax */
      gsap.to(heroSectionRef.current, {
        scrollTrigger: { trigger: heroSectionRef.current, start: "top top", end: "bottom top", scrub: true },
        y: -100,
        opacity: 0.3,
      });
 
      /* Marquee Scroll */
      if (marqueeTrackRef.current) {
        const trackWidth = marqueeTrackRef.current.scrollWidth / 2;
        gsap.to(marqueeTrackRef.current, { x: -trackWidth, repeat: -1, duration: 30, ease: "none" });
      }
 
      /* Product Card Stagger */
      if (productCardsRef.current.length) {
        gsap.to(productCardsRef.current, {
          scrollTrigger: { trigger: productCardsRef.current[0]?.parentElement, start: "top 80%" },
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
        });
      }
 
      /* Login Card Reveal */
      gsap.to(loginCardRef.current, {
        scrollTrigger: { trigger: loginCardRef.current, start: "top 85%" },
        opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)",
      });
 
      /* Login Fields Stagger */
      if (fieldGroupsRef.current.length) {
        gsap.to(fieldGroupsRef.current, {
          scrollTrigger: { trigger: loginCardRef.current, start: "top 80%" },
          opacity: 1, y: 0, duration: 0.5, stagger: 0.12, delay: 0.4, ease: "power2.out",
        });
      }
 
      /* Floating Orbs Drift */
      orbsRef.current.forEach((orb) => {
        if (!orb) return;
        gsap.to(orb, {
          x: `random(-60, 60)`, y: `random(-60, 60)`,
          repeat: -1, yoyo: true, duration: `random(6, 14)`, ease: "sine.inOut",
        });
      });
    });
 
    return () => ctx.revert();
  }, []);
 
  /* ── Input Change Handler ── */
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 
  /* ── Submit Handler (real auth logic from File 2) ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submitBtnRef.current) return;
 
    // Button press micro-animation
    gsap.timeline()
      .to(submitBtnRef.current, { scale: 0.95, duration: 0.1, ease: "power2.in" })
      .to(submitBtnRef.current, { scale: 1,    duration: 0.4, ease: "elastic.out(1, 0.4)" });
 
    setIsLoading(true);
 
    try {
      const response = await loginUser(formData);
 
      if (response.error) {
        // Server returned a handled error (e.g. wrong credentials)
        toast.error(response.error);
      } else {
        toast.success("Login successful!");
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.user ?? response.data?.user));
 
        // Exit animation → then navigate
        gsap.to(loginCardRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => navigate("/"),
        });
      }
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
 
  /* ── Derived button style (accounts for isLoading) ── */
  const submitBtnStyle = {
    width: "100%",
    padding: "0.85rem",
    fontSize: "1rem",
    fontWeight: 700,
    color: "#fff",
    background: isLoading
      ? "linear-gradient(135deg, #6366f1, #818cf8)"
      : btnHover
        ? "linear-gradient(135deg, #6d28d9, #4f46e5)"
        : "linear-gradient(135deg, #7c3aed, #6366f1)",
    border: "none",
    borderRadius: 12,
    cursor: isLoading ? "not-allowed" : "pointer",
    opacity: isLoading ? 0.75 : 1,
    letterSpacing: "0.02em",
    marginTop: "0.5rem",
    transition: "transform 0.2s, box-shadow 0.3s, background 0.3s",
    position: "relative",
    overflow: "hidden",
    boxShadow: btnHover && !isLoading ? "0 6px 24px rgba(124,58,237,0.4)" : "none",
    transform: btnHover && !isLoading ? "translateY(-1px)" : "none",
  };
 
  /* ── Marquee data ── */
  const marqueeWords = ["Nebula", "Photon", "Quasar", "Eclipse", "Vortex", "Zenith", "Prism", "Aurora"];
  const doubled = [...marqueeWords, ...marqueeWords];
 
  /* ── Orb config ── */
  const orbData = [
    { size: 300, top: "10%", left: "5%",  bg: "radial-gradient(circle, #7c3aed, transparent)" },
    { size: 250, top: "60%", left: "75%", bg: "radial-gradient(circle, #6366f1, transparent)" },
    { size: 200, top: "30%", left: "50%", bg: "radial-gradient(circle, #a78bfa, transparent)" },
  ];
 
  /* ── Render ── */
  return (
    <div style={styles.page}>
      {/* Toast Notifications */}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
 
      {/* Floating Orbs */}
      <div style={styles.orbContainer}>
        {orbData.map((o, i) => (
          <div
            key={i}
            ref={(el) => (orbsRef.current[i] = el)}
            style={{ ...styles.orb, width: o.size, height: o.size, top: o.top, left: o.left, background: o.bg }}
          />
        ))}
      </div>
 
      {/* Hero */}
      <section ref={heroSectionRef} style={styles.heroSection}>
        <h1 ref={heroTitleRef} style={styles.heroTitle}>The Future of Gear</h1>
        <p ref={heroSubRef} style={styles.heroSub}>
          Premium peripherals engineered for those who refuse to settle. Precision meets artistry.
        </p>
        <div ref={scrollCueRef} style={styles.scrollCue}>
          <span>Scroll</span>
          {Icons.chevronDown}
        </div>
      </section>
 
      {/* Marquee */}
      <div style={styles.marqueeWrap}>
        <div ref={marqueeTrackRef} style={styles.marqueeTrack}>
          {doubled.map((word, i) => (
            <span key={i} style={styles.marqueeItem}>{word} ✦</span>
          ))}
        </div>
      </div>
 
      {/* Products */}
      <section style={styles.productsSection}>
        <h2 style={styles.productsHeading}>Featured Collection</h2>
        <div style={styles.productsGrid}>
          {products.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => (productCardsRef.current[i] = el)}
              style={{ ...styles.productCard, ...(cardHover === p.id ? styles.productCardHover : {}) }}
              onMouseEnter={() => setCardHover(p.id)}
              onMouseLeave={() => setCardHover(null)}
            >
              <img src={p.img} alt={p.name} style={styles.productImg} />
              <div style={styles.productInfo}>
                <div style={styles.productName}>{p.name}</div>
                <div style={styles.productPrice}>{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* Login */}
      <section style={styles.loginSection}>
        <div ref={loginCardRef} style={styles.loginCard}>
          <h2 style={styles.loginTitle}>Welcome back</h2>
          <p style={styles.loginSubtitle}>Sign in to your account</p>
 
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div ref={(el) => (fieldGroupsRef.current[0] = el)} style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="email">Email</label>
              <div style={styles.inputWrap}>
                <input
                  id="email"
                  name="email"           // ← needed for handleChange
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...styles.input, ...(focusedField === "email" ? styles.inputFocus : {}) }}
                />
              </div>
            </div>
 
            {/* Password */}
            <div ref={(el) => (fieldGroupsRef.current[1] = el)} style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="password">Password</label>
              <div style={styles.inputWrap}>
                <input
                  id="password"
                  name="password"        // ← needed for handleChange
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...styles.input,
                    ...(focusedField === "password" ? styles.inputFocus : {}),
                    paddingRight: "2.8rem",
                  }}
                />
                <button
                  type="button"
                  style={styles.eyeToggle}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? Icons.eyeOff : Icons.eye}
                </button>
              </div>
            </div>
 
            {/* Submit */}
            <div ref={(el) => (fieldGroupsRef.current[2] = el)} style={styles.fieldGroup}>
              <button
                ref={submitBtnRef}
                type="submit"
                disabled={isLoading}
                style={submitBtnStyle}
                onMouseEnter={() => !isLoading && setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
              >
                {isLoading ? "Signing in…" : "Sign In"}
              </button>
            </div>
          </form>
 
          <a href="#!" style={styles.forgotLink}>Forgot your password?</a>
 
          {/* Register link (from File 1) */}
          <p style={styles.registerLink}>
            Don't have an account?{" "}
            <Link to="/register" style={styles.registerLinkAnchor}>Register</Link>
          </p>
        </div>
      </section>
    </div>
  );
};
 
export default LoginPage;