import axios from "axios";

export const deleUrl = async (pid) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/urlshorts/${pid}`);
}

export const shortCode = (num) =>{
    let atoz = []
    for (let i = 65; i <= 90; i++) {
      atoz.push(String.fromCharCode(i))
      atoz.push(String.fromCharCode(i + 32))
    }
   
  return atoz[num]  
}
export const postUrl = async (urlText, createID) => {
    shortCode()
    let now =Date.now();
    let urlcode = []
    let num = 52
    while(now > 0){
      let tmp = now % num;
      let c = shortCode(tmp)
      urlcode.unshift(c);
      now = parseInt(now / num);
    }
    if (urlText && urlText.length > 0) {
      await axios.get(urlText)
      .then(async (response) =>{
        await postInput(urlcode, urlText, createID)
      })
      .catch(async (error) =>{
        if(error.response){
          if(error.response.status == 404){
            console.log('not working web url')
          }
          else{
            await postInput(urlcode, urlText, createID)
          }
        }
        else if(error == 'Error: Network Error'){
          await postInput(urlcode, urlText, createID)
          console.log('Just CORS Error but working')
        }
      })
    }
  };

  export const putUrl = async (pid, urlText) => {
    if (urlText && urlText.length > 0) {
      await axios.get(urlText)
      .then(async (response) =>{
        await putInput(pid, urlText)
      })
      .catch(async (error) =>{
        if(error.response){
          if(error.response.status == 404){
            console.log('not working web url')
          }
          else{
            await putInput(pid,urlText)
          }
        }
        else if(error == 'Error: Network Error'){
          await putInput(pid, urlText)
          console.log('Just CORS Error but working')
        }
      })
    }
  }
  export const putMeta = async (pid, meta) => {
    console.log(pid, meta, 'FFF');
    const data = {
      metatitle: meta.metaTitle,
      metaimg: meta.metaImage,
      metatext: meta.metaDdescription,
    }
    let re = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/urlshorts/${pid}`, {
      ...data    
    });
    console.log(re);
  }
  export const putInput = async ( pid, urlText) =>{
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/url/${pid}`, {
        url2: urlText,     
    });
  }
  export const postInput = async (urlcode, urlText, createID) =>{
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/url/${urlcode.join('')}`, {
        // url: urlcode.join('') ,
        url2: urlText,
        userid: createID,
      // view: 0
    });
  }