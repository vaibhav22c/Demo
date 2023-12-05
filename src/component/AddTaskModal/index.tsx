import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { addTask } from '../../firebase/queries/insertTask.ts';
import { toast } from 'react-toastify';

export default function AddTaskModal({ open, handleClose, fetchList }) {

  const [inputField, setinputField] = React.useState<any>({ title: '', description: '', status: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setinputField((prev) => ({
      ...prev,
      [name]: value
    }) as any);
  };

  const handleSubmit = () => {
    if (inputField?.title === '') {
      toast("please Enter task title", { type: "error" })
    } else if (inputField?.description === '') {
      toast("please Enter task description", { type: "error" })
    } else if (inputField?.status === '') {
      toast("please Enter task status", { type: "error" })
    } else {
      if (inputField) {
        addTask(inputField).then((res) => {
          fetchList();
          setinputField({ title: '', description: '', status: '' });
          handleClose()
        }).catch((erro) => {
          alert("list not added");
        })
      }
    }
  }

  return (
    <React.Fragment>
      <Dialog open={open} maxWidth={'md'} fullWidth onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <div>
            <TextField autoFocus margin="dense" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} id="name" name="title" label="Title" type="text" fullWidth variant="outlined" />
          </div>
          <div>
            <TextField autoFocus margin="dense" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e)} name='description' rows={4} maxRows={5} id="name" label="Description" type="text" multiline fullWidth variant="outlined" />
          </div>
          <Box marginTop={1}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inputField.status}
                label="Status"
                onChange={handleChange}
                name='status'
              >
                <MenuItem value={'TODO'}>todo</MenuItem>
                <MenuItem value={'INPROGRESS'}>inProgress</MenuItem>
                <MenuItem value={'DONE'}>done</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit()}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
