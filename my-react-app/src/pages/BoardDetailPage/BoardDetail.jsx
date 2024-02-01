import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "./BoardDetail.css";
import api from "../../services/api";
import BackHeader from "../../components/Header/BackHeader";
import Comment from "../../components/Comment/Comment";
import strokeLike from "../../assets/images/icon/strokeLike.svg";
import fillLike from "../../assets/images/icon/fillLike.svg";
import chat from "../../assets/images/icon/chat.svg";

function BoardDetail() {
  const { postID } = useParams();
  const [boardData, setBoardData] = useState(null); // API로부터 받아온 데이터를 저장할 상태
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLiked, setIsLiked] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [boardMenuList, setBoardMenuList] = useState(false);

  const navigate = useNavigate();

  const handleMenuClick = () => {
    setBoardMenuList(!boardMenuList);
  };

  useEffect(() => {
    api.get(`/posts/${postID}`)
      .then((response) => {
        setBoardData(response.data);
        setIsAuthor(response.data.isAuthor);
        setIsLiked(response.data.isLiked);
        setLikeCount(response.data.likeCount);
      })
      .catch((error) => {
        console.error('API 호출 에러:', error);
      });
  }, [postID]); // boardId가 변경될 때마다 API 호출

  const handleLikeClick = () => {
    // 클릭 이벤트에서 isLiked 값 변경
    const updatedIsLiked = isLiked === 0 ? 1 : 0;

    // 서버에 업데이트된 isLiked 값 전송
    api.put(`/posts/${postID}/like`, { isLiked: updatedIsLiked })
      .then((response) => {
        // 응답을 받아와서 상태 업데이트
        console.log(response.data);
        if (response.data.message === '게시글을 추천했습니다.') {
          setIsLiked(updatedIsLiked);
          setLikeCount((prevCount) => prevCount + 1);
        } else if (response.data.message === '게시글 추천을 취소했습니다.') {
          setIsLiked(updatedIsLiked);
          setLikeCount((prevCount) => prevCount === 0 ? 0 : prevCount - 1);
        }
      })
      .catch((error) => {
        console.error('좋아요 처리 오류:', error);
      });
  };

  const handleEdit = () => {
    if (boardData.isAuthor === 1) {
      navigate(`/boards/edit/${postID}`, { state: { title: boardData.title, content: boardData.content } })
    }
  };

  const handleDelete = () => {
    api.delete(`/posts/${postID}`)
      .then((response) => {
        if (response.data.message === "게시글 삭제 성공") {
          navigate('/boards');
        } else {
          console.error('게시글 삭제 실패');
          alert('삭제가 실패되었네영');
        }
      })
      .catch((error) => {
        console.error('게시글 삭제 오류:', error);
      });
  };

  // API 호출 결과를 기다리는 동안 로딩 상태를 표시
  if (!boardData) {
    return <p>Loading...</p>;
  }


  return (
    <div className='BoardDetail'>
      <BackHeader />
      <div className='boardDetailCont'>
        <div className='nameDateWrap'>
          <p className='userName'>{boardData.username}</p>
          <p className='creationDate'>{boardData.creationDate}</p>
        </div>
        <div className='titleMenuWrap'>
          <p className='title'>{boardData.title}</p>
          {isAuthor === 1 && (
            <div className='boardDetailMenuWrap' onClick={handleMenuClick}>
              <div className='boardDetailMenu'>
                <p></p>
                <p></p>
                <p></p>
              </div>
              {boardMenuList && (
                <div className='buttonList'>
                  <ul>
                    <li onClick={handleEdit}>수정</li>
                    <li onClick={handleDelete}>삭제</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <p className='content'>{boardData.content}</p>
        <div className='likeAndCommentWrap'>
          <p className='boardDetailLike' onClick={handleLikeClick}>
            <img src={isLiked === 0 ? strokeLike : fillLike} alt="좋아요버튼" />
            {likeCount}
          </p>
          <p className='replies'>
            <img src={chat} alt="댓글아이콘" />
            0
          </p>
        </div>
      </div>
      <Comment postID={postID}/>
    </div>
  );

}

export default BoardDetail;
