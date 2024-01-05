import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import api from './api';

function CarRank({startStation, endStation}) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/cars?startStation=${startStation}&endStation=${endStation}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('에러:', error);
            });
    }, [startStation, endStation]);

    const handleDetailClick = (carNumber) => {
      navigate(`/cars/info?startStation=${startStation}&endStation=${endStation}&carNumber=${carNumber}`)
    }

    return (
        <div className='RankWrapper'>
            <p>추천 호차 순위</p>
      <table>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.carNumber}>
              <td>{index + 1}위</td>
              <td>{item.carNum}호차</td>
              <td>{item.stationIndex === 0 ? '지금 이 순간' : `${item.stationIndex}정거장 뒤`}</td>
              <td>{item.isSeatAvailable === 1 ? '자리 O' : `자리 생길지도,,`}</td>
              <td><button onClick={() => handleDetailClick(item.carNum)}>상세보기</button></td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )

}

export default CarRank;