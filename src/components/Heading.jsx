/* eslint-disable react/prop-types */
import { Title } from "@mantine/core";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";

export default function Heading({ name }) {

  const [ref, inView] = useInView({
    threshold: 0.4, // Adjust this value based on your preference
  });

   // Animation for the header (coming from the top)
   const headerAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(100%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  return (
    <animated.div ref={ref} style={headerAnimation}>
      <Title
        order={2}
        size="h1"
        fw={900}
        ta="center"
        c={`white`}
        className={`font-sans`}
      >
        {name} 
      </Title>
    </animated.div>
  );
}
