import React from 'react';

// import classes from './works.module.css';
import WorkList from './worksList';
// import NewList from './worksListcopy';

const Works = function (props) {
  // const records = Slice(firstIndex, lastIndex);
  // const npage = Math.ceil(props.data.length / recordsPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div className="mt-10 relative">
      <h1 className="text-6xl sm:text-5xl font-judson text-primary mb-4">
        Works
      </h1>

      <WorkList />
      {/* <NewList /> */}
    </div>
  );
};

export default Works;
