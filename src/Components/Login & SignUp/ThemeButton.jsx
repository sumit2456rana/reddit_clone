import Spinner from "../Loader/Spinner";
function ThemeButton({ children, isDisabled, isLoading, onClickHandler }) {
    return (
        <button
            disabled={isDisabled}
            onClick={onClickHandler}
            className={`w-full flex justify-center items-center h-12 font-semibold mt-5 rounded-3xl cursor-pointer text-white  ${isDisabled || isLoading ? "bg-search" : "bg-brandBg hover:bg-brandBgHover"}`}
        >
            {isLoading ? <Spinner center={false} /> : children}
        </button>
    )
}

export default ThemeButton;