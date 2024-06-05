import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LabDetails = () => {
    // Mock data to simulate backend data
    const steps = [
        { id: 1, name: '1st step name', description: 'Description for Step 1' },
        { id: 2, name: '2nd step name', description: 'Description for Step 2' },
        { id: 3, name: '3rd step name', description: 'Description for Step 3' }
        // Add more steps as needed
    ];

    // State to track which accordion is open
    const [openStep, setOpenStep] = useState(null);

    const toggleAccordion = (index) => {
        setOpenStep(openStep === index ? null : index);
    };

    return (
        <div className="w-11/12 mx-auto">
            <h3 className="text-center text-2xl font-semibold my-5 w-11/12 mx-auto">This is the longest lab title</h3>
            <div className='w-full h-[500px] overflow-hidden object-cover rounded-md border border-base-300'>
                <img src='' alt="" />
            </div>
            <div className="my-5">
                <h3 className="text-2xl font-semibold mb-2">Lab Description</h3>
                <p className="text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta expedita at eum et cum illo hic sed ipsam facilis placeat deleniti quibusdam ex quasi perferendis, aliquid tempora, exercitationem nisi velit! Mollitia accusamus ex, excepturi maxime tempora laborum quisquam odio quos est! Reiciendis ipsam voluptatum eos voluptates quisquam dolorum laudantium voluptas mollitia quidem expedita aliquam impedit ullam aspernatur, incidunt, ratione nulla veniam esse, consequuntur eveniet quasi doloribus sequi? Libero voluptatum autem atque nihil asperiores ratione quibusdam earum labore deserunt quos deleniti odio optio error recusandae aperiam, hic harum excepturi repellat. Sapiente aut architecto eos consectetur sequi quasi accusantium quibusdam delectus. Ab possimus ipsam tempora dolorum voluptas dolor, optio atque, repellat et illo at amet nulla ipsa pariatur odio mollitia doloremque. Placeat!
                </p>
            </div>
            <div className="my-5">
                <h3 className="text-2xl font-semibold mb-2">Lab Objective and Tech Stack</h3>
                <p className="text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta expedita at eum et cum illo hic sed ipsam facilis placeat deleniti quibusdam ex quasi perferendis, aliquid tempora, exercitationem nisi velit! Mollitia accusamus ex, excepturi maxime tempora laborum quisquam odio quos est! Reiciendis ipsam voluptatum eos voluptates quisquam dolorum laudantium voluptas mollitia quidem expedita aliquam impedit ullam aspernatur, incidunt, ratione nulla veniam esse, consequuntur eveniet quasi doloribus sequi? Libero voluptatum autem atque nihil asperiores ratione quibusdam earum labore deserunt quos deleniti odio optio error recusandae aperiam, hic harum excepturi repellat. Sapiente aut architecto eos consectetur sequi quasi accusantium quibusdam delectus. Ab possimus ipsam tempora dolorum voluptas dolor, optio atque, repellat et illo at amet nulla ipsa pariatur odio mollitia doloremque. Placeat!
                </p>
            </div>
            {steps.map((step, index) => (
                <div key={step.id} className="collapse collapse-arrow border border-base-300 rounded-md mb-2">
                    <input
                        type="checkbox"
                        checked={openStep === index}
                        onChange={() => toggleAccordion(index)}
                        className="hidden"
                    />
                    <div className="collapse-title text-xl font-medium" onClick={() => toggleAccordion(index)}>
                        <p>Step {index + 1} : {step.name}</p>
                    </div>
                    <div className={`collapse-content ${openStep === index ? 'block' : 'hidden'}`}>
                        <div>
                            <div className="my-5">
                                <h3 className="text-xl font-semibold mb-2">Step Details</h3>
                                <p className="text-justify">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta expedita at eum et cum illo hic sed ipsam facilis placeat deleniti quibusdam ex quasi perferendis, aliquid tempora, exercitationem nisi velit! Mollitia accusamus ex, excepturi maxime tempora laborum quisquam odio quos est! Reiciendis ipsam voluptatum eos voluptates quisquam dolorum laudantium voluptas mollitia quidem expedita aliquam impedit ullam aspernatur, incidunt, ratione nulla veniam esse, consequuntur eveniet quasi doloribus sequi? Libero voluptatum autem atque nihil asperiores ratione quibusdam earum labore deserunt quos deleniti odio optio error recusandae aperiam, hic harum excepturi repellat. Sapiente aut architecto eos consectetur sequi quasi accusantium quibusdam delectus. Ab possimus ipsam tempora dolorum voluptas dolor, optio atque, repellat et illo at amet nulla ipsa pariatur odio mollitia doloremque. Placeat!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div>
                <Link to={'/updatelab'}><button className="p-3 rounded-md border border-base-300">Update Lab</button></Link>
            </div>
        </div>
    );
};

export default LabDetails;
