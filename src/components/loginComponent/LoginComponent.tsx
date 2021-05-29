import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { UserDetails } from '../../model/UserDetails';
import { loginSportivo, resetSportivoAutenticato } from "../../store/sportivoAutenticatoSlice"; 

export const Login: React.FC = () => {

       
    const { register, handleSubmit, formState: { errors } } = useForm<UserDetails>();
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSportivoAutenticato())
    })

    const onSubmit = handleSubmit((userDetails: UserDetails) => {
        dispatch(loginSportivo(userDetails))
    })


    return (
        <>
            <form onSubmit={onSubmit} style={{ display: "block" }}>
                <div style={{ textAlign: "center", marginTop: "200px" }}>
                    <h1>LOGIN</h1>
                </div>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <input {...register("username", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} id="username" name="username" type="email" placeholder="Email" />
                    {
                        errors.username && <div className="error">Email richiesta</div>
                    }
                </div>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <input {...register("password", { required: true })} id="password" name="password" type="password" placeholder="Password" />
                    {
                        errors.password && <div className="error">Password richiesta</div>
                    }
                </div>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button type="submit" >Login</button>
                </div>

            </form>
        </>
    )
}
