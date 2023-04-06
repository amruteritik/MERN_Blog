import React from 'react'
import { Link } from 'react-router-dom'

function Singlepost(props) {
  return (
    <>
    {console.log(props)}
    {console.log(">>>>>")}
      <div className='cards__item'>
        <Link className='cards__item__link' to="/posts/:id">
          <figure className='cards__item__pic-wrap' >
            <img
              className='cards__item__img'
              src={props.image}
              alt='img'
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.title}</h5>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Singlepost
