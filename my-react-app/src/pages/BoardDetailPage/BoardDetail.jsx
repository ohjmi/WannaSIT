import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

function BoardDetail() {
    const { boardId } = useParams();
    const [boardData, setBoardData] = useState(null); // API로부터 받아온 데이터를 저장할 상태
    const [editedData, setEditedData] = useState({ title: '', content: '' });
  
    useEffect(() => {
      // useEffect 내에서 API 호출
      api.get(`/boards/${boardId}`)
        .then((response) => {
          // API 응답을 받아와서 상태 업데이트
          setBoardData(response.data);
        })
        .catch((error) => {
          console.error('API 호출 에러:', error);
        });
    }, [boardId]); // boardId가 변경될 때마다 API 호출
    

    const handleEditSubmit = () => {
        api.patch(`/boards/${boardId}`, editedData)
          .then((response) => {
            if (response.data.success) {
              // 수정 성공 시 필요한 동작 수행
              console.log('게시글 수정 성공');
            } else {
              console.error('게시글 수정 실패');
            }
          })
          .catch((error) => {
            console.error('게시글 수정 오류:', error);
          });
      };
    
      const handleDelete = () => {
        api.delete(`/boards/${boardId}`)
          .then((response) => {
            if (response.data.success) {
              // 삭제 성공 시 필요한 동작 수행
              console.log('게시글 삭제 성공');
              // 예를 들어, 삭제 후 목록 페이지로 이동하는 등의 동작 수행
            } else {
              console.error('게시글 삭제 실패');
            }
          })
          .catch((error) => {
            console.error('게시글 삭제 오류:', error);
          });
      };
    
      const handleInputChange = (e) => {
        // 수정 폼의 입력값 변경 시 호출되는 함수
        const { name, value } = e.target;
        setEditedData(prevData => ({
          ...prevData,
          [name]: value,
        }));
      };

    // API 호출 결과를 기다리는 동안 로딩 상태를 표시할 수 있습니다.
    if (!boardData) {
      return <p>Loading...</p>;
    }
  
    // 나머지 컴포넌트 로직 및 UI 렌더링
    return (
      <div className='BoardDetail'>
        <p>{boardId}</p>
        <p>{boardData.title}</p>
        <p>{boardData.content}</p>
        <button onClick={handleEditSubmit}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    );
  }
  
  export default BoardDetail;
