import React, {useEffect} from 'react'
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {UserDetails} from '../../model/UserDetails';
import {loginSportivo, resetSportivoAutenticato} from "../../store/sportivoAutenticatoSlice";
import {LockClosedIcon} from "@heroicons/react/solid";

export const Login: React.FC = () => {


    const {register, handleSubmit, formState: {errors}} = useForm<UserDetails>();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSportivoAutenticato())
    })

    const onSubmit = handleSubmit((userDetails: UserDetails) => {
        dispatch(loginSportivo(userDetails))
    })

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            style={{backgroundImage:"linear-gradient(to bottom right, #343A40, #F5EFF5)"}}
        >
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Login</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Indirizzo Email
                            </label>
                            <input
                                {...register("username", {
                                    required: true,
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                })}
                                id="username" name="username"
                                type="email"
                                placeholder="Email"
                                autoComplete="email"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                            {
                                errors.username && <div className="error">Email richiesta</div>
                            }
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                {...register("password", {required: true})}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"/>
                            {
                                errors.password && <div className="error">Password richiesta</div>
                            }
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{backgroundColor:"#513B87"}}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                                aria-hidden="true"/>
                            </span>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
