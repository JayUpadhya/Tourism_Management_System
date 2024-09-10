import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import backgroundImage from '../../Salaryimages/5.jpg';

const CreateOrderFormRecoard = () => {
  const [customerName, setcustomerName] = useState('');
  const [selectCountry, setselectCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setemail] = useState('');
  const [billingAddress, setbillingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    // You can use the state variables like ownerName, address, phone, etc. to get form values
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case 'name':
        setCustomerName(value);
        break;
        case 'type':
          setSelectCountry(value);
          break;
          case 'Phone':
        setPhone(value);
        break;
        case 'email':
          setEmail(value);
          break;
      case 'BillingAddress':
        setBillingAddress(value);
        break;
    
      default:
        break;
    }
  };

  const handleSaveOrderForm = () => {
    const data = {
      customerName,
      selectCountry,
      phone,
      email,
      billingAddress
    };
    setLoading(true);
    axios
      .post('http://localhost:3001/api/orderform', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Order Form Created successfully', { variant: 'success' });
        navigate('/order-forms');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data && error.response.data.errors) {
          console.log(error);
        }
      });
  };

  return (
    <div className="min-h-screen mt-36 mb-10">
      <div className="flex justify-center items-center gap-2">
        <div className="hidden lg:block">
          <img className="w-[600px] h-[500px] ml-10 mt-6" src={backgroundImage} alt="" />
        </div>

        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <h2 className="text-3xl text-gray-800 font-serif">Fill the Order Form</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">CustomerName</h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="Name"
                  id="name"
                  onChange={handleInputChange}
                />
              </div>
              <select
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                id="type"
                onChange={handleInputChange}
              >
                <option value="">Select Country</option>
                <option value="america">America</option>
                <option value="australiya">Australiya</option>
                <option value="england">England</option>
              </select>
             
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Phone</h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="Phone"
                  id="Phone"
                  onChange={handleInputChange}
                />
              </div>

              

              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Email</h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="Pet Name"
                  id="petname"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Billing Address</h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="Address"
                  id="Address"
                  onChange={handleInputChange}
                />
              </div>

              <button
                className="bg-red-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
                type="submit"
                onClick={handleSaveOrderForm}
              >
                Submit
              </button>
            </form>

            {errorMessage && (
              <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderFormRecoard;
