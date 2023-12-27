import React, { useState, useEffect } from "react";
import "./Search.css";
import api from "./api";

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
        <select id="carNumber" name="carNumber">
          <option id="defaultOpt">전체 호차</option>
          <option value={1}>1호차</option>
          <option value={2}>2호차</option>
          <option value={3}>3호차</option>
          <option value={4}>4호차</option>
          <option value={5}>5호차</option>
          <option value={6}>6호차</option>
          <option value={7}>7호차</option>
          <option value={8}>8호차</option>
          <option value={9}>9호차</option>
          <option value={10}>10호차</option>
        </select>
        <button className="searchBtn">검색하기</button>
      </form>
    </div>
  );
}

export default Search;
