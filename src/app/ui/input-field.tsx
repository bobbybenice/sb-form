'use client';
import React from 'react';

type InputFieldProps = {
  name: string;
  label: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  className = '',
}) => {
  return (
    <div className='relative w-full'>
      <input
        id={name}
        name={name}
        placeholder=' '
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`relative z-1 peer w-full border border-[#EDEFF2] ${
          name === 'firstName'
            ? 'border-r-white rounded-r-none'
            : name === 'lastName'
              ? 'border-l-white rounded-l-none'
              : ''
        } rounded-lg bg-white px-3 pt-5 pb-2 text-sm placeholder-transparent focus:border-[#73467B] focus:outline-none text-black ${className}`}
      />
      <label
        htmlFor={name}
        className='absolute z-2 left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#73467B]'
      >
        {label}
      </label>
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
