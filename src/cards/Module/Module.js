import React  from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CContainer,
  CInput,
  CButton,
} from "@coreui/react";

import {
  getDepartments,
  CreateModule,
  getAllModule,
} from "../../services/API.service";
import Select from "react-select";
import _ from "lodash";

const Module = () => {
  const initialState = { name: "", department: "" };
  const [create, setCreate] = React.useState(initialState);
  const [departments, setDepartments] = React.useState([]);
  const [modules, setModules] = React.useState({});
  
  const _createModule = async () => {
    let response;
    try {
      response = await CreateModule({
        name: create.name,
        department: create.department.value,
      });
      if (response) {
        console.log(response, "MOdule");
        setCreate(initialState);
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

  const _ModuleDataOrganizer = (module) => {
    const groupUp = _.groupBy(module, "department.name");
    setModules(groupUp);
  };
  const _getAllModules = async () => {
    let response;
    try {
      response = await getAllModule(create.department.value || "");
      if (response) {
        _ModuleDataOrganizer(response.Module);
        // setModules(response.Module);
      }
    } catch (error) {
      throw error;
    }
  };
  const ModuleCard = ({ data }) => {
    return data.map((x, i) => (
      <CCol lg={3} key={i}>
        <CCard>
          <CCardBody
            
            style={{ background: "#551B89", borderRadius: "5px" }}
          >
            <p
              style={{
                paddingTop: "10px",
                fontSize: "15px",
                textAlign: "center",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {x.name}
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    ));
  };

  React.useEffect(() => _getAllModules(), [create.department]);

  React.useEffect(() => _getDepartments(), [create.department]);

  return (
    <CCard style={{ height: "80vh" }}>
      <CCardBody>
        <CRow>
          <CCol lg={4}>
            <h1>{`${create.department.label || ""}`} Modules</h1>
          </CCol>
          <CCol lg={3} style={{ padding: "10px 10px 10px 0px" }}>
            {departments && (
              <Select
                value={create.department}
                onChange={(e) => setCreate({ ...create, department: e })}
                options={departments}
                placeholder={"Select Department"}
              />
            )}
          </CCol>
          <CCol lg={5} style={{ padding: "10px 0px 10px 0px" }}>
            <CRow>
              <CCol lg={6}>
                <CInput
                  style={{ height: "38px" }}
                  placeholder={"Enter Module"}
                  value={create.name}
                  //   disabled={create.department === "" ? true : false}
                  onChange={(e) =>
                    setCreate({ ...create, name: e.target.value })
                  }
                />
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
                  onClick={() =>
                    create.name !== "" &&
                    create.department !== "" &&
                    _createModule()
                  }
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
                  onClick={() => setCreate(initialState)}
                >
                  CLEAR
                </CButton>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardBody style={{ overflowY: "scroll" }}>
        {/* <br /> */}
        {modules &&
          Object.keys(modules).map((x, i) => (
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
                <ModuleCard data={modules[x]} key={i} />
              </CRow>
            </CContainer>
          ))}
        {Object.keys(modules).length === 0 && (
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

export default Module;
