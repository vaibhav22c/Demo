import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteTask } from '../../firebase/queries/deleteTask.ts';

export default function DeleteTaskModal({ open, handleClose, fetchList }) {

  const handleDeleteHandler = () => {
    deleteTask(open).then(() => {
      fetchList();
      handleClose()
    }).catch(() => {
      alert("list not added");
    })
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Are you sure you want to delete this task? </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>cancle</Button>
          <Button onClick={() => handleDeleteHandler()}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
