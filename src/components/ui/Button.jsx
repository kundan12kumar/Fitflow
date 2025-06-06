import React from 'react';
import Icon from '../AppIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary shadow-sm',
    secondary: 'bg-gray-100 text-text-primary hover:bg-gray-200 focus:ring-gray-500 border border-border',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-primary hover:bg-primary-light focus:ring-primary',
    icon: 'text-text-secondary hover:text-text-primary hover:bg-gray-100 focus:ring-primary rounded-lg',
    danger: 'bg-danger text-white hover:bg-red-600 focus:ring-danger shadow-sm'
  };

  const sizeClasses = {
    small: variant === 'icon' ? 'p-1.5' : 'px-3 py-1.5 text-sm',
    medium: variant === 'icon' ? 'p-2' : 'px-4 py-2 text-sm',
    large: variant === 'icon' ? 'p-3' : 'px-6 py-3 text-base'
  };

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Icon name="Loader2" size={16} className="animate-spin" />
          {variant !== 'icon' && <span className="ml-2">Loading...</span>}
        </>
      );
    }

    if (variant === 'icon' && icon) {
      return <Icon name={icon} size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />;
    }

    return (
      <>
        {icon && iconPosition === 'left' && (
          <Icon name={icon} size={16} className={children ? 'mr-2' : ''} />
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <Icon name={icon} size={16} className={children ? 'ml-2' : ''} />
        )}
      </>
    );
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      aria-disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;