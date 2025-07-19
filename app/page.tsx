"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Moon,
  Sun,
  Code,
  User,
  MessageSquare,
  ArrowRight,
  Sparkles,
  X,
  Calendar,
  Users,
  Star,
  Eye,
  Zap,
  Layers,
  Globe,
  Briefcase,
  GraduationCap,
  Trophy,
} from "lucide-react"
import Link from "next/link"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

// Smooth Cursor Component (Fixed)
function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const cursorPosition = useRef({ x: 0, y: 0 })

  const updateCursor = useCallback(() => {
    if (!cursorRef.current || !cursorDotRef.current) return

    // Smooth interpolation
    cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * 0.15
    cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * 0.15

    cursorRef.current.style.transform = `translate3d(${cursorPosition.current.x - 20}px, ${cursorPosition.current.y - 20}px, 0)`
    cursorDotRef.current.style.transform = `translate3d(${mousePosition.current.x - 4}px, ${mousePosition.current.y - 4}px, 0)`

    requestAnimationFrame(updateCursor)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
    }

    document.addEventListener("mousemove", handleMouseMove)
    updateCursor()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [updateCursor])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-10 h-10 border-2 border-blue-500/50 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-50"
        style={{ willChange: "transform" }}
      />
    </>
  )
}

// Enhanced Magnetic Button (Fixed Content Display)
function MagneticButton({ children, className = "", onClick, variant = "default", size = "default", ...props }: any) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(button, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(1.2)",
      })
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    }

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseenter", handleMouseEnter)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseenter", handleMouseEnter)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const baseStyles = "relative overflow-hidden transition-all duration-300"
  const variantStyles = {
    default: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0",
    outline: "bg-white/5 border border-white/20 hover:bg-white/10 backdrop-blur-sm",
  }
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size] || sizeStyles.default} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">{children}</span>
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </button>
  )
}

// Project Detail Modal (Enhanced)
function ProjectDetailModal({ project, isOpen, onClose }: any) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-2xl border border-white/20"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <motion.h2
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.title}
                </motion.h2>
                <MagneticButton variant="outline" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </MagneticButton>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-6 flex items-center justify-center">
                    <Globe className="h-16 w-16 text-blue-500" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                        Project Timeline
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{project.timeline}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-green-500" />
                        Team Size
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{project.teamSize}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Star className="h-5 w-5 mr-2 text-yellow-500" />
                        Key Achievements
                      </h3>
                      <ul className="space-y-2">
                        {project.achievements?.map((achievement: string, index: number) => (
                          <motion.li
                            key={index}
                            className="flex items-start text-gray-600 dark:text-gray-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <Zap className="h-4 w-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0" />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.fullDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Layers className="h-5 w-5 mr-2 text-purple-500" />
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech: string) => (
                          <Badge
                            key={tech}
                            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {project.features?.map((feature: string, index: number) => (
                          <motion.li
                            key={index}
                            className="flex items-start text-gray-600 dark:text-gray-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <MagneticButton className="flex-1" onClick={() => window.open(project.live, "_blank")}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Live
                      </MagneticButton>
                      <MagneticButton
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </MagneticButton>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Text Reveal Animation
function TextReveal({ children, className, delay = 0 }: { children: string; className?: string; delay?: number }) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const text = textRef.current
    if (!text) return

    const chars = children.split("")
    text.innerHTML = chars
      .map((char) => `<span class="char inline-block">${char === " " ? "&nbsp;" : char}</span>`)
      .join("")

    gsap.fromTo(
      text.querySelectorAll(".char"),
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)",
        delay,
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
        },
      },
    )
  }, [children, delay])

  return <div ref={textRef} className={className} />
}

// Animated Counter
function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!countRef.current) return

    gsap.fromTo(
      countRef.current,
      { textContent: 0 },
      {
        textContent: end,
        duration,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: countRef.current,
          start: "top 80%",
        },
      },
    )
  }, [end, duration])

  return (
    <span>
      <span ref={countRef}>0</span>
      {suffix}
    </span>
  )
}

