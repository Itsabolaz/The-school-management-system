import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useSearchAndFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchByName, setSearchByName] = useState("");
  const [filterByClass, setFilterByClass] = useState("all");

  useEffect(
    function () {
      searchParams.get("name") && setSearchByName(searchParams.get("name"));

      searchParams.get("class") !== "all" &&
        searchParams.get("class") !== null &&
        setFilterByClass(searchParams.get("class"));
    },
    [searchParams],
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (searchParams.get("page")) searchParams.set("page", 1);

    // Checking the input to make sure that a character has been entered
    const searchInputRegex = /^(?!\s*$).+/;

    !searchInputRegex.test(searchByName)
      ? searchParams.delete("name")
      : searchParams.set("name", searchByName);

    filterByClass === "all"
      ? searchParams.delete("class")
      : searchParams.set("class", filterByClass);

    setSearchParams(searchParams);
  }

  return [
    handleSubmit,
    searchByName,
    setSearchByName,
    filterByClass,
    setFilterByClass,
  ];
}
