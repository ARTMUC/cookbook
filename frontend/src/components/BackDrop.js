import "./BackDrop.css";






const BackDrop = ({show, showDrawer}) => {
    return show && <div className="backdrop" onClick={showDrawer}></div>;
};

export default BackDrop;