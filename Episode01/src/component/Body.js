import ResturentCard,{withPromotedLabel} from "./ResturentCard";
import resList from "../utilis/mockData.js";
import {useEffect, useState,useContext} from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utilis/useOnlineStatus";
import UserContext from "../utilis/UserContext";


const Body=()=>{


//Local State variable -Super powerful variable(create state variable)
let [ListOfRestaurent,setListofRestaurent]=useState([]);
const  [filterdRestaurant,setfiltedRestaurant]=useState([]);
const [searchText,setsearchText]=useState("");

const ResturentCardPromoted=withPromotedLabel(ResturentCard);



// Normal JS variable
// let ListOfRestaurent=null;

    //  Normal Js variables
// let ListOfRestaurentJS=[
//     {
//         "info": {
//           "id": "740150",
//           "name": "Cake",
//           "cloudinaryImageId": "4cb1c895a46c07cf61ef4515f9cdf5dc",
//           "locality": "Jatepur North",
//           "areaName": "Golghar",
//           "costForTwo": "₹400 for two",
//           "cuisines": [
//             "Bakery"
//           ],
//           "avgRating":3.4,
//           "deliveryTime": 75,
//         }
//     },
//     {
//         "info": {
//           "id": "740151",
//           "name": "McD",
//           "cloudinaryImageId": "4cb1c895a46c07cf61ef4515f9cdf5dc",
//           "locality": "Jatepur North",
//           "areaName": "Golghar",
//           "costForTwo": "₹400 for two",
//           "cuisines": [
//             "Bakery"
//           ],
//           "avgRating":4.1,
//           "deliveryTime": 75,
//         }
//     },
//     {
//         "info": {
//           "id": "740159",
//           "name": "KFC",
//           "cloudinaryImageId": "4cb1c895a46c07cf61ef4515f9cdf5dc",
//           "locality": "Jatepur North",
//           "areaName": "Golghar",
//           "costForTwo": "₹400 for two",
//           "cuisines": [
//             "Bakery"
//           ],
//           "avgRating":4.3,
//           "deliveryTime": 75,
//         }
//     }
// ];


useEffect(()=>{
    fetchData();
},[]);
  
const fetchData=async()=>{
    const data= await fetch(
       "https://www.swiggy.com/dapi/restaurants/list/v5?lat=27.1766701&lng=78.00807449999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json=await data.json();
    console.log(json);
    // Opptional Chaning
    setListofRestaurent(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setfiltedRestaurant(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  


};
const onlineStatus=useOnlineStatus();
if(onlineStatus===false) return (
<h1>
    Looks like you're offline Please chec your internet connection 
</h1>
)

// Conditional Rendering
// if(ListOfRestaurent.length===0){
//     return<Shimmer/>
// }

const {loggedInUser,setUserName}=useContext(UserContext);

    return ListOfRestaurent.length === 0 ? 
    (<Shimmer/>)
    : 
    (
       <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4" >
            <input type="text" 
            data-testid="searchInput"
            className="border border-solid border-black" value={searchText}
            onChange={(e)=>{setsearchText(e.target.value);
            
            }}
            />
            <button className="px-4 py-2 bg-green-100 m-4 rounded-lg" onClick={()=>{
                // filter the restaurant cards and updatw th UI
                //search text
                console.log(searchText);
                const filterdRestaurant=
                ListOfRestaurent.filter((res)=>
                res.info.name.toLowerCase().includes(searchText.toLowerCase()));
               
               setfiltedRestaurant(filterdRestaurant);
            
            }}>Search</button>
        </div>
        <div  className="search m-4 p-4 flex items-center">
            </div>
        <div  className="search m-4 p-4 flex items-center">
            <label>UserName:</label>
<input className="border p-2   border-black" 
value={loggedInUser}
onChange={(e)=>setUserName(e.target.value)} />

            </div>

         </div>   
    {/* <button className="px-4 py-2 bg-gray-100 rounded-lg " 
        onClick={()=>{
        
        //    FIllter Logic Here
         const filteredList=ListOfRestaurent.filter(
            (res)=>res.info.avgRating>4
        )
        setListofRestaurent(filteredList);
        }}>
            Top Rated restaurant
            </button></div>
        
      </div> */}
           <div className="flex flex-wrap">
       {filterdRestaurant.map((restaurant)=>
       (<Link  key={restaurant?.info.id} 
       to={"/restaurants/" + restaurant?.info.id}>
        
        
        {restaurant.data.promoted ? (
        <ResturentCardPromoted resData={restaurant}
        />):
        
        ( <ResturentCard key={restaurant.info.id}
        />)}
       
       </Link>))}
        </div>
           </div> 
       
    );
   };
export default Body;   