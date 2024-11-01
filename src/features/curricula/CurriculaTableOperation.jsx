import { useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import FilterBy from "../../ui/FilterBy";
// import { useSearchAndFilter } from "../../hooks/useSearchAndFilter";
import { useState } from "react";

function CurriculaTableOperation() {
  const [searchParams , setSearchParams] = useSearchParams()
  const [filterByClass , setFilterByClass] = useState(searchParams.get('class') || 1)
  // const [
  //   handleSubmit,
  //   filterByClass,
  //   setFilterByClass,
  // ] = useSearchAndFilter();

  function handleSubmit(e){
    e.preventDefault();

    // filterByClass === "all"
    //   ? searchParams.delete("class")
       searchParams.set("class", filterByClass);

    setSearchParams(searchParams);
  }

  return (
    <form className="flex items-center justify-start gap-10" onSubmit={handleSubmit}>
      <p> Choose the class you want and see the curriculum of that class.</p>
      <FilterBy
        value={filterByClass || 1}
        onFilter={setFilterByClass}
        optionList={[
          { value: "1", label: 1 },
          { value: "2", label: 2 },
          { value: "3", label: 3 },
          { value: "4", label: 4 },
          { value: "5", label: 5 },
          { value: "6", label: 6 },
        ]}
      />
      <Button
        style="rounded-md bg-primary-red px-14 py-3 uppercase text-white"
      >
        Search
      </Button>
    </form>
  );
}

export default CurriculaTableOperation;
