import React from 'react';
import './BoardEditModal.css';

const BoardEditModal = ({ isOpen, onConfirm}) => {
  if (!isOpen) return null;


  return (
    <div className="BoardEditModal">
      <div className="modalCont">
        <p>수정이 완료되었습니다.</p>
        <button className='confirmButton' onClick={onConfirm}>확인</button>
      </div>
    </div>
  );
};

export default BoardEditModal;