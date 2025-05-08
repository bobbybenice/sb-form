'use client';
import React from 'react';

type TextAreaProps = {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  value,
  placeholder,
  error,
  onChange,
  onBlur,
}) => {
  return (
    <div className='relative w-full'>
      <label htmlFor='message' className='text-black text-sm'>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className='relative z-1 block w-full h-[9.5rem] border border-[#EDEFF2] rounded-lg bg-white px-3 pt-4 pb-2 text-sm focus:border-[#73467B] focus:outline-none text-black mt-1.5'
      />
      <p
        className={`inline-block absolute bottom-0 left-3 text-red-600 text-xs mt-1 ${
          error ? 'translate-y-4 opacity-100' : 'translate-y-0 opacity-0'
        } transition-all ease-out duration-300`}
      >
        {error || ' '}
      </p>
    </div>
  );
};
