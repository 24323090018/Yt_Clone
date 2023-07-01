import auth from "../../firebase"
import firebase from "firebase/compat/app"
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT, LOG_PROFILE } from "../actionTypes"

export const login = () => async dispatch =>{
    try{

        dispatch({
            type:LOGIN_REQUEST,
        })

        const provider = new firebase.auth.GoogleAuthProvider()

        provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl')

        const res = await auth.signInWithPopup(provider)
        console.log(res)

        const accessToken = res.credential.accessToken

        const profile = {
            name:res.additionalUserInfo.profile.name,
            photoURL:res.additionalUserInfo.profile.picture,
        }
        // console.log(profile)

        // if user refresh the page it lost login then to prevent this uses the session storage
        sessionStorage.setItem('ytc-access-token',accessToken)
        sessionStorage.setItem('ytc-user',JSON.stringify(profile))

        dispatch({
            type:LOGIN_SUCCESS,
            payload:accessToken 
        })

        dispatch({
            type:LOG_PROFILE,
            payload:profile,
        })

    }catch(error){
        console.log(error.message)
        dispatch({
            type:LOGIN_FAIL,
            payload:error.message,
        })
    }
}

export const log_out = ()=>async dispatch=>{
    await auth.signOut()
    dispatch({
        type:LOG_OUT,
    })

    sessionStorage.removeItem('ytc-access-token')
    sessionStorage.removeItem('ytc-user')
}
