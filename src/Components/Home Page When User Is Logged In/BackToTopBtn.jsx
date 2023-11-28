function BackToTopBtn() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    return (
        <div className="sticky top-[82vh] text-center">
            <button onClick={scrollToTop} className="dark:bg-darkBtn dark:text-black w-[150px] py-1 font-semibold bg-[#0079D3] rounded-2xl mt-16 text-white hover:bg-[rgba(0,121,211,0.9)]">Back To Top</button>
        </div>
    )
}

export default BackToTopBtn;