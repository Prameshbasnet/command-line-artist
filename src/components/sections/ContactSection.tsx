import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail, MapPin, MessageCircle, Phone, Send, Twitter } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles
      const particles = [];
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'contact-particle';
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #00ffff, #ff00ff);
          border-radius: 50%;
          opacity: 0.3;
          pointer-events: none;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        sectionRef.current?.appendChild(particle);
        particles.push(particle);

        gsap.to(particle, {
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          duration: Math.random() * 8 + 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      return () => {
        particles.forEach(particle => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    
    // Success animation
    gsap.to(formRef.current, {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 1
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub", color: "hover:text-purple-400" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "hover:text-cyan-400" },
    { icon: Mail, href: "mailto:hello@prameshbasnet.com", label: "Email", color: "hover:text-green-400" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative py-20 overflow-hidden bg-gradient-to-br from-background via-black to-background"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'gridPulse 4s ease-in-out infinite'
          }}
        />
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
            <h2 className="text-6xl md:text-8xl font-bold font-display mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                LET'S CREATE
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-mono">
              Ready to bring your vision to life? Let's build something extraordinary together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div 
              variants={itemVariants}
              className="space-y-8"
            >
              <div className="bg-card/20 backdrop-blur-sm border border-border rounded-2xl p-8">
                <h3 className="text-3xl font-bold mb-8 text-primary font-display">Send a Message</h3>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-mono text-muted-foreground mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors font-mono"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-mono text-muted-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors font-mono"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-mono text-muted-foreground mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-black/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors resize-none font-mono"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-lg text-lg hover:shadow-neon transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Social */}
            <motion.div 
              variants={itemVariants}
              className="space-y-8"
            >
              {/* Direct Contact */}
              <div className="bg-card/20 backdrop-blur-sm border border-border rounded-2xl p-8">
                <h3 className="text-3xl font-bold mb-8 text-primary font-display">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors group">
                    <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-mono text-sm text-muted-foreground">Email</p>
                      <a href="mailto:hello@prameshbasnet.com" className="text-foreground hover:text-primary transition-colors">
                        hello@prameshbasnet.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors group">
                    <Phone className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-mono text-sm text-muted-foreground">Phone</p>
                      <a href="tel:+977-9800000000" className="text-foreground hover:text-primary transition-colors">
                        +977-980-000-0000
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors group">
                    <MapPin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-mono text-sm text-muted-foreground">Location</p>
                      <span className="text-foreground">Kathmandu, Nepal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-card/20 backdrop-blur-sm border border-border rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary font-display">Follow Me</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-all duration-300 group ${social.color}`}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-sm">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Fun Fact */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-2xl p-8 text-center">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Quick Response</h4>
                <p className="text-muted-foreground font-mono">
                  I typically respond within 24 hours. Coffee-powered replies guaranteed! ☕
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-20 py-12 border-t border-border"
          >
            <h3 className="text-4xl font-bold mb-4 font-display">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 font-mono">
              Let's turn your ideas into digital reality.
            </p>
            <motion.button
              className="px-12 py-4 bg-transparent border-2 border-primary text-primary font-bold rounded-full text-lg hover:bg-primary hover:text-black transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="group-hover:animate-pulse">START A PROJECT</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
