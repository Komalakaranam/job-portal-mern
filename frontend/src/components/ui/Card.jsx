const Card = ({ children }) => {
  return (
    <div className="border rounded-lg shadow-sm bg-white">
      {children}
    </div>
  );
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export { CardContent };
export default Card;
