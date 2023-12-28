import React, { useState, useEffect } from "react";
import "./Search.css";
import api from "./api";
import downarrow from "../../assets/images/downarrow.svg";

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

  const startResultClick = (selectedStation) => {
    setStartStationValue(selectedStation);
    setShowStartLiTag(false);
  };

  const endResultClick = (selectedStation) => {
    setEndStationValue(selectedStation);
    setShowEndLiTag(false);
  };

  const [selectedOption, setSelectedOption] = useState("전체 호차");
  const [showOptions, setShowOptions] = useState(false);

  const options = [
    "전체 호차", "1호차", "2호차", "3호차", "4호차", "5호차", "6호차", "7호차", "8호차", "9호차", "10호차",
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    api
      .get("/stations")
      .then((response) => {
        setStations(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <form action="/cars" method="GET" id="stationSearchForm">
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
        {showStartLi && (
          <ul className="searchResultList">
            {startSearched.map((item) => (
              <li
                className="startResult"
                key={item}
                onClick={() => startResultClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        {showEndLi && (
          <ul className="searchResultList">
            {endSearched.map((item) => (
              <li
                className="endResult"
                key={item}
                onClick={() => endResultClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="carNumber" name="carNumber">
          <input type="hidden" name="carNumber" value={selectedOption} />
          <div
            className="selected-option"
            onClick={toggleOptions}
            value={selectedOption}
          >
            {selectedOption}
            <img src={downarrow} alt="아래방향아이콘" />
          </div>
          {showOptions && (
            <ul className="dropdown-options">
              {options.map((option, index) => (
                <li key={index} onClick={() => handleOptionClick(option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="searchBtn">검색하기</button>
      </form>
    </div>
  );
}

export default Search;
