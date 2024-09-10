import "./lista.css"
import Guest from "./compontents/guest"
import {useRef, useEffect, useState} from 'react'
import api from './services/api'

function Lista () {

    const [currentArr, setCurrentArr] = useState<any[]>([])

    const getGuestsLocalStorage = () => {
        const storedGuests = localStorage.getItem("guests");

        const localArray = storedGuests ? JSON.parse(storedGuests) : [];
      
        return(localArray);
      };

    const search = useRef<HTMLInputElement>(null)
    const addName = useRef<HTMLInputElement>(null)
    const addTag = useRef<HTMLInputElement>(null)
    const copyBtn = useRef<HTMLButtonElement>(null)
    const addBtn = useRef<HTMLButtonElement>(null)

    

    function updateList () {
        if (search.current != undefined) {
            search.current.value = ""
        }
        setCurrentArr(getGuestsLocalStorage()) 
    }

    function handleSearch () {
        
        const searchArr = getGuestsLocalStorage()
        let searchContent = ""
        if (search.current != undefined) {
            searchContent = search.current.value
        }
        const filteredArr = searchArr.filter((item: { name: string }) => 
            item.name.toLowerCase().startsWith(searchContent.toLowerCase())
        );
        setCurrentArr(filteredArr);

    }

    function handleSender() {
        let sendReady: string[] = []
        const sendArr = getGuestsLocalStorage()
        sendArr.forEach((guest: {confirmed: boolean, wppTag: string})=>{
               if (!guest.confirmed) {
                sendReady.push("@" + guest.wppTag.slice(0, 5) + " ")
                console.log(sendReady)
            }
        })
        api.post('/bot', {
            "arrayMentions":sendReady
        }).then(()=>{
            console.log(sendReady)
        })
    }

    function handleCopy () {
        let copyText = ""
        const copyArr = getGuestsLocalStorage()
        
        navigator.clipboard.writeText(copyText).then(() => {
            if(copyBtn.current != undefined)
            {copyBtn.current.innerHTML = '<i class="fa-solid fa-check"></i>';}

            setTimeout(()=>{
                if(copyBtn.current != undefined)
                    {copyBtn.current.innerHTML = 'Copiar lista';}
            }, 1000)
          });
    }

    function addGuest() {
        let nextId = 0
        const addArr = getGuestsLocalStorage()
        console.log(addArr)
        let nextName = ""
        let nextTag = ""
        if(addArr.length>0) {
            nextId = addArr[addArr.length-1].id + 1
        }
        
        if (addName.current!= undefined) {   
            if (addName.current.value != "" && addName.current.value != null && addName.current.value != " ") {
            nextName = addName.current.value
            addName.current.value = ""
            } else {
                alert("Preencha todos os campos!")
                return
            }
            
        }
        if (addTag.current!= undefined) {
            if (addTag.current.value != "" && addTag.current.value != null && addTag.current.value != " ") {
                nextTag = addTag.current.value
                addTag.current.value = ""
                } else {
                    alert("Preencha todos os campos!")
                    return
                }
        }

        if(addBtn.current != undefined)
        {addBtn.current.innerHTML = '<i class="fa-solid fa-check"></i>';}

        setTimeout(()=>{
            if(addBtn.current != undefined)
                {
                    
                    addBtn.current.innerHTML = '<i class="fa-solid fa-plus"></i>';
                   }
        }, 1000) 

        addArr.push({id: nextId, name: nextName, confirmed: false, wppTag: nextTag})
        localStorage.setItem("guests", JSON.stringify(addArr));
        updateList()
    }

    useEffect(() => {
        updateList()
    }, [])

    return (
        <div id="container">
            <div id="listHeader">
                <div id="search">    
                <h1>Buscar:</h1>
                <input type="text" placeholder="Nome do convidado" onChange={handleSearch} ref={search}/>
                </div>
                <div id="add">    
                <h1>Adicionar:</h1>
                <input type="text" placeholder="Nome do convidado" ref={addName}/>
                <input type="text" placeholder="Nome no zap" ref={addTag}/>
                <button onMouseUp={addGuest} ref={addBtn} id="addBtn"><i className="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <main>
            {currentArr.map((guest) => (
                    <Guest label={guest.name} confirmed={guest.confirmed} storageId={guest.id} updateList={updateList}/>
                ))}
            </main>
            <button id="copy" onClick={handleSender} ref={copyBtn}>
                Enviar lista
            </button>
        </div>
    )
}

export default Lista;