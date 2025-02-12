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

export default function AttManager() {
  const [employee, setEmployee] = useState(null);

  const userInfo = {
    empNo: localStorage.getItem("empNo"),
    empName: localStorage.getItem("empName"),
    deptNo: localStorage.getItem("deptNo"),
    postNo: localStorage.getItem("postNo"),
    empVO: localStorage.getItem("empVO"),
  };

  const [deptSchedule, setDeptSchedule] = useState([]);
  const [IncomSchedule, setIncomSchedule] = useState([]);
  const [VisitSchedule, setVisitSchedule] = useState([]);
  const [MySchedule, setMySchedule] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState({
    empName: "",
    attendanceName: "",
    attInTime: "",
    attOutTime: "",
    workTime: "",
  });

  const [events, setEvents] = useState([]);

  
  const combineDateAndTime = (date) =>{
    return `${date}`;
  }

  
    useEffect(() =>{
      axios.get(`http://localhost:8020/attSchedule/scheduleList?empNo=${userInfo.empNo}`)
      .then((response) =>{
        if (!response.headers['content-type']?.includes('application/json')) {
          console.error('HTML 응답을 받았습니다. 서버 설정을 확인하세요.');
          return;
        }

        console.log("응답 데이터11:", response.data); // 응답 구조 확인
        if(Array.isArray(response.data)){
          const formattendEvents = response.data.map((event)=>{
            const inTime = event.attInTime ? new Date(event.attInTime).toISOString() : null;
            const outTime = event.attOutTime
              ? new Date(event.attOutTime).toISOString()
              : inTime; // 출근 시간으로 기본값 설정

            return{
            id : event.attNo,
            title: event.attendanceName,
            start : inTime,
            end : outTime,
            backgroundColor: "#3788d8",
            textColor: "#ffffff",
            extendedProps:{
              attNo : event.attNo,
              empName : event.empName,
              attendanceName: event.attendanceName,
              attInTime: inTime,
              attOutTime: outTime,
              attWorkTime : event.attWorkTimeStr,
              empNo: event.empNo
          },
          }
        });
          setEvents(formattendEvents);
        }else{
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      })
      .catch((error) => {
        console.error("출근 데이터 가져오기 실패",error);
      });
    },[userInfo.empNo]);

    

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

  
  // 일정클릭
  const onEventClick = async (info) => {
    const clickEvent = info.event;
    const eventId = clickEvent.id;
    const extendedProps = clickEvent.extendedProps; 
    const eventDetails = info.event.extendedProps;

    const formattedInTime = moment(eventDetails.attInTime).format("YYYY-MM-DDTHH:mm");
    const formattedOutTime = eventDetails.attOutTime ? moment(eventDetails.attOutTime).format("YYYY-MM-DDTHH:mm") : "";
    console.log("eventDetails",eventDetails);
    console.log("클릭된 이벤트 id",eventId);

    try{
      const response = await axios.get(`http://localhost:8020/attSchedule/${eventId}`)
      const eventData = response.data
      console.log("클릭한 이벤트 데이터 아이디123123:", extendedProps);
      console.log("클릭한 이벤트 데이터 아이디:", extendedProps.attNo);
      console.log("클릭한 이벤트 데이터 아이디:", eventDetails.attendanceName);
      console.log("클릭한 이벤트 인 타임:", formattedInTime);
      console.log("클릭한 이벤트 아웃 타임:", formattedOutTime);
      console.log("클릭한 이벤트 데이터 아이디:", eventDetails.empName);
      console.log("클릭한 이벤트 데이터 아이디:", eventDetails.empNo);
      console.log("클릭한 이벤트 데이터 아이디:", eventDetails.attWorkTime);

      setSelectedEvent({
        empName: eventDetails.empName,
        attdanceName: eventDetails.attendanceName,
        attInTime: formattedInTime,
        attOutTime: formattedOutTime,
        attWorkTime: eventDetails.attWorkTime,
      });

      
      setIsNewEvent(false);
      setOpen(true);
    } catch(error){
      console.log("이벤트 세부 정보 가져오기 실패: ",error);
    }
  }


  return (
    <div className="calendar-container">
      {/* <div className="calendar-sidebar">
        <button onClick={fetchDeptSchedule} style={{backgroundColor:"#f26878", color:"white"}} >부서 일정</button>
        <button onClick={InComSchedule} style={{backgroundColor:"#F4D451", color:"white"}}>사내 일정</button>
        <button onClick={VisitScheduleList} style={{backgroundColor:"#65d9a3", color:"white"}}>방문 일정</button>
        <button onClick={MyScheduleList} style={{backgroundColor:"#3788d8", color:"white"}}>개인 일정</button>
        <button onClick={AllSchedule} style={{backgroundColor:"#b196c1", color:"white"}}>전체 일정</button>
        <button onClick={IwriteSchedule} style={{backgroundColor:"white", color:"black"}}>내가 쓴 일정</button>
      </div> */}
      

    <Dialog
      keepMounted = {true}
      fullScreen = {true}
      open = {open}
      onClose = {handleClose}
      sx={{
        display: "flex",
        height: "50%",
        m: "auto auto",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        <DialogContent sx={{
          width: 500,
          backgroundColor : "white",
          padding: "20px",
          display : "flex",
          flexDirection : "column",
          alignItems : "center",
          gap: "10px",
        }}>
          { selectedEvent &&
            (
              <div className='dialog-content'>
                <h1 style={{margin:0}}>출근 정보 보기</h1>
                <hr style={{width:"100%"}}/>
                <div> 
                <label>사원명 </label>
                  <input type='text' value={selectedEvent.empName} readOnly />
                </div>
                <div>
                  <label>출퇴근 여부</label>
                  <input type='text' value={selectedEvent.attdanceName} readOnly/>
                </div>
                <div>
                  <label>출근시간  </label>
                  <input type='datetime-local' value={selectedEvent.attInTime} readOnly/>
                </div>
                <div>
                <label>퇴근 시간  </label>
                <input type="datetime-local" value={selectedEvent.attOutTime} readOnly />
              </div>
              <div>
                <label>근무 시간  </label>
                <input type="text" value={selectedEvent.attWorkTime || '미등록'} readOnly />
              </div>

              <div>
                <label>사유 작성</label>
                <input type="text"/>
              </div>
              <div className='button-group'>
              <button autoFocus onClick={handleClose} className='button-blue'>
                수정
              </button>
              <button autoFocus onClick={handleClose} className='button-white'>
                닫기
              </button>
              </div>
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
          views={{
            listWeek : {buttonText : 'list'}
          }}

          // initialEvents={INITIAL_EVENTS}

          
          height={"80vh"}
          initialView='dayGridMonth'
          editable={true}
          selectable={false}
          selectMirror={true}
          dayMaxEvents={true}
          eventContent={renderEventContent} // custom render function
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


