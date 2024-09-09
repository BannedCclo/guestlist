import "./guest.css"
import { InputHTMLAttributes } from "react";

interface GuestProps extends InputHTMLAttributes<HTMLDivElement> {
    label: string;
    storageId: number;
    confirmed: boolean;
    updateList: () => void
  }

  const Guest: React.FC<GuestProps> = ({ label, storageId, confirmed, updateList, ...rest }) => {

    const getGuestsLocalStorage = () => {
        const storedGuests = localStorage.getItem("guests");

        const localArray = storedGuests ? JSON.parse(storedGuests) : [];
      
        return(localArray);
      };

    function handleConfirm(){
        const confirmArr = getGuestsLocalStorage()
        confirmArr.forEach((guest: {confirmed: boolean, id: number}, index: number) => {
            if (guest.id == storageId) {
                guest.confirmed =!guest.confirmed
            }
            
        });

        localStorage.setItem("guests", JSON.stringify(confirmArr))
        updateList()
    }

    function removeGuest() {
        const removeArr = getGuestsLocalStorage()
        removeArr.forEach((guest: {id: number}, index: number) => {
            if (guest.id == storageId) {
                removeArr.splice(index, 1)
            }
            
        });

        localStorage.setItem("guests", JSON.stringify(removeArr))
        updateList()
        console.log(removeArr)
    }

    return (
        <div id="guestBox">
            <div id="pt1"><h1 id="guestName">{label}</h1></div>
            <div id="pt2">
            <input type="checkbox" checked={confirmed} onChange={handleConfirm}/>
            <div id="remove" onClick={removeGuest}><i className="fa-solid fa-x"></i></div>
            </div>   
        </div>
    )
}

export default Guest;