/* interface of Context provider */
export interface intContext{
    userName: string | null,
    userId: string | null,
    login?: intContext,
    setLogin?: React.Dispatch<React.SetStateAction<intContext>>
}

// interface of messages send
interface message { userName: string, message: string, messageSendTime: number}

// interface to write in the realtime DB
interface intWrite {
    //userId: string | null,
    userName: string | null,
	messageId: string,
    userDB: string | null,
    message: string | undefined,
    messageSendTime: number
}

/* add and update new messages */
interface intUpdateUserData{
	messageId: string,
	userName:string | null,
	message: string | null,
	userDB?: string | null,
	messageSendTime: number
	}