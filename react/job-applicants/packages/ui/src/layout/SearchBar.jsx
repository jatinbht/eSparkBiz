const SearchBar = () => {
    return (
        <form action="" method="get" className="flex gap-2 m-5 justify-center">
            <input 
                type="text" 
                name="q"
                placeholder="Search applicants..."
                className="px-4 py-2 border-2 border-gray-400 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <input 
                type="submit" 
                value='Search'
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 active:bg-blue-800 cursor-pointer transition-colors"
            />
        </form>
    )
}

export default SearchBar