import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const About = () => {
  return (
    <>
      <div className="row about">
        <p style={{ fontSize: "0.8rem" }}>Desmond Tong</p>
        <p>
          <FontAwesomeIcon icon={faGithub} />
          <a
            href="https://github.com/desmondtong"
            style={{ paddingLeft: 13, textDecoration: "none" }}
          >
            GitHub
          </a>
        </p>
        <p>
          <FontAwesomeIcon icon={faLinkedin} />
          <a
            href="https://www.linkedin.com/in/desmondtongys"
            style={{ paddingLeft: 13, textDecoration: "none" }}
          >
            LinkedIn
          </a>
        </p>
      </div>
    </>
  );
};

export default About;
