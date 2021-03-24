import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CInput,
  CRow,
  CDataTable,
} from "@coreui/react";
import {
  getProjectModule,
  getAllUsers,
  assignDevModule,
  createProjModuleTask,
  getProjModuleTask,
} from "../../../services/API.service";
import { IoChevronBackCircle } from "react-icons/io5";
import MALE from "../../../assets/images/male.png";
import FEMALE from "../../../assets/images/female.png";
import Select from "react-select";
import "./ModelView.css";
import LoadingIndicator from "src/components/LoadingIndicator";

const ModuleView = (props) => {
  const { match } = props;
  let { projectId, moduleId } = match.params;

  const [module, setModule] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [newUser, setNewUser] = React.useState("");
  const [assignUser, setAssignUser] = React.useState([]);
  const initialTaskState = { name: "", description: "", developer: "" };
  const [createTask, setCreateTask] = React.useState(initialTaskState);
  const [Tasks, setTasks] = React.useState([]);
  const [taskToggle, setTaskToogle] = React.useState(false);

  const _getAllModuleTasks = async () => {
    let response;
    try {
      response = await getProjModuleTask(projectId, moduleId);
      if (response) {
        setTasks(response.Tasks);
      }
      if (!response) {
        setTaskToogle(true);
      }
    } catch (error) {
      throw error;
    }
  };

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
        // setAssignUser([...assignUser ,  {label:devs.userName, value:devs._id}]);
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
        let assignsUser = [];
        for (let index = 0; index < response.Users.length; index++) {
          const element = response.Users[index];

          let exDev = exUsers.find((s) => s._id === element._id);

          if (!exDev) {
            options.push({
              value: element._id,
              label: String(element.userName).toUpperCase(),
            });
          }
          if (exDev) {
            assignsUser.push({
              value: element._id,
              label: String(element.userName).toUpperCase(),
            });
          }
        }
        setAssignUser(assignsUser);
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
              alignItems: "flex-start",
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
            <span
              style={{
                fontSize: "10px",
              }}
            >
              {email}
            </span>
          </CCol>
        </CRow>
      </CCard>
    </React.Fragment>
  );
  React.useEffect(() => {
    _getProjModule();
    _getAllModuleTasks();
  }, []);

  const _createTask = async () => {
    let response;
    let body = {
      name: createTask.name,
      module: moduleId,
      project: projectId,
      assign: createTask.developer.value,
      description: createTask.description,
    };
    try {
      response = await createProjModuleTask(body);
      if (response) {
        console.log(response);
        setCreateTask(initialTaskState);
        setTasks([...Tasks, response.Task]);
        setTaskToogle(false);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <React.Fragment>
      <CCard style={{ height: "80vh" }}>
        {module && module?.developers?.length > 0 ? (
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
            <CRow style={{ marginTop: "2%" }}>
              <CCol lg={9}></CCol>
              <CCol></CCol>
              <CCol lg={2}>
                <CButton
                  style={{
                    margin: "10px",
                    width: "60%",
                    color: "#fff",
                    fontWeight: "bold",
                    background: "#551b89",
                  }}
                  onClick={() =>
                    !taskToggle ? setTaskToogle(true) : setTaskToogle(false)
                  }
                >
                  {!taskToggle ? "CREATE TASK" : "VIEW TASKS"}
                </CButton>
              </CCol>
            </CRow>
            <CRow style={{ marginTop: "2%", padding: "10px 10px" }}>
              <CCol lg={9}>
                {!taskToggle ? (
                  <CDataTable
                    items={Tasks}
                    fields={[
                      {
                        label: "Task",
                        key: "name",
                        _style: { width: "250px" },
                      },
                      {
                        label: "Description",
                        key: "Description",
                        _style: { width: "300px" },
                      },
                      {
                        label: "AssignTo",
                        key: "assignedTo",
                      },
                      {
                        label: "AssignFrom",
                        key: "assignedFrom",
                      },
                      {
                        label: "Status",
                        key: "status",
                      },
                    ]}
                  />
                ) : (
                  <CContainer>
                    <CRow>
                      <CCol lg={6}>
                        <CInput
                          placeholder={"Create Task Name"}
                          value={createTask.name}
                          onChange={(e) =>
                            setCreateTask({
                              ...createTask,
                              name: e.target.value,
                            })
                          }
                        />
                      </CCol>
                      <CCol lg={6}>
                        <Select
                          options={assignUser}
                          placeholder={"Select Developer"}
                          value={createTask.developer}
                          onChange={(e) =>
                            setCreateTask({ ...createTask, developer: e })
                          }
                        />
                      </CCol>
                    </CRow>
                    <CRow style={{ marginTop: "20px" }}>
                      <CCol lg={12}>
                        <textarea
                          style={{
                            height: "100px",
                            display: "block",
                            width: "100%",
                            padding: "0.375rem 0.75rem",
                            fontSize: "0.875rem",
                            fontWeight: 400,
                            lineHeight: 1.5,
                            backgroundClip: "padding-box",
                            border: "1px solid",
                            color: "#768192",
                            backgroundColor: "#fff",
                            borderColor: "#d8dbe0",
                            borderRadius: "0.25rem",
                          }}
                          placeholder={"Description"}
                          type={"text"}
                          value={createTask.description}
                          onChange={(e) =>
                            setCreateTask({
                              ...createTask,
                              description: e.target.value,
                            })
                          }
                        />
                      </CCol>
                    </CRow>
                    <CRow style={{ marginTop: "20px" }}>
                      <CCol
                        lg={12}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CButton
                          style={{
                            margin: "10px",
                            width: "20%",
                            color: "#fff",
                            fontWeight: "bold",
                            background: "#551b89",
                          }}
                          onClick={() => _createTask()}
                        >
                          ADD
                        </CButton>
                        <CButton
                          style={{
                            width: "20%",
                            color: "#fff",
                            fontWeight: "bold",
                            background: "#551b89",
                          }}
                          onClick={() => {
                            setCreateTask(initialTaskState);
                            setTaskToogle(false);
                          }}
                        >
                          CANCEL
                        </CButton>
                      </CCol>
                    </CRow>
                  </CContainer>
                )}
              </CCol>
              {/* <CCol lg={3}></CCol> */}
              {module?.developers?.length > 0 && (
                <CCol
                  lg={3}
                  className={"devs"}
                  style={{
                    padding: "0px",
                    overflowY: "scroll",
                    height: "400px",
                  }}
                >
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
        ) : (
          <CCardBody
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingIndicator type={"ThreeDots"} color={"#551B89"} />
          </CCardBody>
        )}
      </CCard>
    </React.Fragment>
  );
};

export default ModuleView;
