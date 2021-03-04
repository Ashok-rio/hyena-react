import React, { useState } from "react";
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

import { getDepartments, CreateModule } from "../../services/API.service";
import Select from "react-select";

const Module = () => {
  const [create, setCreate] = React.useState({ name: "", department: "" });
  const [departments, setDepartments] = React.useState([]);

  const _createModule = async () => {
    let response;
    try {
      response = await CreateModule({
        name: create.name,
        department: create.department.value,
      });
      if (response) {
        console.log(response, "MOdule");
        setCreate({ name: "", department: "" });
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

  React.useEffect(() => _getDepartments(), []);

  console.log(create);

  return (
    <CCard style={{ height: "80vh" }}>
      <CCardBody>
        <CRow>
          <CCol lg={4}>
            <h1>Modules</h1>
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
            </CRow>
          </CCol>
        </CRow>

        {/* <br /> */}
        <CContainer style={{ marginTop: "50px" }}>
          <CRow>
            {/* {departments?.map((x, i) => (
            <DepartmentCard name={x.name} key={i} />
          ))} */}
          </CRow>
        </CContainer>
      </CCardBody>
    </CCard>
  );
};

export default Module;
