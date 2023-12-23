import { Grid, Image, Text } from "@mantine/core";
import { styles } from "../../data";
import { ImageCollection } from "../../assets/images";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";
import Heading from "../Heading";

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.4, // Adjust this value based on your preference
    triggerOnce: true,
  });

  // Animation for the left column (coming from the left)
  const leftColAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateY(-50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  // Animation for the right column (coming from the right)
  const rightColAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateY(50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  return (
    <section
      id="about"
      ref={ref}
      className={`w-full ${styles.body} bg-primary pt-12`}
    >
      <Heading name={`About`} />
      <Grid gutter={60} className={`font-sans py-20`}>
        <Grid.Col span={{ base: 12, md: 6 }} className="">
          <animated.div style={leftColAnimation} className={`flex flex-col space-y-6 text-white`}>
            <Text>
              Meet Osborne Aigbiremolen, a digital alchemist on a mission to
              transform how we experience events. Fueled by the frustration of
              missing out on gatherings, Osborne took it upon himself to create
              DoinZ – a platform that doesn't just find events but becomes a
              part of your event journey.
            </Text>

            <Text>
              In his own words, "I might be a programmer, but my goal isn't just
              about code. It's about creating something that adds value to
              people's lives, especially for those who, like me, found attending
              events a challenge. DoinZ isn't just an app; it's a solution
              crafted with passion and designed to make every occasion
              seamlessly accessible to you."
            </Text>
          </animated.div>
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, md: 6 }}
          className="items-center justify-center flex"
          py={0}
        >
          <animated.div style={rightColAnimation} className={``}>
            <Image
              src={ImageCollection.mySelf}
              className={`max-w-[400px] h-[450px] w-full`}
            />
          </animated.div>
        </Grid.Col>
      </Grid>
    </section>
  );
}
