import React from "react";
import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react";
import MALE from "../../../assets/images/male.png";
import FEMALE from "../../../assets/images/female.png";

const ProjectDeveloper = ({ data }) => {
  
  const _defaultImage = (gen) => {
    if (gen === "MALE") {
      return MALE;
    } else {
      return FEMALE;
    }
  };

  console.log(data, 'developers');
  

  const UserCard = ({ user, lg }) => (
    <CCol lg={lg}>
      <CCard
        className={"CardBox"}
        style={{
          height: "80px",
          borderRadius:"10px"
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
                src={_defaultImage(user.gender)}
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
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              flexDirection:"column"
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {String(user.userName)}
            </span>
            <span >{user.email}</span>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  );
  return (
    <React.Fragment>
      <CContainer>
        <CRow>
          {data?.length > 0 &&
            data.map((x, i) => <UserCard user={x} lg={3} key={i} />)}
        </CRow>
      </CContainer>
    </React.Fragment>
  );
};

export default ProjectDeveloper;
