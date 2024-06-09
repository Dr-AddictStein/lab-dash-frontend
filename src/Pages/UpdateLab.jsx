import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getLabCollection, updateLabCollection } from "../services/labServices";
import parse from 'html-react-parser';

const UpdateLab = () => {
  const { labId } = useParams();
  const [lab, setLab] = useState({
    title: "",
    desc: "",
    objective: "",
    cloudprovider: "",
    type: "",
    difficulty: "",
    srccode: "",
    thumbnail: "",
    steps: [],
    isPublished: true,
    isDeleted: false,
  });
  const editor1 = useRef(null);
  const editor2 = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLab = async () => {
      try {
        const response = await getLabCollection(labId);
        const labData = response.data;
        setLab(labData);
      } catch (error) {
        console.error("Error fetching lab data:", error);
      }
    };

    fetchLab();
  }, [labId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLab((prevLab) => ({ ...prevLab, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setLab((prevLab) => ({ ...prevLab, [name]: files[0] }));
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = lab.steps.map((step, i) =>
      i === index ? { ...step, desc: value } : step
    );
    setLab((prevLab) => ({ ...prevLab, steps: updatedSteps }));
  };

  const addStep = () => {
    setLab((prevLab) => ({
      ...prevLab,
      steps: [...prevLab.steps, { name: "", desc: "", expanded: false }],
    }));
  };

  const toggleStep = (index) => {
    setLab((prevLab) => ({
      ...prevLab,
      steps: prevLab.steps.map((step, i) =>
        i === index ? { ...step, expanded: !step.expanded } : step
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const labData = {
      ...lab,
      desc: editor1.current.value,
      objective: editor2.current.value,
    };
    try {
      await updateLabCollection(labId, labData);
      navigate("/labdetails/" + labId); // Redirect to home or another page after successful update
    } catch (error) {
      console.error("Error updating lab:", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <h3 className="text-2xl text-center font-semibold">Update Lab</h3>
      <div className="mt-10 flex gap-3 justify-end">
        <button
          onClick={handleSubmit}
          className="py-2 w-20 rounded-md border border-base-300"
        >
          Save
        </button>
        <Link to={"/"}>
          <button className="py-2 w-20 rounded-md border border-base-300">
            Cancel
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="labTitle">Lab Title</label>
          <input
            type="text"
            name="title"
            className="w-full border border-base-300 rounded-md p-2"
            placeholder="Enter Lab Title"
            value={lab.title}
            onChange={handleChange}
          />
        </div>
        <div className="my-3">
          <label htmlFor="labDesc">Lab Description</label>
          <JoditEditor
            ref={editor1}
            value={lab.desc}
            onBlur={(newContent) =>
              setLab((prevLab) => ({ ...prevLab, desc: newContent }))
            }
          />
        </div>
        <div className="my-3">
          <label htmlFor="labObj">Lab Objective and Tech Stack</label>
          <JoditEditor
            ref={editor2}
            value={lab.objective}
            onBlur={(newContent) =>
              setLab((prevLab) => ({ ...prevLab, objective: newContent }))
            }
          />
        </div>
        <div className="flex gap-3">
          <div>
            <label htmlFor="srccode">Lab Resource Code</label>
            <input
              type="file"
              name="srccode"
              className="file-input file-input-bordered w-full"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label htmlFor="thumbnail">Lab Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              className="file-input file-input-bordered w-full"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex gap-3 my-6">
          <div className="flex flex-col w-full">
            <div className=" mb-2">Select Cloud Provider</div>
            <select
              name="cloudprovider"
              className="select select-bordered w-full"
              value={lab.cloudprovider}
              onChange={handleChange}
            >
              <option disabled>Select Cloud Provider</option>
              <option>Google Cloud</option>
              <option>AWS</option>
              <option>Snowflake</option>
              <option>Azure Cloud</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <div className=" mb-2">Select Lab Type</div>
            <select
              name="type"
              className="select select-bordered w-full"
              value={lab.type}
              onChange={handleChange}
            >
              <option disabled>Lab Type</option>
              <option>Data Science/ML</option>
              <option>Data Engineering/MLOps</option>
              <option>AI/LLM</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <div className=" mb-2">Select Difficulty Level</div>
            <select
              name="difficulty"
              className="select select-bordered w-full"
              value={lab.difficulty}
              onChange={handleChange}
            >
              <option disabled>Difficulty Level</option>
              <option>Beginner</option>
              <option>Intermediate/Advanced</option>
            </select>
          </div>
        </div>
        <div>
          {lab.steps.map((step, index) => (
            <div
              key={index}
              className="collapse collapse-arrow border border-base-300 rounded-md mb-2"
            >
              <input
                type="checkbox"
                name={`my-accordion-${index}`}
                checked={step.expanded}
                onChange={() => toggleStep(index)}
              />
              <div className="collapse-title text-xl font-medium">
                <p>Step {index + 1}</p>
              </div>
              <div
                className={`collapse-content ${
                  step.expanded ? "block" : "hidden"
                }`}
              >
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
                      value={step.desc}
                      onBlur={(newContent) =>
                        handleStepChange(index, newContent)
                      }
                    />
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

export default UpdateLab;
