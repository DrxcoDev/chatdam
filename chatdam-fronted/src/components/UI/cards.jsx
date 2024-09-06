import './card.css'

function Card({title, description}) {
    return (
        <div className="card">
            <div className="card-container bg-black">
                <div className="p-10">
                    <h1 className="text-neutral-200 text-4xl text-center">{title}</h1>
                    <p className='mt-5 text-center text-neutral-200'>Using Chatdam is too easy for you envioriment</p>
                </div>
            </div>
        </div>
        
    );
}

export default Card;