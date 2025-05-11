'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { InputField } from './ui/input-field';
import { TextArea } from './ui/text-area';
import { validateField } from './utils/validators';

const motionProps = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

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

  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | ''>('');

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
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

    if (loading) return;

    const errors = Object.entries(form).reduce(
      (acc, [key, value]) => {
        acc[key as keyof typeof form] = validateField(key, value);
        return acc;
      },
      {} as typeof formErrors
    );

    setFormErrors(errors);

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    setLoading(true);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) {
        setForm({ firstName: '', lastName: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    Object.values(form).every((v) => v.trim() !== '') &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);

  return (
    <AnimatePresence>
      <motion.div
        className='flex justify-center items-center h-screen px-4 lg:px-0'
        layout
      >
        {status === '' ? (
          <motion.form
            key='form'
            layoutId='sb-form'
            onSubmit={handleSubmit}
            className='flex flex-col gap-5 max-w-[500px] mx-auto p-6 lg:p-10 bg-[#F1ECF6] rounded-[10px]'
            noValidate
            {...motionProps}
          >
            <motion.div
              className='flex'
              {...motionProps}
              transition={{ delay: 0.1 }}
            >
              <InputField
                type='text'
                name='firstName'
                label='First name *'
                value={form.firstName}
                required
                error={formErrors.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                inputRef={firstFieldRef}
                position='left'
              />
              <InputField
                type='text'
                name='lastName'
                label='Last name *'
                value={form.lastName}
                required
                error={formErrors.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                position='right'
              />
            </motion.div>

            <motion.div {...motionProps} transition={{ delay: 0.2 }}>
              <InputField
                type='email'
                name='email'
                label='Email *'
                value={form.email}
                required
                error={formErrors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </motion.div>

            <motion.div {...motionProps} transition={{ delay: 0.3 }}>
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
              {...motionProps}
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
              disabled={!isFormValid || loading}
              whileTap={{ scale: 0.95 }}
              {...motionProps}
              transition={{ delay: 0.5 }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key='feedback'
            layoutId='sb-form'
            className='p-10 text-center bg-[#F1ECF6] rounded-[10px] max-w-[500px]'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-live='polite'
            role='status'
          >
            <motion.h2
              className='text-2xl font-semibold text-[#73467B] mb-2'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {status === 'success' ? 'Thank you!' : 'Ouch!'}
            </motion.h2>
            <motion.p
              className='text-gray-700 text-sm'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
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
