import React from 'react'
import './Card.css'

const Card = ({data}) => {
  
    console.log(data);

//   const Readmore=(url)=>{
//     window.open(url)
//   }
    
  return (
    <>
    <h1 className='heading'>Latest  <span>News</span></h1>
   
    <div className='container'>
        
        {data.map((news,idx)=>(
           
            <div className='card' key={idx}>
                <img src={news.urlToImage}/>
                <div className="card-content">
                    <a className='title'>{news.title}</a>
                    <p>{news.description}</p>
                    <a className='button' href={news.url} target="_blank" >Read More</a>
                </div>
            </div>
        ))}
    </div>
    </>
  )
}

export default Card