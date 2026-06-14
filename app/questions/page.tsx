"use client";

import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function QuestionsPage() {
  return (
    <div className="relative h-screen flex flex-col bg-white dark:bg-black text-foreground overflow-hidden">
      {/* Tenor GIF embed script */}
      <Script src="https://tenor.com/embed.js" strategy="lazyOnload" />

      {/* Back button - top left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-4 z-10"
      >
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/10 backdrop-blur-sm hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </Link>
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-6">
        {/* Text content */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
        >
          <span className="bg-linear-to-r from-violet-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            You have questions?
          </span>
        </motion.h1>

        {/* GIF Embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="w-full max-w-87.5 sm:max-w-112.5"
        >
          <div
            className="tenor-gif-embed"
            data-postid="13799789"
            data-share-method="host"
            data-aspect-ratio="1.15814"
            data-width="100%"
          >
            <a href="https://tenor.com/view/samuel-l-jackson-serious-aim-gun-gif-13799789">
              Samuel L Jackson Serious GIF
            </a>
            from{" "}
            <a href="https://tenor.com/search/samuel+l+jackson-gifs">
              Samuel L Jackson GIFs
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
