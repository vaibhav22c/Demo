import React, { useEffect, useMemo, useState } from "react"
import "../LeftSection/style.css"
import Button from '@mui/material/Button';
import fetchTaskList from "../../firebase/queries/getTaskList.ts";
import AddTaskModal from "../AddTaskModal/index.tsx";
import EditTaskModal from "../EditTaskModal/index.tsx";
import DeleteTaskModal from "../DeleteTaskModal/index.tsx";
import TabMobileView from "../TabMobileView/index.tsx";
import TaskCard from "../TaskCard/index.tsx";

export const taskTypes: any = {
    todo: 'TODO' || 'To Do' || 'todo',
    inprogress: 'INPROGRESS',
    done: 'DONE',
};

export default function LeftSection() {
    const [taskList, setTaskList] = useState<any[] | null>(null);
    const [openAddModal, setOpenAddModal] = useState<Boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<Boolean>(false);
    const [editData, setEditData] = useState<any>(null);
    const [deleteTask, setDeleteTask] = useState<any>(null);
    const [selectedTab, setSelectedTab] = useState<string>(taskTypes?.todo);

    const getTaskListResponse = () => {
        fetchTaskList().then((res) => {
            if (res) {
                setTaskList(res)
            }
        }).catch((err) => {
            setTaskList([]);
        });
    }

    useEffect(() => {
        getTaskListResponse();
    }, []);


    const getTaskList = (data: any[] | null) => {
        const tasksByCardType: any = {}; // Index signature added

        Object.keys(taskTypes).forEach((cardType) => {
            tasksByCardType[cardType] = [];
        });

        if (data) {
            data.forEach((task) => {
                for (const cardType in taskTypes) {
                    if (task.status === taskTypes[cardType]) {
                        tasksByCardType[cardType].push(task);
                        break;
                    }
                }
            });
        }
        return tasksByCardType;
    };

    const boardRask = useMemo(() => {
        return getTaskList(taskList)
    }, [taskList]);

    const handleMoboleTab = (type: string) => {
        setSelectedTab(type)
    }

    return (
        <>
            <div className="board-main">
                <div style={{ padding: "20px" }}>
                    <Button onClick={() => setOpenAddModal(true)} variant="contained">Add task</Button>
                </div>
                <div className="flexTask">
                    {Object.keys(boardRask).map((item, index) => {
                        return (
                            <TaskCard
                                key={`${item + index}-web`}
                                heading={item}
                                taskList={boardRask[item] || []}
                                setOpenEditModal={setOpenEditModal}
                                setEditData={setEditData}
                                setDeleteTask={setDeleteTask}
                            />
                        );
                    })}
                </div>

                <div className="mobileTasks">
                    <TabMobileView handleSelect={(type: string) => handleMoboleTab(type)} selectedTab={selectedTab} />
                    <TaskCard
                        heading={selectedTab.toLocaleLowerCase()}
                        taskList={boardRask[selectedTab.toLocaleLowerCase()] || []}
                        setOpenEditModal={setOpenEditModal}
                        setEditData={setEditData}
                        setDeleteTask={setDeleteTask}
                    />
                </div>
            </div>

            <AddTaskModal open={openAddModal} handleClose={() => setOpenAddModal(false)} fetchList={getTaskListResponse} />
            {
                openEditModal &&
                <EditTaskModal
                    open={openEditModal}
                    handleClose={() => {
                        setOpenEditModal(false)
                        setEditData(null)
                    }}
                    fetchList={getTaskListResponse}
                    data={editData}
                />
            }
            {
                deleteTask &&
                <DeleteTaskModal
                    open={deleteTask}
                    handleClose={() => {
                        setDeleteTask(null)
                    }}
                    fetchList={getTaskListResponse}
                />
            }
        </>
    )
}