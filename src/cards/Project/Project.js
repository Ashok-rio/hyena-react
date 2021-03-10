import React from "react";
import {
  CRow,
  CCol,
  CCard,
  CContainer,
  CCardBody,
  CButton,
  
} from "@coreui/react";
import Select from "react-select";
import { getDepartments, getAllProjects } from "../../services/API.service";
import _ from "lodash";

const Project = (props) => {
  const [selectDepartment, setSelectDepartment] = React.useState();
  const [departments, setDepartments] = React.useState([]);
  const [projects, setProjects] = React.useState({});

  const _ProjectDataOrganizer = (project) => {
    const groupUp = _.groupBy(project, "department.name");
    setProjects(groupUp);
  };

  const _getAllprojets = async () => {
    let response;
    try {
      response = await getAllProjects(selectDepartment?.value || "");
      if (response) {
        _ProjectDataOrganizer(response.Projects);
      }
    } catch (error) {
      throw error;
    }
  };
  const _getDepartments = async () => {
    let response;
    try {
      response = await getDepartments();
      if (response) {
        let options = [];
        for (let index = 0; index < response.Department.length; index++) {
          const element = response.Department[index];
          options.push({ value: element._id, label: element.name });
        }
        if (response.Department?.length === options.length) {
          setDepartments(options);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const ProjectCard = ({ data }) => {
    return data.map((x, i) => (
      <CCol
        lg={3}
        key={i}
        onClick={() => props.history.push(`/project/${x._id}`)}
        style={{ cursor: "pointer" }}
      >
        <CCard>
          <CCardBody style={{ background: "#551B89", borderRadius: "5px" }}>
            <p
              style={{
                paddingTop: "10px",
                fontSize: "15px",
                textAlign: "center",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {x.Name}
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    ));
  };

  React.useEffect(() => _getAllprojets(), [selectDepartment]);
  React.useEffect(() => _getDepartments(), []);

  return (
    <CCard style={{ height: "80vh" }}>
      <CCardBody>
        <CRow>
          <CCol lg={4}>
            <h1>{`${selectDepartment?.label || ""}`} Projects</h1>
          </CCol>
          <CCol lg={3} style={{ padding: "10px 10px 10px 0px" }}>
            {departments && (
              <Select
                value={selectDepartment}
                onChange={(e) => setSelectDepartment(e)}
                options={departments}
                placeholder={"Select Department"}
              />
            )}
          </CCol>
          <CCol lg={5} style={{ padding: "10px 0px 10px 0px" }}>
            <CRow>
              <CCol lg={2}>
                <CButton
                  style={{
                    background: "#551B89",
                    width: "100%",
                    color: "#fff",
                    fontWeight: "bold",
                    height: "38px",
                  }}
                  onClick={() => console.log("add")}
                >
                  ADD
                </CButton>
              </CCol>
              <CCol lg={2}>
                <CButton
                  style={{
                    background: "#551B89",
                    width: "100%",
                    color: "#fff",
                    fontWeight: "bold",
                    height: "38px",
                  }}
                  onClick={() => setSelectDepartment("")}
                >
                  CLEAR
                </CButton>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardBody style={{ overflowY: "scroll" }}>
        {projects &&
          Object.keys(projects).map((x, i) => (
            <CContainer style={{ marginTop: "20px" }}>
              <CRow>
                <CCol lg={"12"} style={{ padding: "10px" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginLeft: "8px",
                    }}
                  >
                    {String(x).toUpperCase()}
                  </p>
                </CCol>
                <ProjectCard data={projects[x]} key={i} />
              </CRow>
            </CContainer>
          ))}
        {Object.keys(projects).length === 0 && (
          <CContainer style={{ marginTop: "50px" }}>
            <CRow>
              <CCol lg={"12"} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Not Found!
                </p>
              </CCol>
            </CRow>
          </CContainer>
        )}
      </CCardBody>
    </CCard>
  );
};

export default Project;
