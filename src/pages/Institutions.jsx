import AddInstitute from "../components/institute/AddInstitute";
import ShowAllInstitute from "../components/institute/ShowAllInstitute";

export default function Institutions() {





  return (
    <div>
      <div className="tabs tabs-border">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Add New Institute"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 pb-8">
          <AddInstitute />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Show All Institutes"
        />
        <div className="tab-content border-base-300 bg-base-100 pb-8">
          <ShowAllInstitute />
        </div>
      </div>
    </div>
  );
}
