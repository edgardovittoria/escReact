import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router';
import { loginSportivo } from "../../store/sportivoAutenticatoSlice"; 
import store from '../../store/store';

type Credenziali = {
    email: string,
    password: string
}

export const Login: React.FC = () => {

    

    const { register, handleSubmit, formState: { errors } } = useForm<Credenziali>();
    
    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit = handleSubmit((data: Credenziali) => {
        dispatch(loginSportivo(data.email))
        history.push("/profiloSportivo")
    })

    //setSportivo(useSelector(sportivoSelector).sportivo)


    return (
        <>
            <form onSubmit={onSubmit} style={{ display: "block" }}>
                <div style={{ textAlign: "center", marginTop: "200px" }}>
                    <h1>LOGIN</h1>
                </div>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} id="email" name="email" type="email" placeholder="Email" />
                    {
                        errors.email && <div className="error">Email richiesta</div>
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
