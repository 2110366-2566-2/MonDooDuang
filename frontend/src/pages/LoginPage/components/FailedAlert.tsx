import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled
} from "@mui/material"
import NoIcon from "./Icons/NoIcon"
import { FailedAlertProps } from "../types/LoginType"

const CustomizedDialog = styled(Dialog)`
  div {
    border-radius: 20px;
    padding: 10px 40px;
  }

  h2 {
    display: flex;
    justify-content: center;
  }

  p {
    font-family: "Prompt", "sans-serif";
    color: #0c0000;
    font-size: 24px;
    font-weight: 700;
  }
`
const CustomizedDialogActions = styled(DialogActions)`
  display: flex;
  justify-content: center;
  padding: 0px;
`

export default function FailedAlert(props: FailedAlertProps) {
  const { FAlert, setFAlert } = props
  const handleClose = () => {
    setFAlert(false)
  }

  return (
    <CustomizedDialog
      open={FAlert}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="text-center"
    >
      <DialogTitle id="alert-dialog-title">
        <NoIcon />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">เข้าสู่ระบบไม่สำเร็จ</DialogContentText>
      </DialogContent>
      <CustomizedDialogActions>
        <button
          className="w-[35%] h-[50px] bg-mdd-dialog-gray rounded-[10px] text-white text-lg font-semibold text-center"
          onClick={handleClose}
        >
          ตกลง
        </button>
      </CustomizedDialogActions>
    </CustomizedDialog>
  )
}
