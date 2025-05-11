'use client';
import React from 'react';

type InputFieldProps = {
  type: 'text' | 'email';
  name: string;
  label: string;
  value: string;
  required?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  position?: 'left' | 'right';
};

export const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  label,
  value,
  required,
  error,
  onChange,
  onBlur,
  className = '',
  inputRef,
  position,
}) => {
  const baseStyle =
    'relative z-1 peer w-full border border-[#EDEFF2] rounded-lg bg-white px-4 pb-2.5 pt-5.5 text-sm placeholder-transparent focus:border-[#73467B] focus:outline-none text-black';

  const edgeStyle =
    position === 'left'
      ? 'border-r-white rounded-r-none'
      : position === 'right'
        ? 'border-l-white rounded-l-none'
        : '';

  const inputClass = `${baseStyle} ${edgeStyle} ${className}`.trim();

  return (
    <div className='relative w-full'>
      <input
        ref={inputRef}
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder=' '
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      />
      <label
        htmlFor={name}
        className='absolute z-2 left-4 top-1.5 text-gray-500 text-sm transition-all pointer-events-none 
          peer-placeholder-shown:top-4.5 
          peer-placeholder-shown:text-sm 
          peer-placeholder-shown:text-gray-400 
          peer-focus:top-1.5 
          peer-focus:text-xs 
          peer-focus:text-[#73467B] 
          peer-not-placeholder-shown:top-1.5 
          peer-not-placeholder-shown:text-xs'
      >
        {label}
      </label>
      <p
        id={`${name}-error`}
        role='alert'
        aria-live='assertive'
        aria-hidden={!error}
        className={`inline-block absolute bottom-0 left-4 text-red-600 text-xs mt-1 ${
          error ? 'translate-y-4 opacity-100' : 'translate-y-0 opacity-0'
        } transition-all ease-out duration-300`}
      >
        {error || ' '}
      </p>
    </div>
  );
};
