import React from "react";
import { Route, Redirect } from "react-router-dom";

const Protectedrouter =({component,...rest})=>{
   console.log(component);
    
   let RenderComponbt=component;
        let hastoken=localStorage.getItem('savedToken');
       
    return(
        <Route
        {...rest}
        render={
            props=>{
               return hastoken !== null ? (
                    <RenderComponbt {...props}/>
                ):(
                    <Redirect
                    to={{
                        pathname:'/'
                    }}
                    />
                )
               
            }
        }
        />
    )
}

export default Protectedrouter;