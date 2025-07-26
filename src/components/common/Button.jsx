const Button = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200  ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'hover:shadow-md'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;