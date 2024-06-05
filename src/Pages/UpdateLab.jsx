import { useRef, useState } from "react";
import JoditEditor from 'jodit-react';
import { Link } from "react-router-dom";

const UpdateLab = () => {
    const editor1 = useRef(null);
    const editor2 = useRef(null);

    const [labs, setLabs] = useState([
        {
            id: 1,
            labTitle: 'Sample Lab Title 1',
            labDesc: 'Sample Lab Description 1',
            labObj: 'Sample Lab Objective 1',
            labThumb: 'thumbnail1.png',
            labCode: 'code1.zip',
            cloudProvider: 'AWS',
            labType: 'Type1',
            labDifficulty: 'Easy',
            steps: [
                { id: 1, name: '1st step name', description: 'Description for Step 1', expanded: false },
                { id: 2, name: '2nd step name', description: 'Description for Step 2', expanded: false },
                { id: 3, name: '3rd step name', description: 'Description for Step 3', expanded: false }
            ]
        },
        // More labs can be added here
    ]);

    const toggleStep = (labIndex, stepIndex) => {
        setLabs(labs.map((lab, li) => {
            if (li === labIndex) {
                return {
                    ...lab,
                    steps: lab.steps.map((step, si) => {
                        if (si === stepIndex) {
                            return { ...step, expanded: !step.expanded };
                        }
                        return step;
                    })
                };
            }
            return lab;
        }));
    };

    return (
        <div className="w-11/12 mx-auto">
            <h3 className="text-2xl text-center font-semibold">Update Lab</h3>
            <form action="">
                {labs.map((lab, labIndex) => (
                    <div key={lab.id}>
                        <div className="my-3">
                            <label htmlFor={`labTitle-${lab.id}`}>Lab Title</label>
                            <input type="text" name="labTitle" className="w-full border border-base-300 rounded-md p-2" placeholder="Enter Lab Title" defaultValue={lab.labTitle} />
                        </div>
                        <div className="my-3">
                            <label htmlFor={`labDesc-${lab.id}`}>Lab Description</label>
                            <JoditEditor name='labDesc' ref={editor1} value={lab.labDesc} required />
                        </div>
                        <div className="my-3">
                            <label htmlFor={`labObj-${lab.id}`}>Lab Objective and Tech Stack</label>
                            <JoditEditor name='labObj' ref={editor2} value={lab.labObj} required />
                        </div>
                        <div className="flex gap-3">
                            <div>
                                <label htmlFor={`labCode-${lab.id}`}>Lab Resource Code</label>
                                <input type="file" name="labCode" className="file-input file-input-bordered w-full" />
                            </div>
                            <div>
                                <label htmlFor={`labThumb-${lab.id}`}>Lab Thumbnail</label>
                                <input type="file" name="labThumb" className="file-input file-input-bordered w-full" />
                            </div>
                            <div className="flex gap-3 my-6">
                                <select name="cloudProvider" className="select select-bordered w-full" defaultValue={lab.cloudProvider}>
                                    <option disabled>Select Cloud Provider</option>
                                    <option>AWS</option>
                                    <option>Azure</option>
                                    <option>Google Cloud</option>
                                </select>
                                <select name="labType" className="select select-bordered w-full" defaultValue={lab.labType}>
                                    <option disabled>Lab Type</option>
                                    <option>Type1</option>
                                    <option>Type2</option>
                                    <option>Type3</option>
                                </select>
                                <select name='labDifficulty' className="select select-bordered w-full" defaultValue={lab.labDifficulty}>
                                    <option disabled>Difficulty Level</option>
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            {lab.steps.map((step, stepIndex) => (
                                <div key={step.id} className={`collapse collapse-arrow border border-base-300 rounded-md mb-2 cursor-pointer ${step.expanded ? 'collapse-open' : 'collapse-close'}`}>
                                    <div className="collapse-title text-xl font-medium" onClick={() => toggleStep(labIndex, stepIndex)}>
                                        <p>Step {stepIndex + 1}</p>
                                    </div>
                                    <div className={`collapse-content ${step.expanded ? 'block' : 'hidden'}`}>
                                        <div>
                                            <div>
                                                <label htmlFor={`stepName-${step.id}`}>Step Name</label>
                                                <input type="text" name={`stepName-${step.id}`} className="w-full border border-base-300 rounded-md p-2" placeholder="Enter Step Name" defaultValue={step.name} />
                                            </div>
                                            <div className="my-3">
                                                <label htmlFor={`stepDesc-${step.id}`}>Step Description</label>
                                                <textarea name={`stepDesc-${step.id}`} className='w-full border border-base-300 rounded-md h-[200px] p-2' placeholder='Enter Step Description' defaultValue={step.description}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="mt-10 flex gap-3 justify-end">
                    <button type="submit" className="py-2 w-20 rounded-md border border-base-300">Update</button>
                    <Link to={'/'}><button type="button" className="py-2 w-20 rounded-md border border-base-300">Cancel</button></Link>
                </div>
            </form>
        </div>
    );
};

export default UpdateLab;
