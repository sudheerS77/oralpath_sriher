import React from "react";

//Components
import SideBar from "../../components/AdminComponents/siderbar";
import AdminNavBar from "../../components/AdminComponents/adminNavBar";
import UpdateProject from "../../components/AdminComponents/ProjectFeatures/updateProject";

const ProjectUpdate = (props) => {
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="w-1/5">
          <SideBar />
        </div>
        <div className="w-4/5 flex flex-col gap-5">
          <AdminNavBar />
          <div className="mx-10">
            {props.urltype === "id" && <UpdateProject />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectUpdate;
