import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  variant = 'single',
  searchable = false,
  disabled = false,
  error,
  label,
  required = false,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState(
    variant === 'multi' ? (Array.isArray(value) ? value : []) : value
  );
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };

  const handleSelect = (option) => {
    if (variant === 'multi') {
      const newSelectedValues = selectedValues.includes(option.value)
        ? selectedValues.filter(val => val !== option.value)
        : [...selectedValues, option.value];
      
      setSelectedValues(newSelectedValues);
      onChange?.(newSelectedValues);
    } else {
      setSelectedValues(option.value);
      onChange?.(option.value);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleRemoveTag = (valueToRemove, e) => {
    e.stopPropagation();
    const newSelectedValues = selectedValues.filter(val => val !== valueToRemove);
    setSelectedValues(newSelectedValues);
    onChange?.(newSelectedValues);
  };

  const getSelectedOption = () => {
    return options.find(option => option.value === selectedValues);
  };

  const getSelectedOptions = () => {
    return options.filter(option => selectedValues.includes(option.value));
  };

  const renderSelectedValue = () => {
    if (variant === 'multi') {
      const selected = getSelectedOptions();
      if (selected.length === 0) return placeholder;
      
      return (
        <div className="flex flex-wrap gap-1">
          {selected.map(option => (
            <span
              key={option.value}
              className="inline-flex items-center px-2 py-1 bg-primary-light text-primary-600 text-sm rounded-full"
            >
              {option.icon && <Icon name={option.icon} size={12} className="mr-1" />}
              {option.label}
              <button
                onClick={(e) => handleRemoveTag(option.value, e)}
                className="ml-1 hover:text-primary-700 focus:outline-none"
                aria-label={`Remove ${option.label}`}
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          ))}
        </div>
      );
    } else {
      const selected = getSelectedOption();
      if (!selected) return placeholder;
      
      return (
        <div className="flex items-center">
          {selected.icon && <Icon name={selected.icon} size={16} className="mr-2" />}
          {selected.label}
        </div>
      );
    }
  };

  const baseClasses = 'relative w-full border rounded-lg transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';
  const stateClasses = error
    ? 'border-danger focus-within:border-danger focus-within:ring-danger' :'border-border focus-within:border-primary';

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      <div ref={dropdownRef} className={`${baseClasses} ${stateClasses} ${className}`}>
        {/* Trigger */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className="w-full px-3 py-2 text-left bg-surface rounded-lg focus:outline-none disabled:cursor-not-allowed"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${props.id}-label` : undefined}
          {...props}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className={`${selectedValues && (variant === 'single' ? selectedValues : selectedValues.length > 0) ? 'text-text-primary' : 'text-text-tertiary'}`}>
                {renderSelectedValue()}
              </div>
            </div>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`text-text-tertiary transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-surface border border-border rounded-lg shadow-lg max-h-60 overflow-hidden">
            {/* Search Input */}
            {searchable && (
              <div className="p-2 border-b border-border">
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search options..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto" role="listbox">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-text-tertiary">
                  {searchable && searchTerm ? 'No options found' : 'No options available'}
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = variant === 'multi' 
                    ? selectedValues.includes(option.value)
                    : selectedValues === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option)}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 flex items-center justify-between ${
                        isSelected ? 'bg-primary-light text-primary-600' : 'text-text-primary'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="flex items-center">
                        {option.icon && (
                          <Icon name={option.icon} size={16} className="mr-2" />
                        )}
                        <span>{option.label}</span>
                        {option.description && (
                          <span className="ml-2 text-xs text-text-tertiary">
                            {option.description}
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <Icon name="Check" size={16} className="text-primary" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-danger flex items-center">
          <Icon name="AlertCircle" size={14} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;