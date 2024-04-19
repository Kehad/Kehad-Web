import React from 'react';

// import Button from '../../layout/button';
// import classes from "./worksItem.module.css";
// import MobilePagination from "../Paginations/mobilePagination";

const WorksItem = function (props) {
  const { name, description, website, imageSrc, next, back } = props;

  return (
    <div className={classes.worksItem}>
      <div className={classes['worksItem__box']}>
        <div className={classes['worksItem__box---textCont']}>
          <h2 className={classes['worksItem__box---textCont--title']}>
            {name}
          </h2>
          <p className={classes['worksItem__box---textCont--text']}>
            {description}
          </p>
        </div>
        <div className={classes['worksItem__box--imgCont']}>
          <img
            className={classes['worksItem__box--imgCont-img']}
            src={imageSrc}
            alt="The Landing"
          />
        </div>
      </div>
      <div className={classes['worksItem__box--buttons']}>
        <Button link={website} target={'_blank'} name={'Visit Website'} />
        <MobilePagination next={next} back={back} />
      </div>
    </div>
  );
};

export default WorksItem;
