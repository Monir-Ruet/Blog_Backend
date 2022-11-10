interface LoginForm{
    username:string,
    password:string
}

interface Success{
    status:number,
    token:string
}
interface Unsuccess{
    status:number,
    message:string
}
export {
    LoginForm,
    Success,
    Unsuccess
}