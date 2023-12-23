import { Card, Text, SimpleGrid } from "@mantine/core";
import classes from "./Product.module.css";
import { styles, productData } from "../../data";
import Heading from "../Heading";
import { useTrail, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

export default function Product() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const trail = useTrail(productData.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(50%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 100, friction: 26 },
    delay: 300, // Adjust this delay based on your preference
  });

  const all = trail.map((style, index) => (
    <animated.div key={index} style={style}>
      <Card
        withBorder
        radius="md"
        className={`${classes.card} flex flex-col space-y-5 px-4 items-center w-full max-w-[400px] shadow-md transition duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer py-5 h-[320px] overflow-hidden lg:text[20px]`}
        mt={0}
      >
        {productData[index].icon}
        <Text className={classes.title} fw={700}>
          {productData[index].title}
        </Text>

        <Text fz="sm" className="text-center">
          {productData[index].text}
        </Text>
      </Card>
    </animated.div>
  ));

  return (
    <section
      className={`${styles.body} bg-primary py-12 grid place-items-center xl:justify-center `}
      id="product"
      ref={ref}
    >
      <Heading name="Product" />
      <SimpleGrid mt={60} cols={{ base: 1, xs: 2, md: 3 }}>
        {all}
      </SimpleGrid>
    </section>
  );
}
