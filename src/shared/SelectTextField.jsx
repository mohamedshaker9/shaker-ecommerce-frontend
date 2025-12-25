import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Fragment } from 'react';
import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa';

function SelectTextField({selected, setSelected, options, label}) {

    console.log("SelectTextField options:", options);
    console.log("SelectTextField selected:", selected);
    return (
      
        <Field className='w-full flex flex-col gap-1'>

            <Label >{label}*</Label>
            <Listbox value={selected} onChange={setSelected}>
                <ListboxButton 
                    className='bg-white text-left w-full p-2 border border-blue-300'>
                    {selected?.name}
                </ListboxButton>
                 <ListboxOptions 
                 transition
                 className='border border-blue-300 mt-1 max-h-50 overflow-auto'>
                    {options?.map((option) => (
                    <ListboxOption key={option.id} value={option} as={Fragment}>
                        {({ focus, selected }) => (
                        <div className={clsx('flex items-center gap-3', focus && 'bg-blue-100')}>
                            <FaCheck className={clsx('size-4 ml-2',!selected && 'invisible')} />
                            {option.name}
                        </div>
                        )}
                    </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </Field>
    );
}

export default SelectTextField;