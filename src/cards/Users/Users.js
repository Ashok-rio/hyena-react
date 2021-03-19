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
  getAllUsers,
  getDepartments,
  addsNewUser,
} from "../../services/API.service";
import "./users.css";
import MALE from "../../assets/images/male.png";
import FEMALE from "../../assets/images/female.png";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [newUser, setNewUser] = React.useState(false);
  const initialState = { name: "", gender: "", department: "", email: "" };
  const [addUser, setAdduser] = React.useState(initialState);

  const _getUsers = async () => {
    let response;
    try {
      response = await getAllUsers();
      if (response) {
        setUsers(response.Users);
      }
    } catch (error) {
      throw error;
    }
  };
  React.useEffect(() => {
    _getUsers();
    _getDepartments();
  }, []);

  const _defaultImage = (gen) => {
    if (gen === "MALE") {
      return MALE;
    } else {
      return FEMALE;
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

  const _addNewUser = async (user) => {
    let response;
    try {
      let body = {
        name: user.name,
        email: user.email,
        gender: user.gender.value,
        department: user.department.value,
      };
      response = await addsNewUser(body);
      if (response) {
        setUsers([...users, response.newUser]);
        setNewUser(false);
        setAdduser(initialState);
      }
    } catch (error) {
      throw error;
    }
  };

  const UserCard = ({ user, lg }) => (
    <CCol lg={lg}>
      <CCard
        className={"userCard"}
        style={{
          height: "60px",
        }}
      >
        <CRow style={{ margin: "10px" }}>
          <CCol lg={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50px",
              }}
            >
              <img
                src={_defaultImage(user.gender)}
                alt={""}
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50px",
                }}
              />
            </div>
          </CCol>
          <CCol
            lg={10}
            style={{
              padding: "0px 10px 0px 20px",
            }}
          >
            <p
              style={{
                // marginTop: "5px",
                fontSize: "18px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {String(user.userName)}
            </p>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  );

  React.useEffect(() => {
    _getUsers();
    _getDepartments();
  }, []);
  return (
    <React.Fragment>
      <CCard style={{ height: "80vh" }}>
        <CCardBody>
          <CRow>
            <CCol lg={4}>
              <h1>Users</h1>
            </CCol>
            {/* {!newUser && (
              <CCol lg={3} style={{ padding: "10px 10px 10px 0px" }}>
                {departments && (
                  <Select
                    value={""}
                    onChange={(e) => {}}
                    options={departments}
                    placeholder={"Select Department"}
                  />
                )}
              </CCol>
            )} */}
            <CCol lg={8}>
              {!newUser ? (
                <CButton
                  style={{
                    float: "right",
                    background: "#551B89",
                    width: "10%",
                    color: "#fff",
                  }}
                  onClick={() => setNewUser(true)}
                >
                  NEW
                </CButton>
              ) : (
                <CContainer style={{ padding: "20px" }} fluid>
                  <CRow>
                    <CCol lg={4} style={{ padding: "10px 10px 10px 0px" }}>
                      <CInput
                        type={"text"}
                        name={"name"}
                        value={addUser.name}
                        onChange={(e) =>
                          setAdduser({ ...addUser, name: e.target.value })
                        }
                        placeholder={"Enter Name"}
                      />
                    </CCol>
                    <CCol lg={4} style={{ padding: "10px 10px 10px 0px" }}>
                      <CInput
                        type={"email"}
                        name={"email"}
                        value={addUser.email}
                        onChange={(e) =>
                          setAdduser({ ...addUser, email: e.target.value })
                        }
                        placeholder={"Enter Email Address"}
                      />
                    </CCol>
                  </CRow>
                  <CRow style={{ marginTop: "15px" }}>
                    <CCol lg={4} style={{ padding: "10px 10px 10px 0px" }}>
                      {departments && (
                        <Select
                          value={addUser.department}
                          onChange={(e) =>
                            setAdduser({ ...addUser, department: e })
                          }
                          options={departments}
                          placeholder={"Select Department"}
                        />
                      )}
                    </CCol>
                    <CCol lg={4} style={{ padding: "10px 10px 10px 0px" }}>
                      <Select
                        value={addUser.gender}
                        onChange={(e) => setAdduser({ ...addUser, gender: e })}
                        options={[
                          { label: "MALE", value: "MALE" },
                          { label: "FEMALE", value: "FEMALE" },
                        ]}
                        placeholder={"Select Gender"}
                      />
                    </CCol>
                  </CRow>
                  <CRow style={{ marginTop: "15px" }}>
                    <CCol
                      lg={12}
                      style={{
                        padding: "10px 10px 10px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CButton
                        style={{
                          margin: "5px",
                          width: "10%",
                          color: "#fff",
                          background: "#551B89",
                        }}
                        onClick={() => _addNewUser(addUser)}
                      >
                        ADD
                      </CButton>
                      <CButton
                        style={{
                          margin: "5px",
                          width: "10%",
                          color: "#fff",
                          background: "#551B89",
                        }}
                        onClick={() => setNewUser(false)}
                      >
                        CANCEL
                      </CButton>
                    </CCol>
                  </CRow>
                </CContainer>
              )}
            </CCol>
          </CRow>
          <br />
          <CRow>
            {users.map((x, i) => (
              <UserCard user={x} lg={3} key={i} />
            ))}
          </CRow>
        </CCardBody>
      </CCard>
    </React.Fragment>
  );
};

export default Users;
