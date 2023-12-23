import { Text, Group } from "@mantine/core";
import { socialIcons, styles } from "../../data";

export default function Footer() {
  const socials = socialIcons.map((icon) => (
    <a
      href="#"
      className="w-[35px] h-[35px] flex justify-center items-center bg-secondary rounded-full hover:bg-accent text-white transition duration-300"
      key={icon.id}
    >
      {icon.icon}
    </a>
  ));
  return (
    <section className={`${styles.body} bg-primary flex justify-between max-sm:flex-col items-center py-4`}>
      <Text size="sm" className="text-white">
        Copyright 2023 © DoinZ.
      </Text>

      <Group
        gap={0}
        className={`flex space-x-4 max-sm:mt-9`}
        justify="flex-end"
        wrap="nowrap"
        m={0}
      >
        {socials}
      </Group>
    </section>
  );
}
