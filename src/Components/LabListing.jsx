import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteLabCollection, getLabCollections, updateLabCollection } from "../services/labServices";

const LabListing = () => {
  const [labs, setLabs] = useState([]);
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [cloud, setCloud] = useState("");
  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const fetchLabs = async () => {
    try {
      const response = await getLabCollections();
      const sortedLabs = response.data.sort((a, b) => a.id - b.id);
      setLabs(sortedLabs);
      setFilteredLabs(sortedLabs);
    } catch (error) {
      console.error("Error fetching lab collections:", error);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    const lab = labs.filter((l) => l.id === parseInt(e.target.value))[0];
    const labData = {
      ...lab,
      isDeleted: true,
    };
    try {
      await updateLabCollection(e.target.value, labData);
      fetchLabs();
    } catch (error) {
      console.error("Error updating lab:", error);
    }
  };

  const handleUnpublish = async (e) => {
    e.preventDefault();
    const lab = labs.filter((l) => l.id === parseInt(e.target.value))[0];
    const labData = {
      ...lab,
      isPublished: false,
    };
    try {
      await updateLabCollection(e.target.value, labData);
      fetchLabs();
    } catch (error) {
      console.error("Error updating lab:", error);
    }
  };

  useEffect(() => {
    filterLabs();
  }, [cloud, type, difficulty, labs]);

  const filterLabs = () => {
    console.log("Filtering labs with", { cloud, type, difficulty });

    const filtered = labs.filter((lab) => {
      console.log("Lab properties", {
        cloudprovider: lab.cloudprovider,
        labType: lab.labType,
        difficultyLevel: lab.difficultyLevel,
        isPublished: lab.isPublished,
        isDeleted: lab.isDeleted,
      });

      const matchesCloud = cloud ? lab.cloudprovider === cloud : true;
      const matchesType = type ? lab.type === type : true;
      const matchesDifficulty = difficulty ? lab.difficulty === difficulty : true;

      return matchesCloud && matchesType && matchesDifficulty && lab.isPublished && !lab.isDeleted;
    });

    console.log("Filtered labs", filtered);
    setFilteredLabs(filtered);
  };

  const handleCloudChange = (e) => setCloud(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);
  const handleDifficultyChange = (e) => setDifficulty(e.target.value);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <select className="select select-bordered w-full max-w-[200px]" onChange={handleCloudChange}>
            <option value="">Cloud Provider</option>
            <option value="Google Cloud">Google Cloud</option>
            <option value="AWS">AWS</option>
            <option value="Snowflake">Snowflake</option>
            <option value="Azure Cloud">Azure Cloud</option>
          </select>
          <select className="select select-bordered w-full max-w-[200px]" onChange={handleTypeChange}>
            <option value="">Lab Type</option>
            <option value="Data Science/ML">Data Science/ML</option>
            <option value="Data Engineering/MLOps">Data Engineering/MLOps</option>
            <option value="AI/LLM">AI/LLM</option>
          </select>
          <select className="select select-bordered w-full max-w-[200px]" onChange={handleDifficultyChange}>
            <option value="">Difficulty Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate/Advanced">Intermediate/Advanced</option>
          </select>
        </div>
        <div>
          <Link to={"/createnewlab"}>
            <button className="py-2 px-3 rounded-md border border-base-300">
              Create new lab
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">Lab ID</th>
              <th className="text-center">Lab Name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLabs.map((ld) => (
              <tr key={ld.id}>
                <td className="w-[5%] text-center">{ld.id}</td>
                <td className="w-full text-center">{ld.title}</td>
                <td className="flex gap-4">
                  <Link to={"/labdetails/" + ld.id}>
                    <button className="w-24 py-1 rounded-md border border-base-300">
                      Details
                    </button>
                  </Link>
                  <Link to={"/updatelab/" + ld.id}>
                    <button className="w-24 py-1 rounded-md border border-base-300">
                      Update Lab
                    </button>
                  </Link>
                  <button className="w-24 py-1 rounded-md border border-base-300" value={ld.id} onClick={handleUnpublish}>
                    Un-Publish
                  </button>
                  <button name="deleteLab" value={ld.id} className="w-24 py-1 rounded-md border border-base-300" onClick={handleDelete}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabListing;
