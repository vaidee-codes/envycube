import React from "react";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import usePageMeta from "../../hooks/usePageMeta";
import withLoadGifScreen from "../../hoc/withLoadGifScreen";
import styles from "./Contact.module.scss";

const Contact = () => {
  usePageMeta({
    title: "Contact Us",
    description:
      "Contact Envycube Architects at Saffa Arcade, Cantonment, Trichy. Call +91-9944949459 or email envycubearchitects@gmail.com.",
    path: "/contact",
  });

  return (
    <div className={styles.contactPage}>
      <div className={styles.contactInfo}>
        <h1>Contact Us</h1>
        <p>
          Tell us about your architectural aspirations, and we will get back to
          you to discuss your project and the next steps.
        </p>
        <div className={styles.communication}>
          <MailOutlined aria-hidden="true" />
          <a href="mailto:envycubearchitects@gmail.com">
            envycubearchitects@gmail.com
          </a>
        </div>
        <div className={styles.communication}>
          <PhoneOutlined aria-hidden="true" />
          <a href="tel:+919944949459">+91-9944949459</a>
        </div>
        <div className={styles.communication}>
          <PhoneOutlined aria-hidden="true" />
          <a href="tel:+919626830630">+91-9626830630</a>
        </div>
        <div style={{ margin: "1rem 0" }}>
          <EnvironmentOutlined aria-hidden="true" />
          <a
            href="https://www.google.com/maps/dir//10.8039722,78.68775/@10.8039722,78.68775,16z?entry=ttu"
            target="_blank"
            rel="noreferrer"
            style={{ marginLeft: "1rem", textDecoration: "none" }}
          >
            No.34/1, 1st Floor, Saffa Arcade, Othakadai, Cantonment, Trichy - 01
          </a>
        </div>
      </div>
      <div className={styles.mapContainer}>
        <iframe
          title="Map showing the Envycube Architects office in Trichy"
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3919.095989275155!2d78.6851656750423!3d10.803959889346466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDQ4JzE0LjMiTiA3OMKwNDEnMTUuOSJF!5e0!3m2!1sen!2sin!4v1709904355031!5m2!1sen!2sin"
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default withLoadGifScreen(Contact);
