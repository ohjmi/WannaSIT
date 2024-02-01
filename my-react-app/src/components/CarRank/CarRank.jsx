import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CarRank.css";
import api from "../../services/api";

function CarRank({ startStation, endStation }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleDetailClick = (carNumber) => {
    navigate(
      `/cars/info?startStation=${startStation}&endStation=${endStation}&carNumber=${carNumber}`
    );
  };

  useEffect(() => {
    api
      .get(`/cars?startStation=${startStation}&endStation=${endStation}`)
      .then((response) => setData(response.data))
      .catch((error) => console.error("에러:", error));
  }, [startStation, endStation]);

  return (
    <div className="CarRank">
      <div className="rankTitle">추천 호차 순위</div>
      <table className="rankTable">
        <tbody>
          {data.map((item, index) => (
            <div className="rankTableDiv">
              <tr
                key={item.carNumber}
                className={`rankTableTr ${
                  index === data.length - 1 ? "lastRowStyle" : ""
                }`}
              >
                <td className="rankNum">{index + 1}.</td>
                <td className="rankCarNum">{item.carNum}호차</td>
                <td className="tdLine">|</td>
                <td className="leftStation">
                  {item.stationIndex === 0
                    ? "바로"
                    : `${item.stationIndex}정거장 뒤`}
                </td>
                <td className="tdLine">|</td>
                <td
                  className="potenSeat"
                  style={{
                    color:
                      item.isSeatAvailable >= 70
                        ? "#7ED287"
                        : item.isSeatAvailable < 70 &&
                          item.isSeatAvailable >= 30
                        ? "#FABE00"
                        : item.isSeatAvailable < 30
                        ? "#F21111"
                        : null,
                  }}
                >
                  {item.isSeatAvailable}%
                </td>
                <td>
                  <div
                    className="detailPageBtn"
                    onClick={() => handleDetailClick(item.carNum)}
                  >
                    상세보기
                  </div>
                </td>
              </tr>
            </div>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarRank;
