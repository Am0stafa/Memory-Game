
import './Card.css'


const Card = ({card,handelChoice,flipped,disabled}) => {

const handleClick = () => {
    if(disabled) return
    //! we basically want to update some state in the app component and its either choice one or two 
    handelChoice(card)

}

  return (
    <div className="card">
       <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="/img/cover.png" alt="cover" onClick={handleClick} />
      </div>
    </div>
  )
}

export default Card