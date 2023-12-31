import React ,{lazy,Suspense, useEffect, useState}from "react";
import ReactDOM from "react-dom/client";
import Header from "./component/Header.js";
import Error from "./component/Error.js";
import {createBrowserRouter,RouterProvider,Outlet} from "react-router-dom";
import UserContext from "./utilis/UserContext.js";
import { Provider } from "react-redux";
import appStore from "./utilis/appStore.js";
import Cart from "./component/Cart.js"

const Grocery=lazy(()=>import("./component/Grocery.js"));
const About=lazy(()=>import("./component/About.js"));
const Contact =lazy(()=>import("./component/Contact.js"));
const Body =lazy(()=>import("./component/Body.js"));
const RestaurantMenu =lazy(()=>import("./component/RestaurantMenu.js"));

  const AppLayout=()=>{


const [userName,setUserName]=useState();

//Authentication
useEffect(()=>{
//Make an API call and send username and password
const data={
name:"Ravi Kumar Gupt"
}
setUserName(data.name);

},[])


    return (
     //default value 
     
     <Provider store={appStore}>

-      <UserContext.Provider value={{loggedInUser:userName,setUserName}}>
        {/* Ravi Kumar */}
        <div  className="app">
        <Header/>
         <Outlet/>
  </div>
  </UserContext.Provider>
  </Provider>
    );
  };

const appRouter=createBrowserRouter([
{
  path: "/",
  element:<AppLayout/>,
  children:[
    {
      path:"/",
      element:<Suspense fallback={<h1>Loading...</h1>}>
     <Body/>
    </Suspense>,
    },
    {
      path:"/about",
      element:<Suspense fallback={<h1>Loading...</h1>}>
      <About/>
    </Suspense>,
    },
    {
      path:"/contact",
      element:<Suspense fallback={<h1>Loading...</h1>}>
      <Contact/>
    </Suspense>,
    },
    {
      path:"/grocery",
      element:<Suspense fallback={<h1>Loading...</h1>}>
        <Grocery/>
      </Suspense>,
    },
    {
      path:"/restaurants/:resId",
      element:<Suspense fallback={<h1>Loading...</h1>}>
   <RestaurantMenu/>
    </Suspense>,
    },
    {
     path:"/cart",
     element:<Cart/>,
    },
  ],
  errorElement:<Error/>,
},

]);

    const root=ReactDOM.createRoot(document.getElementById("root"));
    root.render(<RouterProvider router={(appRouter)}/>);