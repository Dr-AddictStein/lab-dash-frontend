import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getLabCollection } from "../services/labServices";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import parse from 'html-react-parser';
import ScaleLoader from "react-spinners/ScaleLoader";

const LabDetails = () => {
  const { labId } = useParams();
  const [lab, setLab] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await getLabCollection(labId);
        setLab(response.data);
      } catch (error) {
        console.error("Error fetching lab collections:", error);
      }
    };

    fetchLabs();
  }, [labId]);

  const [steps, setSteps] = useState([]);
  useEffect(() => {
    console.log("SSS", lab);
    if (lab) {
      setSteps(lab.steps)
      setLoader(false);
    }
  }, [lab]);


  // State to track which accordion is open
  const [openStep, setOpenStep] = useState(null);

  const toggleAccordion = (index) => {
    setOpenStep(openStep === index ? null : index);
  };

  if (loader) {
    return (
      <div className="flex flex-col justify-center h-screen gap-16">
        <div className="text-center text-slate-700 text-3xl">
          Fetching Lab Details
        </div>
        <div className='w-full  flex justify-center items-center'>
          <ScaleLoader
            color='grey'
            size={200}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="w-11/12 mx-auto">
        <h3 className="text-center text-2xl font-semibold my-5 w-11/12 mx-auto">
          {lab.title}
        </h3>
        <div className="w-full flex items-center justify-center overflow-hidden object-cover rounded-md border border-base-300">
          <img src={lab.thumbnail} alt="" />
        </div>
        <div className="my-5">
          <h3 className="text-2xl font-semibold mb-2">Lab Description</h3>
          <p className="text-justify px-10">
            {parse(lab.desc)}
          </p>
        </div>
        <div className="my-5">
          <h3 className="text-2xl font-semibold mb-2">
            Lab Objective and Tech Stack
          </h3>
          <p className="text-justify px-10">
            {parse(lab.objective)}
          </p>
        </div>
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="collapse collapse-arrow border border-base-300 rounded-md mb-2"
          >
            <input
              type="checkbox"
              checked={openStep === index}
              onChange={() => toggleAccordion(index)}
              className="hidden"
            />
            <div
              className="collapse-title text-xl font-medium"
              onClick={() => toggleAccordion(index)}
            >
              <p>
                Step {index + 1} : {step.name}
              </p>
            </div>
            <div
              className={`collapse-content ${openStep === index ? "block" : "hidden"
                }`}
            >
              <div>
                <div className="my-5">
                  <h3 className="text-xl font-semibold mb-2">Step Details</h3>
                  <p className="text-justify">
                    {parse(step.desc)}
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  {
                    step.fileUrls.map(i => {
                      return (
                        <img src={i} alt="" className="w-1/3" />
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
        <div>
          <Link to={"/updatelab/" + labId}>
            <button className="p-3 rounded-md border border-base-300">
              Update Lab
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LabDetails;
