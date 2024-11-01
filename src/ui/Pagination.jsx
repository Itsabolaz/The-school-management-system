import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import Button from "./Button";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Math.ceil(count / PAGE_SIZE);

  let countArray = new Array(pageCount).fill(0).map((_, index) => index + 1);

  const currentPage = Number(searchParams.get("page")) || 1;

  function handlePrev() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }
  function handleNext() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function handleClickCountBtn(itemCount) {
    searchParams.set("page", itemCount);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <section className="mt-7 space-x-3 text-right [&>span]:text-third-gray [&>span]:transition-all hover:[&>span]:text-black">
      <Button
        style="transition-all text-third-gray hover:text-black"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {countArray.map((item) => (
        <Button
          key={item}
          style={`border border-primary-red rounded w-11 h-10 ${item === currentPage ? "bg-primary-red text-white" : ""}`}
          disabled={item === currentPage}
          onClick={() => handleClickCountBtn(item)}
        >
          {item}
        </Button>
      ))}
      <Button
        style="transition-all text-third-gray hover:text-black"
        onClick={handleNext}
        disabled={currentPage === pageCount}
      >
        Next
      </Button>
    </section>
  );
}

export default Pagination;
