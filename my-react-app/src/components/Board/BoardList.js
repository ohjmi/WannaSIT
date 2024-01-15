import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './BoardList.css';
import write from '../../assets/images/icon/write.svg';

function BoardList() {
  const [posts, setPosts] = useState([]);
  const [visiblePostCount, setVisiblePostCount] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  useEffect(() => {
    // 서버에서 초기 데이터를 가져오는 부분
    api.get('/boards')
      .then((response) => {
        setPosts(response.data);
        updateDisplayedPosts(response.data);
      })
      .catch((error) => {
        console.error('에러:', error);
      });
  }, []);

  const updateDisplayedPosts = (newPosts) => {
    setDisplayedPosts(newPosts.slice(0, visiblePostCount));
    setShowLoadMoreButton(newPosts.length > visiblePostCount);
  };

  const handleLoadMore = () => {
    setVisiblePostCount((prevVisiblePostCount) => prevVisiblePostCount + 5);
  
    const dataToDisplay = searchTerm
      ? posts.filter(post => post.title.includes(searchTerm))
      : posts;
  
    updateDisplayedPosts(dataToDisplay);
  };
  

  const handleSearch = () => {
    // 검색 시 visiblePostCount 초기화
    setVisiblePostCount(0);
  
    const filteredPosts = posts.filter(post => post.title.includes(searchTerm));
    const dataToDisplay = filteredPosts.slice(0, visiblePostCount);
  
    setDisplayedPosts(dataToDisplay);
    setShowLoadMoreButton(filteredPosts.length > visiblePostCount);
  };
  

  const handlePostClick = (boardId) => {
    // 게시글 클릭 시 상세 페이지로 이동
    navigate(`/boards/${boardId}`);
  };

  const toBoardWrite = () => {
    navigate('/BoardWrite'); 
  };

  return (
    <div className='boardWrapper'>
      <div className='writeIcon'>
        <img src={write} onClick={toBoardWrite} alt='글쓰기 아이콘'/>
      </div>
      <input
        type='text'
        placeholder='게시글 검색'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
      {displayedPosts.length > 0 ? (
        <>
          {displayedPosts.map(post => (
            <div key={post.id} onClick={() => handlePostClick(post.id)}>
              <ul>
                <li>{post.name}</li>
                <li>{post.title}</li>
                <li>{post.content}</li>
              </ul>
            </div>
          ))}
          {showLoadMoreButton && <button onClick={handleLoadMore}>더보기</button>}
        </>
      ) : (
        <p>{searchTerm ? '검색 결과가 없습니다.' : '게시글이 없습니다.'}</p>
      )}
    </div>
  );
}

export default BoardList;

