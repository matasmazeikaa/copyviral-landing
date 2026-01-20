"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  Play,
  Zap,
  Layers,
  Clock,
  Wand2,
  ArrowRight,
  Check,
  Film,
  Type,
  Scissors,
  Copy,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import Logo from "@/components/Logo";

// Neural Network Animation Component
function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      connections: number[];
      pulsePhase: number;
    }

    const nodes: Node[] = [];
    const nodeCount = 40;
    const connectionDistance = 150;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Find connections
        node.connections = [];
        nodes.forEach((other, j) => {
          if (i !== j) {
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDistance) {
              node.connections.push(j);
            }
          }
        });
      });

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach((j) => {
          if (j > i) {
            const other = nodes[j];
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const opacity = 1 - dist / connectionDistance;

            // Animated gradient along connection
            const gradient = ctx.createLinearGradient(
              node.x,
              node.y,
              other.x,
              other.y
            );
            const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7;

            gradient.addColorStop(
              0,
              `rgba(168, 85, 247, ${opacity * 0.4 * pulse})`
            );
            gradient.addColorStop(
              0.5,
              `rgba(236, 72, 153, ${opacity * 0.6 * pulse})`
            );
            gradient.addColorStop(
              1,
              `rgba(168, 85, 247, ${opacity * 0.4 * pulse})`
            );

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const pulse = Math.sin(time * 3 + node.pulsePhase) * 0.5 + 1;

        // Glow
        const glowGradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 8 * pulse
        );
        glowGradient.addColorStop(0, "rgba(168, 85, 247, 0.3)");
        glowGradient.addColorStop(0.5, "rgba(236, 72, 153, 0.1)");
        glowGradient.addColorStop(1, "rgba(168, 85, 247, 0)");

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 8 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + pulse * 0.2})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

// Floating particles component - pre-computed positions
const particleData = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  initialX: `${(i * 5) % 100}%`,
  initialY: `${(i * 7 + 20) % 100}%`,
  duration: 10 + (i % 10),
  delay: (i * 0.5) % 5,
}));

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleData.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          initial={{
            x: particle.initialX,
            y: particle.initialY,
            opacity: 0,
          }}
          animate={{
            y: [null, "-100vh"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Header component
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center group">
          <Logo className="text-white" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-slate-300 hover:text-white transition-colors"
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Pricing
          </a>
        </nav>

        <a
          href="https://app.copyviral.com"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-400 hover:to-pink-400 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 btn-shine flex items-center gap-2"
        >
          <span>Open App</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.header>
  );
}

// Hero section
function HeroSection() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!videoUrl) return;
    setIsAnalyzing(true);

    // Redirect to app immediately to start creating a project with the Instagram link
    window.location.href = `https://app.copyviral.com/create?url=${encodeURIComponent(videoUrl)}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 network-bg" />
      <NeuralNetwork />
      <FloatingParticles />

      {/* Radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-pink-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="text-sm text-slate-300">
            AI-Powered Video Editing
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Copy Any{" "}
          <span className="gradient-text-animated">Viral Video</span>
          <br />
          in Seconds
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto"
        >
          Paste a viral video link and let AI analyze its style, cuts, and
          pacing. Then recreate the magic with your own content.
        </motion.p>

        {/* URL Input */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="input-glow relative">
            <div className="relative flex items-center glass rounded-2xl p-2">
              <div className="flex items-center gap-3 pl-4 pr-2 border-r border-white/10">
                <Film className="w-5 h-5 text-purple-400" />
              </div>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste an Instagram link..."
                className="flex-1 bg-transparent px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none text-lg"
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              />
              <button
                onClick={handleAnalyze}
                disabled={!videoUrl || isAnalyzing}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-400 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/25 btn-shine"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Copy Style</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick examples */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <span className="text-sm text-slate-500">Try:</span>
            {["Instagram"].map((platform) => (
              <button
                key={platform}
                onClick={() =>
                  setVideoUrl(`https://instagram.com/${platform.toLowerCase().replace(" ", "-")}`)
                }
                className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white glass glass-hover transition-all"
              >
                {platform}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-[-100px] left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-slate-500"
          >
            <span className="text-xs uppercase tracking-wider">Explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Features section
