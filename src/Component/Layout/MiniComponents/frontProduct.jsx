import React from 'react'
import { Link } from 'react-router-dom'
import Image1 from "../../../Utility/images/img1.png";

function FrontProduct({key, title, discription, linkTo}) {
  return (
    <div>
      <div className="card_container card_one_container">
          <div className="card">
            <img src={Image1} alt="" />
            <div className="card_body_one">
              <div className="title">{title}</div>
              <div className="content">
                {discription}
              </div>
              <Link className="productCard" to={linkTo}>
              <button className="buy">Buy</button>
              </Link>
              <button className="know">Know More</button>
            </div>
          </div>
        </div>

    </div>
  )
}
  
export default FrontProduct