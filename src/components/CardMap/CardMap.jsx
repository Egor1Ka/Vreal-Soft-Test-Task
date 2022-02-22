import { useSelector } from 'react-redux'
import Card from './Card'

const CardMap = () => {
    
    const cardList = useSelector(state => state.cardList)
    

    return <div className='d-flex justify-content-start flex-wrap mt-4'>
        {cardList.map(card=>{
            return <Card key={card.id} card = {card}/>
        })}
    </div>
    



}

export default CardMap