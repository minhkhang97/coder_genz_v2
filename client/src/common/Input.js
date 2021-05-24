const Input = ({ label, type, onChange, value }) => {
    return (
      <div className="flex flex-col py-2">
        <label htmlFor={label} className="my-1 capitalize font-semibold text-sm">
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="py-2 px-4 shadow-sm bg-white-50 border border-solid border-gray-100 rounded-lg text-gray-900 outline-none"
        />
      </div>
    );
  };
  
  export default Input;
  