import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Hero.css";

const pizza = [
  { 
    name: "Pepperoni", img: "/images/pizza1.png",
    leftImg: "/images/pizza1-1.png", rightImg: "/images/pizza1-2.png",
    leftStyle: { width: "580px", height: "550px", top: "-30px", left: "-120px", rotate: -15 },
    rightStyle: { width: "580px", height: "550px", top: "-30px", right: "-100px", rotate: 12 },
    title: "Classic Pepperoni Pizza",
    description: "A timeless favorite with crispy pepperoni, mozzarella, and a rich tomato base.",
    background: "radial-gradient(circle at center, #1a0000 0%, #0d0000 50%, #000000 100%)",
    price: { S: 8.99, M: 12.99, L: 16.99 }, rating: 4.5
  },
  { 
    name: "Spinach", img: "/images/pizza2.png",
    leftImg: "/images/pizza2-1.png", rightImg: "/images/pizza2-2.png",
    title: "Savory Spinach Pizza",
    leftStyle: { width: "680px", height: "490px", top: "10px", left: "-190px", rotate: -15 },
    rightStyle: { width: "680px", height: "580px", top: "-60px", right: "-190px", rotate: -120 },
    description: "Fresh spinach layered over a rich tomato base, topped with creamy mozzarella and herbs.",
    background: "radial-gradient(circle at center, #001a00 0%, #000d00 50%, #000000 100%)",
    price: { S: 9.49, M: 13.49, L: 17.49 }, rating: 4.2
  },
  { 
    name: "Paneer", img: "/images/pizza3.png",
    leftImg: "/images/pizza3-1.png", rightImg: "/images/pizza3-2.png",
    title: "Paneer Tikka Pizza",
    leftStyle: { width: "600px", height: "550px", top: "-100px", left: "-100px", rotate: -15 },
    rightStyle: { width: "600px", height: "520px", top: "-100px", right: "-170px", rotate: 12 },
    description: "Smoky marinated paneer cubes baked with onions, peppers, and melted cheese.",
    background: "radial-gradient(circle at center, #1a0a00 0%, #0d0500 50%, #000000 100%)",
    price: { S: 10.99, M: 14.99, L: 18.99 }, rating: 4.7
  },
  { 
    name: "Margherita", img: "/images/pizza4.png",
    leftImg: "/images/pizza4-1.png", rightImg: "/images/pizza4-2.png",
    title: "Classic Margherita Pizza",
    leftStyle: { width: "550px", height: "520px", top: "-80px", left: "-120px", rotate: -15 },
    rightStyle: { width: "550px", height: "520px", top: "-70px", right: "-90px", rotate: 12 },
    description: "Fresh mozzarella, vibrant tomato sauce, and aromatic basil on a perfectly baked crust.",
    background: "radial-gradient(circle at center, #0a1a00 0%, #050d00 50%, #000000 100%)",
    price: { S: 7.99, M: 11.99, L: 15.99 }, rating: 4.8
  },
  { 
    name: "Veggie", img: "/images/pizza5.png",
    leftImg: "/images/pizza5-1.png", rightImg: "/images/pizza5-2.png",
    title: "Veggie Delight Pizza",
    leftStyle: { width: "590px", height: "500px", top: "-20px", left: "-120px", rotate: -15 },
    rightStyle: { width: "590px", height: "500px", top: "-20px", right: "-170px", rotate: 12 },
    description: "A colorful medley of fresh vegetables layered over a rich tomato base.",
    background: "radial-gradient(circle at center, #001a0a 0%, #000d05 50%, #000000 100%)",
    price: { S: 8.49, M: 12.49, L: 16.49 }, rating: 4.3
  },
  { 
    name: "BBQ Chicken", img: "/images/pizza6.png",
    leftImg: "/images/pizza6-1.png", rightImg: "/images/pizza6-2.png",
    title: "Smoky BBQ Chicken Pizza",
    leftStyle: { width: "650px", height: "500px", top: "20px", left: "-160px", rotate: -70 },
    rightStyle: { width: "650px", height: "500px", top: "20px", right: "-160px", rotate: -22 },
    description: "Tender BBQ chicken pieces with caramelized onions and smoky sauce.",
    background: "radial-gradient(circle at center, #1a0500 0%, #0d0200 50%, #000000 100%)",
    price: { S: 11.99, M: 15.99, L: 19.99 }, rating: 4.6
  },
  { 
    name: "Pineapple", img: "/images/pizza7.png",
    leftImg: "/images/pizza7-1.png", rightImg: "/images/pizza7-2.png",
    title: "Hawaiian Pineapple Pizza",
    leftStyle: { width: "500px", height: "450px", top: "20px", left: "-80px", rotate: -30 },
    rightStyle: { width: "500px", height: "450px", top: "-20px", right: "-80px", rotate: 12 },
    description: "Sweet pineapple chunks paired with savory ham and melted cheese.",
    background: "radial-gradient(circle at center, #1a1a00 0%, #0d0d00 50%, #000000 100%)",
    price: { S: 9.99, M: 13.99, L: 17.99 }, rating: 4.1
  },
];

