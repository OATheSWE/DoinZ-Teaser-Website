import React from "react";
import { Group, Box, Burger, Drawer, ScrollArea, Image } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import classes from "./NavBar.module.css";
import Btn from "../Button";
import { styles } from "../../data";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImageCollection } from "../../assets";


const navLinks = [
  { text: "Home", href: "#home" },
  { text: "Product", href: "#product" },
  { text: "About", href: "#about" },
  { text: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [activeSection, setActiveSection] = useState("");
  const isLandingPage = window.location.pathname === "/"; // Adjust the pathname as needed'
  const navigate = useNavigate();

  const smoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
      closeDrawer();
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

  return (
    <Box className="w-full">
      <header
        className={`flex justify-between items-center bg-primary md:px-8 text-white font-sans ${classes.header} ${styles.body}`}
      >
        <Group h="100%" className="flex items-center font-extrabold lg:text-[25px] text-[22px] text-accent">
          <Image src={ImageCollection.logo} alt="DoinZ Logo" className="w-[100px] h-[100px]" />
        </Group> 

        <Group h="100%" gap={0} className="hidden md:flex">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={`#${link.href}`}
              className={`${classes.link} ${
                activeSection === link.href.substring(1) ? "text-accent" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (!isLandingPage) {
                  navigate("/");
                  setTimeout(() => {
                    smoothScroll(link.href.substring(1));
                  }, 300)
                } else {
                  smoothScroll(link.href.substring(1));
                }
              }}
              
            >
              {link.text}
            </a>
          ))}
        </Group>

        <a
          href="#launch"
          className="hidden md:flex"
          onClick={(e) => {
            e.preventDefault();
            if (!isLandingPage) {
              navigate("/");
              setTimeout(() => {
                smoothScroll("launch");
              }, 300)
            } else {
              smoothScroll("launch");
            }
          }}
          
        >
          <Btn
            text="Launch Soon"
            style={`text-white rounded-sm border-[1.5px] hover:border-accent border-solid hover:bg-accent shadow-2xl`}
          />
        </a>

        <Burger
          opened={drawerOpened}
          onClick={toggleDrawer}
          hiddenFrom="sm"
          size={23}
          color="white"
        />
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        hiddenFrom="sm"
        zIndex={1000000}
        className="font-sans text-white p-0 m-0"
      >
        <ScrollArea
          h={`calc(100vh - 80px)`}
          mx="-md"
          className="bg-primary block mx-auto px-4"
        >
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={`#${link.href}`}
              className={`${classes.link} ${
                activeSection === link.href.substring(1) ? "text-accent" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (!isLandingPage) {
                  navigate("/");
                  setTimeout(() => {
                    smoothScroll(link.href.substring(1));
                  }, 300)
                } else {
                  smoothScroll(link.href.substring(1));
                }
              }}
              
            >
              {link.text}
            </a>
          ))}

          <a
            href="#launch"
            className=""
            onClick={(e) => {
              e.preventDefault();
              if (!isLandingPage) {
                navigate("/");
                setTimeout(() => {
                  smoothScroll("launch");
                }, 300)
              } else {
                smoothScroll("launch");
              }
            }}
            
          >
            <Btn
              text="Launch Soon"
              style={`text-white border-white text-black w-[92vw] max-[360px]:w-[88vw] rounded-sm border-[1.5px] hover:border-accent border-solid hover:bg-accent mt-8 shadow-2xl`}
            />
          </a>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
