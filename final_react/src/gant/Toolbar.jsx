import React, { useState } from 'react';

function Toolbar({ curzoom, onZoomChange }) {
  const [color, setColor] = useState(null); // 클릭된 라디오 버튼 색상을 관리
  const [fontWeight,setfontWeight]= useState(null);

  const handleClick = (val) => {
    setColor(val); // 클릭된 라디오 버튼의 값을 상태에 저장
    setfontWeight(val);
  };

  const handleZoomChange = (e) => {
    // Zoom 상태 변경
    onZoomChange(e.target.value);
  };

  const zoomRadios = ['시간단위', '날짜단위', '월단위'].map(val => {
    const isActive = curzoom === val;  // 현재 줌 상태가 선택된 값과 일치하는지 확인

    return (
      <label
        className='rdo'
        key={val}
        style={{
            marginLeft:'15px',
          cursor: 'pointer',
          width: '60px',
          color: color === val || isActive ? '#009CFF' : 'black', // 클릭된 값과 현재 선택된 값만 빨간색
          fontWeight: fontWeight === val || isActive ? 'bold' : 'normal',
          fontSize: '14px',
        }}
      >
        <input
          onClick={() => handleClick(val)} // 클릭한 라디오 버튼의 값 설정
          type='radio'
          checked={isActive}
          onChange={handleZoomChange}
          value={val}
        />
        {val}
      </label>
    );
  });

  return (
    <div className='tool-bar' style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
      <b> </b>
      {zoomRadios}
    </div>
  );
}

export default Toolbar;
