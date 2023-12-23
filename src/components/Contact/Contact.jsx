import { Textarea, SimpleGrid, Group, Grid, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { styles, contactInfo } from "../../data";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";
import "./Contact.css";
import Heading from "../Heading";
import TextField from "../TextField";
import emailjs from "@emailjs/browser";
import { useState, useRef } from "react";

export default function Contact() {
  const [msg, setMsg] = useState();
  const formD = useRef();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      phone: "",
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  const [ref, inView] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  // Animation for the left column (coming from the left)
  const leftColAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(100%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  // Animation for the right column (coming from the right)
  const rightColAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-100%)",
    filter: inView ? "blur(0)" : "blur(4px)",
    config: { mass: 1, tension: 80, friction: 26 },
  });

  const SendEmail = (e) => {
    e.preventDefault();

    // If all fields are filled, use Mantine's validation
    if (!form.isValid) {
      // Show validation errors and return without sending email
      setMsg(1);
      return;
    }

    emailjs
      .sendForm(
        "service_wdo3urm",
        "template_mgv2og7",
        formD.current,
        "J3mNgEZxGKtD-N8E_",
        form.values.email
      )
      .then(
        (result) => {
          console.log(result.text);
          setMsg(true);
          form.reset();
        },
        (error) => {
          console.log(error.text);
          setMsg(false);
        }
      );
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`w-full ${styles.body} bg-primary py-12`}
    >
      <Heading name="Contact" />
      <Grid gutter={60} className={`font-sans`} pr={`sm`}>
        <Grid.Col
          span={{ base: 12, sm: 5.5 }}
          className="flex justify-center flex-col items-center"
        >
          <animated.div
            style={rightColAnimation}
            className={`space-y-4 max-md:mt-10`}
          >
            {contactInfo.map((info) => (
              <div
                className="flex gap-5 text-white lg:text-[17px] text-14px min-[480px]:text-16px"
                key={info.id}
              >
                {info.icon}
                {info.info}
                <br />
                {info.info2}
              </div>
            ))}
          </animated.div>
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, sm: 6.4 }}
          className="flex flex-col py-20 text-white ml-0.5"
        >
          <animated.div style={leftColAnimation}>
            <form onSubmit={SendEmail} ref={formD}>
              {/* Use TextField component for each input */}
              <TextField
                placeholder="Full Name"
                name="name"
                form={form}
                md="md"
              />
              <TextField
                placeholder="Email Address"
                name="email"
                form={form}
                md="md"
              />

              <SimpleGrid cols={{ base: 1, sm: 2 }} mt={`md`}>
                <TextField
                  placeholder="Phone Number"
                  name="phone"
                  form={form}
                />
                <TextField placeholder="Subject" name="subject" form={form} />
              </SimpleGrid>

              <Textarea
                placeholder="Your message"
                maxRows={10}
                minRows={5}
                autosize
                name="message"
                mt={20}
                className=""
                required
                {...form.getInputProps("message")}
              />

              <Group justify="center">
                <input
                  type="submit"
                  value="Send Message"
                  className="bg-accent rounded-sm border-2 border-accent border-solid hover:bg-transparent text-white mt-[20px] px-4 py-2 transition duration-300 cursor-pointer"
                />
              </Group>

              {/* Display the text if the form has been submitted successfully */}
              {msg === true && (
                <Text className="text-accent mt-2 text-center">
                  Your message has been sent successfully!
                </Text>
              )}

              {msg === 1 && (
                <Text className="text-accent mt-2 text-center">
                  Invalid form input form.
                </Text>
              )}

              {/* Display the text if the form wasnt submitted successfully */}
              {msg === false && (
                <Text className="text-accent mt-2 text-center">
                  Oops! Something went wrong. Please try again later.
                </Text>
              )}
            </form>
          </animated.div>
        </Grid.Col>
      </Grid>
    </section>
  );
}
