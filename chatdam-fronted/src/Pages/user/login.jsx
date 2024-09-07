import './styles/login.css'
import Gitbtn from './components/gitbtn'

function Login(){
    return(
        <div className="flex sm:w-full">
            <div className="login-container">
            <h1>Login</h1>
            <form>
                <label>
                Nombre de usuario:
                <input type="text"/>
                </label>
                <br />
                <label>
                Contraseña:
                <input type="password"/>
                </label>
                <br />
                <button type="submit">Iniciar sesión</button>
            </form>
            </div>
            <div className="w-1 h-[50vh] bg-[#e55d87] rounded-lg md:ml-[200px] mr-[200px] mt-44 sm:ml-0"></div>
            <div className="my-72">
                <div className="">
                    <Gitbtn />
                </div>
            </div>
        </div>
        
        
    );
}

export default Login;