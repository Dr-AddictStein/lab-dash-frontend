import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { Link } from 'react-router-dom';

const CreateNewLab = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [steps, setSteps] = useState([]);
    const editor1 = useRef(null);
    const editor2 = useRef(null);
    const editorRefs = useRef([]);

    const addSteps = () => {
        setSteps([...steps, { id: steps.length, expanded: false }]);
        editorRefs.current.push(React.createRef());
    };

    const toggleStep = (index) => {
        setSteps(steps.map((step, i) => {
            if (i === index) {
                return { ...step, expanded: !step.expanded };
            }
            return step;
        }));
    };

    return (
        <div className="w-11/12 mx-auto">
            <form action="">
                <div id="first-page">
                    <div className="my-3">
                        <label htmlFor="" className='mb-3'>Lab Title</label>
                        <input type="text" name="labTitle" className="w-full border border-base-300 rounded-md p-2 mt-3" placeholder="Enter Lab Title" />
                    </div>
                    <div className="my-3">
                        <label htmlFor="" className='mb-3'>Lab Description</label>
                        <JoditEditor name='labDesc' ref={editor1} required  className='mt-3'/>
                    </div>
                    <div className="my-3">
                        <label htmlFor="" className='mb-3'>Lab Objective and Tech Stack</label>
                        <JoditEditor name='labObj' ref={editor2} required className='mt-3'/>
                    </div>
                    <div className="flex gap-3">
                        <div>
                            <label htmlFor="" className='mb-3'>Lab Resource Code</label>
                            <input type="file" name="labCode" className="file-input file-input-bordered w-full mt-3" />
                        </div>
                        <div>
                            <label htmlFor="" className='mb-3'>Lab Thumbnail</label>
                            <input type="file" name="labThumb" className="file-input file-input-bordered w-full mt-3" />
                        </div>
                        <div className="flex gap-3 my-6">
                            <select name="cloudProvider" className="select select-bordered w-full mt-3">
                                <option disabled selected>Select Cloud Provider</option>
                                <option>Normal Apple</option>
                                <option>Normal Orange</option>
                                <option>Normal Tomato</option>
                            </select>
                            <select name="labType" className="select select-bordered w-full mt-3">
                                <option disabled selected>Lab Type</option>
                                <option>Normal Apple</option>
                                <option>Normal Orange</option>
                                <option>Normal Tomato</option>
                            </select>
                            <select name='difficulty' className="select select-bordered w-full mt-3">
                                <option disabled selected>Difficulty Level</option>
                                <option>Normal Apple</option>
                                <option>Normal Orange</option>
                                <option>Normal Tomato</option>
                            </select>
                        </div>
                    </div>
                    <div id="second-page">
                        {steps.map((step, index) => (
                            <div key={step.id} className="collapse collapse-arrow border border-base-300 rounded-md mb-2">
                                <input type="checkbox" name={`my-accordion-${index}`} checked={step.expanded} onChange={() => toggleStep(index)} />
                                <div className="collapse-title text-xl font-medium">
                                    <p>Step {index + 1}</p>
                                </div>
                                <div className={`collapse-content ${step.expanded ? 'block' : 'hidden'}`}>
                                    <div>
                                        <div>
                                            <label htmlFor="">Step Name</label>
                                            <input type="text" name="stepName" className="w-full border border-base-300 rounded-md p-2" placeholder="Enter Step Name" />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="">Step Description</label>
                                            <textarea name="stepDesc" className='w-full border border-base-300 rounded-md h-[200px] p-2' placeholder='Enter Step Description'></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='mb-5'>
                            <button type="button" className="py-2 w-20 rounded-md border border-base-300" onClick={addSteps}>Add Step</button>
                        </div>
                    </div>
                    <div className="mt-10 flex gap-3 justify-end">
                        <button className="py-2 w-20 rounded-md border border-base-300">Save</button>
                        <Link to={'/'}><button className="py-2 w-20 rounded-md border border-base-300">Cancel</button></Link>
                    </div>
                </div>
                {/* {currentPage === 2 && (
                    
                )} */}
            </form>
        </div>
    );
};

export default CreateNewLab;
