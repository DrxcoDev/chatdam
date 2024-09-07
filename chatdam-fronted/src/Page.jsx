import Card from './components/UI/cards'
import Button from './components/Buttons/Button'
import Footer from './components/Footer'
import { Link } from 'react-router-dom';

function App() {
  return (
    <main>
      <header className="flex mx-5 my-5 md:items-center bg-white sticky top-0 h-[100px] z-50">
        <h1 className="text-2xl ml-3 font-medium text-black">Chatdam</h1>
        <div className="ms:ml-[50px] md:ml-[100px]">
          <ul className="flex">
            <li className="ms:mx-3 md:mx-5"><Link to="/">Home</Link></li>
            <li className="ms:mx-3 md:mx-5"><a href="">About</a></li>
            <li className="ms:mx-3 md:mx-5"><Link to="/contact">Contact</Link></li>
            <li className="ms:mx-3 md:mx-5"><Link to="/chatdam/login">Login</Link></li>
            <li className="ms:mx-3 md:mx-5"><Link>Register</Link></li>
          </ul>
        </div>

      </header>

      <div className="">
        <div className="my-[150px]">
          <Card title="Talk with everyone" description="Esto es una carta"/>
        </div>
        <div className='flex items-center justify-center'>
          <a className='p-5 pl-4 w-22 bg-[#5fc3e4] rounded-lg text-white' href="https://google.es">Read More</a>
        </div>
      </div>

      <div className="mx-20 mt-[100px] flex">
        <div>
          <h1 className='text-4xl ml-3 font-medium text-black'>About us</h1>
          <p className='w-[400px] ml-3 my-5 font-light text-2xl '>ChatDam is a fast open source software of messenger. Is important your privacity, by this we have a secret AI for SPAMS.</p>
        </div>
        <div className="">

        </div>
      </div>

      <div className="mt-[200px] flex justify-center items-center">
        <div className="">
          <h1 className="mb-[50px] text-4xl pl-40 text-black">Prices</h1>
          <Card title="Its FREE" description="Esto es una carta"/>
        </div>
        
      </div>
      
      <Footer />
    </main>
    
  );
}

export default App;
