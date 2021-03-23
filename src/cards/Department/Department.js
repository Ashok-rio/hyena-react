import React, { useState } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CContainer,
  CInput,
  CButton,
} from "@coreui/react";

import { CreateDepartment, getDepartments } from "../../services/API.service";
import "./Department.css";

const Department = () => {
  const [create, setCreate] = useState("");
  const [departments, setDepartments] = React.useState([]);

  const _createDepartment = async () => {
    let response;
    try {
      response = await CreateDepartment(create);
      if (response) {
        console.log(response, "department");
        setCreate("");
        setDepartments([...departments, response.Department]);
      }
    } catch (error) {
      throw error;
    }
  };

  const _getDepartments = async () => {
    let response;
    try {
      response = await getDepartments();  
      if (response) setDepartments(response.Department);
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => _getDepartments(), []);

  const DepartmentCard = ({ name }) => {
    return (
      <CCol lg={3}>
        <CCard>
          <CCardBody
            // className={"box-shadow-card"}
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
              {name}
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    );
  };

  return (
    <CCard style={{ height: "80vh" }}>
      <CCardBody>
        <CRow>
          <CCol lg={2}>
            <h1>Departments</h1>
          </CCol>
          <CCol lg={5}></CCol>
          <CCol lg={5} style={{ padding: "10px 0px 10px 0px" }}>
            <CRow>
              <CCol lg={6}>
                <CInput
                  style={{ height: "38px" }}
                  placeholder={"Enter Department"}
                  value={create}
                  onChange={(e) => setCreate(e.target.value)}
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
                  onClick={() => create !== "" && _createDepartment()}
                >
                  ADD
                </CButton>
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        {/* <br /> */}
        <CContainer style={{ marginTop: "50px" }}>
          <CRow>
            {departments?.map((x, i) => (
              <DepartmentCard name={x.name} key={i} />
            ))}
          </CRow>
        </CContainer>
      </CCardBody>
    </CCard>
  );
};

export default Department;
