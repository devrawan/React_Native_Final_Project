import React ,{useState}from "react";
const AppContext = React.createContext();

export const AppProvider =({children})=>{
    const [userCollection,setCollections] =useState([ {id:"0",name:"Business",isFav:false},
    {id:"1",name:"Entertainment",isFav:false},
    {id:"2",name:"General",isFav:false},
    {id:"3",name:"Health",isFav:false},
    {id:"4",name:"Science",isFav:false},
    {id:"5",name:"Sports",isFav:false},
    {id:"6",name:"Technology",isFav:false},])
    const [savArray,setSaveArray] =useState([])

      return(
        <AppContext.Provider value={{userCollection,savArray,setCollections,setSaveArray}} >
        {children}
        </AppContext.Provider>
      )
    
    }
    
    
    
    export default AppContext;
  

