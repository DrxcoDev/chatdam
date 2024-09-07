import './styles/login.css'

function Login(){
    return(
        <div className="flex">
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
            <div className="w-1 h-[50vh] bg-gray-400 rounded-lg ml-[200px] mr-[100px] mt-44"></div>
        </div>
        
        
    );
}

export default Login;