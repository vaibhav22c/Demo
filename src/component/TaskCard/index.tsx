import React from "react"
import "../LeftSection/style.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUserContext } from "../../context/provider.tsx";
import { Box } from "@mui/material";

export const taskTypes: any = {
  todo: 'TODO' || 'To Do' || 'todo',
  inprogress: 'INPROGRESS',
  done: 'DONE',
};

export default function TaskCard({ heading, taskList, setOpenEditModal, setEditData, setDeleteTask }) {

  const { data }: any = useUserContext();

  return (
    <>
      <div className="board-card">
        <div className="card-title">
          <div>
            <span className="heading text-capitalize">{heading}</span>
            <span className="heading">({taskList?.length})</span>
          </div>
        </div>
        <div className="ticket-card">
          {taskList?.length ?
            taskList?.map((xs, index) => {
              return (
                <Box key={xs.id + index} marginTop={1.5}>
                  <Card variant="outlined">
                    <CardContent>
                      <div className="flexCardIcons">
                        <p className='cardTitleText'>{xs?.title}</p>
                        {
                          (data?.role == 'admin' || data?.role == 'staff') &&
                          <div className="iconBox">
                            <span onClick={() => {
                              setOpenEditModal(true)
                              setEditData(xs)
                            }}>
                              <ModeEditIcon color="info" />
                            </span>
                            <span onClick={() => {
                              setDeleteTask(xs?.id)
                            }}>
                              <DeleteIcon color="error" />
                            </span>
                          </div>
                        }
                      </div>
                      <p className='cardDescText'>{xs?.description}</p>
                    </CardContent>
                  </Card>
                </Box>
              )
            }) :
            <Box className="heading text-capitalize" textAlign={'center'}>No Data Found.</Box>
          }
        </div>
      </div>
    </>
  )
}