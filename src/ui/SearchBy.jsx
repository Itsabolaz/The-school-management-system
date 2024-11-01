function SearchBy({ field, value, onSearch }) {
  return (
    <input
      type="text"
      placeholder={`Search by ${field}...`}
      className="w-96 rounded-md bg-secendary-gray px-4 py-3"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBy;