// Vertical Project Timeline Streamline - Straight Line Only
function ProjectTimelineStreamline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return

    // Animate the main vertical line on scroll
    gsap.fromTo(
      lineRef.current,
      { height: "0%" },
      {
        height: "100%",
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      },
    )

    // Animate each dot as its corresponding project comes into view
    dotsRef.current.forEach((dot, index) => {
      if (!dot) return

      gsap.fromTo(
        dot,
        {
          scale: 0,
          opacity: 0,
          backgroundColor: "#374151",
        },
        {
          scale: 1,
          opacity: 1,
          backgroundColor: "#3b82f6",
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: `.project-card-${index}`,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Add pulsing effect when active
      gsap.to(dot, {
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: `.project-card-${index}`,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none pause",
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const addDotRef = (el: HTMLDivElement, index: number) => {
    if (el) {
      dotsRef.current[index] = el
    }
  }

  return (
    <div ref={timelineRef} className="absolute left-8 top-0 bottom-0 w-1 hidden lg:block" style={{ height: "100%" }}>
      {/* Main straight vertical line */}
      <div
        ref={lineRef}
        className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-80"
        style={{ height: "0%" }}
      />

      {/* Connection dots for each project */}
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          ref={(el) => el && addDotRef(el, index)}
          className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white bg-gray-600 shadow-lg"
          style={{
            top: `${20 + index * 30}%`,
            zIndex: 10,
          }}
        />
      ))}

      {/* Flowing particles */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-80"
            animate={{
              y: [0, 200, 400, 600],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 1.5,
              ease: "linear",
            }}
            style={{ left: "-4px" }}
          />
        ))}
      </div>
    </div>
  )
}

