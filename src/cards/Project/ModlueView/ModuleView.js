import React from "react";
import { CButton, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import {
  getProjectModule,
  getAllUsers,
  assignDevModule,
} from "../../../services/API.service";
import { IoChevronBackCircle } from "react-icons/io5";
import MALE from "../../../assets/images/male.png";
import FEMALE from "../../../assets/images/female.png";
import Select from "react-select";

const ModuleView = (props) => {
  const { match } = props;
  let { projectId, moduleId } = match.params;

  const [module, setModule] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [newUser, setNewUser] = React.useState("");

  const _assignDev = async () => {
    let response;
    try {
      response = await assignDevModule({
        id: projectId,
        module: module.module._id,
        dev: newUser.value,
      });
      if (response) {
        let devs = [...module.developers, response.Dev];
        setModule({
          ...module,
          developers: devs,
        });
        setNewUser("");
      }
    } catch (error) {
      throw error;
    }
  };

  const _getAllUsers = async (exUsers) => {
    let response;
    try {
      response = await getAllUsers();
      if (response) {
        let options = [];
        for (let index = 0; index < response.Users.length; index++) {
          const element = response.Users[index];
          let exDev = exUsers.find((s) => s._id === element._id);
          if (!exDev) {
            options.push({
              value: element._id,
              label: String(element.userName).toUpperCase(),
            });
          }
        }
        setUsers(options);
      }
    } catch (error) {
      throw error;
    }
  };

  const _getProjModule = async () => {
    let response;
    try {
      response = await getProjectModule(projectId, moduleId);
      if (response) {
        setModule({ ...response.Module, projectName: response.projectName });
        _getAllUsers(response.Module.developers);
      }
    } catch (error) {
      throw error;
    }
  };

  const _defaultImage = (gen) => {
    if (gen === "MALE") {
      return MALE;
    } else {
      return FEMALE;
    }
  };

  const DeveloperCard = ({ name, email, gender }) => (
    <React.Fragment>
      <CCard
        className={"CardBox"}
        style={{
          height: "80px",
          borderRadius: "10px",
        }}
      >
        <CRow style={{ margin: "10px" }}>
          <CCol lg={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                borderRadius: "50px",
              }}
            >
              <img
                src={_defaultImage(gender)}
                alt={""}
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50px",
                }}
              />
            </div>
          </CCol>
          <CCol
            lg={10}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {String(name)}
            </span>
            <span>{email}</span>
          </CCol>
        </CRow>
      </CCard>
    </React.Fragment>
  );
  React.useEffect(() => _getProjModule(), []);
  return (
    <React.Fragment>
      <CCard style={{ height: "80vh" }}>
        {module && (
          <CCardBody>
            <CRow style={{ height: 20 }}>
              <CCol lg={6}>
                <IoChevronBackCircle
                  size={"2rem"}
                  color={"#551b89"}
                  onClick={() => props.history.push(`/project/${projectId}`)}
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
              <CCol lg={4} style={{}}>
                <Select
                  options={users}
                  value={newUser}
                  onChange={(e) => setNewUser(e)}
                  placeholder={"Select User"}
                />
              </CCol>
              <CCol lg={2}>
                <CButton
                  style={{
                    width: "50%",
                    color: "#fff",
                    fontWeight: "bold",
                    background: "#551b89",
                  }}
                  onClick={() => _assignDev()}
                >
                  ADD
                </CButton>
              </CCol>
            </CRow>
            <CRow style={{ marginTop: "2%", padding: "10px 10px" }}>
              <CCol lg={6}>
                <h1
                  style={{
                    color: "#551B89",
                  }}
                >
                  {module?.projectName} - {module?.module?.name}
                </h1>
              </CCol>
              <CCol lg={3}></CCol>
              <CCol
                lg={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    margin: "10px",
                    color: "#551B89",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  TL :
                </p>
                <p
                  style={{
                    color: "gray",
                    margin: "10px",
                    textTransform: "capitalize",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {module?.TL?.userName}
                </p>
                <p
                  style={{
                    color: "gray",
                    margin: "10px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {module?.TL?.email}
                </p>
              </CCol>
            </CRow>
            <CRow style={{ marginTop: "2%", padding: "10px 10px" }}>
              <CCol lg={6}></CCol>
              <CCol lg={3}></CCol>
              {module?.developers?.length > 0 && (
                <CCol lg={3} style={{ padding: "10px", overflowY: "scroll", height:"500px" }}>
                  {module?.developers?.map((x, i) => (
                    <DeveloperCard
                      key={i}
                      name={x.userName}
                      email={x.email}
                      gender={x.gender}
                    />
                  ))}
                </CCol>
              )}
            </CRow>
          </CCardBody>
        )}
      </CCard>
    </React.Fragment>
  );
};

export default ModuleView;
