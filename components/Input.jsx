/**************************************************************
This component is utilized in certain personal projects;
However, it remains unfinished, which is why it lacks comments
at this time.
**************************************************************/

'use client';

import { useState, useEffect } from 'react';

const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

export default function Input({
    id,
    className,
    name,
    type = "text",
    label,
    onChange,
    size = "md",
    initialValue,
    disabled,
    options,
    getOptionInfo,
    isSearchable,
    required
}) {

    const [value, setValue] = useState(initialValue);
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);
    let sizes;
    if (size == "sm") {
        sizes = {
            base: "h-8 p-1.5 text-sm",
            labelSelected: "-top-1.5 text-xs px-1",
            labelUnselected: "top-1.5 text-sm",
        }
    } else if (size == "md") {
        sizes = {
            base: "h-10 p-2",
            labelSelected: "-top-2 text-xs px-1",
            labelUnselected: "top-2 text-base",
        }
    } else if (size == "lg") {
        sizes = {
            base: "h-12 p-3 text-xl",
            labelSelected: "-top-3 text-sm px-1",
            labelUnselected: "top-2.5 text-xl pl-1 ",
        }
    }

    const handleInputChange = (e) => {
        let newValue = e.target.value;

        if (type === "currency") {
            newValue = newValue.replace(/[^0-9.]/g, '');
        }

        setValue(newValue);
        onChange({ target: { name, value: newValue } });
    };
    const htmlFor = id || name || `input_${generateId()}`;

    const [isFocused, setIsFocused] = useState(false);
    const commonAttributes = {
        id: htmlFor,
        type: type,
        name: name,
        value: value || '',
        onChange: handleInputChange,
        onFocus: () => setIsFocused(true),
        onBlur: () => isSearchable ? "" : setIsFocused(false),
        className: "w-full outline-none border rounded transition " + sizes.base + (isFocused ? " border-blue-500" : " border-gray-300"),
        outline: "none",
        disabled: disabled,
        required: required
    };

    let correctLabel = (type == "datetime-local" || options > 0 || type == "file" || type == "date") ? true : false;
    let input = (<input {...commonAttributes}  />);

    if (isSearchable && options && options.length > 0) {
        input = (
            <div onMouseLeave={() => setIsFocused(false)}
                onClick={() => setIsFocused(true)}
                className="z-4"
            >
                <input {...commonAttributes}
                    autoComplete="off"
                />
                <div className={"absolute top-full left-0 w-full bg-white border border-gray-300 rounded max-h-60 overflow-y-auto transition-all z-10 " +
                    (isFocused ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}
                >
                    {options.filter(option => option.name.toLowerCase().includes((value || '').toLowerCase())).map((option) => {
                        return <div
                            key={option.id}
                            className={"p-2  transition cursor-pointer" +
                                (isFocused && !option.disabled ? " pointer-events-auto" : " pointer-events-none") +
                                (option.disabled ? " opacity-60 bg-gray-100" : " hover:bg-gray-200")}
                            onClick={() => {
                                if (option.disabled) return;
                                handleInputChange({ target: { value: option.name } });
                                setIsFocused(false);
                                getOptionInfo ? getOptionInfo(option) : "";
                            }}
                        >
                            {option.id} - {option.name}
                        </div>
                    }
                    )}
                </div>
                <div className='absolute right-1 top-1 p-2 bg-white z-2'
                    onClick={() => {
                        setTimeout(() => {
                            setValue("")
                            setIsFocused(false);
                        }, 0);
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2L8 8L2 2" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 14L8 8L14 14" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        );
    } else if (options && options.length > 0) {
        input = (<select {...commonAttributes}>
            <option key="padrao"
                value=""
                disabled
            >Selecione uma opção</option>

            {options.map((option) => (
                <option key={option.id}
                    value={option.id}

                    disabled={option.disabled}>
                    {option.name}
                </option>
            ))}
        </select>);

        correctLabel = true;
    } else if (type == "textarea") {
        input = (<>
            <textarea {...commonAttributes}
                style={{
                    minHeight: "80px",
                    paddingTop: "45px",
                    backgroundColor: "white"
                }}
            />
            <div className={'w-full h-10 border-b absolute top-0 flex flex-row gap-5 justify-start items-center pl-4 child:h-6 child:min-w-3  ' +
                (isFocused ? "border-blue-500" : "border-b-gray-300")}
            >
                <div className='font-bold'>B</div>
                <div className='italic'>I</div>
                <div className='underline'>U</div>

                <div>{/* Separator */}</div>

                <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 18H9V16H4V18ZM4 11V13H14V11H4ZM4 6V8H19V6H4Z" fill="#312F2F" /></svg></div>
                <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 18H14.5V16H9.5V18ZM7 11V13H17V11H7ZM4.5 6V8H12H19.5V6H4.5Z" fill="#312F2F" /></svg></div>
                <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 18H21V16H16V18ZM11 11V13H16H21V11H11ZM6 6V8H13.5H21V6H6Z" fill="#312F2F" /></svg></div>
                <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 18H19V16H4V18ZM4 11V13H19V11H4ZM4 6V8H19V6H4Z" fill="#312F2F" /></svg></div>

                <div>{/* Separator */}</div>
            </div>
        </>);
        correctLabel = true;
    }

    return <div className={`relative h-full ${!className || !className.includes("w-") ? "w-full" : ""} ${className}`} name={value}>

        {input}
        <label htmlFor={htmlFor} style={{ zIndex: 1 }}
            className={'absolute left-2 transition-all bg-white whitespace-nowrap ' +
                ((isFocused || value || correctLabel) ? (sizes.labelSelected + ' cursor-default') : (sizes.labelUnselected + ' cursor-text')) +
                ((isFocused) ? ' text-blue-300' : ' text-gray-400')
            }
        >
            {label}
        </label>
    </div>

}
