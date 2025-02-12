import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@Fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Dialog, DialogContent } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment';

import axios from 'axios'
import "./calendar.css"

export default function Fullcalendar() {

  const [events, setEvents] = useState([]);
  const empNo = localStorage.getItem("empNo"); // 로그인 시 저장된 empNo
  const empName = localStorage.getItem("empName"); // 로그인 시 저장된 empNo
  const deptNo = localStorage.getItem("deptNo"); // 로그인 시 저장된 empNo
  const postNo = localStorage.getItem("postNo"); // 로그인 시 저장된 empNo
  const empVO = localStorage.getItem("empVO");

  const [deptSchedule, setDeptSchedule] = useState([]);
  const [IncomSchedule, setIncomSchedule] = useState([]);
  const [VisitSchedule, setVisitSchedule] = useState([]);
  const [MySchedule, setMySchedule] = useState([]);


  useEffect (() => {
    axios.get(`http://localhost:8020/schedule/scheduleList?empNo=${empNo}`)
    .then((response)=> {
      setEvents(response.data)
    })
    .catch((error) =>{
      console.log("일정 데이터 가져오기 실패",error);
    }); 
  },[empNo]);

  const combineDateAndTime = (date) =>{
    return `${date}`;
  }

  const IwriteSchedule = async () =>{
    try{
      const response = await axios.get(`http://localhost:8020/schedule/scheduleList?empNo=${empNo}`,{
      });
      setEvents(response.data)
    }catch(error){
      console.log("오류 발생",error);
    }
  }

  const fetchDeptSchedule = async ()=>{
    try {
      const response = await axios.get('http://localhost:8020/schedule/DeptSchedule',{
        params: {
          deptNo: deptNo,
        },
      });
      const fetchedSchedules = response.data;
      setDeptSchedule(fetchedSchedules);
      setEvents(response.data)

    }catch(error){
      console.log("부서 일정 데이터를 불러오는 중 오류 발생:", error);
    }
  }

  const InComSchedule = async () => {
    try{
      const response = await axios.get('http://localhost:8020/schedule/getInComScheduleList',{
          params:{
            empNo : empNo,
          },
      });
      const IncomScheduleList = response.data;
      setIncomSchedule (IncomScheduleList)
      setEvents(response.data)
    }catch(error){
      console.log("사내 일정 데이터를 불러오는중 오류 발생:", error);
    }
  }

  const VisitScheduleList = async () =>{
    try{
      const response = await axios.get('http://localhost:8020/schedule/getVisitSchedule',{
        params:{
          empNo: empNo
        },
      });
      const VisitScheduledd = response.data;
      setVisitSchedule(VisitScheduledd);
      setEvents(response.data);
    }catch(error){
      console.log("방문 일정 데이터를 불러오는중 오류 발생 :",error);
    }
  }

  const MyScheduleList = async () =>{
    try{
      const response = await axios.get(`http://localhost:8020/schedule/getMyScheduleList?empNo=${empNo}`,{
      });
      const MyScheduledd = response.data;
      setMySchedule(MyScheduledd);
      setEvents(response.data);
    }catch(error){
      console.log("개인 일정 데이터를 불러오는중 오류발생 :",error);
    }
  }

  const AllSchedule = async () => {
    try {
      const [
        deptScheduleResponse,
        inComScheduleResponse,
        visitScheduleResponse,
        myScheduleResponse,
      ] = await Promise.all([
        axios.get('http://localhost:8020/schedule/DeptSchedule', {
          params: { deptNo },
        }),
        axios.get('http://localhost:8020/schedule/getInComScheduleList', {
          params: { empNo },
        }),
        axios.get('http://localhost:8020/schedule/getVisitSchedule', {
          params: { empNo },
        }),

        axios.get(`http://localhost:8020/schedule/getMyScheduleList?empNo=${empNo}` ,{
        }),
        axios.get(`http://localhost:8020/schedule/scheduleList?empNo=${empNo}`)
      ]);
  
      // 각각의 데이터를 상태로 설정
      setDeptSchedule(deptScheduleResponse.data);
      setIncomSchedule(inComScheduleResponse.data);
      setVisitSchedule(visitScheduleResponse.data);
      setMySchedule(myScheduleResponse.data);
  
      // 모든 데이터를 하나의 events 배열로 합쳐서 설정
      setEvents([
        ...deptScheduleResponse.data,
        ...inComScheduleResponse.data,
        ...visitScheduleResponse.data,
        ...myScheduleResponse.data,
      ]);
    } catch (error) {
      console.log("일정을 불러오는 중 오류 발생:", error);
    }
  }

  const fullCalRef = useRef(null);
  const endDayRef = useRef(null);


  const [open,setOpen] = useState(false)
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("")

  const [fgColor, setFgColor] = useState("")
  const [bgColor, setBgColor] = useState("")

  const [isNewEvent, setIsNewEvent] = useState(true);

  const [currentEventId, setCurrentEventId] = useState(null);

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [allday, setAllDay] = useState(false);


  const [scheDiv, setScheDiv] = useState(5); // 초기값 기타 일정
  const [WriteempName, setWriteempName] = useState("");

  const [canEdit, setCanEdit] = useState(true);


  // const handleId = (e) => {
  //   setId(e.target.value)
  // }

  const handleAllDay = (e) =>{
    const isChecked = e.target.checked;
    setAllDay(isChecked);
    if(isChecked){
      setStartTime("09:00");
      setEndTime("18:00");
    }else{
      setStartTime("");
      setEndTime("");
    }
  }
  


  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleContent = (e) => {
    setContent(e.target.value)
  }

  const handleStartDay = (e) => {
    setStartDay(e.target.value);
  }

  const handleEndDay = (e) => {
    setEndDay(e.target.value);
  }


  const handleClose = () => {
    setOpen(false)
    setAllDay(false)
  }


  // 새로운 일정 추가
  const handleCreate = async () => {
    let startDateTime = combineDateAndTime(startDay,startTime);
    let endDateTime = combineDateAndTime(endDay,endTime);

    const startDate = startDay.slice(0,10);
    const endDate = startDay.slice(0,10);

    if(allday){
      startDateTime = combineDateAndTime(`${startDate}T09:00`);
      endDateTime = combineDateAndTime(`${endDate}T18:00`);
    }

    const newEvent = {
      empNo,
      empName,
      title,
      content,
      start: startDateTime,
      end : endDateTime,
      allday: allday,
      textColor : fgColor,
      backgroundColor : bgColor,
      scheDiv: scheDiv, // 숫자 값으로 저장(1~5)
    };

    try{
      // 새로운 이벤트를 서버에 추가
      await axios.post("http://localhost:8020/schedule/create",newEvent);

      // 이벤트 추가 후, 새로운 이벤트 목록 가져옴
      const response = await axios.get(`http://localhost:8020/schedule/scheduleList?empNo=${empNo}`);
      setEvents(response.data);
      setTitle('');
      setStartDay('');
      setEndDay('');
      setAllDay(false);
      setFgColor('');
      setBgColor('');
      setContent('');
      setScheDiv('');
      setOpen(false);
    }catch(error){
      console.log("이벤트 추가실패",error);
    }
  };

  // 일정 업데이트
  const handleUpdate = async () =>{

    const startDateTime = combineDateAndTime(startDay, startTime);
    const endDateTime = combineDateAndTime(endDay,endTime);

    const updateEvent = {
      id : currentEventId,
      empNo,
      empName,
      title,
      content,
      start: startDateTime,
      end : endDateTime,
      allday,
      textColor : fgColor,
      backgroundColor : bgColor,
      scheDiv: scheDiv,
    };
    try{
      // 서버로 수정요청
      await axios.put('http://localhost:8020/schedule/update',updateEvent);

      // 수정 후 전체 이벤트 목록 다시 가져오기
      const response = await axios.get(`http://localhost:8020/schedule/scheduleList?empNo=${empNo}`);
      setEvents(response.data);
      setOpen(false); // 다이어로그 닫기
    } catch(error){
      console.log("이벤트 수정 실패",error);
      console.log("이벤트 수정내용:",updateEvent);
    }
  }

  // 일정 삭제
  const handleDelete = async () => {
    try{
      // 서버로 삭제 요청
      await axios.delete(`http://localhost:8020/schedule/delete/${currentEventId}`);

      // 삭제 후 전체 이벤트 목록 다시 가져오기
      const response = await axios.get(`http://localhost:8020/schedule/scheduleList?empNo=${empNo}`);
      setEvents(response.data)
      setOpen(false);
    } catch (error){
      console.log("이벤트 삭제 실패 :",error);
    }
  }

  // 일정클릭
  const onEventClick = async (info) =>{
    const clickEvent = info.event;
    const eventId = clickEvent.id;
    
    console.log("클릭된 이벤트 id",eventId);

    try{
      const response = await axios.get(`http://localhost:8020/schedule/${eventId}`)
      const eventData = response.data
      console.log("이벤트 데이터: ",eventData);

      setCurrentEventId(eventData.id);
      setTitle(eventData.title);
      setContent(eventData.content);
      setStartDay(eventData.start);
      setStartTime(eventData.startTime);
      setEndDay(eventData.end);
      setEndTime(eventData.endTime);
      setAllDay(eventData.allday);
      setBgColor(eventData.backgroundColor);
      setFgColor(eventData.textColor);
      setScheDiv(eventData.shceDiv);

      setWriteempName(eventData.empName);
      
      if(empNo == eventData.empNo){
        setCanEdit(false);
      }else {
        setCanEdit(true);
      }

      setIsNewEvent(false);
      setOpen(true);
    } catch(error){
      console.log("이벤트 세부 정보 가져오기 실패: ",error);
    }
    
  }

  // 날짜 영역 마우스 클릭 or 드래그 info.endStr.slice(0,10);
  const onSelect = (info) => {
    const startDate = info.startStr.slice(0,10);
    const endDate = moment(info.endStr).subtract(1, "days").format("YYYY-MM-DD");

    console.log("체킁 sel",info);
    setStartDay(`${startDate}T09:00`);
    setEndDay(`${endDate}T10:00`);
    setBgColor("");
    setFgColor("");
    setTitle("");
    setContent("");
    setAllDay(false);
    setOpen(true);
    setIsNewEvent(true);
  }

  // 이벤트 드래그 앤 드롭
  const onEventDrop = async (info) =>{

    const newStartDay = info.event.start;
    const newEndDay = info.event.end;
    const newSt = moment(newStartDay).format('YYYY-MM-DD"T"HH:mm')
    const newEd = moment(newEndDay).format('YYYY-MM-DD"T"HH:mm')
    console.log("info.event.newSt",newSt)
    console.log("info.event.newEd",newEd)
    
    
    const updateEvent ={
      id : info.event.id,
      empName,
      empNo,
      title : info.event.title,
      content : info.event.content,
      start : newSt, // 새로운 시작시간
      end : newEd, // 새로운 종료시간
      allday : info.event.allday,
      backgroundColor : info.event.backgroundColor,
      textColor : info.event.textColor,
      scheDiv : info.event.shceDiv,
    }

    try{
      // 서버 업데이트 요청
      await axios.put("http://localhost:8020/schedule/update",updateEvent);

      // 일정 목록 다시 가져오기
      const response = await axios.get(`http://localhost:8020/schedule/scheduleList?empNo=${empNo}`);
      setEvents(response.data);
    }catch(error){
      console.log("이벤트 업데이트 실패 : ",error);
      info.revert(); // 변경 사항 롤백
    }
  }

  const onEventResize = async (info) =>{

    const newStartDay = info.event.start;
    const newEndDay = info.event.end;
    const newSt = moment(newStartDay).format('YYYY-MM-DD"T"HH:mm')
    const newEd = moment(newEndDay).format('YYYY-MM-DD"T"HH:mm')


    const updateEvent = {
      id : info.event.id,
      empNo,
      title : info.event.title,
      content : info.event.content,
      start : newSt,
      end : newEd,
      allday : info.event.allday,
      backgroundColor : info.event.backgroundColor,
      textColor : info.event.textColor,
      scheDiv : info.event.scheDiv,
    };
    try {
      // 서버로 업데이트 요청
      await axios.put("http://localhost:8020/schedule/update",updateEvent);

      // 일정 목록 다시 가져오기
      const response = await axios.get(`http://localhost:8020/schedule/scheduleList?empNO=${empNo}`);
      setEvents(response.data);
    }catch(error){
      console.log("이벤트 업데이트 실패 ",error);
      info.revert(); // 변경사항 롤백
    }

  }

  return (
    <div className="calendar-container">
      <div className="calendar-sidebar">
        <button onClick={fetchDeptSchedule} style={{backgroundColor:"#f26878", color:"white"}} >부서 일정</button>
        <button onClick={InComSchedule} style={{backgroundColor:"#F4D451", color:"white"}}>사내 일정</button>
        <button onClick={VisitScheduleList} style={{backgroundColor:"#65d9a3", color:"white"}}>방문 일정</button>
        <button onClick={MyScheduleList} style={{backgroundColor:"#3788d8", color:"white"}}>개인 일정</button>
        <button onClick={AllSchedule} style={{backgroundColor:"#b196c1", color:"white"}}>전체 일정</button>
        <button onClick={IwriteSchedule} style={{backgroundColor:"white", color:"black"}}>내가 쓴 일정</button>
      </div>

    <Dialog
      keepMounted = {true}
      fullScreen = {true}
      open = {open}
      onClose = {handleClose}
      sx={{
        display: "flex",
        height: "50%",
        m: "auto auto",
        justifyContent: "center"
      }}
      >
        <DialogContent sx={{
          width: 500,
          backgroundColor : "white",
          padding :"20px",
          display : "flex",
          flexDirection : "column",
          alignItems : "center",
          gap: "10px",

        }}>
          {
            isNewEvent ? (
            <div className='dialog-content'>
            <h1>새 일정추가</h1>
            <hr/>
            <div>
              {/* 회원번호 <input type='text' value={empNo} readOnly/> */}
              <label>회원명 </label>
              <input type='text' value={empName} readOnly/>
            </div>

            <div>
              <label>제목 </label>
              <input type='text' value={title} onChange={handleTitle} placeholder='제목을 입력하세요'/>
            </div>
            <div>
              <label>내용 </label>
              <input type='text' value={content} onChange={handleContent} placeholder='내요을 입력하세요'/>
            </div>
            <div>
              <label>시작일 </label>
              <input type='datetime-local' value={startDay} onChange={handleStartDay}/>
            </div>
            <div>
              <label>종료일 </label>
              <input type='datetime-local' ref={endDayRef} value={endDay} onChange={handleEndDay} min={startDay}/>
            </div>
            <div>
              <label>종일 여부</label>
              <input type='checkbox' checked={allday} onChange={handleAllDay}/>
            </div>
            <div>
              <label>일정 유형:</label>
              <select
                value={bgColor}
                onChange = {(e) =>{
                  const selectedValue = e.target.value;
                  setBgColor(selectedValue);
                  switch(selectedValue){
                    case "#f26878":
                      setScheDiv(1); // 부서별 일정
                      break;
                    case "#F4D451" :
                      setScheDiv(2);
                      break;
                    case "#65d9a3" :
                      setScheDiv(3);
                      break;
                    case "#3788d8" :
                      setScheDiv(4);
                      break;
                  }
                }}
              >
                <option value="">--------</option>
                <option value="#f26878" hidden={postNo >=4}>부서 일정</option>
                <option value="#F4D451" hidden={postNo >=2}>사내 일정</option>
                <option value="#65d9a3" hidden={postNo >=4}>방문 일정</option> 
                <option value="#3788d8">개인 일정</option>
              </select>
                  {/* <label>일정 유형:</label>
                  <select value={bgColor} onChange={(e) => setBgColor(e.target.value)}> 
                      <option>--------</option>
                      <option value="#f26878">부서별 일정</option>
                      <option value="#F4D451">사내 일정</option>
                      <option value="#65d9a3">방문 일정</option> 
                      <option value="#b196c1">개인 일정</option>
                      <option value="#3788d8">기타 일정</option>
                  </select> */}
            </div>

                <div>
                  <label>글자 색상:</label>
                  <select value={fgColor} onChange={(e) => setFgColor(e.target.value)}>
                    <option>--------</option>
                    <option value ="#FFFFFF">흰색</option>
                    <option value ="#000000">검은색</option>
                  </select>
                </div>
              <div className='button-group'>
              <button type="button" onClick={handleCreate} className='button-blue'>
                생성
              </button>
              <button autoFocus onClick={handleClose} className='button-white'>
                취소
              </button>
              </div>
            </div>
            ):(
              <div className='dialog-content'>
                <h1>일정 보기</h1>
                <hr/>
                <div>
                  <label>회원명</label>
                  <input type='text' value={WriteempName} readOnly/>
                </div>

                <div>
                  <label>제목 </label>
                  <input type='text' value={title} onChange={handleTitle}/>
                </div>
                <div>
                  <label>내용 </label>
                  <input type='text' value={content} onChange={handleContent}/>
                </div>
                <div>
                  <label>시작일 </label>
                  <input type='datetime-local' value={startDay} onChange={handleStartDay}/>
                </div>
                  <label>종료일 </label>
                  <input type='datetime-local' ref={endDayRef} value={endDay} onChange={handleEndDay} min={startDay}/>
                <div>
                </div>
                <div>
                  <label>종일 여부 </label>
                  <input type='checkbox' value={allday} onChange={handleAllDay}/>
                </div>

                <div>
                <label>일정 유형:</label>
                  <select
                    value={bgColor}
                    onChange = {(e) =>{
                      const selectedValue = e.target.value;
                      setBgColor(selectedValue);
                      switch(selectedValue){
                        case "#f26878":
                          setScheDiv(1); // 부서별 일정
                          break;
                        case "#F4D451" :
                          setScheDiv(2);
                          break;
                        case "#65d9a3" :
                          setScheDiv(3);
                          break;
                        case "#3788d8" :
                          setScheDiv(4);
                          break;
                      }
                    }}
                  >
                    <option value="">--------</option>
                    <option value="#f26878" hidden={postNo >=4}>부서 일정</option>
                    <option value="#F4D451" hidden={postNo >=4}>사내 일정</option>
                    <option value="#65d9a3" hidden={postNo >=4}>방문 일정</option> 
                    {/* <option value="#b196c1">개인 일정</option> */}
                    <option value="#3788d8">개인 일정</option>
                  </select>
                </div>

                <div>
                  <label>글자 색상:</label>
                  <select value={fgColor} onChange={(e) => setFgColor(e.target.value)}>
                    <option>--------</option>
                    <option value ="#FFFFFF">흰색</option>
                    <option value ="#000000">검은색</option>
                  </select>
                </div>
                  {!canEdit && (
                    <div className='button-group'>
                      <button onClick={handleUpdate} className='button-blue'>수정</button>
                      <button onClick={handleDelete} className='button-white' >삭제</button>
                      <button autoFocus onClick={handleClose} className='button-blue'>취소</button>
                    </div>
                  )}
                  {canEdit &&(<div className='button-group'>
                    <button autoFocus onClick={handleClose} className='button-blue'>취소</button>
                  </div>
                  )}
              </div>
            )
          }
          
        </DialogContent>
      </Dialog>
    <div id='calendar'>
      <div className='cal-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,listPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
          ref={fullCalRef}
          events={events}
          eventClick={onEventClick}
          nowIndicator = {true}
          dayMaxEventRows = {3}
          select={onSelect}
          views={{
            listWeek : {buttonText : 'list'}
          }}

          // initialEvents={INITIAL_EVENTS}

          
          height={"80vh"}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          eventContent={renderEventContent} // custom render function
          eventDrop = {onEventDrop}
          eventResize = {onEventResize}
          eventResizableFromStart={true}
          

          slotMinTime={"09:00"}
          slotMaxTime={"18:00"}


          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
    </div>
    </div>
  )
}

function renderEventContent(info) {
  return (
    <div className="fc-event-title-container">
        <div className="fc-event-title fc-sticky">
          <span style={{ fontSize: "1em" }}>{info.event.title}</span>
        </div>
    </div>
  )
}


