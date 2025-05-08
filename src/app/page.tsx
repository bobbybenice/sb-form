'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { InputField } from './ui/input-field';

export default function HomePage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'firstName' && !value.trim())
      error = 'First name is required.';
    if (name === 'lastName' && !value.trim()) error = 'Last name is required.';
    if (name === 'email') {
      if (!value.trim()) error = 'Email is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = 'Enter a valid email address.';
    }
    if (name === 'message' && !value.trim()) error = 'Message is required.';
    return error;
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      firstName: validateField('firstName', form.firstName),
      lastName: validateField('lastName', form.lastName),
      email: validateField('email', form.email),
      message: validateField('message', form.message),
    };

    setFormErrors(errors);
    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    setStatus('Sending...');
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus('Email sent!');
      setForm({ firstName: '', lastName: '', email: '', message: '' });
      setFormErrors({ firstName: '', lastName: '', email: '', message: '' });
    } else {
      setStatus('Failed to send.');
    }
  };

  const renderError = (field: keyof typeof formErrors) => (
    <AnimatePresence mode='wait'>
      {formErrors[field] && (
        <motion.p
          key={field}
          className='text-red-600 text-xs mt-1 absolute bottom-0 left-3'
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 16 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {formErrors[field]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  const isFormValid =
    Object.values(form).every((v) => v.trim() !== '') &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  return (
    <div className='flex justify-center items-center h-screen'>
      <form
        key='sb-form'
        onSubmit={handleSubmit}
        className='flex flex-col gap-5 max-w-[500px] mx-auto p-10 bg-[#F1ECF6] rounded-[10px]'
        noValidate
      >
        <div className='flex'>
          <InputField
            name='firstName'
            label='First name *'
            value={form.firstName}
            error={formErrors.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputField
            name='lastName'
            label='Last name *'
            value={form.lastName}
            error={formErrors.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <InputField
          name='email'
          label='Email *'
          value={form.email}
          error={formErrors.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className='relative w-full'>
          <label htmlFor='message' className='text-black text-sm'>
            Message *
          </label>
          <textarea
            name='message'
            id='message'
            placeholder='Enter your message'
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className='relative z-1 block w-full h-32 border border-[#EDEFF2] rounded-lg bg-white px-3 pt-5 pb-2 text-sm focus:border-[#73467B] focus:outline-none text-black'
          />
          {renderError('message')}
        </div>
        <p className='text-[#74777E] text-sm'>
          For information about our privacy practices and commitment to
          protecting your privacy, please review our{' '}
          <a href='#' className='text-[#73467B] underline'>
            Privacy Policy
          </a>
          .
        </p>
        <motion.button
          type='submit'
          className='bg-[#73467B] rounded-lg text-white px-4 py-2 self-start cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed'
          whileTap={{ scale: 0.95 }}
          disabled={!isFormValid}
        >
          Send Message
        </motion.button>
        {status && <p className='text-sm mt-2'>{status}</p>}
      </form>
    </div>
  );
}
