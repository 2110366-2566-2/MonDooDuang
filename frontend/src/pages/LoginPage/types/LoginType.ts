export interface UserLoginSchema {
  email: string
  password: string
}

export type FailedAlertProps = {
  FAlert: boolean
  setFAlert: React.Dispatch<React.SetStateAction<boolean>>
}
