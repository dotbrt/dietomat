import { useContext, useState } from 'react';
import { DataContext } from '../context/data-context';

// interface UserInputProps {
//     onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
//     handleChange: (data: {
//         gender?: string;
//         weight?: number;
//         age?: number;
//         height?: number;
//         goal?: string;
//         activity?: string;
//     }) => void;
// }
export default function UserInput({ handleChange, onSubmit, isLoading }) {


    return (
        <>
            <form onSubmit={onSubmit} className="flex flex-col form-control gap-3 items-center">
                {/* <textarea value={inputData} onChange={handleInputChange} required className="textarea textarea-bordered text-lg" rows={5} placeholder="Enter text here..." /> */}
                <label className="input-group input-group-horizontal label-input">
                    <span className='justify-center span-input w-1/3'>👫 Płeć</span>
                    <select value={handleChange.gender} defaultValue={'default'} className="select select-bordered field-input w-2/3" onChange={handleChange} name="gender">
                        <option value="default" disabled>Wybierz płeć</option>
                        <option value={'mężczyzną'}>Mezczyzna</option>
                        <option value={'kobietą'}>Kobieta</option>
                    </select>
                </label>
                <label className="input-group input-group-horizontal label-input">
                    <span className='w-1/3 justify-center'>
                        ⚖️ Waga
                    </span>
                    <select value={handleChange.weight} defaultValue={'default'} className="select select-bordered field-input w-2/3" onChange={handleChange} name='weight' required>
                        <option value='default' disabled>Wybierz wagę</option>
                        {Array.from(Array(111).keys()).map((i) => (
                            <option key={i} value={i + 40}>{i + 40}</option>
                        ))}
                    </select>
                </label>
                <label className="input-group input-group-horizontal label-input">
                    <span className='w-1/3 justify-center'>
                        📆 Wiek
                    </span>
                    <select value={handleChange.age} defaultValue={'default'} className="select select-bordered field-input" onChange={handleChange} name='age' required>
                        <option value='default' disabled>Wybierz wiek</option>
                        {Array.from(Array(82).keys()).map((i) => (
                            <option key={i} value={i + 18}>{i + 18}</option>
                        ))}
                    </select>
                </label>
                <label className='input-group input-group-horizontal label-input' htmlFor="height">
                    <span className='w-1/3 justify-center'>
                        🕴️ Wzrost
                    </span>
                    <select value={handleChange.height} defaultValue={'default'} className="select select-bordered field-input" onChange={handleChange} name='height' required>
                        <option value='default' disabled>Wybierz wzrost</option>
                        {/* create a list of options from 100 to 220 */}
                        {Array.from(Array(121).keys()).map((i) => (
                            <option key={i} value={i + 100}>{i + 100}</option>
                        ))}
                    </select>
                </label>
                <label className="input-group input-group-horizontal label-input">
                    <span className='w-1/3 justify-center'>
                        🎯 Cel
                    </span>
                    <select value={handleChange.goal} defaultValue={'default'} className="select select-bordered field-input" required name="goal" onChange={handleChange}>
                        <option value="default" disabled>Wybierz cel</option>
                        <option>Zmniejszenie masy ciała</option>
                        <option>Utrzymanie wagi</option>
                        <option>Zwiększenie masy mięśniowej</option>
                    </select>
                </label>
                <label className="input-group input-group-horizontal label-input">
                    <span className='w-1/3 justify-center'>
                        🤸 Ruch
                    </span>
                    <select value={handleChange.activity} defaultValue={'default'} className="select select-bordered field-input" id="activity" name="activity" required onChange={handleChange}>
                        <option value={'default'} disabled>Wysiłek wizyczny</option>
                        <option>Nie aktywny</option>
                        <option>Mało aktywny</option>
                        <option>Średnio aktywny</option>
                        <option>Bardzo aktywny</option>
                    </select>
                </label>
                <button type="submit" className="btn btn-primary w-48" disabled={isLoading}>Submit</button>
            </form>
            {/* <div className="mt-4">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={useDummyData} onChange={handleToggleDummyData} className="form-checkbox h-5 w-5 text-blue-600" />
                    <span className="text-gray-700 text-lg font-medium">Use dummy data</span>
                </label>
            </div> */}
        </>
    );
};
