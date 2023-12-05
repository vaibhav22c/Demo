import React from "react"
import "../LeftSection/style.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

export const taskTypes: any = {
  todo: 'TODO' || 'To Do' || 'todo',
  inprogress: 'INPROGRESS',
  done: 'DONE',
};

export default function TaskCard({ heading, taskList, setOpenEditModal, setEditData, setDeleteTask }) {
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
          {taskList?.map((xs, index) => {
            return (
              <div key={xs.id + index} style={{ margin: "10px 0" }}>
                <Card variant="outlined">
                  <CardContent>
                    <div className="flexCardIcons">
                      <p className='cardTitleText'>{xs?.title}</p>
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
                    </div>
                    <p className='cardDescText'>{xs?.description}</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}