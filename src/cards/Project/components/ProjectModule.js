import React from "react";

const ProjectModule = ({data}) => {
  
  return (
    <React.Fragment>
      <p>Modules</p>
      <p>{JSON.stringify(data)}</p>
    </React.Fragment>
  );
};

export default ProjectModule;
