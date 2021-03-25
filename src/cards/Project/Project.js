import React from "react";
import {
  CRow,
  CCol,
  CCard,
  CContainer,
  CCardBody,
  CButton,
  CInput,
} from "@coreui/react";
import Select from "react-select";
import {
  getDepartments,
  getAllProjects,
  login,
  addProject,
} from "../../services/API.service";
import _ from "lodash";
import ModalCard from "../../components/Modal/ModalCard";

const Project = (props) => {
  const [selectDepartment, setSelectDepartment] = React.useState();
  const [departments, setDepartments] = React.useState([]);
  const [projects, setProjects] = React.useState({});
  const [loginCard, setLoginCard] = React.useState(false);
  const [userInput, setUserInput] = React.useState({
    userName: "",
    password: "",
  });
  const initialProject = { name: "", description: "" };
  const [add, setAdd] = React.useState(initialProject);
  const [addProjectToggle, setAddProjectToggle] = React.useState(false);

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

  const _loginSubmit = async () => {
    let response;
    try {
      response = await login(userInput);
      if (response) {
        localStorage.setItem("token", response.token);
        setLoginCard(false);
        window.location.reload();
      }
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => _getAllprojets(), [selectDepartment]);
  React.useEffect(() => _getDepartments(), []);

  React.useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setLoginCard(false);
    } else {
      setLoginCard(true);
    }
  }, [login]);

  const _addProject = async () => {
    let response;
    let body = {
      name: add.name,
      description: add.description,
      department: selectDepartment.value,
    };
    try {
      response = await addProject(body);
      if (response) {
        _getAllprojets();
        setAddProjectToggle(false);
        setAdd(initialProject);
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <React.Fragment>
      <CCard style={{ height: "80vh" }}>
        <CCardBody>
          <CRow>
            <CCol lg={addProjectToggle ? 2 : 5}>
              <h1>Projects</h1>
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
            {addProjectToggle && (
              <CCol
                lg={4}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CInput
                  style={{ margin: "5px", height: "40px" }}
                  placeholder={"Name"}
                  value={add.name}
                  onChange={(e) => setAdd({ ...add, name: e.target.value })}
                />
                <CInput
                  style={{ margin: "5px", height: "40px" }}
                  placeholder={"Description"}
                  value={add.description}
                  onChange={(e) =>
                    setAdd({ ...add, description: e.target.value })
                  }
                />
              </CCol>
            )}

            <CCol
              lg={3}
              style={{ padding: "5px", display: "flex", flexDirection: "row" }}
            >
              <CButton
                style={{
                  margin: "5px",
                  background: "#551B89",
                  width: "80%",
                  color: "#fff",
                  fontWeight: "bold",
                  height: "38px",
                }}
                onClick={() =>
                  addProjectToggle ? _addProject() : setAddProjectToggle(true)
                }
              >
                ADD
              </CButton>
              <CButton
                style={{
                  margin: "5px",
                  background: "#551B89",
                  width: "80%",
                  color: "#fff",
                  fontWeight: "bold",
                  height: "38px",
                }}
                onClick={() => {
                  setSelectDepartment("");
                  setAdd(initialProject);
                  setAddProjectToggle(false);
                }}
              >
                CLEAR
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardBody style={{ overflowY: "scroll" }}>
          {projects &&
            Object.keys(projects).map((x, i) => (
              <CContainer key={i} style={{ marginTop: "20px" }}>
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
      <ModalCard isOpen={loginCard}>
        <hr />
        <div style={{ margin: "40px" }}>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2 style={{ color: "#551B89" }}>LOGIN</h2>
          </div>
          <br />
          <div style={{ margin: "20px" }}>
            <CInput
              name={"userName"}
              type={"text"}
              placeholder={"USER ID"}
              style={{ height: "50px" }}
              onChange={(e) =>
                setUserInput({ ...userInput, userName: e.target.value })
              }
            />
          </div>
          <div style={{ margin: "20px" }}>
            <CInput
              name={"password"}
              type={"password"}
              placeholder={"PASSWORD"}
              style={{ height: "50px" }}
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
            />
          </div>
          <div style={{ margin: "20px" }}>
            <CButton
              onClick={() => _loginSubmit()}
              style={{
                width: "100%",
                background: "#551B89",
                height: "50px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Login
            </CButton>
          </div>
          <div style={{ margin: "20px" }}>
            <p style={{ fontWeight: "bold" }}>
              New user ?{" "}
              <span style={{ color: "#551B89", cursor: "pointer" }}>
                Create one
              </span>
            </p>
          </div>
        </div>
      </ModalCard>
    </React.Fragment>
  );
};

export default Project;
