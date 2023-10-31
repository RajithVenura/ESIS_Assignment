import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { TbReportAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./AppliedJobs.scss";

const AppliedJobs = () => {
  const Token = localStorage.getItem("token");
  const [applied, setApplied] = useState([
    {
      _id: "",
      userId: "",
      jobId: "",
      userResumeUrl: "",
      appliedJobTitle: "",
      appliedJobImageUrl: "",
      appliedJobCategory: "",
      appliedJobSubCategory: "",
      appliedCompanyName: "",
      appliedCompanyLocation: "",
      appliedCompanyEmail: "",
      appliedJobStatus: "",
    },
  ]);

  const [appliedJobId, setAppliedJobId] = useState("");

  useEffect(() => {
    function getDetails() {
      axios
        .get("http://localhost:8080/api/applyJob/getUserAppliedJobs", {
          headers: {
            Authorization: `${Token}`,
          },
        })

        .then((res) => {
          console.log(res.data.userAppliedjobs);
          setApplied(res.data.userAppliedjobs);
          setAppliedJobId(res.data.userAppliedjobs._id);
        })

        .catch((err) => {
          alert(err.message);
        });
    }

    getDetails();
  }, []);

  //Delete applied job
  const deleteAppliedJob = (appliedJobId) => {
    axios
      .put(`http://localhost:8080/api/applyJob/delete/${appliedJobId}`, {
        headers: {
          Authorization: `${Token}`,
        },
      })
      .then((res) => {
        console.log(res);
        alert("Job Removed successfully");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="applications-container">
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

      <div className="applications-body">
        {applied.map((item) => (
          <div className="applications-body-row" key={item._id}>
            <div className="applications-body-row-img">
              <img src={item.appliedJobImageUrl} alt="avatar" />
            </div>
            <div className="applications-body-row-details">
              <div className="applications-body-row-details-title">
                {item.appliedJobTitle}
              </div>
              <div className="jobTime">
                <button>Full Time</button>
              </div>
              <div className="applications-body-row-details-companydata">
                <div className="applications-body-row-details-companydata-company">
                  <i className="ri-building-fill"></i>
                  <span>{item.appliedCompanyName}</span>
                </div>
                <div className="applications-body-row-details-companydata-location">
                  <i className="ri-map-pin-line"></i>
                  <span>{item.appliedCompanyLocation}</span>
                </div>
              </div>
            </div>

            <div
              className="vl"
              style={{
                borderLeft: "1px solid #888181",
                height: "175px",
              }}
            ></div>

            <div className="applications-body-row-status">
              <div className="applications-body-row-status-btns">
                <Link to={`/jobDetails/${item.jobId}`}>
                  <button className="applications-body-row-status-btns-view">
                    View
                  </button>
                </Link>

                <button
                  className="applications-body-row-status-btns-delete"
                  onClick={deleteAppliedJob}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
