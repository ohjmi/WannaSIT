import React from 'react';
import './BoardWriteModal.css';

const BoardWriteModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;


  return (
    <div className="BoardWriteModal">
      <div className="modalContent">
        <p>정말로 등록하시겠습니까?</p>
        <button onClick={onConfirm}>확인</button>
        <button onClick={onCancel}>취소</button>
      </div>
    </div>
  );
};

export default BoardWriteModal;