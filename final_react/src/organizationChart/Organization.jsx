import React, { useEffect, useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./Tree.css";

const MyOrganization = () => {
    const [treeData, setTreeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDept, setSelectedDept] = useState(""); // 선택한 부서명
    const [employees, setEmployees] = useState([]); // 직원 목록

    // 초기 조직도 불러오기
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:8020/organizationChart/organizationList")
            .then((response) => {
                console.log("부서 리스트:", response.data);

                const organizationTree = [
                    {
                        label: "이사장",
                        expanded: true,
                        children: response.data.map((dept) => ({
                            label: dept.deptName,
                            expanded: true,
                            children: [
                                {
                                    label: `${dept.empName} (${dept.postName})`,
                                    type: "person",
                                    empName: dept.empName, // 부장 이름 
                                    deptName: dept.deptName, // 부서 이름 
                                    data: {
                                        image: `http://localhost:8020${dept.empProfile}`, // 이미지
                                        name: dept.empName,
                                        title: `${dept.postName} : ${dept.empPhone}`, // 직급 및 전화번호
                                    },
                                },
                            ],
                        })),
                    },
                ];

                setTreeData(organizationTree);
            })
            .catch((error) => {
                console.error("부서 데이터를 가져오는 중 오류 발생 ㅜㅜ", error);
            })
            .finally(() => setLoading(false));
    }, []);

    // 부장을 클릭하면 해당 부서 직원 데이터 로드
    const onManagerClick = (empName, deptName) => {
        setSelectedDept(deptName); // 선택한 부서명 저장
        axios
            .get(`http://localhost:8020/organizationChart/organizationList/${empName}`)
            .then((response) => {
                console.log(`${deptName} 직원 리스트:`, response.data);
                setEmployees(response.data); // 직원 리스트 저장
                setModalOpen(true);
            })
            .catch((error) => {
                console.error("직원 데이터를 가져오는 중 오류 발생 ㅜㅜ", error);
            });
    };

    // 노드 템플릿 (부장을 클릭하면 직원 모달 열림)
    const nodeTemplate = (node) => {
        if (node.type === "person") {
            return (
                <div
                    className="flex flex-column align-items-center manager-node"
                    style={{ cursor: "pointer" }}
                    onClick={() => onManagerClick(node.empName, node.deptName)}
                >
                    <img
                        alt={node.data.name}
                        src={node.data.image}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                    <span className="font-bold">{node.data.name}</span>
                    <span>{node.data.title}</span>
                </div>
            );
        }
        return node.label;
    };

    return (
        <div>
            <h1>조직도</h1>
            {loading ? (
                <p>로딩 중...</p>
            ) : (
                <OrganizationChart
                    value={treeData}
                    nodeTemplate={nodeTemplate}
                    className="organizationchart-custom"
                />
            )}

            {/* 모달: 선택한 부서 직원만 표시 */}
            <Dialog
                header={`${selectedDept} 직원 목록`}
                visible={modalOpen}
                style={{ width: "40vw" }}
                onHide={() => setModalOpen(false)}
            >
                <div className="employee-list">
                    {employees.length > 0 && employees.map((emp) => {
                        return (
                            <div key={emp.empId} className="employee-card">
                                <img
                                    className="employee-img"
                                    src={emp.empProfile ? `http://localhost:8020${emp.empProfile}` : "https://via.placeholder.com/50"}
                                    alt={emp.empName}
                                />
                                <div className="employee-info">
                                    <span className="employee-name">{emp.empName}</span>
                                    <span className="employee-title">{emp.postName} : {emp.empPhone}</span>
                                </div>
                            </div>
                        );
                    })}

                    {employees.length == 0 && <p className="no-employees">등록된 직원이 없습니다.</p>}
                </div>
            </Dialog>
        </div>
    );
};

export default MyOrganization;
