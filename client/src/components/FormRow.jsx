const FormRow = ({ type, name, labelText, defaultValue = "", onChange }) => {
  return (
    <div className="*:block space-y-2">
      <label htmlFor={name} className="">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className=" border border-custom-lightBlue w-full p-1 text-sm rounded focus:border-custom-blue focus:outline-none focus:border-2"
        defaultValue={defaultValue}
        required
        onChange={onChange}
      />
    </div>
  );
};

export default FormRow;
