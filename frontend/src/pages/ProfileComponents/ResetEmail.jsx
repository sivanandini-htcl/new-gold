import React from 'react'
import { useState } from 'react';

const ResetEmail = ({onClose}) => {

  const [newEmail,setNewEmail]=useState('')
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
                <div className="bg-[#111117] rounded-2xl shadow-xl w-[90%] max-w-md p-6">
                <div>
                <h2 className="text-2xl font-serif text-white/70 mb-2">Reset Email</h2>
                <p className="text-gray-500 mb-4">
                  Enter your new email address to receive otp .
                </p>
                <input
                  type="email"
                  placeholder="New Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end gap-3 mt-6">
                  <button
                   onClick={onClose}
                    className="px-4 py-2 rounded-lg font-serif bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-primary text-background font-serif hover:bg-primary/60">                
                  <div className='whitespace-nowrap'>
                    Reset Email
                  </div>
                  </button>
                </div>
              </div>
              </div>
               </div>
  )
}

export default ResetEmail