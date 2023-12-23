import React, { useState } from "react";
import { Title, Text, Grid, Image } from "@mantine/core";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";
import { styles } from "../../data";
import Btn from "../Button";
import classes from "./Header.module.css";
import { ImageCollection } from "../../assets";
import { useEffect } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");


  // Code for click to scroll to portion of the page
  const smoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 80; // Adjust for header height
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        setActiveSection(section.id);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


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
      id="home"
      ref={ref}
      className={`w-full py-10 ${styles.body} bg-primary`}
    >
      <Grid gutter={50} className={`font-sans`}>
        <Grid.Col
          span={{ base: 12 }}
          className="flex flex-col justify-center items-center text-center"
        >
          <animated.div
            style={rightColAnimation}
            className={`max-h-[360px] h-full max-lg:mt-10`}
          >
            <Title className={`font-sans ${classes.title}`} order={1}>
              Welcome to DoinZ - <br />Your Events, Your Way.
            </Title>

            <Text className="text-white text-[18px] max-w-[500px] w-full">  
              DoinZ is an all-in-one event Web App that connects users with the
              latest and most exciting events happening around them.
            </Text>

            <a href="#product" onClick={(e) => {
              e.preventDefault();
                setTimeout(() => {
                  smoothScroll("product");
                }, 300)
              }} className="my-auto">
              <Btn
                text="Learn More"
                style={`bg-accent rounded-sm hover:border-2 hover:border-accent hover:border-solid hover:bg-transparent`}
                xl="xl"
              />
            </a>
          </animated.div>
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <animated.div style={leftColAnimation} className={classes.floating}>
            <Image
              src={ImageCollection.heroImg}
              className={`max-w-[100%] max-[480px]:h-[300px] max-[480px]:mt-14 w-full h-[500px] object-cover mx-auto`}
            />
          </animated.div>
        </Grid.Col>
      </Grid>
    </section>
  );
}
