import { HiMiniChevronDown } from "react-icons/hi2"

function FilterBy({value , onFilter , optionList}) {
    return (
        <div className="relative w-96">
        <select
          className="w-full cursor-pointer appearance-none rounded-md bg-secendary-gray px-4 py-3"
          value={value}
          onChange={(e) => onFilter(e.target.value)}
        >
          {optionList.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transform">
          <HiMiniChevronDown />
        </span>
      </div>
    )
}

export default FilterBy
