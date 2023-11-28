import React from "react"
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
function SearchSuggestions() {
  return (
    <div className="h-[500px] bg-white shadow-lg rounded-b-3xl p-4 overflow-y-auto mt-[550px] w-[515px]">
        <div className="flex gap-2 uppercase">
            <TrendingUpOutlinedIcon />
            <h1>Trending Today</h1>
        </div>
    </div>
  )
};

export default SearchSuggestions;
