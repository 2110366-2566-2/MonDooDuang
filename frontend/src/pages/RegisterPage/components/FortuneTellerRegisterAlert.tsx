import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled
} from "@mui/material"
import { UserSchema } from "../types/RegisterType"
import { RegisterService } from "../services/RegisterService"
import { jwtDecode } from "jwt-decode"

export default function FortuneTellerRegisterAlert(props: {
  FTAlert: boolean
  setFTAlert: React.Dispatch<React.SetStateAction<boolean>>
  setCFAlert: React.Dispatch<React.SetStateAction<boolean>>
  setFAlert: React.Dispatch<React.SetStateAction<boolean>>
  formValues: UserSchema
}) {
  const handleSubmitData = async () => {
    props.setFTAlert(false)

    const res = await RegisterService.createUser(props.formValues)
    const data = await res.json()
    console.log(data)
    if (!data.success) {
      props.setFAlert(true)
      return
    } else {
      props.setCFAlert(true)
    }
    console.log(data.token)
    localStorage.setItem("token", data.token)
    const decoded = jwtDecode(data.token)
    const userid = JSON.parse(JSON.stringify(decoded))["userid"]
    localStorage.setItem("userid", userid)
    console.log(userid)
  }

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
          onClick={handleSubmitData}
        >
          ไม่
        </button>
        <button
          className="w-[25%] h-[50px] bg-mdd-dialog-green rounded-[10px] text-white text-2xl font-semibold text-center"
          onClick={handleSubmitData}
        >
          ใช่
        </button>
      </CustomizedDialogActions>
    </CustomizedDialog>
  )
}
