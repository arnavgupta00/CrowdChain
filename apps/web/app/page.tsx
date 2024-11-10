"use client";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { ArrowRight, Lock, Users, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ``;
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const router = useRouter();

  const handleNavigate = ()=>{
    router.push('/login-signup')
  }

  return (
    <>
      <div className="absolute top-16 left-10 w-24 h-24 bg-purple-700 rounded-full blur-2xl opacity-25 animate-pulse"></div>
      <div className="fixed top-16 left-10 w-24 h-24 bg-purple-700 rounded-full blur-2xl opacity-25 animate-pulse"></div>
      <div className="fixed bottom-16 right-10 w-32 h-32 bg-sky-700 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="flex flex-col min-h-screen  text-gray-100">
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
          <div className="container flex h-14 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex gap-1 items-center justify-center ml-4">
                <Zap className="h-6 w-6 text-primary " />
                <span className="font-bold ">CrowdChain</span>
              </div>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <div className="flex gap-5 items-center justify-center mr-12">
                <Link
                  className="text-sm font-medium hover:text-primary transition-colors"
                  href="#"
                >
                  Explore
                </Link>
                <Link
                  className="text-sm font-medium hover:text-primary transition-colors"
                  href="#"
                >
                  Start a Campaign
                </Link>
                <Link
                  className="text-sm font-medium hover:text-primary transition-colors"
                  href="#"
                >
                  About
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="flex-1">
          <section className="w-full py-8">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div className="relative max-w-5xl mx-auto pt-16 sm:pt-18 lg:pt-24 px-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-center">
                  Decentralized Crowdfunding for the Future
                  </h1>
                      
                  
                  <p className="mt-6 text-lg text-center max-w-3xl mx-auto text-slate-400">
                  Empower{" "}
                    <span className="font-mono font-medium text-sky-400">
                    creators, support innovation,
                    </span>{" "}
                    and be part of the next big thing. All on a{" "}
                    <span className="font-mono font-medium text-sky-400">
                    secure, transparent
                    </span>{" "}
                    Empowering Developers with{" "}
                    <span className="font-mono font-medium text-sky-400">
                    blockchain platform.
                    </span>{" "}
                  </p>

                  

                  <div className="relative max-w-5xl mx-auto pt-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-center">
                      Explore Our Campaigns
                    </h1>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.0 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-700 hover:to-purple-700 text-white font-semibold h-12 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 flex items-center justify-center mt-5" onClick={handleNavigate}>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>
          <section className="w-full py-20 ">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                Why Choose CrowdChain?
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: Lock,
                    title: "Secure Payments",
                    description:
                      "Blockchain-powered transactions ensure your funds are safe and transparent.",
                  },
                  {
                    icon: Users,
                    title: "Verified Creators",
                    description:
                      "We vet all campaign creators to ensure legitimacy and build trust.",
                  },
                  {
                    icon: Zap,
                    title: "Real-time Engagement",
                    description:
                      "Interact with creators and fellow backers in real-time as campaigns unfold.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-gray-800 bg-opacity-50 border-gray-700">
                      <CardContent className="flex flex-col items-center space-y-4 p-6">
                        <feature.icon className="h-12 w-12 text-primary" />
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-gray-400 text-center">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          <section className="w-full py-12 ">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                Featured Campaigns
              </h2>
              <div className="grid gap-6 lg:grid-cols-3">
                {[1, 2, 3].map((campaign) => (
                  <motion.div
                    key={campaign}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="bg-gray-800 bg-opacity-50 border-gray-700">
                      <CardContent className="p-4">
                        <Image
                          src={`/placeholder.svg?height=200&width=400`}
                          alt={`Campaign ${campaign}`}
                          className="rounded-lg object-cover w-full h-48 mb-4"
                          width={400}
                          height={200}
                        />
                        <h3 className="text-xl font-bold mb-2">
                          Innovative Project {campaign}
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                          A groundbreaking initiative that will revolutionize
                          the industry.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>75%</span>
                          </div>
                          <Progress value={75} className="w-full" />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>Raised: $75,000</span>
                            <span>Goal: $100,000</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <footer className="w-full border-t border-gray-800 py-6 bg-gray-950">
          <div className="container flex flex-col gap-4 px-4 md:px-6 md:flex-row md:gap-8">
            <div className="flex-1">
              <Link href="/" className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="font-bold">CrowdChain</span>
              </Link>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                className="text-sm hover:text-primary transition-colors"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-sm hover:text-primary transition-colors"
                href="#"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-sm hover:text-primary transition-colors"
                href="#"
              >
                Contact Us
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <svg
                  className=" h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <svg
                  className=" h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <svg
                  className=" h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
