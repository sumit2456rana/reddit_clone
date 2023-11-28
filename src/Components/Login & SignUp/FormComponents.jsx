function ContineWithGoogle({ img, text }) {
    return (
        <div className="w-full flex items-center border cursor-pointer rounded-3xl border-search dark:bg-white dark:text-black gap-16 mt-5 px-3 py-2 hover:bg-blue-100">
            <img src={img} className="h-6 w-6" />
            <p className="mr-14 font-semibold">Continue with {text}</p>
        </div>
    )
}
function Or() {
    return (
        <div className="flex w-full my-8 items-center justify-around">
            <div className="border h-[1px] w-full border-[#D6D6D6]"></div>
            <p className="px-5 font-bold">OR</p>
            <div className="border h-[1px] w-full border-[#D6D6D6]"></div>
        </div>
    )
}
function Input({type , value , onChangeHanlder, label}) {
    return (
        <label htmlFor="inp" className="inp dark:bg-inputDark mt-4 hover:bg-searchHover">
        <input
            type={type}
            name={type === 'text' ? "name" : type}
            placeholder=" "
            value={value}   
            onChange={(e) => onChangeHanlder(e)}
            className="dark:bg-inputDark"
        />
        <span className="label">{label} <span className="text-red-600">*</span></span>
        <span className="focus-bg"></span>
    </label>
    )
}

export {ContineWithGoogle , Input , Or};