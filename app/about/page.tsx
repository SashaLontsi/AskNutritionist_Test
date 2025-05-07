"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { CheckCircle, Users, BookOpen, Heart, Award, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Footer from "@/components/ui/Footer"

export default function AboutPage() {
  const teamRef = useRef(null)
  const valuesRef = useRef(null)
  const isInView = useInView(teamRef, { once: true, margin: "-100px" })
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" })

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-textMain font-body relative"
    >
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-teal-50/30 to-white -z-10" />

      {/* Animated wave patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-20 -z-10">
        <svg 
          className="absolute w-full min-w-[1000px]" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="url(#gradient1)"
            strokeWidth="2"
            stroke="rgba(16, 185, 129, 0.2)"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
              <stop offset="100%" stopColor="rgba(20, 184, 166, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-5 -z-10">
        <svg width="100%" height="100%" aria-hidden="true">
          <pattern
            id="pattern-hex"
            x="0"
            y="0"
            width="16"
            height="28"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(4)"
          >
            <rect width="16" height="28" fill="none" />
            <path d="M8 5L4 8.5L4 15.5L8 19L12 15.5L12 8.5L8 5Z" stroke="#10b981" strokeWidth="0.5" fill="none" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-hex)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Header Section with Gradient */}
        <section className="pt-10 md:pt-16 pb-20 text-center">
          <div className="relative inline-block mb-6">
            <div className="relative bg-white rounded-full p-3">
              <Users className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 font-heading">About Us</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            At AskNutritionist, our mission is to make reliable, AI-powered nutrition guidance accessible to everyone
            through smart technology and health education.
          </p>
        </section>

        {/* Company Section with Enhanced Design */}
        <section className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-block bg-accentLight px-3 py-1 rounded-full text-accent text-sm font-medium mb-4">
              Our Story
            </div>
            <h2 className="text-3xl font-bold mb-4 font-heading">Empowering Health Decisions</h2>
            <p className="text-gray-700 mb-4">
              Health Academy was founded with a vision to make health education more accessible, engaging, and
              impactful. What started as a small initiative to share reliable health information has grown into a
              trusted learning platform dedicated to empowering individuals through knowledge.
            </p>
            <p className="text-gray-700 mb-6">
              Today, Health Academy offers a wide range of expert-led courses, resources, and community support to help
              people make informed decisions and lead healthier lives no matter where they are in their journey.
            </p>
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group inline-block"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl blur-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative block bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl transition-colors duration-300 font-medium shadow-lg">
                  Get in Touch
                </span>
              </motion.div>
            </Link>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-2xl blur-lg" />
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)" }}
              transition={{ duration: 0.3 }}
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl border border-white/50"
            >
              <Image src="/food.jpg" alt="Healthy food and nutrition concept" fill className="object-cover" />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />

              {/* Floating elements */}
              <motion.div
                className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="h-5 w-5 text-accent" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team Section with Enhanced Cards */}
        <section className="mb-20" ref={teamRef} aria-label="Team">
          <div className="text-center mb-12">
            <div className="relative inline-block mb-4">
              <div className="relative bg-white rounded-full p-3">
                <Heart className="h-6 w-6 text-accent" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2 font-heading">Meet Our Team</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our experts are passionate about nutrition and dedicated to helping you achieve your health goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                id: 1,
                name: "Olga Grass",
                role: "Founder",
                image: "/team/Olga.jpg",
                bio: "Olga Grass is a Certified Nutritional Practitioner, Registered Nutritional Therapist, and Holistic Health Coach dedicated to empowering clients through personalized nutrition and holistic wellness strategies. With a focus on sustainable, whole-food-based approaches, Olga helps individuals achieve their health goals and embrace lasting lifestyle changes.",
              },
              {
                id: 2,
                name: "Alex Kostikov",
                role: "Founder",
                image: "/team/Alex.jpg",
                bio: "Alex Kostikov is a European-trained Medical Doctor, independent researcher with over 25 years of experience, and dedicated health educator. Known for his commitment to advancing health knowledge, Alex combines his medical expertise and research background to educate and empower individuals to make informed health decisions and embrace proactive wellness.",
              },
            ].map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <div className="aspect-square relative">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />

                    {/* Decorative elements */}
                    <motion.div
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-1.5 rounded-lg shadow-lg"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                    >
                      <Heart className="h-4 w-4 text-accent" />
                    </motion.div>
                  </div>
                  <CardContent className="pt-6 relative">
                    {/* Decorative line */}
                    <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />

                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-accent font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-gray-700 line-clamp-3 md:line-clamp-none">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values Section with Enhanced Cards */}
        <section className="mb-20" ref={valuesRef} aria-label="Values">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-12 border border-gray-100 relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" aria-hidden="true">
                <pattern
                  id="pattern-circles-values"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                  patternTransform="scale(3)"
                >
                  <circle cx="10" cy="10" r="1.5" fill="#10b981" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles-values)" />
              </svg>
            </div>

            <div className="relative">
              <div className="text-center mb-12">
                <div className="relative inline-block mb-4">
                  <div className="relative bg-white rounded-full p-3">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-2 font-heading">Our Values</h2>
                <p className="text-gray-700 max-w-2xl mx-auto">
                  These core principles guide everything we do at AskNutritionist.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    id: 1,
                    title: "Health First",
                    description:
                      "Everything we do is grounded in our commitment to better physical, mental, and nutritional well-being through education and guidance.",
                    icon: <Heart className="h-6 w-6 text-white" />,
                  },
                  {
                    id: 2,
                    title: "Clarity",
                    description:
                      "Whether it's through interactive courses or real-time AI chats, we break down complex health topics into clear, actionable insights.",
                    icon: <BookOpen className="h-6 w-6 text-white" />,
                  },
                  {
                    id: 3,
                    title: "Trust",
                    description:
                      "Our content and responses are backed by science and created or reviewed by experienced professionals to ensure reliability and integrity.",
                    icon: <CheckCircle className="h-6 w-6 text-white" />,
                  },
                  {
                    id: 4,
                    title: "Accessibility",
                    description:
                      "We aim to make health knowledge more reachable by offering flexible learning formats and responsive support whether it's through a course or a quick nutrition question.",
                    icon: <Users className="h-6 w-6 text-white" />,
                  },
                  {
                    id: 5,
                    title: "Empowerment",
                    description:
                      "We equip learners and users with tools to make informed, confident decisions about their health, lifestyle, and nutrition.",
                    icon: <Zap className="h-6 w-6 text-white" />,
                  },
                  {
                    id: 6,
                    title: "Growth",
                    description:
                      "We're dedicated to continuous improvement—updating our courses, refining our AI, and listening to your feedback to better serve evolving health needs.",
                    icon: <Award className="h-6 w-6 text-white" />,
                  },
                ].map((value) => (
                  <motion.div
                    key={value.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ y: -10, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)" }}
                    className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md transition-all duration-300 overflow-hidden border border-gray-100 group"
                  >
                    <div className="p-6">
                      <div className="relative mb-4">
                        <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 w-12 h-12 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                          {value.icon}
                        </div>
                      </div>
                      <h3 className="font-bold text-xl mb-2 group-hover:text-accent transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-gray-700">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />
    </motion.main>
  )
}
