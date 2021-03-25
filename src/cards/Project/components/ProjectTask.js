import React from "react";
import { CCol, CDataTable, CContainer, CRow } from "@coreui/react";
import { getProjTasks } from "../../../services/API.service";


const ProjectTask = ({ projectId }) => {
  const [tasks, setTasks] = React.useState([]);

  const _getTasks = async () => {
    let response;
    try {
      response = await getProjTasks(projectId);
      if (response) {
        setTasks(response.Tasks);
      }
    } catch (error) {
      throw error;
    }
  };
  React.useEffect(() => _getTasks(), []);

  return (
    <React.Fragment>
      <CContainer style={{ marginTop: "20px" }} fluid>
        <CRow>
          <CCol lg={12}>
            <CDataTable
              items={tasks}
              fields={[
                {
                  label: "Module",
                  key: "module",
                  _style: { width: "250px" },
                },,{
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
          </CCol>
        </CRow>
      </CContainer>
    </React.Fragment>
  );
};

export default ProjectTask;
