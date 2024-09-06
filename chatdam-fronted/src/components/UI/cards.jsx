import './card.css'

function Card({title, description, gradientX1=1, gradientX2=2}) {
    return (
        <div className="card">
            <div className="card-container">
                <div className="p-10">
                    <h1 className="text-white text-4xl text-center">{title}</h1>
                    <p className='mt-5 text-center text-neutral-200'>Using Chatdam is too easy for you envioriment</p>
                </div>
            </div>



        </div>

        
        
    );
}

export default Card;