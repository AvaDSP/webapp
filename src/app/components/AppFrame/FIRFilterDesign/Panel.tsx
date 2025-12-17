import React, { useState } from 'react'
import { WindowType, FilterType } from '../../core/enums';
import Button from '../../ui/Button';

export const Panel = ({ trigger, updateTrigger,
    chosenFilterType, updateChoosenFilterType,
    chosenWindowType, updateChosenWindowType,
    filterSize, updateFilterSize,
    lowCutoff, highCutoff,
    updateLowCutoff, updateHighCutoff
}) => {

    const [fitlerTypeDropdownIsOpen, setFitlerTypeDropdownIsOpen] = useState(false);
    const [windowTypeDropdownIsOpen, setWindowTypeDropdownIsOpen] = useState(false);

    const toggleFilterTypeDropdown = () => setFitlerTypeDropdownIsOpen(!fitlerTypeDropdownIsOpen);
    const toggleWindowTypeDropdown = () => setWindowTypeDropdownIsOpen(!windowTypeDropdownIsOpen);

    return (
        <div className="flex flex-col justify-between h-screen h-48 bg-gray-50 p-2 my-5 mx-2 rounded-2xl shadow-md" style={{ height: '322px', width: '515px' }}>
            <div className="m-4 mb-9">
                <div id="content">
                    <div className="flex items-center">
                        <label>Filter Type: </label>
                        <div className="relative mx-2">
                            <button onClick={toggleFilterTypeDropdown} className="p-2 bg-slate-900 text-white rounded-lg hover:bg-gray-700">
                                {chosenFilterType}
                            </button>

                            {fitlerTypeDropdownIsOpen && (
                                <div className="absolute flex flex-col bg-white p-3 shadow  rounded-lg z-10">
                                    <a id="chooseFilterType" onClick={() => { updateChoosenFilterType(FilterType.LOWPASS); toggleFilterTypeDropdown(); } } className="my-0.5 w-24 cursor-pointer">Low-pass</a>
                                    <a id="chooseFilterType" onClick={() => { updateChoosenFilterType(FilterType.HIGHPASS); toggleFilterTypeDropdown(); } } className="my-0.5 w-24 cursor-pointer">High-pass</a>
                                    <a id="chooseFilterType" onClick={() => { updateChoosenFilterType(FilterType.BANDPASS); toggleFilterTypeDropdown(); } } className="my-0.5 w-24 cursor-pointer">Band-pass</a>
                                    <a id="chooseFilterType" onClick={() => { updateChoosenFilterType(FilterType.BANDSTOP); toggleFilterTypeDropdown() } } className="my-0.5 w-24 cursor-pointer">Band-stop</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {chosenFilterType == "lowpass" &&
                    <div className="mt-3">
                        <label>Cuttoff Freq:</label>
                        <input className="rounded-lg shadow p-1 my-3 w-32 mx-1" onChange={(e) => updateLowCutoff(Number(e.target.value))} value={lowCutoff} placeholder="Rad/Samples" type="number" step="0.01" max="3.14" min="0"></input>
                    </div>
                }

                {chosenFilterType == "highpass" &&
                    <div className="mt-3">
                        <label>Cuttoff Freq:</label>
                        <input className="rounded-lg shadow p-1 my-3 w-32 mx-1" onChange={(e) => updateLowCutoff(Number(e.target.value))} value={lowCutoff} placeholder="Rad/Samples" type="number" step="0.01" max="3.14" min="0"></input>
                    </div>
                }

                {chosenFilterType == "bandpass" &&
                    <div className="mt-3">
                        <label>Low freq:</label>
                        <input className="rounded-lg shadow p-1 my-3 w-32 mx-1 mr-5" onChange={(e) => updateLowCutoff(Number(e.target.value))} value={lowCutoff} placeholder="Rad/Samples" type="number" step="0.01" max="3.14" min="0"></input>
                        <label>High freq:</label>
                        <input className="rounded-lg shadow p-1 my-3 w-32 mx-1" onChange={(e) => updateHighCutoff(Number(e.target.value))} value={highCutoff} placeholder="Rad/Samples" type="number" step="0.01" max="3.14" min="0"></input>
                    </div>
                }

                {chosenFilterType == "bandstop" &&
                    <div className="mt-3">
                        <label>Low freq:</label>
                        <input className="rounded-lg shadow p-1 my-3 w-32 mx-1 mr-5" onChange={(e) => updateLowCutoff(Number(e.target.value))} value={lowCutoff} placeholder="Rad/Samples" type="number" step="0.01" max="3.14" min="0"></input>
                        <label>High freq:</label>
                        <input className="rounded-lg shadow p-1 my-3 w-32 mx-1" onChange={(e) => updateHighCutoff(Number(e.target.value))} value={highCutoff} placeholder="Rad/Samples" type="number" step="0.01" max="3.14" min="0"></input>
                    </div>
                }

                <div className="flex items-center">
                    <label>Window Type: </label>
                    <div className="relative mx-2">
                        <button onClick={toggleWindowTypeDropdown} className="p-2 bg-slate-900 text-white rounded-lg hover:bg-gray-700 w-32">
                            {chosenWindowType}
                        </button>
                        {windowTypeDropdownIsOpen && (
                            <div className="absolute flex flex-col bg-white p-3 shadow  rounded-lg">
                                <a className="z-0 my-0.5 w-24 cursor-pointer" id="chooseFilterType" onClick={() => {updateChosenWindowType(WindowType.RECTANGULAR); toggleWindowTypeDropdown() }}>Rectangular</a>
                                <a id="chooseFilterType" onClick={() => {updateChosenWindowType(WindowType.HAMMING); toggleWindowTypeDropdown()} } className="my-0.5 w-24 cursor-pointer">Hamming</a>
                                <a id="chooseFilterType" onClick={() => {updateChosenWindowType(WindowType.HAN); toggleWindowTypeDropdown()} } className="my-0.5 w-24 cursor-pointer">Han</a>
                                <a id="chooseFilterType" onClick={() => {updateChosenWindowType(WindowType.BARTLETT); toggleWindowTypeDropdown()} } className="my-0.5 w-24 cursor-pointer">Bartlett</a>
                            </div>
                        )}
                    </div>
                </div>

                <label>Filter Size:</label>
                <input className="rounded-lg shadow p-1 my-3 w-32 mx-1" onChange={(e) => updateFilterSize(Number(e.target.value))} value={filterSize} placeholder="Size" type="number" min="0" max="1000"></input>
            </div>
            <Button text='Design Filter' onClick={() => updateTrigger(!trigger)} />
        </div >
    )
}