const features = [
  {
    icon: Wand2,
    title: "AI Reference Copy",
    description:
      "Analyze any viral video and automatically copy its cuts, pacing, and overall editing style.",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: Play,
    title: "Real-time Preview",
    description:
      "See your edits come to life instantly with our powerful real-time preview engine.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Layers,
    title: "Multi-track Timeline",
    description:
      "Professional timeline editor with support for multiple video, audio, and text layers.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Zap,
    title: "In-Browser Rendering",
    description:
      "Export high-quality videos up to 1080p directly in your browser.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Scissors,
    title: "Smart Editing Tools",
    description:
      "Split, trim, duplicate, and arrange clips with keyboard shortcuts for lightning-fast editing.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Type,
    title: "Text Overlays",
    description:
      "Add custom text overlays with full control over position, timing, fonts, and colors.",
    gradient: "from-indigo-500 to-purple-500",
  },
];

function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/5 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-300">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Go Viral</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Professional-grade video editing tools combined with AI-powered
            analysis to help you create content that stands out.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl glass glass-hover card-hover">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How it works section
const steps = [
  {
    step: "01",
    title: "Paste a Link",
    description:
      "Drop any viral video link from Instagram Reels or Posts.",
    icon: Copy,
  },
  {
    step: "02",
    title: "AI Analysis",
    description:
      "Our AI analyzes the video's editing style, cuts, pacing, and timing.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Import Your Media",
    description:
      "Add your own videos, audio files, and text overlays to the timeline.",
    icon: Film,
  },
  {
    step: "04",
    title: "Export & Share",
    description:
      "Render your video in high quality and share it across all platforms.",
    icon: Play,
  },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Clock className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-300">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Create in <span className="gradient-text">Four Steps</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From viral inspiration to finished edit in minutes, not hours.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative"
              >
                <div className="text-center">
                  {/* Step number */}
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center relative z-10 mx-auto">
                      <step.icon className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white z-20">
                      {step.step}
                    </div>
                    {/* Glow */}
                    <div className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-purple-500/20 blur-xl" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Pricing section
const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Try CopyViral risk-free",
    features: [
      "3 AI generations (lifetime)",
      "720p export quality",
      "Basic editing tools",
      "Community support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "Unlimited power for creators",
    features: [
      "Unlimited AI generations",
      "1080p export quality",
      "Advanced editing tools",
      "Priority support",
      "No watermark",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
];

function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[200px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-300">Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Start free and upgrade as you grow. No hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-medium text-white">
                  Most Popular
                </div>
              )}
              <div
                className={`h-full p-8 rounded-2xl ${
                  plan.popular
                    ? "glass border-purple-500/30 glow-purple"
                    : "glass"
                } card-hover`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-slate-400">{plan.period}</span>
                  )}
                </div>
                <p className="text-slate-400 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-purple-400" />
                      </div>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.popular ? "https://app.copyviral.com/subscription" : "https://app.copyviral.com"}
                  className={`block w-full py-3 rounded-xl font-semibold transition-all text-center ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 shadow-lg shadow-purple-500/25 btn-shine"
                      : "glass glass-hover text-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-300">Start Creating Today</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Go{" "}
            <span className="gradient-text-animated">Viral?</span>
          </h2>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join thousands of creators who are already using CopyViral to create
            scroll-stopping content.
          </p>

          <a
            href="https://app.copyviral.com"
            className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg hover:from-purple-400 hover:to-pink-400 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 btn-shine items-center gap-2"
          >
            <span>Open CopyViral</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/10">
      <div className="absolute inset-0 bg-slate-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <a href="#" className="flex items-center mb-4">
              <Logo className="text-white" />
            </a>
            <p className="text-slate-400 max-w-sm">
              AI-powered video editor that helps you copy viral video styles and
              recreate trending content in minutes.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {["Features", "Pricing"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://app.copyviral.com"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Open App
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@copyviral.com"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://app.copyviral.com/subscribe"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Subscribe
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} CopyViral. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="/privacy"
              className="text-slate-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-slate-500 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function LandingPage() {
  return (
    <main className="bg-slate-950 text-white overflow-x-hidden">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
