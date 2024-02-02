import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./Comment.css";
import strokeLike from "../../assets/images/icon/strokeLike.svg";
import fillLike from "../../assets/images/icon/fillLike.svg";

function Comment({ postID }) {
  const [comments, setComments] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');


  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      event.target.blur();
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

  const fetchComments = (pageNum) => {
    setIsLoading(true);
    api.get(`posts/${postID}/comments?pageNum=${pageNum}`)
      .then(({ data }) => {
        const { data: responseData, totalPageCount } = data;
        console.log(data);
        if (pageNum === 1) {
          setComments(responseData);
          setTotalPages(totalPageCount);
        } else {
          setComments([...comments, ...responseData]);
        }
      })
      .catch((error) => {
        console.error('에러:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  // const handleLikeClick = (commentID) => {
  //   const copyComments = [...comments]
  //   // 특정 댓글을 찾기
  //   const currentCommentIndex = copyComments.findIndex((comment) => comment.id === commentID);
  //   console.log('currentCommentIndex', currentCommentIndex);
  //   const currentIsLiked = copyComments[currentCommentIndex].isLiked;
  //   console.log('currentIsLiked', currentIsLiked);
  //   // 업데이트된 isLiked 값
  //   const updatedIsLiked = currentIsLiked === 0 ? 1 : 0;
  //   console.log('좋아요변경', updatedIsLiked);

  //   api.put(`/posts/${postID}/comments/${commentID}/like`, { isLiked: updatedIsLiked })
  //     .then((response) => {
  //       console.log(response);
  //       if (response.data.message === '댓글을 추천했습니다.') {
  //         // 기존 댓글 배열을 변경하지 않고 특정 댓글만 업데이트
  //         copyComments[currentCommentIndex] = {
  //           ...copyComments[currentCommentIndex],
  //           isLiked: updatedIsLiked,
  //           likeCount: copyComments[currentCommentIndex].likeCount + 1, // +1 증가
  //         };
  //         console.log('서버요청후:', updatedIsLiked);
  //         // 업데이트된 배열을 상태로 설정
  //         setComments([...copyComments]);
  //         console.log('햐햐', [copyComments]);
  //       } else if (response.data.message === '댓글 추천을 취소했습니다.') {
  //         // 기존 댓글 배열을 변경하지 않고 특정 댓글만 업데이트
  //         copyComments[currentCommentIndex] = {
  //           ...copyComments[currentCommentIndex],
  //           isLiked: updatedIsLiked,
  //           likeCount: copyComments[currentCommentIndex].likeCount - 1, // -1 감소
  //         };
  //         // 업데이트된 배열을 상태로 설정
  //         setComments([...copyComments]);
  //         console.log('캬캬', [copyComments]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('좋아요 처리 오류:', error);
  //     });
  // };

  const handleLikeClick = (commentID) => {
    const copyComments = [...comments]
    // 특정 댓글을 찾기
    const currentCommentIndex = copyComments.findIndex((comment) => comment.id === commentID);
    console.log('currentCommentIndex', currentCommentIndex);
    const currentIsLiked = copyComments[currentCommentIndex].isLiked;
    console.log('currentIsLiked', currentIsLiked);
    // 업데이트된 isLiked 값
    const updatedIsLiked = currentIsLiked === 0 ? 1 : 0;
    console.log('좋아요변경', updatedIsLiked);

    api.put(`/posts/${postID}/comments/${commentID}/like`, { isLiked: updatedIsLiked })
      .then((response) => {
        console.log(response);
        if (response.data.message === '댓글을 추천했습니다.') {
          // 기존 댓글 배열을 변경하지 않고 특정 댓글만 업데이트
          copyComments[currentCommentIndex] = {
            ...copyComments[currentCommentIndex],
            isLiked: updatedIsLiked,
            likeCount: copyComments[currentCommentIndex].likeCount + 1, // +1 증가
          };
          console.log('서버요청후:', updatedIsLiked);
          // 업데이트된 배열을 상태로 설정
          setComments([...copyComments]);
          console.log('햐햐', [copyComments]);
        } else if (response.data.message === '댓글 추천을 취소했습니다.') {
          // 기존 댓글 배열을 변경하지 않고 특정 댓글만 업데이트
          copyComments[currentCommentIndex] = {
            ...copyComments[currentCommentIndex],
            isLiked: updatedIsLiked,
            likeCount: copyComments[currentCommentIndex].likeCount - 1, // -1 감소
          };
          // 업데이트된 배열을 상태로 설정
          setComments([...copyComments]);
          console.log('캬캬', [copyComments]);
        }
      })
      .catch((error) => {
        console.error('좋아요 처리 오류:', error);
      });
  };

  useEffect(() => {
    fetchComments(pageNum);
  }, [pageNum, totalPages]);



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


  useEffect(() => {
    const commentContWrap = document.querySelector('.commentContWrap');

    const handleScroll = () => {
      const scrollTop = commentContWrap.scrollTop;
      const scrollHeight = commentContWrap.scrollHeight;
      const clientHeight = commentContWrap.clientHeight;

      // 특정 위치에 도달했을 때의 조건을 설정 (예: scrollHeight - 10)
      const targetScrollPosition = scrollHeight - 10;

      if (scrollTop + clientHeight >= targetScrollPosition) {
        if (!isLoading && pageNum < totalPages) {
          setPageNum(pageNum + 1);
        }
      }
    };

    commentContWrap.addEventListener('scroll', handleScroll);

    return () => {
      commentContWrap.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, pageNum, totalPages]);



  return (
    <div className='Comment'>
      <div className="commentContWrap">
        <div className="commentCont">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div className="CommentList" key={comment.id}>
                <ul>
                  <li>{comment.username}</li>
                  <li>{comment.content}</li>
                  <li>{comment.creationDate}</li>
                  <li onClick={() => handleLikeClick(comment.id)}>
                    {/* <img src={comment.isLiked === 0 ? strokeLike : fillLike} alt="좋아요버튼" /> */}
                    <img
                      src={comment.isLiked === 0 ? `${strokeLike}?${Date.now()}` : `${fillLike}?${Date.now()}`}
                      alt="좋아요버튼"
                    />
                    {comment.likeCount}
                  </li>
                </ul>
                {comment.isAuthor === 1 && (
                  <p className="commentDelButton" onClick={() => handleDelete(comment.id)}>
                    삭제
                  </p>
                )}
              </div>
            ))
          ) : (
            <p>댓글 목록이 없습니다.</p>
          )}
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




