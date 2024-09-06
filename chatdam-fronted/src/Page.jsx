import Card from './components/UI/cards'
import Button from './components/Buttons/Button'

function App() {
  return (
    <main>
      <header className="flex mx-5 my-5 md:items-center">
        <h1 className="text-2xl ml-3 font-medium">Chatdam</h1>
        <div className="ms:ml-[50px] md:ml-[100px]">
          <ul className="flex">
            <li className="ms:mx-3 md:mx-5"><a href="#">Home</a></li>
            <li className="ms:mx-3 md:mx-5"><a href="#">About</a></li>
            <li className="ms:mx-3 md:mx-5"><a href="#">Contact</a></li>
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
          <h1 className='text-4xl ml-3 font-medium '>About us</h1>
          <p className='w-[400px] ml-3 my-5 font-light text-2xl '>ChatDam is a fast open source software of messenger. Is important your privacity, by this we have a secret AI for SPAMS.</p>
        </div>
        <div className="">

        </div>
      </div>
      
    </main>
    
  );
}

export default App;
