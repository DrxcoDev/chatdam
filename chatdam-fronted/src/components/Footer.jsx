import './Footer.css'

function Footer() {
    return(
        <div className="w-full h-auto bg mt-[100px] rounded-t-[40px]">
            <div className="p-8">
                <h1 className='text-2xl'>CHATDAM</h1>
                <div className="flex">
                    <ul className='mt-5'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                    <ul className='ml-32'>
                        <span className="-mt-[150px] text-xl">Community</span>
                        <li>Feedback</li>
                        <li>Discord</li>
                    </ul>
                    <ul className='ml-10'>
                        <span className="-mt-[150px] text-xl">User</span>
                        <li>Login</li>
                        <li>Register</li>
                    </ul>
                </div>
                
            </div>
        </div>
        
    );
}

export default Footer;