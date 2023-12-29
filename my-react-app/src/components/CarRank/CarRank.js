import { useState, useEffect } from "react";

import api from './api';

function CarRank() {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/cars')
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                console.error('에러:', error);
            });
    }, []);

    return (
        <div className='RankWrapper'>
            {/* <p>추천 호차 순위</p>
            <ul>
                {data.map((item, index) => (
                    <li key={item.carNumber}>
                        <span>{index + 1}</span> {item.carNumber}호차, | {item.remainingStations}정거장 뒤
                    </li>
                ))}
            </ul> */}
            <p>추천 호차 순위</p>
      <table>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.carNumber}>
              <td>{index + 1}위</td>
              <td>{item.carNumber}호차</td>
              <td>{item.remainingStations === 0 ? '자리 O' : `${item.remainingStations}정거장 뒤`}</td>
              <td><button>상세보기</button></td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )

}

export default CarRank;