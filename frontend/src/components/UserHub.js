import "./UserHub.css";

import { useEffect, useState } from "react";

const UserHub = () => {
  //    const [sortValuesArray, setSortValuesArray] = useState([]);
  const [sortValue, setSortValue] = useState("");

  const handleSortChange = (element) => {
    // e.preventDefault();
    setSortValue(element);
  };

  useEffect(() => {
    console.log(sortValue);
    // setSortValuesArray(sortValuesArray => [...sortValuesArray, sortValue]);
  }, [sortValue]);

  return (
    <ul className="container-hub">
      <li className="container-hub__element-navigation">
        <button>prev page</button>
        <button>next page</button>
      </li>
      <li className="container-hub__element-sort">
        sort by:
        <select className="container-hub__element-sort"
          value={sortValue}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option className="container-hub__element-sort" value="grapefruit">Grapefruit</option>
          <option className="container-hub__element-sort" value="lime">Lime</option>
          <option className="container-hub__element-sort" value="coconut">Coconut</option>
          <option className="container-hub__element-sort" value="mango">Mango</option>
        </select>
      </li>

      {/* <li>   {sortValuesArray.map(element=> <div> {element} </div>)} </li> */}
    </ul>
  );
};

export default UserHub;
