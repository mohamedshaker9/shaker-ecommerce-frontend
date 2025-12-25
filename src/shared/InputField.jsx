import { useForm } from "react-hook-form";



function InputField ({
    id,
    label,
    type,
    errors,
    register,
    required,
    message,
    className,
    minLength,
    value,
    placeholder,
    step,
    textarea = false
})  

{
    return (
        <div className={`form-group ${className || ""}`}>
          <div className="flex flex-col  gap-1 items-start">
          {label && (
            <label htmlFor={id} className="form-label">
              {label}
              {required && <span className="text-danger">*</span>}
            </label>
          )}

          {!textarea ? (
          <input
            id={id}
            type={type || "text"}
            placeholder={placeholder}
            value={value}
           {...(step && { step })}
            className={`form-control w-full border border-blue-500 p-2 ${errors?.[id] ? "is-invalid" : ""}`}
            {...register(id,
               (type === "number" && { valueAsNumber: true })
              ,{
                    required: required
                        ? { value: true, message: message || `${label} is required` }
                        : false,
                    minLength: minLength
                        ? {
                            value: minLength,
                            message:
                            message || `Minimum characters for ${label} is ${minLength}`,
                        }
                        : undefined,
                    ...(type === "email"
                        ? {
                            pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: `${label} must be a valid email address`,
                            },
                        }
                        : {}),
             })}
          />
            ) : (
            <textarea
                id={id}
                placeholder={placeholder}
                className={`form-control w-full border border-blue-500 p-2 ${errors?.[id] ? "is-invalid" : ""}`}
                {...register(id,
                  {
                    required: required
                        ? { value: true, message: message || `${label} is required` }
                        : false,
                    minLength: minLength
                        ? {
                            value: minLength,
                            message:
                            message || `Minimum characters for ${label} is ${minLength}`,
                        }
                        : undefined,
                    ...(type === "email"
                        ? {
                            pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: `${label} must be a valid email address`,
                            },
                        }
                        : {}),
             })}
            />
            )}
        
          {errors?.[id] && (
            <div className="invalid-feedback d-block text-red-500">
              {errors[id].message}
            </div>
          )}
          </div>
        </div>
      );
};

export default InputField;