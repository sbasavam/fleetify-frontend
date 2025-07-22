const HamburgerMenu = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none"
      aria-label="Toggle menu"
    >
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};

export default HamburgerMenu;
