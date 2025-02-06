const verifyEmailTemplate = (name,url)=> {
    return ` 
<p> Dear, ${name} </p>    
<p>Thank you for Registering with ByteKart!!</p>
<a href $ {...url} style="color:white;background : blue; marigin-top:10px">
    Verify Email
</a> 
`
}

export default verifyEmailTemplate;