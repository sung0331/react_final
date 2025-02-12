// src/api/api.js
import axiosInstance from "./axiosInstance.js";

// API 요청 함수 예제
export const login = async (empId, empPw) => {
  try{
    const response = await axiosInstance.post("http://localhost:8020/api/reactlogin", { empId, empPw });
    return response.data;
  }catch(error){
    console.log("로그인 에러:", error.response?.data || error.message);
    throw error;
  }

};

export const getEmpNoById = async(empId) => {
  try{
    const response = await axiosInstance.get(`http://localhost:8020/api/${empId}`);
    return response.data;
  }catch(error){
    console.log("empNo 가져오기 실패:", error.response?.data || error.message);
    throw error;
  }
};

export const getProtectedData = async () => {
  const response = await axiosInstance.get("/protected");
  return response.data;
};


export const refreshToken = async (refreshToken) => {
  const response = await axiosInstance.post("http://localhost:8020/api/token", { refreshToken });
  return response.data;
};

export const getAttendanceList = async(empNo) =>{
  try{
    const response = await axiosInstance.get(`http://localhost:8020/api/attendance/${empNo}`);
    return response.data;
  }catch(error){
    console.log("출퇴근 데이터 가져오기 실패",error.response?.data ||error.message);
    throw error;
  }
}
