/* interface of Context provider */
export interface intContext {
	userName: string | null,
	userUid: string | null,
	lastName?: string,
	photo?: string,
	state?: string,
	about?: string
	file?: Blob | undefined,
	login?: intContext,
	setLogin?: React.Dispatch<React.SetStateAction<intContext>>
}

// interface of messages send
interface message { userName: string, message: string, messageSendTime: number }

// interface to write in the realtime DB
interface intWrite {
	userName: string | null,
	messageId: string,
	userDB: string | null,
	message: string | undefined,
	messageSendTime: number
}

/* add and update new messages */
interface intUpdateUserData {
	messageId: string,
	userName: string | null,
	message: string | null,
	userDB?: string | null,
	messageSendTime: number
}

/* credentials login user  */
interface intLoginUserData {
	email: string,
	password: string
}