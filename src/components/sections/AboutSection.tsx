import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Code2, Coffee, Heart, MapPin, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      if (timelineItems) {
        gsap.fromTo(timelineItems, 
          { 
            x: -100, 
            opacity: 0, 
            rotateY: -90 
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Parallax effect for background elements
      gsap.to('.parallax-element', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const timelineData = [
    {
      year: "2024",
      title: "Full-Stack Evolution",
      description: "Mastering modern web technologies and creating immersive digital experiences",
      icon: <Code2 className="w-6 h-6" />,
      color: "from-cyan-500 to-blue-500"
    },
    {
      year: "2023",
      title: "Creative Breakthrough",
      description: "Discovered the perfect blend of design thinking and technical execution",
      icon: <Zap className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      year: "2022",
      title: "Code Journey Begins",
      description: "Started my adventure in the world of programming and digital creation",
      icon: <Heart className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const personalStats = [
    { label: "Projects Completed", value: "50+", icon: <Code2 /> },
    { label: "Coffee Consumed", value: "∞", icon: <Coffee /> },
    { label: "Lines of Code", value: "100K+", icon: <Zap /> },
    { label: "Years Experience", value: "2+", icon: <Calendar /> }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative py-20 overflow-hidden bg-gradient-to-br from-background via-background/95 to-card/50"
    >
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="parallax-element absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="parallax-element absolute bottom-20 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
        <div className="parallax-element absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold font-display mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ABOUT ME
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-mono">
              const aboutMe = "Passionate developer who believes in the magic of clean code and beautiful design"
            </p>
          </motion.div>

          {/* Personal Introduction */}
          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-12 mb-20"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-primary font-display">The Human Behind the Code</h3>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  I'm a <span className="text-primary font-mono">creative developer</span> who lives at the intersection 
                  of art and technology. My journey began with a simple curiosity about how digital experiences come to life, 
                  and it's evolved into a passion for crafting immersive, meaningful interactions.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new design trends, experimenting with cutting-edge 
                  technologies, or sketching ideas that bridge the gap between <span className="text-secondary font-mono">imagination and implementation</span>.
                </p>
                <p>
                  I believe that the best digital experiences don't just function—they <span className="text-accent font-mono">inspire</span>, 
                  surprise, and leave users with a sense of wonder.
                </p>
              </div>
              
              {/* Location & Status */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm">Nepal</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-mono text-sm">Available for work</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {personalStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  <div className="text-primary mb-3 flex justify-center group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary font-mono mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Journey Timeline */}
          <motion.div 
            variants={itemVariants}
            className="mb-20"
          >
            <h3 className="text-4xl font-bold text-center mb-12 font-display">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MY JOURNEY
              </span>
            </h3>
            
            <div ref={timelineRef} className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent opacity-50" />
              
              <div className="space-y-12">
                {timelineData.map((item, index) => (
                  <motion.div
                    key={index}
                    className="timeline-item relative flex items-start gap-8"
                    whileHover={{ x: 10 }}
                  >
                    {/* Timeline Node */}
                    <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg`}>
                      {item.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-2xl font-bold text-primary font-mono">{item.year}</span>
                        <div className="h-px bg-gradient-to-r from-primary to-transparent flex-1" />
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-card/20 backdrop-blur-sm border border-border rounded-2xl p-12"
          >
            <h3 className="text-3xl font-bold mb-6 font-display">My Philosophy</h3>
            <blockquote className="text-2xl italic text-muted-foreground leading-relaxed">
              "Code is poetry, design is emotion, and together they create experiences that matter."
            </blockquote>
            <cite className="block mt-6 text-primary font-mono">— Pramesh Basnet</cite>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
