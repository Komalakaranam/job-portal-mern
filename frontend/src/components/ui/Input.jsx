const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="border px-3 py-2 rounded w-full"
    />
  );
};

export default Input;
