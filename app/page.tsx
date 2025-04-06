"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Globe, Layers, Code, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary text-2xl"
            >
              <Languages className="h-6 w-6 inline-block mr-2" />
              <span>Form</span>
            </motion.div>
            <span className="text-2xl">Translator</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {/* Hero Section with 3D-like effect */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          />

          <div className="container relative z-10 px-4 py-24 md:py-32 lg:py-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  No coding required
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block">Form Translation</span>
                  <span className="block text-primary">Made Simple</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
                  Create multilingual forms without writing a single line of code. No developer needed, no JSON editing,
                  just a beautiful interface.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/builder">
                    <Button size="lg" className="group h-12 px-6 rounded-full">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="h-12 px-6 rounded-full">
                    Watch Demo
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary to-primary/50 opacity-75 blur-xl"></div>
                  <div className="relative rounded-xl border bg-card p-1 shadow-xl">
                    <div className="h-[400px] w-full rounded-lg bg-muted/50 p-4 overflow-hidden">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <div className="ml-2 text-xs text-muted-foreground">Form Translator</div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-primary" />
                          <div className="text-sm font-medium">English / Spanish / French</div>
                        </div>

                        <div className="space-y-3">
                          <div className="h-8 w-3/4 rounded bg-muted animate-pulse"></div>
                          <div className="h-10 w-full rounded bg-muted"></div>
                          <div className="h-8 w-2/3 rounded bg-muted animate-pulse"></div>
                          <div className="h-10 w-full rounded bg-muted"></div>
                          <div className="h-8 w-1/2 rounded bg-muted animate-pulse"></div>
                          <div className="h-24 w-full rounded bg-muted"></div>
                        </div>

                        <div className="flex justify-end">
                          <div className="h-10 w-24 rounded bg-primary"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  initial={{ x: 0, y: 0 }}
                  animate={{ x: 10, y: -10 }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 2,
                  }}
                  className="absolute -top-10 -right-10 h-20 w-20 rounded-lg bg-primary/20 backdrop-blur-md p-4 flex items-center justify-center"
                >
                  <Globe className="h-10 w-10 text-primary" />
                </motion.div>

                <motion.div
                  initial={{ x: 0, y: 0 }}
                  animate={{ x: -5, y: 5 }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 2.5,
                  }}
                  className="absolute -bottom-8 -left-8 h-16 w-16 rounded-lg bg-muted backdrop-blur-md p-3 flex items-center justify-center"
                >
                  <Code className="h-8 w-8" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={container}
              className="text-center mb-16"
            >
              <motion.h2 variants={item} className="text-3xl font-bold mb-4">
                Why Choose Form Translator?
              </motion.h2>
              <motion.p variants={item} className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our intuitive platform makes form translation accessible to everyone, no technical knowledge required.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={container}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={item} className="relative group">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/50 to-primary/20 opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative h-full rounded-xl border bg-card p-6 flex flex-col">
                    <div className="mb-4 p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground flex-grow">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-4">Ready to simplify your form translations?</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Join thousands of users who have streamlined their localization process.
                </p>
                <Link href="/builder">
                  <Button size="lg" className="rounded-full px-8">
                    Start Translating Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium">
            <Languages className="h-5 w-5 text-primary" />
            <span>Form Translator</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Form Translator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: <Layers className="h-6 w-6 text-primary" />,
    title: "User-Friendly Interface",
    description:
      "Intuitive drag-and-drop interface for building forms and adding translations without any technical knowledge.",
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: "Multiple Languages",
    description: "Support for unlimited languages with easy switching between translations in a visual interface.",
  },
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: "No Code Required",
    description: "Create and manage translations without writing a single line of code or editing JSON files manually.",
  },
]

