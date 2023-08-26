import * as React from "react";

type SearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div>
      <input
        type="text"
        id="table-search-users"
        defaultValue={search}
        className="block p-2 pl-10 text-sm text-white border border-gray-800 rounded-lg w-80 bg-black focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search a song..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

// ex w/ debounce
// const onQueryChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
//   if (debounceRef.current) {
//     clearTimeout(debounceRef.current);
//   }

//   debounceRef.current = setTimeout(() => {
//     setSearch(event.target.value);
//   }, 350);
// };
