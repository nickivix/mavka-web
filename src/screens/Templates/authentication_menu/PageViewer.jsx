import React from 'react'
import { Login } from './Login/Login.jsx'
import { Register } from './Register/Register.jsx'
import style from './styles/PageViewer.module.css'
import {Route, BrowserRouter,Link,Redirect} from 'react-router-dom';
const PageViewer = () =>{
    return(
            <BrowserRouter>
                
                <div className={style.base_container}>
                        <div className="wrapper">
                        <Redirect from="/" to="/login" />
                            <Route exact path='/login' render={()=>{
                                return (<div>
                                    <div className={style.btns}>
                                        <Link to="/login"><button>Вже маєш акаунт?</button></Link>
                                        <Link to="/register"><button>Зареєструватися</button></Link>
                                    </div>
                                    <Login />
                                </div>
                                )}}/>
                            <Route exact path='/register' render={()=>{
                                return(<div>
                                    <div className={style.btns}>
                                        <Link to="/login"><button>Вже маєш акаунт?</button></Link>
                                        <Link to="/register"><button>Зареєструватися</button></Link>
                                    </div>
                                    <Register />
                                </div>
                                )}}/>
                        </div>
                </div>
            </BrowserRouter>
    )
} 

export default PageViewer;