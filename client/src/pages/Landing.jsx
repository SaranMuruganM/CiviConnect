import React from "react";
import { Navbar } from "../components";
import { Link } from "react-router-dom";
import Community from "../assets/society1.png";
import { motion } from "framer-motion";

const fadeinVarient = {
  initial: {
    scale: 0.8,
    opacity: 0.5,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
   
    },
  },
};

const Landing = () => {
  return (
    <div className="lg:pt-[80px]">
      <Navbar />
      <motion.div
        variants={fadeinVarient}
        initial="initial"
        animate="animate"
        className="grid lg:grid-cols-2 lg:place-items-center px-10"
      >
        <motion.section
          variants={fadeinVarient} // Now applying staggerChildren here
          className="order-2 lg:order-1 p-8 -mt-14 space-y-8 lg:mt-20"
        >
          <motion.p
            initial={{ x: -610, opacity:0.1}}
            animate={{ x: 0 , opacity:1}}
            transition={{ duration: 1}}
            className="lg:text-3xl text-2xl font-medium tracking-wider"
          >
            Amplify Voices. Ignite Change
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Welcome to CiviConnect, where community meets innovation. Report,
            track, and resolve local issues effortlessly with our real-time
            interactive map. Empower your neighborhood, foster transparency, and
            build a stronger, more connected community.
          </motion.p>
          <motion.div className="flex *:py-2 *:px-4 *:border gap-6 *:bg-custom-darkBlue text-white *:rounded-md">
            <Link to="/register">Register</Link>
            <Link to="/login">Login / Demo</Link>
          </motion.div>
        </motion.section>

        <motion.img
          initial={{ scale: 0.8, opacity: 0 }} // Spread syntax fixed
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          src={Community}
          alt="community"
          className="h-full order-1 lg:order-2"
        />
      </motion.div>
    </div>
  );
};

export default Landing;
