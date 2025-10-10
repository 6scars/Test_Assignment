export default function WelcomePage({user}){
    console.log(user)
    return(
        <>
            <p>Hello, {user.email}</p>
            <button> logout</button>
        </>
    )
}