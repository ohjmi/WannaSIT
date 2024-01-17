import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Board.css';
import write from '../../assets/images/icon/write.svg';

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
      <div className='writeIcon'>
        <img src={write} onClick={() => navigate('/boards/write')} alt='글쓰기 아이콘' />
      </div>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="검색어를 입력하세요"
        />
      </div>
      {posts.map(post => (
        <div key={post.id} onClick={() => navigate(`/boards/${post.id}`)}>
          <ul>
            <li>{post.name}</li>
            <li>{post.title}</li>
            <li>{post.content}</li>
          </ul>
        </div>
      ))}
      {showLoadMoreButton && (
        <button onClick={() => setPageNum(pageNum + 1)}>더보기</button>
      )}
    </div>
  );
}

export default Board;