import Card from './components/UI/cards'

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
        
      </div>
      
    </main>
    
  );
}

export default App;
