import React from 'react';
import { motion } from 'framer-motion';
// import classes from './works.module.css';
import WorkList from './worksList';
// import NewList from './worksListcopy';

const Works = function (props) {
  // const records = Slice(firstIndex, lastIndex);
  // const npage = Math.ceil(props.data.length / recordsPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <motion.div
      className="mt-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-judson text-primary mb-4">
        My Works
      </h1>

      <WorkList />
      {/* <NewList /> */}
    </motion.div>
  );
};

export default Works;
