import React, { useState } from "react";
import "./Search.css";

function Search() {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div>
      <form>
        {/* <input type="text" id="myInput" value={inputValue} onChange={handleInputChange}>출발역</input> */}
        {/* <input type="text" id="myInput" value={inputValue} onChange={handleInputChange}>도착역</input> */}
        <select id="subwayCar" value={inputValue} onChange={handleInputChange}>
          <option>1호차</option>
          <option>2호차</option>
          <option>3호차</option>
          <option>4호차</option>
          <option>5호차</option>
          <option>6호차</option>
          <option>7호차</option>
          <option>8호차</option>
          <option>9호차</option>
          <option>10호차</option>
        </select>
        <button>검색하기</button>
      </form>
    </div>
  );
}

export default Search;
