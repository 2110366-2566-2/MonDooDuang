import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled
} from "@mui/material"
import TickIcon from "./Icon/TickIcon"

const CustomizedDialog = styled(Dialog)`
div {
  border-radius: 20px;
  padding: 20px 60px;
}

h2 {
  display: flex;
  justify-content: center;
}

p {
  font-family: "Prompt", "sans-serif";
  color: #0C0000;
  font-size: 32px;
  font-weight: 700;
}
}
`
const CustomizedDialogActions = styled(DialogActions)`
  display: flex;
  justify-content: center;
  padding: 0px;
`

export default function ConfirmAlert(props: {
  CFAlert: boolean
  setCFAlert: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const handleClose = () => {
    props.setCFAlert(false)
  }

  return (
    <CustomizedDialog
      open={props.CFAlert}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="text-center"
    >
      <DialogTitle id="alert-dialog-title">
        <TickIcon />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          สร้างบัญชีผู้ใช้ใหม่สำเร็จ
        </DialogContentText>
      </DialogContent>
      <CustomizedDialogActions>
        <button
          className="w-[25%] h-[50px] bg-mdd-dialog-gray rounded-[10px] text-white text-2xl font-semibold text-center"
          onClick={handleClose}
        >
          ตกลง
        </button>
      </CustomizedDialogActions>
    </CustomizedDialog>
  )
}
