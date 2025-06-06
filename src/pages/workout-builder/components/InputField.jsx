import React from 'react';

const InputField = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error, 
  maxLength,
  type = 'text',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
          {maxLength && (
            <span className="text-xs text-text-tertiary ml-1">
              ({value.length}/{maxLength})
            </span>
          )}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-colors ${
          error 
            ? 'border-danger focus:border-danger focus:ring-danger' :'border-border focus:border-primary'
        }`}
        {...props}
      />
      {error && (
        <p className="text-danger text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;