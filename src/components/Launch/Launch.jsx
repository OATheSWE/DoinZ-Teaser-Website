import React, { useState } from "react";
import { Title, Text, Grid, Image } from "@mantine/core";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";
import { styles } from "../../data";
import Btn from "../Button";
import classes from "./Launch.module.css";
import { ImageCollection } from "../../assets";

export default function Launch() {
  
  // Code for scroll animations

  const [ref, inView] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  const leftColAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(-50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  const rightColAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  return (
    <section
      id="launch"
      ref={ref}
      className={`w-full py-12 ${styles.body} bg-primary`}
    >
      <Grid gutter={50} className={`font-sans`}>
        <Grid.Col span={{ base: 12 }}>
          <animated.div style={leftColAnimation} className={classes.floating}>
            <Image
              src={ImageCollection.launchImg}
              className={`max-w-[500px] max-[480px]:object-contain w-full h-[500px] max-[480px]:h-[300px] object-cover mx-auto`}
            />
          </animated.div>
        </Grid.Col>
        <Grid.Col
          span={{ base: 12 }}
          className="flex flex-col justify-center items-center text-center"
        >
          <animated.div
            style={rightColAnimation}
            className={`max-h-[360px] h-full`}
          >
            <Title order={3} className="text-white text-center mb-6">Subscribe to the DoinZ Telegram channel for timely updates on platform progress and launch notifications.</Title>
            
            <a href="https://t.me/doinz_com_ng" className="my-auto" target="_blank" rel="noreferrer">
              <Btn
                text="Join Telegram"
                style={`bg-accent rounded-sm hover:border-2 hover:border-accent hover:border-solid hover:bg-transparent`}
                xl="xl"
              />
            </a>

            
          </animated.div>
        </Grid.Col>
      </Grid>
    </section>
  );
}
