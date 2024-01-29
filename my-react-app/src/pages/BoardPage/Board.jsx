import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Board.css";
import HamHeader from "../../components/Header/HamHeader";
import write from "../../assets/images/icon/write.svg";
import strokeLike from "../../assets/images/icon/strokeLike.svg";
import fillLike from "../../assets/images/icon/fillLike.svg";

function Board() {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchPosts = (page, title = '') => {
    api.get(`/boards?pageNum=${page}&title=${title}`)
      .then(({ data }) => {
        const { data: responseData, totalPageCount:totalPages } = data;
        console.log('받아오는데이터', data);
        console.log('전체페이지', totalPages);

        if (page === 1) {
          setPosts(responseData);
          setLikedPosts(responseData.filter(post => post.isLiked === 1));
          setTotalPages(totalPages);
        } else {
          setPosts(prevPosts => [...prevPosts, ...responseData]);
          setLikedPosts(prevLikedPosts => [
            ...prevLikedPosts,
            ...responseData.filter(post => post.isLiked === 1),
          ]);
        }

        setShowLoadMoreButton(page < totalPages);
        console.log('zzzzz', page, totalPages);
      })
      .catch((error) => {
        console.error('에러:', error);
      });
  };

  const handleLike = (boardId) => {
    api.put(`/boards/like/${boardId}`)
      .then((response) => {
        const { message } = response.data;

        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === boardId
              ? { ...post, like_count: post.like_count + (message === "게시글 추천을 취소했습니다." ? -1 : 1), isLiked: message === "게시글 추천을 취소했습니다." ? 0 : 1 }
              : post
          )
        );

        setLikedPosts(prevLikedPosts => {
          if (message === "게시글 추천을 취소했습니다.") {
            return prevLikedPosts.filter(post => post.id !== boardId);
          } else {
            return [...prevLikedPosts, posts.find(post => post.id === boardId)];
          }
        });
      })
      .catch((error) => {
        console.error('게시글 추천 오류:', error);
      });
  };

  useEffect(() => {
    fetchPosts(pageNum, searchQuery);
  }, [pageNum, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // 검색어가 변경될 때 페이지 번호를 1로 초기화
    setPageNum(1);
  };

  return (
    <div className='Board'>
      <HamHeader />
      <div className='writeIcon'>
        <img src={write} onClick={() => navigate('/boards/write')} alt='글쓰기 아이콘' />
      </div>
      <div className="inputWrap">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="게시글 제목 검색"
        />
      </div>
      <div className="boardCont">
        {posts.map(post => (
          <div className="boardListWrap" key={post.id}>
            <ul onClick={() => navigate(`/boards/${post.id}`)}>
              <li>{post.username}</li>
              <li>{post.title}</li>
              <li>{post.content}</li>
            </ul>
            <div className="boardLike">
              <img src={likedPosts.some(likedPost => likedPost.id === post.id) ? fillLike : strokeLike} alt="좋아요" onClick={() => handleLike(post.id)} />
              {post.like_count}
            </div>
          </div>
        ))}
      </div>
      <div className="buttonWrap">
        {showLoadMoreButton && (
          <button onClick={() => setPageNum(pageNum + 1)}>게시글 더보기</button>
        )}
      </div>
    </div>
  );
}

export default Board;


