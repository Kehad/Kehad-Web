import classes from './layout.module.css'

const Layout = function (props) {
  return (
    <div className={classes.layout}>
        {props.children}
    </div>
  );
};

export default Layout;
