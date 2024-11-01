function DetailsContainer({children , gapStyle}) {
    return (
        <section className={`flex h-[88%] w-full justify-center ${gapStyle} overflow-scroll px-14 pt-28`}>
            {children}
        </section>
    )
}

export default DetailsContainer
