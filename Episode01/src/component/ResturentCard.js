import { useContext } from "react";
import { CDN_URL } from "../utilis/contants";

const ResturentCard=(props)=>{
    const {resData}=props;
    const {loggedInUser}=useContext(useContext);
    const {cloudinaryImageId,
        name,
        cuisines,
        costForTwo,
        avgRating,
        deliveryTime
    }=
    resData?.info;
       return (
           <div data-testid="resCard" className="m-4 p-4 w-[250px] rounded-lg bg-slate-100 hover:bg-green-300">
               <img className="rounded-lg"
                alt="res-logo" src={CDN_URL
               +cloudinaryImageId
               }
               
               />
          <h3 className="font-bold py-4 text-lg "> {name}</h3>
          <h3 > {cuisines.join(" ")}</h3>
          <h3 > {costForTwo}</h3>
          <h3 > {avgRating}*</h3>
          <h3 >User {loggedInUser}</h3>
          {/* <h3 > {deliveryTime} Minutes</h3> */}
          
        
             </div>
       );
   };
//Higher Order Component

//Input restaurant card=> restaurantCardPromoted

 export const withPromotedLabel=(ResturentCard)=>{
    return (props)=>{
        return(
            <div>
                <label className="absolute bg-black text-white
                m-2 p-2 rounded-lg">promoted</label>
                <ResturentCard {...props}/>
            </div>
        );
    };
};




   export default ResturentCard;