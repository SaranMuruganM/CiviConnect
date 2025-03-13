const FormRow = ({
  type,
  name,
  labelText,
  defaultValue = '',
  options = [],
  styles,
  setSelectedOption,
  onChange
}) => {
  return (
    <div className="*:block space-y-2">
      <label htmlFor={name} className="">
        {labelText || name}
      </label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          onChange={(e) => setSelectedOption(e.target.value)}
          className={`${
            styles && styles
          } border border-custom-lightBlue w-full p-1 text-sm rounded focus:border-custom-blue focus:outline-none focus:border-1`}
          defaultValue={defaultValue}
          required
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className={`${
            styles && styles
          } border border-custom-lightBlue w-full p-1 text-sm rounded focus:border-custom-blue focus:outline-none focus:border-1`}
          defaultValue={defaultValue}
          required
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FormRow;
