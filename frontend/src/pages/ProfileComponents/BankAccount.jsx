import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus, X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useBankAccountStore from '../../store/bankAccountStore';

const BankAccount = () => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    bankAccounts,
    loading,
    addBankAccount,
    getBankAccounts,
    deleteBankAccount,
    verifyBankAccount,
  } = useBankAccountStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isDefault: false,
    },
  });

  const accountNumber = watch('accountNumber');
  const isDefault = watch('isDefault');

  useEffect(() => {
    getBankAccounts();
  }, []);

  const fields = [
    {
      name: 'accountHolderName',
      label: 'Account Holder Name',
    },
    {
      name: 'accountNumber',
      label: 'Account Number',
    },
    {
      name: 'confirmAccountNumber',
      label: 'Confirm Account Number',
    },
    {
      name: 'ifscCode',
      label: 'IFSC Code',
    },
    {
      name: 'bankName',
      label: 'Bank Name',
    },
  ];

  const onSubmit = async (data) => {
    const res = await addBankAccount(data);

    if (res.success) {
      const accountId = res.data.data.id;

      await verifyBankAccount(accountId);

      getBankAccounts();

      setSaved(true);

      setTimeout(() => {
        setSaved(false);

        setShowModal(false);

        reset();
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl w-full p-3 bg-background">
      <div className="">
        {/* Header */}   
           <div className=" px-2 py-4 backdrop-blur-[20px] sm:px-6 sm:py-5">
       
        <Link
        to="/profile"
        className="inline-flex items-center 2xl:text-xl gap-2 mb-6 text-xs  uppercase tracking-widest text-primary/60 hover:text-yellow-600 transition font-['Fraunces']"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Profile
      </Link>
      
      {/* Title */}
      <div className="mb-2 border-b border-yellow-700/20 pb-6 font-['Fraunces']">
        <div className="h-0.5 w-12  bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-3"></div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-['Fraunces'] text-primary p-2">
         Bank Details
        </h1>
        <p className="mt-2 text-xs 2xl:text-xl  uppercase tracking-widest text-primary/50 font-['Fraunces'] pl-3">
          24K · 99.9% Pure · Live Rates
        </p>
      </div> 
        </div>       
       

  <div className="max-w-2xl mx-auto px-4 py-8">
         <div className='flex items-end justify-end'>
      <button
            onClick={() => setShowForm(true)}
            className="flex  whitespace-nowrap mb-3 justify-end  bg-[#111112] hover:bg-gray-700 border border-white/20 text-white/70 text-xs md:text-sm font-semibold px-1 py-2.5 rounded-xl shadow-sm transition-colors"
          >
            <Plus size={16} />
            Add Account
          </button>
          </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-white/60 py-10 gap-3 flex flex-col">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-50 w-ful bg-secondary/7 rounded-2xl" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && bankAccounts.length === 0 && (
          <div className="border border-dashed border-white/20 rounded-2xl p-8 text-center text-white/50">
            No bank accounts added
          </div>
        )}

        {/* Accounts List */}
        <div className="space-y-4">
          {Array.isArray(bankAccounts) &&
            bankAccounts.map((item) => (
              <div key={item.id} className="border border-white/10 rounded-2xl p-5 bg-white/5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-white font-medium">{item.accountHolderName}</p>

                    <p className="text-sm text-white/70">Acc No: {item.accountNumber}</p>

                    <p className="text-sm text-white/70">Bank: {item.bankName}</p>

                    <p className="text-sm text-white/70">IFSC: {item.ifscCode}</p>

                    {item.isDefault && (
                      <span className="inline-block text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full mt-2">
                        Default Account
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => deleteBankAccount(item.id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="bg-[#111117] border border-white/10 rounded-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
              {/* Close */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <X size={22} />
              </button>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Add Bank Account</h2>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs text-white/70 mb-2">{field.label}</label>

                      <input
                        type="text"
                        placeholder={`Enter ${field.label}`}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30"
                        {...register(field.name, {
                          required: `${field.label} is required`,
                          validate:
                            field.name === 'confirmAccountNumber'
                              ? (value) => value === accountNumber || 'Account numbers do not match'
                              : undefined,
                        })}
                      />

                      {errors[field.name] && (
                        <p className="text-red-500 text-xs mt-1">{errors[field.name].message}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Default Toggle */}
                <div className="mt-6 flex items-center justify-between border border-white/10 rounded-xl px-4 py-4">
                  <div>
                    <p className="text-white text-sm font-medium">Set as Default Account</p>

                    <p className="text-white/50 text-xs mt-1">
                      This account will be used as primary bank account
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setValue('isDefault', !isDefault)}
                    className={`w-14 h-7 rounded-full flex items-center px-1 transition-all duration-300 ${
                      isDefault ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                        isDefault ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Hidden Input */}
                <input type="hidden" {...register('isDefault')} />

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-xs px-5 py-2.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/5"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="text-xs px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div></div>
  );
};

export default BankAccount;
