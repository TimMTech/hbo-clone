import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";

const SearchBar: React.FC = () => {
  const router = useRouter();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLElement) {
      const currentPath = router.pathname;
      const currentQuery = { ...router.query };

      currentQuery.value = e.target.value;
      router.push({
        pathname: currentPath,
        query: currentQuery,
      });
    }
  };

  return (
    <div className="text-white w-full px-8 mt-24">
      <div className="flex items-center bg-white/10 rounded-md p-4">
        <AiOutlineSearch size={30} />
        <input
          onChange={(e) => handleSearchChange(e)}
          type="text"
          placeholder="What are you looking for?"
          className="outline-none text-xl w-full h-full"
        />
      </div>
    </div>
  );
};

export default SearchBar;
