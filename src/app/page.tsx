'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { InputField } from './ui/input-field';
import { TextArea } from './ui/text-area';

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

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | ''>('');

  useEffect(() => {
    if (status !== '') {
      const timer = setTimeout(() => setStatus(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

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

    setLoading(true);
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus('success');
      setForm({ firstName: '', lastName: '', email: '', message: '' });
      setFormErrors({ firstName: '', lastName: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
    setLoading(false);
  };

  const isFormValid =
    Object.values(form).every((v) => v.trim() !== '') &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  return (
    <AnimatePresence mode='popLayout'>
      <motion.div className='flex justify-center items-center h-screen' layout>
        {status === '' ? (
          <motion.form
            key='form'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            layoutId='sb-form'
            onSubmit={handleSubmit}
            className='flex flex-col gap-5 max-w-[500px] mx-auto p-10 bg-[#F1ECF6] rounded-[10px]'
            noValidate
          >
            <motion.div
              className='flex'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <InputField
                name='email'
                label='Email *'
                value={form.email}
                error={formErrors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TextArea
                name='message'
                label='Message *'
                value={form.message}
                placeholder='Enter your message'
                error={formErrors.message}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </motion.div>
            <motion.p
              className='text-[#74777E] text-sm'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              For information about our privacy practices and commitment to
              protecting your privacy, please review our{' '}
              <a href='#' className='text-[#73467B] underline'>
                Privacy Policy
              </a>
              .
            </motion.p>
            <motion.button
              type='submit'
              className='bg-[#73467B] rounded-lg text-white px-4 py-2 leading-6.5 min-w-[9.25rem] self-start cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileTap={{ scale: 0.95 }}
              disabled={!isFormValid}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key='success'
            layoutId='sb-form'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='p-10 text-center bg-[#F1ECF6] rounded-[10px] max-w-[500px]'
          >
            <motion.h2
              className='text-2xl font-semibold text-[#73467B] mb-2'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {status === 'success' ? 'Thank you!' : 'Ouch!'}
            </motion.h2>
            <motion.p
              className='text-gray-700'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {status === 'success'
                ? 'Your message has been sent successfully.'
                : 'Something went wrong.'}
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
