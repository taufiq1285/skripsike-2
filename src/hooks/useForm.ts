/**
 * useForm Hook - AKBID Lab System
 * Security: Form validation, input sanitization
 * Status: Ready for implementation
 */
import { useState, useCallback } from 'react';

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
  onSubmit: (values: T) => Promise<void> | void;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setValue = useCallback((name: keyof T, value: any) => {
    // SECURITY: Sanitize input values
    const sanitizedValue = typeof value === 'string' ? value.trim() : value;
    
    setValues(prev => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    // Clear error when value changes
    if (errors[name as string]) {
      setErrors(prev => ({
        ...prev,
        [name as string]: '',
      }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((name: keyof T) => {
    setTouched(prev => ({
      ...prev,
      [name as string]: true,
    }));
  }, []);

  const validateForm = useCallback(() => {
    if (!validate) return true;

    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle submission error
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const getFieldProps = useCallback((name: keyof T) => ({
    value: values[name] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValue(name, e.target.value);
    },
    onBlur: () => setFieldTouched(name),
    error: touched[name as string] ? errors[name as string] : undefined,
  }), [values, errors, touched, setValue, setFieldTouched]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleSubmit,
    reset,
    getFieldProps,
    isValid: Object.keys(errors).length === 0,
  };
};
