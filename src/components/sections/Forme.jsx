import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmailForMsg } from '../../redux/reviewSlice.jsx/sendMsgEmail';
import toast from 'react-hot-toast';

const ContactForm = () => {
  let [formData,setFormData]=useState({
    email:"",
    name:"",
    phone:"",
    comment:""
  })
  let {isLoading}=useSelector((state)=>state.sendMsgEmail)
  console.log(isLoading);
  
  let dispatch=useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(sendEmailForMsg(formData)).then((res)=>{
      console.log(res);
      
      if (res?.payload?.success) {
        setFormData({
          email:"",
          name:"",
          phone:"",
          comment:""
        })
        return toast.success(res.payload?.message)
      }
      
    })
    
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 opacity-0 animate-fade-in">
      <h1 className="text-3xl text-center mb-8">Contact Form</h1>
      <p className='my-5 text-2xl'>Have you got a question? Contact us!</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
          onChange={(e)=>{setFormData({...formData,name:e.target.value})}}
          value={formData.name}
            type="text"
            required
            placeholder="Name *"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-black opacity-0 animate-fade-slide-up"
            style={{ animationDelay: '200ms' }}
          />
          
          <input
          onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
            type="email"
            value={formData.email}
            placeholder="Email *"
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-black opacity-0 animate-fade-slide-up"
            style={{ animationDelay: '400ms' }}
          />
        </div>

        <input
          type="tel"
          onChange={(e)=>{setFormData({...formData,phone:e.target.value})}}
          value={formData.phone}
          placeholder="Phone number"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-black opacity-0 animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        />

        <textarea
        onChange={(e)=>{setFormData({...formData,comment:e.target.value})}}
        value={formData.comment}
        required
          placeholder="Comment *"
          rows={4}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-black resize-y opacity-0 animate-fade-slide-up"
          style={{ animationDelay: '800ms' }}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 opacity-0 animate-fade-slide-up disabled:bg-slate-400 disabled:cursor-not-allowed"
          style={{ animationDelay: '1000ms' }}
          
        >
          Send
        </button>
      </form>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-fade-slide-up {
          animation: fade-slide-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;