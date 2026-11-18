import React from "react";
import { Link } from "react-router-dom";
import { getImage } from "../../assets/images";
import usePageMeta from "../../hooks/usePageMeta";
import withLoadGifScreen from "../../hoc/withLoadGifScreen";
import styles from "./Works.module.scss";

const worksData = [
  { id: 1, image: "bedroom/1", title: "Bedroom Design" },
  { id: 2, image: "living room/1", title: "Living Room Design" },
  { id: 3, image: "bathroom/1", title: "Washroom Design" },
  { id: 4, image: "kitchen/1", title: "Kitchen Design" },
  { id: 5, image: "dining room/1", title: "Dining Room Design" },
  { id: 6, image: "utility areas/1", title: "Utility Area Design" },
];

const Works = () => {
  usePageMeta({
    title: "Our Works",
    description:
      "Bedroom, living room, washroom, kitchen, dining and utility area interiors designed by Envycube Architects, Trichy.",
    path: "/works",
  });

  return (
    <div className={styles.works}>
      <h1 className={styles.title}>Our Works</h1>
      <div className={styles.worksGrid}>
        {worksData.map((work, index) => (
          <Link
            key={work.id}
            to={`/works/${work.id}`}
            className={styles.workLink}
          >
            <div className={styles.workImage}>
              <img
                {...getImage(work.image)}
                alt={work.title}
                className={styles.image}
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className={styles.overlay} />
              <div className={styles.workTitle}>{work.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default withLoadGifScreen(Works);
