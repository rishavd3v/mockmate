import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "./ui/hero-highlight.jsx";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <h1
        className="text-4xl px-4 md:text-6xl font-bold leading-relaxed lg:leading-snug text-center mx-auto ">
        Ace Every Interview with{" "}
        <Highlight className="text-black dark:text-white">
          AI-powered mock sessions
        </Highlight>
      </h1>
    </HeroHighlight>
  );
}
