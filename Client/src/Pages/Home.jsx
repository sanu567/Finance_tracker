import React, { useContext, useEffect, useState } from 'react';
import { Appcontent } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { backendUrl, setIsloggedin } = useContext(Appcontent);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/transaction/get-list`, {
        withCredentials: true
      });
      if (data.success) {
        setTransactions(data.t);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const TransactionHandler = async (e) => {
    e.preventDefault();

    if (!name || !amount || !type) {
      toast.error('All fields are required');
      return;
    }

    if (isNaN(amount)) {
      toast.error('Amount must be a number');
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/transaction/create`,
        { name, amount, type },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        setTransactions((prev) => [data.populated, ...prev]);
        setName('');
        setAmount('');
        setType('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const Logout = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      if (data.success) {
        setIsloggedin(false);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

 const Delete = async (id) => {
  try {
    const { data } = await axios.delete(`${backendUrl}/api/transaction/${id}`, {
      withCredentials: true,
    });

    if (data.success) {
      // Update the state to remove the deleted transaction
      setTransactions((prev) => prev.filter((t) => t._id !== id));
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  return (
    <div className="bg-green-300 min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4">
        <h2 className="font-medium italic text-2xl text-red-700">Personal Finance</h2>
        <button onClick={Logout} className="border-double border-4 border-sky-500 rounded-full bg-amber-600 text-white p-2 cursor-pointer">
          Logout
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center mt-3">
        {/* Form */}
        <div className="border-2 border-black rounded-2xl shadow-xl p-6 w-fit bg-white">
          <form onSubmit={TransactionHandler}>
            <div className="mb-4">
              <label className="block text-xl italic mb-1">Transactions name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-2xl w-72 h-8 px-3"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xl italic mb-1">Amount</label>
              <input
                type="text"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-2xl w-72 h-8 px-3"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xl italic mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="rounded-2xl w-72 h-8 px-3"
              >
                <option value="" disabled>Select type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="mt-2 bg-blue-600 text-white rounded-full px-6 py-1 hover:bg-blue-700">
                Add Transaction
              </button>
            </div>
          </form>
        </div>

        {/* Transaction List */}
        <div className="w-full max-w-2xl px-5 py-4 bg-slate-100 mt-10 rounded shadow">
          <h2 className="text-3xl mb-5 text-center">Transactions</h2>

          <div className="grid grid-cols-4 font-semibold text-xl border-b-2 border-gray-400 pb-2">
            <div className="text-center">Date</div>
            <div className="text-center">Transactions name</div>
            <div className="text-center">Amount</div>
            <div className="text-center">Type</div>
          </div>

          <ul className="grid grid-cols-4 text-center gap-y-2 mt-4">
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <React.Fragment key={t._id}>
                  <li>
                    {new Date(t.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </li>
                  <li>{t.name || t.category?.name || 'Unnamed'}</li>
                  <li className={t.type === 'expense' ? 'text-red-500' : 'text-green-500'}>
                    {t.type === 'expense' ? '-' : '+'}₹{t.amount}
                  </li>
                  <li>{t.type} <button onClick={()=>Delete(t._id)} className='ml-4 bg-red-600 rounded-md p-1 text-sm'>Delete</button></li>
                </React.Fragment>
              ))
            ) : (
              <div className="col-span-4 text-center text-gray-500">No transactions</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
