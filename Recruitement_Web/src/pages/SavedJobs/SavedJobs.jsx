import React from "react";
import { TbReportAnalytics } from "react-icons/tb";
import { Col, Container, Row } from "reactstrap";
import JobCard from "../../components/All-Jobs/JobCard";
import "./SavedJobs.scss";
import courseImg01 from "../../assests/images/web-development.png";
import courseImg02 from "../../assests/images/kids-learning.png";
import courseImg03 from "../../assests/images/seo.png";
import courseImg04 from "../../assests/images/ui-ux.png";

const SavedJobs = () => {
  const jobData = [
    {
      id: "01",
      jobTitle: "Intern Software Engineer",
      companyName: "hSenid Technologies ",
      jobType: "Internship",
      location: "Colombo",
      descImgUrl: courseImg01,
    },

    {
      id: "02",
      jobTitle: "AWS System Administrators",
      companyName: "Digital Areana ",
      jobType: "Full Time",
      location: "Colombo",
      descImgUrl: courseImg02,
    },

    {
      id: "03",
      jobTitle: "Software Engineers .NET",
      companyName: "EVICIO Pvt. Ltd",
      jobType: "Full Time",
      location: "Colombo",
      descImgUrl: courseImg03,
    },
    {
      id: "04",
      jobTitle: "Software Engineers .NET",
      companyName: "EVICIO Pvt. Ltd",
      jobType: "Full Time",
      location: "Colombo",
      descImgUrl: courseImg04,
    },
    {
      id: "05",
      jobTitle: "Intern Software Engineer",
      companyName: "hSenid Technologies ",
      jobType: "Internship",
      location: "Colombo",
      descImgUrl: courseImg01,
    },

    {
      id: "06",
      jobTitle: "AWS System Administrators",
      companyName: "Digital Areana ",
      jobType: "Full Time",
      location: "Colombo",
      descImgUrl: courseImg02,
    },

    {
      id: "07",
      jobTitle: "Software Engineers .NET",
      companyName: "EVICIO Pvt. Ltd",
      jobType: "Full Time",
      location: "Colombo",
      descImgUrl: courseImg03,
    },
    {
      id: "08",
      jobTitle: "Software Engineers .NET",
      companyName: "EVICIO Pvt. Ltd",
      jobType: "Full Time",
      location: "Colombo",
      descImgUrl: courseImg04,
    },
  ];
  return (
    <div className="savedjobs-container">
      <div className="search-reports">
        <div className="search-reports-container">
          <input
            className="search-reports-input"
            type="text"
            placeholder="Search"
          />
          <button className="search-btn">Search</button>
        </div>

        <button className="report-btn">
          <TbReportAnalytics />
          Generate Report
        </button>
      </div>

      <div className="savedjobs-body">
        <section>
          <Container>
            <Row>
              {jobData.map((item) => (
                <Col lg="4" md="6" className="mb-4" key={item._id}>
                  <JobCard item={item} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default SavedJobs;
