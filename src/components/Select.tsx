import React, { useEffect, useRef, useState } from "react";

export interface IList {
  name: string;
  url: string;
}

interface SelectProps {
  list: IList[];
  selectedList: IList[];
  setSelected: (list: IList[]) => void;
}

const SelectComponent: React.FC<SelectProps> = ({
  list,
  selectedList,
  setSelected,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (listItem: IList) => {
    if (selectedList.length < 4) {
      setSelected([...selectedList, listItem]);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  const handleRemove = (name: string) => {
    setSelected(selectedList.filter((item) => item.name !== name));
  };

  const filteredItems = list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedList.some((selectedItem) => selectedItem.name === item.name)
  );

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div
        className="flex flex-nowrap flex-row gap-1 border border-gray-300 rounded-lg p-2 cursor-pointer items-center"
        onClick={(e) => {
          e.stopPropagation();
          setSearchTerm("");
          if (filteredItems.length > 0) setIsOpen((prev) => !prev);
        }}
      >
        <div className="flex flex-row overflow-x-auto">
          {selectedList.map((item) => (
            <span
              key={item.name}
              className="bg-blue-500 text-white px-2 py-0.5 rounded-lg flex items-center cursor-pointer whitespace-nowrap mr-2"
            >
              {item.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
                onClick={() => handleRemove(item.name)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </span>
          ))}
        </div>

        <div className="ml-auto flex flex-row">
          {selectedList.length === 4 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
              onClick={() => setSelected([])}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
            className={`size-6 ${
              isOpen ? "rotate-180" : ""
            } ml-auto cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation();
              setSearchTerm("");
              if (filteredItems.length > 0) setIsOpen((prev) => !prev);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-auto">
          <input
            type="text"
            className="w-full p-2 border-b border-gray-300 outline-none"
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li
                key={item.name}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                {item.name}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectComponent;
