import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Board.css";
import HamHeader from "../../components/Header/HamHeader";
import write from "../../assets/images/icon/write.svg";
import strokeLike from "../../assets/images/icon/11111.svg";
import fillLike from "../../assets/images/icon/fillLike.svg";

function Board() {
  const [posts, setPosts] = useState([]);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // 검색어가 변경될 때 페이지 번호를 1로 초기화
    setPageNum(1);
  };

  const fetchPosts = (page, title = '') => {
    api.get(`/boards?pageNum=${page}&title=${title}`)
      .then((response) => {
        if (page === 1) {
          setPosts(response.data.data);
          setTotalPages(response.data.totalPages);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
        }

        setShowLoadMoreButton(page < response.data.totalPages);
      })
      .catch((error) => {
        console.error('에러:', error);
      });
  };

  useEffect(() => {
    fetchPosts(pageNum, searchQuery);
  }, [pageNum, searchQuery]);


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
          <div className="boardListWrap" key={post.id} onClick={() => navigate(`/boards/${post.id}`)}>
            <ul>
              <li>{post.name}</li>
              <li>{post.title}</li>
              <li>{post.content}</li>
              <li><img src={strokeLike} alt="좋아요 아이콘" />{post.like}1</li>
            </ul>
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