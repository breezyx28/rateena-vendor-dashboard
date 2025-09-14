import React from "react";
import { Container } from "reactstrap";
import Section from "./Section";

const ProjectOverview = () => {
  document.title = "Project Overview | Rateena - E-Shop Vendor Panel";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Section />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProjectOverview;
