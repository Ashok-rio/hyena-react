import React from "react";
import {
  CRow,
  CCol,
  CCard,
  CContainer,
  CCardBody,
  CButton,
} from "@coreui/react";
import { getOneProject } from "../../services/API.service";
import LoadingIndicator from "src/components/LoadingIndicator";
import { IoChevronBackCircle } from "react-icons/io5";
import {
  ProjectDeveloper,
  ProjectModule,
  ProjectTask,
  ProjectTool,
} from "./components/index";
const ManageProject = (props) => {
  const { match } = props;
  let { projectId } = match.params;
  const [project, setProject] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOpenAttribute, setIsOpenAttribute] = React.useState(false);
  const [attribute, setAttribute] = React.useState();

  const _changeAttribute = (attr, handle) => {
    if (handle) {
      setAttribute(attr);
      setIsOpenAttribute(true);
    }
    if (!handle) {
      setAttribute("");
      setIsOpenAttribute(false);
    }
  };

  const _getProject = async () => {
    let response;
    try {
      response = await getOneProject(projectId);
      if (response) {
        setProject(response.Project);
        setIsLoading(false);
      }
    } catch (error) {
      throw error;
    }
  };

  const _attributeRender = () => {
    switch (attribute) {
      case "Modules":
        return <ProjectModule />;

      case "Developers":
        return <ProjectDeveloper />;
      case "Tools":
        return <ProjectTool />;
      case "Tasks":
        return <ProjectTask />;

      default:
        return {};
    }
  };

  const ProjectCountCard = ({ name, count, onClick }) => (
    <CCol lg={3}>
      <CCard
        style={{ height: "150px", background: "#551B89", cursor: "pointer" }}
        onClick={() => _changeAttribute(name, true)}
      >
        <CCardBody>
          <CRow>
            <CCol lg={6}>
              <h4 style={{ color: "#fff" }}>{name}</h4>
            </CCol>
          </CRow>

          <CRow>
            <CCol style={{ textAlign: "right", padding: "0px 50px 0px 0px" }}>
              <p
                style={{ fontSize: "40px", fontWeight: "bold", color: "#fff" }}
              >
                {count}
              </p>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  );

  React.useEffect(() => _getProject(), []);

  const cardStyle = {
    loadStyle: {
      height: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    cardStyle: {
      height: "80vh",
    },
  };

  return (
    <CCard style={isLoading ? cardStyle.loadStyle : cardStyle.cardStyle}>
      {isLoading && <LoadingIndicator type={"ThreeDots"} color={"#551B89"} />}
      {!isLoading && (
        <React.Fragment>
          <CCardBody>
            <CRow style={{ height: 20 }}>
              {isOpenAttribute && (
                <CCol>
                  <IoChevronBackCircle
                    size={"2rem"}
                    color={"#551b89"}
                    onClick={() => _changeAttribute("", false)}
                  />
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "16px",
                      color: "#551B89",
                      fontWeight: "bold",
                    }}
                  >
                    Back
                  </span>
                </CCol>
              )}
            </CRow>
            <CRow style={{ marginTop: "2%", padding: "10px 10px" }}>
              <CCol lg={12}>
                <h1 style={{ color: "#551B89" }}>
                  {String(project.Name).toUpperCase()}{" "}
                  {attribute && String(attribute).toUpperCase()}
                </h1>
                <p>{project.description}</p>
              </CCol>
            </CRow>
            <CRow style={{ marginTop: "2%", padding: "10px 10px" }}>
              {!isOpenAttribute ? (
                <React.Fragment>
                  <ProjectCountCard name={"Modules"} count={2} />
                  <ProjectCountCard name={"Developers"} count={5} />
                  <ProjectCountCard name={"Tools"} count={6} />
                  <ProjectCountCard name={"Tasks"} count={23} />
                </React.Fragment>
              ) : (
                _attributeRender()
              )}
            </CRow>
          </CCardBody>
        </React.Fragment>
      )}
    </CCard>
  );
};

export default ManageProject;
