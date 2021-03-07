import React from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CContainer,
  CInput,
  CButton,
} from "@coreui/react";
import Select from "react-select";
import "./Tool.css";
import {
  getDepartments,
  getAllModule,
  CreateTool,
} from "../../services/API.service";

const AddTool = ({ onBack }) => {
  const initialState = {
    name: "",
    use: "",
    version: "",
    url: "",
    module: "",
    department: "",
  };
  const [create, setCreate] = React.useState(initialState);
  const [department, setDepartment] = React.useState([]);
  const [modules, setModules] = React.useState([]);

  const _createTool = async () => {
    let body = {
      name: create.name,
      use: create.use,
      version: create.version,
      url: create.url,
      module: create.module.value,
      department: create.department.value,
    };
    let response;
    try {
      response = await CreateTool(body);
      if (response) {
        console.log(response);
      }
    } catch (error) {
      throw error;
    }
  };
  
  const _getDeptByModule = async (id) => {
    let response;
    try {
      response = await getAllModule(id || "");
      if (response) {
        let options = [];
        for (let index = 0; index < response.Module.length; index++) {
          const element = response.Module[index];
          options.push({ value: element._id, label: element.name });
        }
        if (response.Module?.length === options.length) {
          setModules(options);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const _departMentChange = (e) => {
    setCreate({ ...create, department: e });
    _getDeptByModule(e.value);
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
          setDepartment(options);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => _getDepartments(), []);
  return (
    <CCard style={{ height: "80vh" }}>
      <CCardBody style={{ height: "10px" }}>
        <CRow>
          <CCol lg={4}>
            <h1>New Tool</h1>
          </CCol>
          <CCol lg={8}>
            <CButton
              style={{
                float: "right",
                background: "#551B89",
                width: "10%",
                color: "#fff",
                fontWeight: "bold",
                height: "38px",
              }}
              onClick={onBack}
            >
              BACK
            </CButton>
          </CCol>
        </CRow>
        <CRow style={{ margin: "50px" }}>
          <CCol lg={6}>
            <CInput
              style={{ height: "40px" }}
              placeholder={"Enter Name"}
              value={create.name}
              onChange={(e) => setCreate({ ...create, name: e.target.value })}
            />
          </CCol>
          <CCol lg={6}>
            <CInput
              style={{ height: "40px" }}
              placeholder={"Enter Version"}
              value={create.value}
              onChange={(e) =>
                setCreate({ ...create, version: e.target.value })
              }
            />
          </CCol>
        </CRow>
        <CRow style={{ margin: "50px" }}>
          <CCol lg={6}>
            <Select
              className={"selectStyle"}
              value={create.department}
              onChange={_departMentChange}
              options={department}
              placeholder={"Select Department"}
            />
          </CCol>
          <CCol lg={6}>
            <Select
              className={"selectStyle"}
              value={create.module}
              onChange={(e) => setCreate({ ...create, module: e })}
              options={modules}
              placeholder={"Select Module"}
            />
          </CCol>
        </CRow>
        <CRow style={{ margin: "50px" }}>
          <CCol lg={12}>
            <CInput
              style={{ height: "50px" }}
              placeholder={"Enter Description"}
              value={create.use}
              onChange={(e) => setCreate({ ...create, use: e.target.value })}
            />
          </CCol>
        </CRow>
        <CRow style={{ margin: "50px" }}>
          <CCol lg={12}>
            <CInput
              style={{ height: "50px" }}
              placeholder={"Enter Download url"}
              value={create.url}
              onChange={(e) => setCreate({ ...create, url: e.target.value })}
            />
          </CCol>
        </CRow>
        <CRow style={{ margin: "50px" }}>
          <CCol lg={8}></CCol>
          <CCol lg={2}>
            <CButton
              style={{
                background: "#551B89",
                width: "100%",
                color: "#fff",
                fontWeight: "bold",
                height: "38px",
              }}
              onClick={() => _createTool()}
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
              onClick={() => {}}
            >
              CLEAR
            </CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default AddTool;
