const Header = () => {
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
    };

    return (
        <header
            className="
                flex
                justify-between
                items-center
                p-4
                border-b

                bg-gray-200
                text-black

                dark:bg-gray-900
                dark:text-white
            "
            >

            {/* tabs (yet to be developed)*/}
            Basic info
            Education
            Experience
            Technologies
            {/* tabs */}

            <button
                onClick={toggleTheme}
                className="
                    rounded
                    border
                    px-3
                    py-1
                    hover:bg-gray-100

                    dark:hover:bg-gray-800
                "
            >
                Toggle Theme
            </button>
        </header>
    );
};

export default Header;
