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
import AddTool from "./AddTool";
import {
  getAllTools,
  getAllModule,
  getDepartments,
} from "../../services/API.service";

const Tools = () => {
  const initialState = {
    department: "",
    module: "",
  };
  const [select, setSelect] = React.useState(initialState);
  const [departments, setDepartments] = React.useState([]);
  const [modules, setModules] = React.useState([]);
  const [toolToggle, setToogle] = React.useState(false);
  const [Tools, setTools] = React.useState([]);
  const _departMentChange = (e) => {
    setSelect({ ...select, department: e });
    _getDeptByModule(e.value);
  };
  
  const _moduleChange = (e) => {
    setSelect({ ...select, module: e });
    _getAllTools(select.department.value, e.value);
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

  const _getAllTools = async (dept, module) => {
    let response;
    try {
      response = await getAllTools(dept, module);
      if (response) {
        setTools(response.Tools);
      }
    } catch (error) {
      throw error;
    }
  };

  const ToolCard = ({ data }) => {
    return data.map((x, i) => (
      <CCol lg={3}>
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
              {x.name}
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    ));
  };

  React.useEffect(() => {
    _getAllTools(select.department.value || "", select.module.value || "");
    _getDepartments();
  }, []);

  return (
    <React.Fragment>
      {toolToggle && <AddTool onBack={() => setToogle(false)} />}
      {!toolToggle && (
        <CCard style={{ height: "80vh" }}>
          <CCardBody>
            <CRow>
              <CCol lg={2}>
                <h1>Tools</h1>
              </CCol>
              <CCol lg={3} style={{ padding: "10px 10px 10px 0px" }}>
                <Select
                  value={select.department}
                  onChange={_departMentChange}
                  options={departments}
                  placeholder={"Select Department"}
                />
              </CCol>
              <CCol lg={3} style={{ padding: "10px 10px 10px 0px" }}>
                <Select
                  value={select.module}
                  onChange={_moduleChange}
                  options={modules}
                  placeholder={"Select Module"}
                />
              </CCol>
              <CCol lg={2} style={{ padding: "10px 10px 10px 0px" }}>
                <CButton
                  style={{
                    float: "right",
                    background: "#551B89",
                    width: "50%",
                    color: "#fff",
                    fontWeight: "bold",
                    height: "38px",
                  }}
                  onClick={() => setToogle(true)}
                >
                  ADD
                </CButton>
              </CCol>
              <CCol lg={2} style={{ padding: "10px 10px 10px 0px" }}>
                <CButton
                  style={{
                    background: "#551B89",
                    width: "50%",
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

            <CContainer style={{ marginTop: "50px" }}>
              <CRow>{Tools.length > 0 && <ToolCard data={Tools} />}</CRow>
            </CContainer>
          </CCardBody>
        </CCard>
      )}
    </React.Fragment>
  );
};

export default Tools;
