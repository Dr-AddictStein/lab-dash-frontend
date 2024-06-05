import { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { Link } from 'react-router-dom';

const CreateNewLab = () => {
    const [steps, setSteps] = useState([]);
    const editor1 = useRef(null);
    const editor2 = useRef(null);

    const addSteps = () => {
        setSteps([...steps, { id: steps.length, expanded: false }]);
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
            <h3 className="text-2xl text-center font-semibold">Create New Lab</h3>
            <form action="">
                <div className="my-3">
                    <label htmlFor="">Lab Title</label>
                    <input type="text" name="labTitle" className="w-full border border-base-300 rounded-md p-2" placeholder="Enter Lab Title" />
                </div>
                <div className="my-3">
                    <label htmlFor="">Lab Description</label>
                    <JoditEditor name='labDesc' ref={editor1} required />
                </div>
                <div className="my-3">
                    <label htmlFor="">Lab Objective and Tech Stack</label>
                    <JoditEditor name='labObj' ref={editor2} required />
                </div>
                <div className="flex gap-3">
                    <div>
                        <label htmlFor="">Lab Resource Code</label>
                        <input type="file" name="labCode" className="file-input file-input-bordered w-full" />
                    </div>
                    <div>
                        <label htmlFor="">Lab Thumbnail</label>
                        <input type="file" name="labThumb" className="file-input file-input-bordered w-full" />
                    </div>
                    <div className="flex gap-3 my-6">
                        <select name="cloudProvider" className="select select-bordered w-full">
                            <option disabled selected>Select Cloud Provider</option>
                            <option>Normal Apple</option>
                            <option>Normal Orange</option>
                            <option>Normal Tomato</option>
                        </select>
                        <select name="labType" className="select select-bordered w-full">
                            <option disabled selected>Lab Type</option>
                            <option>Normal Apple</option>
                            <option>Normal Orange</option>
                            <option>Normal Tomato</option>
                        </select>
                        <select name='labDifficulty' className="select select-bordered w-full">
                            <option disabled selected>Difficulty Level</option>
                            <option>Normal Apple</option>
                            <option>Normal Orange</option>
                            <option>Normal Tomato</option>
                        </select>
                    </div>
                </div>
                <div>
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
            </form>
        </div>
    );
};

export default CreateNewLab;
