import SingleIdCardForm from "../components/idCardForm/SingleIdCardForm";

export default function GenerateIdCard() {
  return (
    <div className="">
      <div className="tabs tabs-border">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Add New Institute"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 pb-8">
          <SingleIdCardForm />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Show All Institutes"
        />
      </div>
    </div>
  );
}