// Floating Particles (Optimized)
function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const particles: HTMLDivElement[] = []
    const particleCount = 25

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute rounded-full pointer-events-none"
      particle.style.cssText = `
        width: ${Math.random() * 3 + 2}px;
        height: ${Math.random() * 3 + 2}px;
        background: radial-gradient(circle, #3b82f6, #8b5cf6);
        opacity: ${Math.random() * 0.4 + 0.2};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        will-change: transform;
      `
      containerRef.current.appendChild(particle)
      particles.push(particle)

      gsap.to(particle, {
        y: -Math.random() * 150 - 50,
        x: Math.random() * 50 - 25,
        rotation: Math.random() * 360,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      })
    }

    return () => {
      particles.forEach((particle) => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [viewMode, setViewMode] = useState<"resume" | "showcase">("showcase")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Enhanced GSAP Timeline
    const tl = gsap.timeline()

    // Hero animations
    tl.from(".hero-title", {
      y: 120,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        ".hero-subtitle",
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .from(
        ".hero-description",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".hero-buttons",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.2",
      )

    // Section animations
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section.children,
          {
            y: 80,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "bottom 25%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    })

    // Floating cards
    gsap.utils.toArray(".float-card").forEach((card: any, index) => {
      gsap.to(card, {
        y: -10,
        rotation: Math.random() * 2 - 1,
        duration: 2.5 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/assets/priyanshu- resume-techie-2025-2.pdf"; // Adjust the path as per your file location
  link.download = "Priyanshu_Kumar_Resume.pdf";
  document.body.appendChild(link); // Needed for Firefox
  link.click();
  document.body.removeChild(link);
};

  const openProjectModal = (project: any) => {
    setSelectedProject(project)
    setIsProjectModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsProjectModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const skills = [
    { name: "React.js", level: 90, color: "#61dafb" },
    { name: "JavaScript", level: 85, color: "#f7df1e" },
    { name: "TypeScript", level: 80, color: "#3178c6" },
    { name: "Python", level: 85, color: "#3776ab" },
    { name: "Tailwind CSS", level: 90, color: "#06b6d4" },
    { name: "Node.js", level: 75, color: "#339933" },
    { name: "GSAP", level: 75, color: "#88ce02" },
    { name: "MongoDB", level: 70, color: "#47A248" },
  ]

  const projects = [
    {
      title: "TextFlow – Collaborative Content Editor",
      description:
        "Engineered a real-time collaborative editor with advanced text editing and visual workflows. Boosted team productivity by 40% through seamless integration and intuitive design.",
      fullDescription:
        "TextFlow is a comprehensive collaborative content editing platform that revolutionizes how teams create and manage content. Built with modern web technologies, it features real-time synchronization, advanced text editing capabilities, and intuitive visual workflows that enhance productivity and streamline collaboration processes.",
      tech: ["ReactJS", "Firebase", "WebSocket", "Redux", "Node.js", "MongoDB"],
      github: "https://github.com/priyanshuKumar56/Textflow-collabrative-editor",
      live: "https://textflow-collabrative-editor.vercel.app/",
      timeline: "6 months (Jan 2024 - Jun 2024)",
      teamSize: "4 developers",
      achievements: [
        "Increased team productivity by 40%",
        "Reduced content creation time by 60%",
        "Implemented real-time collaboration for 100+ concurrent users",
        "Achieved 99.9% uptime with robust error handling",
      ],
      features: [
        "Real-time collaborative editing",
        "Advanced text formatting and styling",
        "Version control and history tracking",
        "Comment and suggestion system",
        "Export to multiple formats (PDF, DOCX, HTML)",
        "Team management and permissions",
        "Integration with popular tools (Slack, Trello)",
      ],
    },
    {
      title: "The Royal Cuisine – Restaurant Platform",
      description:
        "Developed an interactive restaurant website featuring dynamic booking system and responsive menu display. Integrated Google Maps API with real-time seat reservation functionality.",
      fullDescription:
        "The Royal Cuisine is a comprehensive restaurant management platform that combines elegant design with powerful functionality. It features a dynamic booking system, interactive menu displays, and seamless integration with Google Maps for location services and real-time seat reservations.",
      tech: ["JavaScript", "HTML5/CSS3", "Google Maps API", "PHP", "MySQL"],
      github: "https://github.com/priyanshuKumar56/theroyalcuisine",
      live: "https://theroyalcuisine.vercel.app/",
      timeline: "4 months (Sep 2023 - Dec 2023)",
      teamSize: "3 developers",
      achievements: [
        "Increased online reservations by 150%",
        "Reduced booking conflicts by 90%",
        "Improved customer satisfaction scores by 35%",
        "Optimized for mobile with 95% mobile traffic",
      ],
      features: [
        "Dynamic table booking system",
        "Interactive digital menu",
        "Real-time availability tracking",
        "Google Maps integration",
        "Customer review system",
        "Order management dashboard",
        "Payment gateway integration",
      ],
    },
    {
      title: "FormStack – Dynamic Form Builder",
      description:
        "Built a sophisticated form builder with drag-and-drop interface and custom validation. Implemented advanced sharing capabilities and real-time form analytics.",
      fullDescription:
        "FormStack is an advanced form building platform that empowers users to create complex forms without coding. It features an intuitive drag-and-drop interface, custom validation rules, advanced sharing options, and comprehensive analytics to track form performance and user engagement.",
      tech: ["ReactJS", "Node.js", "MongoDB", "Express", "Socket.io"],
      github: "https://github.com/priyanshuKumar56/FormStack",
      live: "https://form-stack.vercel.app/",
      timeline: "5 months (Feb 2024 - Jun 2024)",
      teamSize: "5 developers",
      achievements: [
        "Created 500+ custom forms for various clients",
        "Achieved 98% form completion rate",
        "Reduced form creation time by 80%",
        "Implemented advanced analytics dashboard",
      ],
      features: [
        "Drag-and-drop form builder",
        "Custom validation rules",
        "Conditional logic and branching",
        "Real-time form analytics",
        "Multi-step form support",
        "Integration with popular services",
        "Advanced sharing and embedding options",
      ],
    },
  ]

  const achievements = [
    "Runner-up Position - College GeeksforGeeks Coding Championship",
    "National Finalist - TATA Crucible Campus Quiz 2024",
    "Selected Participant - Flipkart GRID 6.0 Software Development Challenge",
    "Top Performer - Vultr GeeksforGeeks Hackathon 2024",
    "Active Contributor - Open Source Projects on GitHub",
  ]

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"} overflow-x-hidden`}
    >
      {/* Smooth Cursor */}
      <SmoothCursor />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-40 backdrop-blur-xl bg-white/5 dark:bg-gray-900/5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              PK
            </motion.div>
            <div className="flex items-center space-x-4">
             
              <MagneticButton variant="outline" size="sm" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </MagneticButton>
              <MagneticButton onClick={downloadResume} size="sm">
                <Download className="h-4 w-4 mr-2" />
                Resume
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-20 text-center max-w-6xl mx-auto px-4">
          <div className="hero-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Priyanshu Kumar
          </div>

          <div className="hero-subtitle text-2xl md:text-4xl mb-8 text-gray-600 dark:text-gray-300 font-light">
            Full Stack Developer & UI/UX Enthusiast
          </div>

          <div className="hero-description text-lg md:text-xl mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Crafting extraordinary digital experiences with modern web technologies. Specializing in React, animations,
            and performance optimization to bring ideas to life.
          </div>

          <div className="hero-buttons flex flex-wrap justify-center gap-6">
           <a href="#contect">
            <MagneticButton size="lg">
              <Mail className="h-5 w-5 mr-2" />
              Let's Connect
              <ArrowRight className="h-5 w-5 ml-2" />
            </MagneticButton>
           </a>
            <Link href={"https://github.com/priyanshuKumar56"} >
            <MagneticButton variant="outline" size="lg">
              <Github className="h-5 w-5 mr-2" />
              View Work
            </MagneticButton>
            </Link>
            
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles className="h-8 w-8 text-yellow-400" />
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10"
            animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <Code className="h-10 w-10 text-blue-400" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={addToRefs} className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <User className="h-8 w-8 text-white" />
            </motion.div>
            <TextReveal className="text-5xl md:text-6xl font-bold mb-6">About Me</TextReveal>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A passionate Computer Science Engineering student with an eye for detail and a love for creating
              innovative web solutions. Currently pursuing B.Tech at The Glocal University with expertise in modern
              frontend technologies.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div className="float-card" whileHover={{ scale: 1.05, rotateY: 5 }} transition={{ duration: 0.3 }}>
              <Card className="backdrop-blur-xl bg-white/5 dark:bg-gray-800/5 border-white/10 h-full">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center group cursor-pointer"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Phone className="h-6 w-6 mr-4 text-blue-500 group-hover:text-purple-500 transition-colors" />
                      <span className="text-lg">+91-8218578703</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center group cursor-pointer"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Mail className="h-6 w-6 mr-4 text-blue-500 group-hover:text-purple-500 transition-colors" />
                      <span className="text-lg">priyanshukumar93861@gmail.com</span>
                    </motion.div>
                    <div className="flex items-center space-x-6 mt-8">
                      {[
                        { icon: Linkedin, color: "text-blue-600", href: "#" },
                        { icon: Github, color: "text-gray-800 dark:text-white", href: "#" },
                      ].map(({ icon: Icon, color, href }, index) => (
                        <motion.a
                          key={index}
                          href={href}
                          className={`${color} hover:scale-125 transition-all duration-300`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="h-8 w-8" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div className="float-card" whileHover={{ scale: 1.05, rotateY: -5 }} transition={{ duration: 0.3 }}>
              <Card className="backdrop-blur-xl bg-white/5 dark:bg-gray-800/5 border-white/10 h-full">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Quick Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: 15, label: "Projects Completed", color: "text-blue-500", suffix: "+" },
                      
                      { value: 7.8, label: "CGPA", color: "text-purple-500", suffix: "" },
                      
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                          <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        ref={addToRefs}
        className="py-32 px-4 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-gray-800/10 dark:to-gray-900/10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="h-8 w-8 text-white" />
            </motion.div>
            <TextReveal className="text-5xl md:text-6xl font-bold mb-6">Education</TextReveal>
          </div>

          <div className="space-y-12">
            {[
              {
                degree: "Bachelor of Technology - Computer Science Engineering",
                institution: "The Glocal University, Saharanpur, Uttar Pradesh",
                period: "2021 - 2025 (Expected)",
                grade: "7.8/10",
                gradeLabel: "Current CGPA",
              },
              {
                degree: "Higher Secondary Education (Class XII)",
                institution: "Dilaram Saini Inter College, UP Board",
                period: "Graduated: May 2019",
                grade: "7.4/10",
                gradeLabel: "CGPA",
              },
            ].map((edu, index) => (
              <motion.div
                key={index}
                className="float-card"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border-white/20">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {edu.degree}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">{edu.institution}</p>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.period}</p>
                      </div>
                      <div className="mt-6 lg:mt-0 text-center">
                        <div className="text-4xl font-bold text-green-500 mb-1">{edu.grade}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{edu.gradeLabel}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - WITH STRAIGHT STREAMLINE ANIMATION */}
      <section
        ref={addToRefs}
        className="py-32 px-4 bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-gray-800/10 dark:to-gray-900/10 relative"
      >
        <div className="max-w-6xl mx-auto relative">
          {/* Add the straight timeline streamline */}
          <ProjectTimelineStreamline />

          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Code className="h-8 w-8 text-white" />
            </motion.div>
            <TextReveal className="text-5xl md:text-6xl font-bold mb-6">Featured Projects</TextReveal>
          </div>

          <div className="space-y-16 lg:space-y-24 lg:pl-20">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`group float-card project-card-${index} max-w-4xl`}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border-white/20 h-full overflow-hidden relative">
                  {/* Project number indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>

                  <CardContent className="p-6">
                    <motion.h3
                      className="text-xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs bg-white/5 border-white/20 hover:bg-white/10 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-white/5 border-white/20">
                          +{project.tech.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <MagneticButton
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => openProjectModal(project)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </MagneticButton>
                      <Link href={project.live}  >
                      <MagneticButton size="sm" className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live
                      </MagneticButton>
                      </Link>
                      
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={addToRefs} className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Briefcase className="h-8 w-8 text-white" />
            </motion.div>
            <TextReveal className="text-5xl md:text-6xl font-bold mb-6">Professional Experience</TextReveal>
          </div>

          <div className="space-y-12">
            {[
              {
                title: "Frontend Developer (Freelance)",
                company: "Independent Contractor",
                period: "September 2021 - Present",
                achievements: [
                  "Delivered 15+ responsive web applications for diverse clientele",
                  "Specialized in performance optimization and modern UI/UX design",
                  "Achieved 95%+ client satisfaction through quality deliverables",
                ],
              },
              {
                title: "Backend Developer",
                company: "College Fest Meraki 3.0",
                period: "February 2023",
                achievements: [
                  "Architected and managed MySQL database infrastructure",
                  "Handled 500+ concurrent users during peak event operations",
                ],
              },
            ].map((exp, index) => (
              <motion.div
                key={index}
                className="float-card"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="backdrop-blur-xl bg-white/5 dark:bg-gray-800/5 border-white/10">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">{exp.company}</p>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.period}</p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start text-gray-700 dark:text-gray-300">
                          <span className="text-blue-500 mr-3 mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={addToRefs}
        className="py-32 px-4 bg-gradient-to-br from-gray-50/30 to-blue-50/30 dark:from-gray-800/10 dark:to-gray-900/10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Code className="h-8 w-8 text-white" />
            </motion.div>
            <TextReveal className="text-5xl md:text-6xl font-bold mb-6">Technical Skills</TextReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="float-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="backdrop-blur-xl bg-white/5 dark:bg-gray-800/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-lg">{skill.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        <AnimatedCounter end={skill.level} suffix="%" />
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-3 rounded-full relative overflow-hidden"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Programming", techs: ["Python", "JavaScript", "TypeScript", "C++"] },
              { title: "Frontend", techs: ["ReactJS", "HTML5", "CSS3", "Tailwind"] },
              { title: "Backend", techs: ["Node.js", "Firebase", "MySQL", "MongoDB"] },
              { title: "Tools", techs: ["Git", "VS Code", "Figma", "Postman"] },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                className="float-card"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="backdrop-blur-xl bg-white/5 dark:bg-gray-800/5 border-white/10 h-full">
                  <CardContent className="p-6 text-center">
                    <h4 className="font-bold text-xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {category.title}
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {category.techs.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section
        ref={addToRefs}
        className="py-32 px-4 bg-gradient-to-br from-yellow-50/30 to-orange-50/30 dark:from-gray-800/10 dark:to-gray-900/10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="h-8 w-8 text-white" />
            </motion.div>
            <TextReveal className="text-5xl md:text-6xl font-bold mb-6">Achievements & Recognition</TextReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="float-card"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border-white/20 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <motion.div
                        className="mr-4 mt-1"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Trophy className="h-6 w-6 text-yellow-500" />
                      </motion.div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{achievement}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={addToRefs} className="py-32 px-4" id="contect">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <MessageSquare className="h-8 w-8 text-white" />
            </motion.div>
            <TextReveal className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</TextReveal>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let's discuss your next project or collaboration opportunity
            </motion.p>
          </div>

          <motion.div
            className="float-card"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="backdrop-blur-xl bg-white/5 dark:bg-gray-800/5 border-white/10">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        placeholder="Your Name"
                        className="bg-white/5 border-white/20 backdrop-blur-sm focus:bg-white/10 transition-all"
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        className="bg-white/5 border-white/20 backdrop-blur-sm focus:bg-white/10 transition-all"
                      />
                    </motion.div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                      placeholder="Project Discussion"
                      className="bg-white/5 border-white/20 backdrop-blur-sm focus:bg-white/10 transition-all"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="bg-white/5 border-white/20 backdrop-blur-sm focus:bg-white/10 transition-all"
                    />
                  </motion.div>
                  <MagneticButton size="lg" className="w-full">
                    <Mail className="h-5 w-5 mr-2" />
                    Send Message
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </MagneticButton>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { icon: Linkedin, color: "text-blue-600", href: "#" },
              { icon: Github, color: "text-gray-800 dark:text-white", href: "#" },
              { icon: Mail, color: "text-red-600", href: "mailto:priyanshukumar93861@gmail.com" },
              { icon: Phone, color: "text-green-600", href: "tel:+918218578703" },
            ].map(({ icon: Icon, color, href }, index) => (
              <motion.a
                key={index}
                href={href}
                className={`${color} hover:scale-125 transition-all duration-300`}
                whileHover={{ rotate: 360, scale: 1.3 }}
                transition={{ duration: 0.5 }}
              >
                <Icon className="h-10 w-10" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            className="text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            © 2024 Priyanshu Kumar. Crafted with ❤️ using React, GSAP & Framer Motion
          </motion.p>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <ProjectDetailModal project={selectedProject} isOpen={isProjectModalOpen} onClose={closeProjectModal} />
    </div>
  )
}
