async function convertToBase64(image: any) {
    
    const base64 = await new Promise((resolve,reject)=>{
        const fileReader=new FileReader()
        fileReader.readAsDataURL(image)

        fileReader.onload = (()=>{
            
            resolve(fileReader.result)
        })

        fileReader.onerror = ((error)=>{
            
            reject(error)
        })
    })


    return base64

}

export default convertToBase64