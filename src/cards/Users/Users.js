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
import { getAllUsers } from "../../services/API.service";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const _getUsers = async () => {
    let response;
    try {
      response = await getAllUsers();
      if (response) {
        console.log(response, "Users");
      }
    } catch (error) {
      throw error;
    }
  };
  React.useEffect(() => _getUsers(), []);
  return (
    <React.Fragment>
      <CCard style={{ height: "80vh" }}>
        <CCardBody>
          <CRow>
            <CCol lg={4}>
              <h1>Users</h1>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </React.Fragment>
  );
};

export default Users;
