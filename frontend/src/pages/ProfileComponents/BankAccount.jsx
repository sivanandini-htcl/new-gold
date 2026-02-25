import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
function BankAccount(){

     const[isEditing,setIsEditing]=useState(false)
     const[formData,setFormData]=useState({
       accountNumber:"",
       confirmAccount:"",
       IFSC_Code:"",
       branchName:"",
       accountHolder:"",
    })
     const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormData((prev)=>({
            ...prev,[name]:value,
        }));

     };
     const handleSave=()=>{
        console.log("data saved",formData)
        toast.success("data saved")
     }
    return(<>
    <div className=" grid grid-cols-1 min-h-screen w-full bg-white justify-center items-center">

        <div className=" flex  text-black m-2 p-3 gap-1 w-full">
            <label > Account Number:</label>
            {isEditing?(
                <input className="border border-gray-600 " 
        type="text" name="accountNumber" value={formData.accountNumber} placeholder="Account Number"
         onChange={handleChange}/>
            ):(<p>{formData.accountNumber}</p>)}
        </div>

        <div className=" flex  text-black m-2 p-2 gap-1">
            <label >Confirm Account Number:</label>
            <input className="border border-gray-600 " 
        type="text" name="confirmAccount" value={formData.confirmAccount} placeholder=" Confirm Account Number"
        onChange={handleChange}/>
        </div>

        <div className=" flex  text-black m-2 p-4 gap-2">
            <label >IFSC :</label>
            <input className="border border-gray-600 grid grid-cols-2" 
        type="text" name="IFSC_Code" value={formData.IFSC_Code} placeholder="IFSC" onChange={handleChange}/>
        </div>

        <div className=" flex  text-black m-2 p-4 gap-2">
            <label >Branch Name:</label>
            <input className="border border-gray-600 grid grid-cols-2" 
        type="text" name="branchName" value={formData.branchName} placeholder="Branch Name" onChange={handleChange}/>
        </div>
     
        <div className="flex text-black m-2 p-4 gap-2">
            <label>Account Holder:</label>
            <input className="border border-gray-600 grid grid-cols-2"
            type="text" name="accountHolder" value={formData.accountHolder} placeholder="Account Number" 
            onChange={handleChange}/>
        </div>

<div className="text-black flex gap-2"> 

    {!isEditing?(<>
    <button onClick={handleSave} className="border border-accent">
        edit
    </button>

    <button> cancel</button>
    </>):<>
    <button>save</button></>}
    
</div> 
    </div>

    </>);
}export default BankAccount; 