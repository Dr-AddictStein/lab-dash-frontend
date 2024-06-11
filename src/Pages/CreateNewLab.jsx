import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addLabCollection } from '../services/labServices';

const CreateNewLab = () => {
  const [step, setStep] = useState([]);
  const editor1 = useRef(null);
  const editor2 = useRef(null);
  const stepEditors = useRef([]);
  const navigate = useNavigate();

  const addStep = () => {
    setStep([...step, { id: step.length, name: '', desc: '', expanded: false, files: [[], [], []] }]);
    stepEditors.current.push(React.createRef());
  };

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSteps = step.map((step, i) =>
      i === index ? { ...step, [name]: value } : step
    );
    setStep(updatedSteps);
  };

  const handleStepEditorChange = (index, value) => {
    const updatedSteps = step.map((step, i) =>
      i === index ? { ...step, desc: value } : step
    );
    setStep(updatedSteps);
  };

  const handleStepFileChange = (index, fileIndex, e) => {
    const files = Array.from(e.target.files);
    const updatedSteps = step.map((step, i) =>
      i === index ? { ...step, files: step.files.map((fileSet, j) => (j === fileIndex ? files : fileSet)) } : step
    );
    setStep(updatedSteps);
  };

  const toggleStep = (index) => {
    setStep((prevStep) =>
      prevStep.map((step, i) =>
        i === index ? { ...step, expanded: !step.expanded } : step
      )
    );
  };

  const uploadFile = async (file, id) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`http://localhost:4000/api/file/image/${id}`, formData);
      return response.data.data.url;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  };

  const uploadZip = async (file, id) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`http://localhost:4000/api/file/source_code/${id}`, formData);
      return response.data.data.url;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  };

  const uploadStepImage = async (file, id) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`http://localhost:4000/api/file/stepImage/${id}/1`, formData);
      return response.data.data.url;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const thumbFile = form.thumbnail.files[0];
    const thumbdesc = editor1.current.value;
    const objective = editor2.current.value;
    const title = form.title.value;
    const src = form.srccode.files[0];
    const cloudprovider = form.cloudprovider.value;
    const type = form.type.value;
    const difficulty = form.difficulty.value;
    const id = Date.now().toString();

    try {
      const thumbImageUrl = thumbFile ? await uploadFile(thumbFile,id):null;
      const srccodeUrl = src ? await uploadZip(src,id) : null;

      const steps = await Promise.all(step.map(async (step, index) => {
        const desc = stepEditors.current[index]?.current?.value;
        const fileUrls = await Promise.all(step.files.flat().map(file => uploadStepImage(file, id)));
        return {
          name: step.name,
          desc,
          fileUrls,
        };
      }));

      const newLab = {
        id,
        title,
        desc: thumbdesc,
        objective,
        cloudprovider,
        type,
        difficulty,
        srccode: srccodeUrl,
        thumbnail: thumbImageUrl,
        steps,
      };

      // Logging the newLab object to the console
      console.log("newLab",newLab);

      // Make your API call here to save the newLab data
      try {
        await addLabCollection(newLab);
        navigate('/'); // Redirect to home or another page after successful submission
      } catch (error) {
        console.error('Error creating new lab:', error);
      }
    } catch (error) {
      console.error('Error submitting lab:', error);
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <h3 className="text-2xl text-center font-semibold">Create New Lab</h3>
      <div className="mt-10 flex gap-3 justify-end">
        <button
          type="submit"
          form="lab-form"
          className="py-2 w-20 rounded-md border border-base-300"
        >
          Save
        </button>
        <Link to={'/'}>
          <button className="py-2 w-20 rounded-md border border-base-300">
            Cancel
          </button>
        </Link>
      </div>
      <form id="lab-form" onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="labTitle">Lab Title</label>
          <input
            type="text"
            name="title"
            className="w-full border border-base-300 rounded-md p-2"
            placeholder="Enter Lab Title"
          />
        </div>
        <div className="my-3">
          <label htmlFor="labDesc">Lab Description</label>
          <JoditEditor ref={editor1} />
        </div>
        <div className="my-3">
          <label htmlFor="labObj">Lab Objective and Tech Stack</label>
          <JoditEditor ref={editor2} />
        </div>
        <div className="flex gap-3">
          <div>
            <label htmlFor="srccode">Lab Resource Code</label>
            <input
              type="file"
              name="srccode"
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="thumbnail">Lab Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              className="file-input file-input-bordered w-full"
            />
          </div>
        </div>
        <div className="flex gap-3 my-6">
          <div className="flex flex-col w-full">
            <div className="mb-2">Select Cloud Provider</div>
            <select
              name="cloudprovider"
              className="select select-bordered w-full"
              defaultValue="Google Cloud"
            >
              <option disabled selected>Select Cloud Provider</option>
              <option>Google Cloud</option>
              <option>AWS</option>
              <option>Snowflake</option>
              <option>Azure Cloud</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <div className="mb-2">Select Lab Type</div>
            <select
              name="type"
              className="select select-bordered w-full"
              defaultValue="Data Science/ML"
            >
              <option disabled selected>Lab Type</option>
              <option>Data Science/ML</option>
              <option>Data Engineering/MLOps</option>
              <option>AI/LLM</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <div className="mb-2">Select Difficulty Level</div>
            <select
              name="difficulty"
              className="select select-bordered w-full"
              defaultValue="Beginner"
            >
              <option disabled selected>Difficulty Level</option>
              <option>Beginner</option>
              <option>Intermediate/Advanced</option>
            </select>
          </div>
        </div>
        <div>
          {step.map((step, index) => (
            <div
              key={index}
              className="collapse collapse-arrow border border-base-300 rounded-md mb-2"
            >
              <input
                type="checkbox"
                className="collapse-checkbox"
                checked={step.expanded}
                onChange={() => toggleStep(index)}
              />
              <div className="collapse-title text-xl font-medium">
                <p>Step {index + 1}</p>
              </div>
              <div className={`collapse-content ${step.expanded ? 'block' : 'hidden'}`}>
                <div>
                  <div>
                    <label htmlFor="stepName">Step Name</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full border border-base-300 rounded-md p-2"
                      placeholder="Enter Step Name"
                      value={step.name}
                      onChange={(e) => handleStepChange(index, e)}
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="stepDesc">Step Description</label>
                    <JoditEditor
                      ref={stepEditors.current[index]}
                      value={step.desc}
                      onBlur={(newContent) => handleStepEditorChange(index, newContent)}
                    />
                  </div>
                  <div className='flex gap-3'>
                    {/* Render three file inputs for each step */}
                    {step.files.map((fileSet, fileIndex) => (
                      <input
                        key={fileIndex}
                        type="file"
                        name={`file-${index}-${fileIndex}`}
                        className="file-input file-input-bordered w-full"
                        onChange={(e) => handleStepFileChange(index, fileIndex, e)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="mb-5">
            <button
              type="button"
              className="py-2 w-20 rounded-md border border-base-300"
              onClick={addStep}
            >
              Add Step
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNewLab;

