import React from "react"

function SearchNotFound({query}) {
  return (
    <div className="px-4 py-6 dark:text-white my-4 w-full flex flex-col items-center bg-white dark:bg-darkBg dark:border-darkBorder border border-[#ccc] rounded">
        <img className="w-36 h-32" src="https://www.redditstatic.com/desktop2x/img/telescope-snoo.png" />
        <p className="text-2xl font-medium py-2">Hm... we couldn’t find any results for “{query}”</p>
        <p className="text-[#7c7c7c]">Double-check your spelling or try different keywords to adjust your search</p>
    </div>
  )
};

export default SearchNotFound;
