import React from 'react'
import {ReactComponent as Replacement} from "../../../Utility/icons/replacement.svg";
import {ReactComponent as Cod} from "../../../Utility/icons/cashonDel.svg";
import {ReactComponent as Warranty} from "../../../Utility/icons/warranty.svg";
import {ReactComponent as FreeShipping} from "../../../Utility/icons/freeShipping.svg";
import './productService.css'
const ProductServices = ({service}) => {
  
  function renderService({serviceType, duration}){
    switch (serviceType) {
      case "replacement":{
        return(
          <>
          <div className='_service-container'>
        <div><Replacement />
        </div>
        <p>{duration} days Replacement</p>
        </div>
        </>
        )
      }
     
      case "warranty":{
        return(
          <> 
          <div className='_service-container'>
        <div><Warranty />
        </div>
        <p>{duration} yr Warranty</p>
        </div>
        </>
        )
      }
     
      case "freeShipping":{
        return(
          <>
          <div className='_service-container'>
        <div><FreeShipping />
        </div>
        <p>Free Delivery</p>
        </div>
        </>
        )
      }
     
      case "cashOnDel":{
        return(
          <>
          <div className='_service-container'>
        <div><Cod />
        </div>
        <p>Cash On Delivery</p>
        </div>
        </>
        )
      }
     
    
      default:
        break;
    }
  }
  return (
    <>
  {renderService(service)}
    </>
  )
}
 
export default ProductServices