import React from 'react';

// import classes from './works.module.css';
import ProjectList from './projectList';
import MyComponent from './textProject';
import textProject from './textProject';
// import NewList from './ProjectsListcopy';

const Project = function (props) {
  // const records = Slice(firstIndex, lastIndex);
  // const npage = Math.ceil(props.data.length / recordsPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div className="mt-10 relative">
      <h1 className="text-5xl sm:text-5xl lg:text-6xl font-judson text-primary mb-4">
        Project
      </h1>

      <ProjectList />
      {/* <NewList /> */}
      {/* <MyComponent /> */}
    </div>
  );
};

export default Project;
