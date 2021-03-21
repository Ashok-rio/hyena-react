import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import React from "react";
import Select from "react-select";
import { getAllModule, addProjModule } from "../../../services/API.service";

const ProjectModule = ({ data, dept, id }) => {
  const [exModule, setModule] = React.useState(data);
  const [modules, setModules] = React.useState([]);
  const [NewModule, setNewModule] = React.useState({});
  const [moduleView, setModuleView] = React.useState();
  const [moduleViewToggle, setModuleToggle] = React.useState(false);

  const _addNewModule = async () => {
    let response;
    try {
      response = await addProjModule({ id: id, module: NewModule.value });
      if (response) {
        setModule([...exModule, response.Project]);
        setNewModule({});
      }
    } catch (error) {
      throw error;
    }
  };

  const _getAllModules = async (exm) => {
    let response;
    try {
      response = await getAllModule(dept._id);
      if (response) {
        let options = [];
        for (let index = 0; index < response.Module.length; index++) {
          const element = response.Module[index];
          if (!exm.includes(element._id)) {
            options.push({ value: element._id, label: element.name });
          }
        }
        setModules(options);
      }
    } catch (error) {
      throw error;
    }
  };

  const _getExmodule = () => {
    let datas = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      datas.push(element.module._id);
    }
    _getAllModules(datas);
  };
  const _setModuleView = (modlueData) => {
    setModuleView(modlueData);
    setModuleToggle(true);
  };

  const ModuleView = ({ name }) => {
    return (
      <CContainer fluid>
        <CRow>
          <CCol>
            <h1>{name}</h1>
          </CCol>
        </CRow>
      </CContainer>
    );
  };

  const ModuleCard = ({ name, Tl, data }) => (
    <CCol lg={2}>
      <CCard
        className={"CardBox"}
        style={{ cursor: "pointer" }}
        onClick={() => _setModuleView(data)}
      >
        <CCardBody
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#551B89",
          }}
        >
          <h6 style={{ color: "#fff" }}>{name}</h6>
        </CCardBody>
        <CCardBody
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#000",
              textTransform: "capitalize",
            }}
          >
            {Tl} - TL
          </p>
        </CCardBody>
      </CCard>
    </CCol>
  );

  const AddModule = () => (
    <CRow>
      <CCol lg={3}></CCol>
      <CCol lg={3}></CCol>
      <CCol lg={3}>
        <Select
          options={modules}
          value={NewModule}
          onChange={(e) => setNewModule(e)}
          placeholder={"Select Module"}
        />
      </CCol>
      <CCol lg={3}>
        <CButton
          style={{
            width: "50%",
            color: "#fff",
            fontWeight: "bold",
            background: "#551b89",
          }}
          onClick={() => _addNewModule()}
        >
          ADD
        </CButton>
      </CCol>
    </CRow>
  );

  React.useEffect(() => _getExmodule(), []);
  return (
    <React.Fragment>
      {!moduleViewToggle ? (
        <React.Fragment>
          <CContainer style={{ marginBottom: "20px" }}>
            <AddModule />
          </CContainer>
          <CContainer style={{ marginTop: "20px" }}>
            <CRow>
              {exModule?.length > 0 &&
                exModule.map((x, i) => (
                  <ModuleCard
                    key={i}
                    name={x.module.name}
                    Tl={x.TL.userName}
                    data={x}
                  />
                ))}
            </CRow>
          </CContainer>
        </React.Fragment>
      ) : (
        <ModuleView name={moduleView.module.name}/>
      )}
    </React.Fragment>
  );
};

export default ProjectModule;
