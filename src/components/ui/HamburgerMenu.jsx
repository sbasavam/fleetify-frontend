const HamburgerMenu = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="py-2 rounded-md hover:bg-gray-400 text-white transition-colors focus:outline-none"
      aria-label="Toggle menu"
    >
      <svg
        className="w-6 h-6"
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
