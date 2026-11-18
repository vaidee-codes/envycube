import React from "react";
import { getImage } from "../../assets/images";
import usePageMeta from "../../hooks/usePageMeta";
import withLoadGifScreen from "../../hoc/withLoadGifScreen";
import styles from "./about.module.scss";

const memberImageSizes = "(max-width: 768px) 80vw, 32vw";

const About = () => {
  usePageMeta({
    title: "About Us",
    description:
      "Meet Envycube Architects, Trichy: over 7 years of architecture and interior design focused on innovation, sustainability and excellence.",
    path: "/about",
  });

  return (
    <div id="about" className={styles.aboutContainer}>
      <h1 className={styles.heading1}>About Us</h1>
      <div className={styles.contentContainer}>
        <section className={styles.leftSection} aria-hidden="true">
          ECA
        </section>
        <section className={styles.rightSection}>
          <h2>We are Envycube Architects</h2>
          <p>
            With more than 7 years of experience, we at Envycube believe in the
            transformative power of architecture to enrich lives and shape
            communities.
          </p>
          <p>
            With a commitment to innovation, sustainability, and excellence in
            design, we strive to create spaces that inspire, engage, and endure.
          </p>
        </section>
      </div>
      <div className={styles.teamSection}>
        <h3>MEET OUR TEAM</h3>
        <section className={styles.imagesList}>
          <div className={styles.imageContainer}>
            <img
              {...getImage("about/member1", memberImageSizes)}
              alt="M.A. Mohamed Javed, Architect"
              loading="lazy"
            />
            <section>
              <div className={styles.name}>M.A. Mohamed Javed B.Arch</div>
              <div className={styles.position}>ARCHITECT</div>
            </section>
          </div>
          <div className={styles.imageContainer}>
            <img
              {...getImage("about/member2", memberImageSizes)}
              alt="A. Faris Ahamed, Architect"
              loading="lazy"
            />
            <section>
              <div className={styles.name}>A. Faris Ahamed B.Arch</div>
              <div className={styles.position}>ARCHITECT</div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default withLoadGifScreen(About);
