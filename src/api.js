const getAPi = () =>{
    return (
        fetch('')
        .then(res=>res.json())
        .then(json=>console.log(json))
    )
}