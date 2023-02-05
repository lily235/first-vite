import './App.css';

import { useState } from 'react';

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  
  function generateURL(str) {
    return str.slice(3);
  }
  let nextId = 0;

export default function App(){
    const [isSubmited,setIsSubmited] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [urlMappings,setUrlMappings] = useState([]);

    function handleShorten(){
        if(validURL(urlInput)){
            if(urlMappings.find(u=>u.url===urlInput)){
                alert("already have one!");
                setUrlInput('');
            }else{
            let shortUrl=generateURL(urlInput);
            setUrlMappings([
                ...urlMappings,
                { id: nextId++, url: urlInput, shortUrl:shortUrl}
              ]);
            setIsSubmited(!isSubmited);
            setUrlInput(shortUrl);
            console.log(urlMappings);
}
        } else {
            alert('!please enter a URL!');
            setUrlInput('');
            console.log(urlMappings);
        }
       
    }

    function handleCope(){
        alert('copy success!');
        setIsSubmited(!isSubmited);
        setUrlInput('');
    }

    function handleUrlInput(e){
        setUrlInput(e.target.value);
    }

    return (
        <>
        <h1>YOUR SHORTENED LINK:</h1>
        <input className='url' placeholder='PASTE URL,SHORTEN & SHARE' value={urlInput} onChange={handleUrlInput}/>
        <button onClick={isSubmited?handleCope:handleShorten}>{isSubmited?"COPY":"SHORTEN"}</button>
        </>
    )
}