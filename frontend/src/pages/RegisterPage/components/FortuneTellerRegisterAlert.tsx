import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled
} from "@mui/material"
import { useNavigate } from "react-router-dom"

const CustomizedDialog = styled(Dialog)`
div {
  border-radius: 20px;
  padding: 20px 20px;
}

h2 {
  font-family: "Prompt", "sans-serif";
  color: #0C0000;
  font-size: 30px;
  font-weight: 700;
}

p {
  font-family: "Prompt", "sans-serif";
  color: #838383;
  font-size: 18px;
  font-weight: 500;
}
}
`
const CustomizedDialogActions = styled(DialogActions)`
  display: flex;
  justify-content: space-around;
  padding: 0px;
`

export default function FortuneTellerRegisterAlert(props: {
  FTAlert: boolean
  setFTAlert: React.Dispatch<React.SetStateAction<boolean>>
  setCFAlert: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const navigate = useNavigate()

  const handleYesButton = () => {
    props.setFTAlert(false)
    props.setCFAlert(true)
    navigate("/register/fortuneteller")
  }

  const handleNoButton = () => {
    props.setFTAlert(false)
    props.setCFAlert(true)
    navigate("/search")
  }

  return (
    <CustomizedDialog
      open={props.FTAlert}
      onClose={() => props.setFTAlert(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="text-center"
    >
      <DialogTitle id="alert-dialog-title">{"คุณต้องการลงทะเบียนเป็นหมอดูหรือไม่"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          คุณสามารถสร้างบัญชีได้ โดยไม่จำเป็นต้องลงทะเบียนเป็นหมอดู
          <br />
          คุณสามารถลงทะเบียนเป็นหมอดูได้ภายหลัง
        </DialogContentText>
      </DialogContent>
      <CustomizedDialogActions>
        <button
          className="w-[25%] h-[50px] bg-mdd-dialog-orange rounded-[10px] text-white text-2xl font-semibold text-center"
          onClick={handleNoButton}
        >
          ไม่
        </button>
        <button
          className="w-[25%] h-[50px] bg-mdd-dialog-green rounded-[10px] text-white text-2xl font-semibold text-center"
          onClick={handleYesButton}
        >
          ใช่
        </button>
      </CustomizedDialogActions>
    </CustomizedDialog>
  )
}
