interface NavigationProps {
  items: string[];
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navigation = ({
  items,
  darkMode,
  onToggleDarkMode,
}: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {darkMode ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            )}
          </button>

          <div className="flex items-center space-x-4">
            {items.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="nav-item relative px-3 sm:px-6 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300 group"
              >
                {item}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-[borderAnimation_3s_ease-in-out_infinite] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </a>
            ))}
            <a
              href={`/games/flashlight`}
              target="_blank"
              className="nav-item relative px-3 sm:px-6 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300 group"
            >
              Games
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-[borderAnimation_3s_ease-in-out_infinite] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
            </a>
          </div>
        </div>
      </div>
      <div className="h-[2px] bg-gradient-to-r from-blue-500 via-red-500 via-purple-500 via-red-500 to-blue-500 bg-[length:300%_100%] animate-[movingBorder_4s_linear_infinite]"></div>
    </nav>
  );
};
