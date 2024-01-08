import React, { useState, useEffect, useCallback } from "react";
import "./Search.css";
import api from "./api";
import downarrow from "../../assets/images/icon/downarrow.svg";

function Search() {
  const [startStationValue, setStartStationValue] = useState("");
  const handleStartStationChange = (event) =>
    setStartStationValue(event.target.value);
  const [endStationValue, setEndStationValue] = useState("");
  const handleEndStationChange = (event) =>
    setEndStationValue(event.target.value);
  const [stations, setStations] = useState([]);
  const [showStartLi, setShowStartLiTag] = useState(false);
  const [showEndLi, setShowEndLiTag] = useState(false);
  const reshowStart = () => {
    setShowStartLiTag(true);
    setShowEndLiTag(false);
  };
  const reshowEnd = () => {
    setShowStartLiTag(false);
    setShowEndLiTag(true);
  };

  let startSearched =
    startStationValue.length >= 1
      ? stations.filter((station) => station.includes(startStationValue))
      : [];
  let endSearched =
    endStationValue.length >= 1
      ? stations.filter((station) => station.includes(endStationValue))
      : [];

  const handleMouseOver = useCallback((e) => {
    e.currentTarget === e.target
      ? e.target.classList.add("hover")
      : e.currentTarget.classList.remove("hover");
  });

  const handleMouseLeave = useCallback((e) => {
    e.target.classList.remove("hover");
  });

  const startResultClick = (selectedStation) => {
    setStartStationValue(selectedStation);
    setShowStartLiTag(false);
  };

  const endResultClick = (selectedStation) => {
    setEndStationValue(selectedStation);
    setShowEndLiTag(false);
  };

  const [selectedOption, setSelectedOption] = useState("전체 ");
  const [showOptions, setShowOptions] = useState(false);

  const options = ["전체 ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const searchBtnClick = (event) => {
    event.preventDefault();
    if (
      selectedOption === "전체 " &&
      stations.includes(startStationValue) &&
      stations.includes(endStationValue)
    ) {
      window.location.href = `/cars?startStation=${startStationValue}&endStation=${endStationValue}`;
    } else if (
      selectedOption !== "전체 " &&
      stations.includes(startStationValue) &&
      stations.includes(endStationValue)
    ) {
      window.location.href = `/cars/info?startStation=${startStationValue}&endStation=${endStationValue}&carNumber=${selectedOption}`;
    } else if (!stations.includes(startStationValue)) {
      alert("출발역이 잘못 입력되었습니다!");
    } else if (!stations.includes(endStationValue)) {
      alert("도착역이 잘못 입력되었습니다!");
    }
  };

  useEffect(() => {
    api
      .get("/stations")
      .then((response) => {
        setStations(Object.values(response.data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <form action="/cars" method="GET" id="stationSearchForm">
        <div className="inputBox">
          <input
            type="text"
            name="startStation"
            id="startStationInput"
            value={startStationValue}
            onChange={handleStartStationChange}
            onClick={reshowStart}
            placeholder="출발역"
            required
          ></input>
          <input
            type="text"
            name="endStation"
            id="endStationInput"
            value={endStationValue}
            onChange={handleEndStationChange}
            onClick={reshowEnd}
            placeholder="도착역"
            required
          ></input>
        </div>
        {showStartLi && (
          <div className="searchResultList">
            {startSearched.map((item) => (
              <li
                className="startResult"
                key={item}
                onClick={() => startResultClick(item)}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
              >
                {item}
              </li>
            ))}
          </div>
        )}
        {showEndLi && (
          <div className="searchResultList">
            {endSearched.map((item) => (
              <li
                className="endResult"
                key={item}
                onClick={() => endResultClick(item)}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
              >
                {item}
              </li>
            ))}
          </div>
        )}

        <div className="carNumber" name="carNumber">
          <input type="hidden" name="carNumber" value={selectedOption} />
          <div
            className="selected-option"
            onClick={toggleOptions}
            value={selectedOption}
          >
            <div>{selectedOption}호차</div>
            <div>
              <img src={downarrow} alt="아래방향아이콘" />
            </div>
          </div>
        </div>

        {showOptions && (
          <div className="dropdown-options">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
              >
                {option}호차
              </li>
            ))}
          </div>
        )}

        <button className="searchBtn" onClick={searchBtnClick}>
          검색하기
        </button>
      </form>
    </div>
  );
}

export default Search;
