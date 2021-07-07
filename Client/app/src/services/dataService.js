var headers={};

const cookieValue=document.cookie
.split('; ')
.find(row=>row.startsWith('Baerer'));
if(cookieValue){
    headers['Baerer']=cookieValue;
    
}





export   function post(data,endpoint){
 
    return   fetch(endpoint,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
        
    });
   
    
 };

  export  function get(endpoint){
    return  fetch(endpoint)
    }
    
  
  