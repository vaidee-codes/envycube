import React from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getImage } from "../../assets/images";
import usePageMeta from "../../hooks/usePageMeta";
import NotFound from "../../molecules/NotFound";
import styles from "./WorksDetail.module.scss";

const numbered = (folder, count) =>
  Array.from({ length: count }, (_, i) => `${folder}/${i + 1}`);

const idDesignMap = {
  1: { title: "Bedroom", images: numbered("bedroom", 7) },
  2: { title: "Living Room", images: numbered("living room", 7) },
  3: { title: "Bathroom", images: numbered("bathroom", 4) },
  4: { title: "Kitchen", images: numbered("kitchen", 2) },
  5: { title: "Dining Room", images: numbered("dining room", 3) },
  6: { title: "Utility Areas", images: numbered("utility areas", 7) },
};

const WorksDetailPage = ({ id, work }) => {
  usePageMeta({
    title: `${work.title} Designs`,
    description: `${work.title} interior designs by Envycube Architects, Trichy.`,
    path: `/works/${id}`,
  });

  return (
    <div className={styles.worksDetail}>
      <h1 className={styles.mainTitle}>{work.title}</h1>
      <Row gutter={[16, 16]}>
        {work.images.map((image, index) => (
          <Col key={image} span={24}>
            <div className={styles.imageContainer}>
              <img
                {...getImage(image)}
                alt={`${work.title} design ${index + 1} of ${work.images.length}`}
                className={styles.image}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </Col>
        ))}
      </Row>
      <Link
        to="/works"
        className={`${styles.backButton} ${styles.backLink}`}
        aria-label="Back to all works"
      >
        <ArrowLeftOutlined aria-hidden="true" />
      </Link>
    </div>
  );
};

const WorksDetail = () => {
  const { id } = useParams();
  const work = idDesignMap[id];

  if (!work) {
    return <NotFound />;
  }

  return <WorksDetailPage id={id} work={work} />;
};

export default WorksDetail;