const Particle = ({ index }) => {
  const colors = ["#ffcc00", "#ff6600", "#ff3300", "#ffaa00", "#ff8800"];
  const size = Math.random() * 8 + 4;
  return (
    <motion.div
      className="particle"
      style={{
        width: size, height: size,
        background: colors[index % colors.length],
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        left: `${30 + Math.random() * 40}%`,
        top: `${30 + Math.random() * 40}%`,
      }}
      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      animate={{
        opacity: 0, scale: 0,
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
      }}
      transition={{ duration: 0.8 + Math.random() * 0.5, ease: "easeOut" }}
    />
  );
};

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push("★");
    else if (i - rating < 1) stars.push("⯨");
    else stars.push("☆");
  }
  return (
    <div className="star-rating">
      {stars.map((s, i) => <span key={i} className={s === "☆" ? "star empty" : "star filled"}>{s === "⯨" ? "★" : s}</span>)}
      <span className="rating-num">({rating})</span>
    </div>
  );
};

const Hero = () => {
  const steps = 7;
  const stepRad = Math.PI / steps;

  const [stepIndex, setStepIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [showParticles, setShowParticles] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isAnimating, setIsAnimating] = useState(false);

  const heroRef = useRef(null);
  const touchStartX = useRef(0);
  const autoPlayRef = useRef(null);

  const radius = 350;
  const offset = 80 / radius;
  const startAngle = Math.PI + offset;
  const angle = startAngle + stepIndex * stepRad;

  const move = useCallback((dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const dirSign = dir === "right" ? 1 : -1;
    setStepIndex(prev => (prev + dirSign + steps) % steps);
    setRotation(prev => prev + (dirSign * 90));
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 800);
    setTimeout(() => {
      setActiveIndex(prev => (prev + dirSign + pizza.length) % pizza.length);
    }, 300);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") move("right");
      else if (e.key === "ArrowLeft") move("left");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [move]);

  // Swipe gestures
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(diff) > 50) move(diff < 0 ? "right" : "left");
    };
    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchend", handleTouchEnd);
    return () => { el.removeEventListener("touchstart", handleTouchStart); el.removeEventListener("touchend", handleTouchEnd); };
  }, [move]);

  // Auto-play
  useEffect(() => {
    if (isPaused || loading) return;
    autoPlayRef.current = setInterval(() => move("right"), 4000);
    return () => clearInterval(autoPlayRef.current);
  }, [isPaused, loading, move]);

  // 3D tilt
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x: y, y: x });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div
          className="loading-pizza"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        >
          🍕
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Preparing your pizza...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="hero" ref={heroRef} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => { setIsPaused(false); handleMouseLeave(); }}>
      <motion.div className="hero-bg" animate={{ background: pizza[activeIndex].background }} transition={{ duration: 1, ease: "easeInOut" }} />

      <motion.img key={pizza[activeIndex].leftImg} src={pizza[activeIndex].leftImg} alt="" className="left-side"
        style={{ position: "absolute", left: pizza[activeIndex].leftStyle.left, width: pizza[activeIndex].leftStyle.width, height: pizza[activeIndex].leftStyle.height, rotate: pizza[activeIndex].leftStyle.rotate }}
        initial={{ top: "-200px", opacity: 0 }} animate={{ top: pizza[activeIndex].leftStyle.top, opacity: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }} />

      <motion.img key={pizza[activeIndex].rightImg} src={pizza[activeIndex].rightImg} alt="" className="right-side"
        style={{ position: "absolute", right: pizza[activeIndex].rightStyle.right, width: pizza[activeIndex].rightStyle.width, height: pizza[activeIndex].rightStyle.height, rotate: pizza[activeIndex].rightStyle.rotate }}
        initial={{ top: "-200px", opacity: 0 }} animate={{ top: pizza[activeIndex].rightStyle.top, opacity: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} />

      {/* Particles */}
      <AnimatePresence>
        {showParticles && Array.from({ length: 15 }).map((_, i) => <Particle key={i} index={i} />)}
      </AnimatePresence>

      <div className="hero-content">
        <div className="hero-text">
          <motion.h1 key={pizza[activeIndex].title} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {pizza[activeIndex].title}
          </motion.h1>
          <motion.p key={pizza[activeIndex].description} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            {pizza[activeIndex].description}
          </motion.p>

          <StarRating rating={pizza[activeIndex].rating} />

          {/* Size Selector */}
          <div className="size-selector">
            {["S", "M", "L"].map(size => (
              <button key={size} className={`size-btn ${selectedSize === size ? "active" : ""}`} onClick={() => setSelectedSize(size)}>
                {size === "S" ? "Small" : size === "M" ? "Medium" : "Large"}
              </button>
            ))}
          </div>


        </div>

        <div className="circular-slider" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="circle outer-circle">
            <div className="circle inner-circle">
              <motion.div className="center-image"
                animate={{ rotate: rotation, rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ perspective: 1000 }}
              >
                <img src={pizza[activeIndex].img} alt={pizza[activeIndex].name} />
              </motion.div>
            </div>
            <div className="moving-ball" style={{ transform: `rotate(${(angle * 180) / Math.PI}deg) translate(${radius - 10}px)` }} />
          </div>

          <div className="circle-text">
            <svg viewBox="0 0 1100 1200" width="100%" height="100%">
              <defs>
                <path id="circlePath" d="M600,600 m-550,0 a500,500 0 1,1 1000,0 a500,500 0 1,1 -1000,0" />
              </defs>
              <text fill="white" fontSize="24" letterSpacing="8">
                <textPath href="#circlePath" startOffset="50%">
                  {pizza.map((p) => ` • ${p.name.toUpperCase()} `).join("")}
                </textPath>
              </text>
            </svg>
          </div>

          <button className="arrow left" onClick={() => move('left')}>←</button>
          <button className="arrow right" onClick={() => move('right')}>→</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
