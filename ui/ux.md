import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PortfolioUI() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900 text-gray-100 overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-50"
      />

      {/* Cursor Spotlight */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl z-0"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      />

      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.04),transparent_40%)]" />

      {/* Navbar */}
      <div className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="flex justify-between items-center px-8 py-4">
          <h1 className="text-lg font-semibold tracking-wide text-white">
            Anfal Hidayat
          </h1>
          <div className="space-x-8 text-sm text-gray-300">
            <a className="hover:text-white transition" href="#">Home</a>
            <a className="hover:text-white transition" href="#">About</a>
            <a className="hover:text-white transition" href="#">Portfolio</a>
            <a className="hover:text-white transition" href="#">Contact</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="min-h-screen flex items-center px-8 pt-24">
        <div className="grid md:grid-cols-2 gap-10 items-center w-full">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <h2 className="text-5xl font-bold leading-tight mb-6 text-white">
              Building Engineering Systems
              <br />
              <span className="text-gray-300">
                From Physical to Digital
              </span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg">
              Mechanical & Electrical Engineer specializing in Fuel Systems,
              Automation, and scalable web platforms.
            </p>
            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button className="rounded-2xl px-6 py-3 bg-white text-black hover:bg-gray-200">
                  Download CV
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="outline"
                  className="rounded-2xl px-6 py-3 border-white/30 text-white hover:bg-white/10"
                >
                  View Work
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ rotate: 3, scale: 1.05 }}
              className="w-72 h-72 rounded-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl border border-white/10"
            />
          </motion.div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="px-8 py-24">
        <h3 className="text-3xl font-semibold mb-12 text-white">
          Selected Work
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden hover:bg-white/10 transition">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="h-48 bg-gradient-to-br from-gray-800 via-gray-900 to-black"
                />
                <CardContent className="p-5">
                  <h4 className="font-semibold text-lg mb-2 text-white">
                    Fuel System Project
                  </h4>
                  <p className="text-sm text-gray-300">
                    Design and implementation of fuel distribution systems.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-400 border-t border-white/10">
        © 2026 Anfal Hidayat · Built with precision
      </footer>
    </div>
  );
}
