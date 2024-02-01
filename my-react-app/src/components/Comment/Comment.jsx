import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./Comment.css";
import strokeLike from "../../assets/images/icon/strokeLike.svg";
import fillLike from "../../assets/images/icon/fillLike.svg";

function Comment({ postID }) {
  const [comments, setComments] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLiked, setIsLiked] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  const handleKeyUp = (event) => {
    if (event.key === "Enter" && !event.isComposing && !event.repeat) {
      event.preventDefault();
      handleCommentRegistration();
    }
  };

  const handleCommentRegistration = async () => {
    try {
      const formData = { content };
      const response = await api.post(`posts/${postID}/comments`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message === "댓글 등록 성공") {
        setContent('');
        fetchComments(pageNum);
      }
    } catch (error) {
      console.error('댓글 쓰기 오류:', error.message);
    }
  };

  const fetchComments = (page) => {
    setIsLoading(true);

    api.get(`posts/${postID}/comments?pageNum=${page}`)
      .then(({ data }) => {
        const { data: responseData, totalPageCount } = data;
        console.log(data);
        if (page === 1) {
          setComments(responseData);
          setTotalPages(totalPageCount);
        } else {
          setComments((prevComments) => [...prevComments, ...responseData]);
        }
      })
      .catch((error) => {
        console.error('에러:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchComments(pageNum);
  }, [pageNum, totalPages]);

  const handleLikeClick = (commentID) => {
    // 클릭 이벤트에서 isLiked 값 변경
    const updatedIsLiked = isLiked === 0 ? 1 : 0;
    // 서버에 업데이트된 isLiked 값 전송
    api.put(`/posts/${postID}/comments/${commentID}/like`, { isLiked: updatedIsLiked })
      .then((response) => {
        // 응답을 받아와서 상태 업데이트
        console.log(response.data);
        if (response.data.message === '댓글을 추천했습니다.') {
          setIsLiked(updatedIsLiked);
          setLikeCount((prevCount) => prevCount + 1);
        } else if (response.data.message === '댓글 추천을 취소했습니다.') {
          setIsLiked(updatedIsLiked);
          setLikeCount((prevCount) => prevCount === 0 ? 0 : prevCount - 1);
        }
      })
      .catch((error) => {
        console.error('좋아요 처리 오류:', error);
      });
  };
  
  
  const handleDelete = (commentID) => {
    api.delete(`/posts/${postID}/comments/${commentID}`)
      .then((response) => {
        if (response.data.message === "댓글 삭제 성공") {
          fetchComments(1);
        } else {
          console.error('댓글 삭제 실패');
          alert('삭제가 실패되었네영');
        }
      })
      .catch((error) => {
        console.error('게시글 삭제 오류:', error);
      });
  };



  const handleScroll = () => {
    console.log('이벤트발생발생');
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    console.log('값을 확인해보자', scrollTop, windowHeight, scrollHeight);
    if (scrollTop + windowHeight >= scrollHeight - 400) {
      if (!isLoading && pageNum < totalPages) {
        setPageNum(pageNum + 1);
      }
    }
  };

  useEffect(() => {
    const commentContElement = document.querySelector('.commentContWrap');
    commentContElement.addEventListener('scroll', handleScroll);

    return () => {
      commentContElement.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, pageNum, totalPages]);




  return (
    <div className='Comment'>
      <div className="commentContWrap" onScroll={handleScroll}>
        <div className="commentCont">
          {comments.map(comment => (
            <div className="CommentList" key={comment.id}>
              <ul>
                <li>{comment.username}</li>
                <li>{comment.content}</li>
                <li>{comment.creationDate}</li>
                <li onClick={() => handleLikeClick(comment.id)}>
                  <img src={isLiked === 0 ? strokeLike : fillLike} alt="좋아요버튼" />
                  {likeCount}
                </li>

              </ul>
              {comment.isAuthor === 1 && (
                <p className="commentDelButton" onClick={() => handleDelete(comment.id)}>
                  삭제
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="inputForm">
        <input
          type="text"
          id="inputMessage"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onKeyUp={handleKeyUp}
          placeholder="메세지를 입력하세요"
        />
        <p className="commentRegistrationButton" onClick={handleCommentRegistration}>등록</p>
      </div>
    </div>
  );
}

export default Comment;
