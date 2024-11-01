import { useSearchAndFilter } from "../../hooks/useSearchAndFilter";
import Button from "../../ui/Button";
import FilterBy from "../../ui/FilterBy";
import SearchBy from "../../ui/SearchBy";

function TeachersTableOperation() {
    const [
        handleSubmit,
        searchByName,
        setSearchByName,
        filterByClass,
        setFilterByClass,
      ] = useSearchAndFilter();
    
      return (
        <form
          className="flex items-center justify-start gap-20"
          onSubmit={handleSubmit}
        >
          <SearchBy field="name" value={searchByName} onSearch={setSearchByName} />
          
          <FilterBy
            value={filterByClass || "all"}
            onFilter={setFilterByClass}
            optionList={[
              { value: "all", label: "All" },
              { value: "1", label: 1 },
              { value: "2", label: 2 },
              { value: "3", label: 3 },
              { value: "4", label: 4 },
              { value: "5", label: 5 },
              { value: "6", label: 6 },
            ]}
          />
          <Button style="rounded-md bg-primary-red px-14 py-3 uppercase text-white">
            Search
          </Button>
        </form>
      );
}

export default TeachersTableOperation
