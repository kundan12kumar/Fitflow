import React, { useState, forwardRef } from 'react';
import Icon from '../AppIcon';

const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error,
  helperText,
  required = false,
  icon,
  iconPosition = 'left',
  onIconClick,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e) => {
    onChange?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const baseInputClasses = 'w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const stateClasses = error
    ? 'border-danger focus:border-danger focus:ring-danger'
    : isFocused
    ? 'border-primary focus:border-primary focus:ring-primary' :'border-border focus:border-primary focus:ring-primary';

  const paddingClasses = icon && iconPosition === 'left' ?'pl-10' 
    : icon && iconPosition === 'right'|| type === 'password' ?'pr-10' :'';

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon 
              name={icon} 
              size={16} 
              className={error ? 'text-danger' : 'text-text-tertiary'} 
            />
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          className={`${baseInputClasses} ${stateClasses} ${paddingClasses} ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
          {...props}
        />

        {/* Right Icon or Password Toggle */}
        {(icon && iconPosition === 'right') || type === 'password' ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {type === 'password' ? (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-text-tertiary hover:text-text-secondary focus:outline-none focus:text-text-secondary"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            ) : (
              <div 
                className={onIconClick ? 'cursor-pointer' : 'pointer-events-none'}
                onClick={onIconClick}
              >
                <Icon 
                  name={icon} 
                  size={16} 
                  className={error ? 'text-danger' : 'text-text-tertiary'} 
                />
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Error Message */}
      {error && (
        <p id={`${props.id}-error`} className="text-sm text-danger flex items-center">
          <Icon name="AlertCircle" size={14} className="mr-1" />
          {error}
        </p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p id={`${props.id}-helper`} className="text-sm text-text-tertiary">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;