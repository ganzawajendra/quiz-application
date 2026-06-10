import React from 'react'

const FormInput = ({ type, placeholder, onChange, name, className, required, label }) => {
    return (
        <div className='relative z-0 w-full group'>
            <label htmlFor={name} className="block mb-2 text-xs uppercase font-semibold text-[var(--accent-dark)]">{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                className={`w-full bg-transparent border border-[var(--border)] px-3 py-3 rounded-md ${className}`} />
        </div>
    )
}

export default FormInput