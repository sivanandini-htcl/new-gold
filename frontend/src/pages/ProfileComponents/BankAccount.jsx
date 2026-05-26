import React, { useState } from 'react'
import { ArrowLeft ,Plus} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const BankAccount = () => {
  const navigate=useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  return (
    <div className='min-h-screen bg-background'>
      <div className="max-w-2xl mx-auto px-4 py-8">
       < button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-xs text-primary/70 hover:text-gray-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </button>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-serif text-primary">
              Bank Accounts
            </h2>
          
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#111112] hover:bg-gray-700 border border-white/20 text-white/70 text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
          >
            <Plus size={16} />
            Add Accounts
          </button>
          
        </div>
        <div className='flex flex-col border border-white/20 rounded-2xl p-3'>
          <span>
           Acc No: 123456890
          </span>
          <span> Bank name:canara  </span>
         <span> ifsc code:ABCD12340</span>
         <span></span>
         </div>       
      </div>
       

        
    </div>
  )
}

export default BankAccount