import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Reserve = (Props) => {
 
      const [selectedRoom,setSelectedRoom]=useState([])
  const { data, loading, error } = useFetch(`/hotels/room/${Props.hotelId}`);
  const {date}=useContext(SearchContext)
 

  const getDatesInRange=(startDate,endDate)=>{
    const start=new Date(startDate)
    const end=new Date(endDate)

    const dates=new Date(start.getTime());

    let date =[]

    while(dates<=end){
      date.push(new Date(dates).getTime())
      dates.setDate(dates.getDate() + 1)
    }
    return date
  }
 
  const alldates=getDatesInRange(date[0].startDate, date[0].endDate);

  const isAvailable=(roomNumber)=>{
    const isFound=roomNumber.unavailableDates.some((dates)=> alldates.includes(new Date(dates).getTime())
    );
    return !isFound
  }
 
  const handleSelect=(e)=>{
     const checked=e.target.checked
     const value=e.target.value
     setSelectedRoom(
      checked ? [...selectedRoom,value] : selectedRoom.filter((item)=> item !==value)

     )
  }
  const navigate=useNavigate()
  const [open, setOpen] = useState(false);
   const handleClick = async() => {
      try {
           await Promise.all(selectedRoom.map(roomId=>{
            const res=  axios.put(`/rooms/availability/${roomId}`,{dates:alldates});
            // console.log(res.data)
            return res.data  
           }))
           setOpen(false)
           navigate("/")

      } catch (error) {
        
      }
   }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => Props.setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
            <div className="rTitle">{item.title}</div>
            <div className="rDesc">{item.description}</div>
            <div className="rMax">Max People:<b>{item.maxPeople} </b>
            </div>
           <div className="rPrice">{item.price} </div>
           </div>
           <div className="rSelectRooms">
          { item.roomNumbers.map((roomNumber)=>(
             <div className="room">
              <label>{roomNumber.number}</label>
              <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)}></input>

             </div>
          ))}
          </div>
      </div>
        ))}
        <button onClick={handleClick} className="rButton">Reserve Now!</button>
      </div>
    </div>
  );
};

export default Reserve;
