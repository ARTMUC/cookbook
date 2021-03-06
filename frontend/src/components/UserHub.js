import "./UserHub.css";

const UserHub = ({
  changePage,
  changeSortParams,
  sortParams,
  currentPage,
  totalPages,
}) => {
  return (
    <ul className="container-hub">
      <li className="container-hub__element-navigation">
        <button
          className="container-hub__button-left"
          onClick={() => changePage(-1)}
        >
          prev page
        </button>
        <div className="container-hub__page-counter">
          {currentPage + 1} / {totalPages}
        </div>
        <button
          className="container-hub__button-right"
          onClick={() => changePage(1)}
        >
          next page
        </button>
      </li>
      <li>
        <select
          className="container-hub__element-select"
          value={sortParams}
          onChange={(e) => changeSortParams(e.target.value)}
        >
          <option
            className="container-hub__element-option"
            value="sort=createdAt&order=DESC"
          >
            latest
          </option>
          <option
            className="container-hub__element-option"
            value="sort=createdAt&order=ASC"
          >
            oldest
          </option>
          <option
            className="container-hub__element-option"
            value="sort=title&order=ASC"
          >
            ascending
          </option>
          <option
            className="container-hub__element-option"
            value="sort=title&order=DESC"
          >
            descending
          </option>
        </select>
      </li>
    </ul>
  );
};

export default UserHub;
