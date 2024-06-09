import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteLabCollection, getLabCollection, getLabCollections, updateLabCollection } from "../services/labServices";

const LabListing = () => {
  const [labs, setLabs] = useState([]);

  const fetchLabs = async () => {
    try {
      const response = await getLabCollections();
      const sortedLabs = response.data.sort((a, b) => a.id - b.id);
      setLabs(sortedLabs);
    } catch (error) {
      console.error("Error fetching lab collections:", error);
    }
  };
  useEffect(() => {

    fetchLabs();
  }, []);


  const handleDelete = async (e) => {
    e.preventDefault();
    const lab = labs.filter((l)=>{
      return (l.id===e.target.value);
    })[0]
    const labData = {
      ...lab,
      isDeleted: true,
    };
    try {
      console.log("SAAAA",labData);
      await updateLabCollection(e.target.value, labData);
      fetchLabs();
    } catch (error) {
      console.error("Error updating lab:", error);
    }
  }

  const handleUnpublish = async (e, index) => {
    e.preventDefault();
    const lab = labs.filter((l)=>{
      return (l.id===e.target.value);
    })[0]
    const labData = {
      ...lab,
      isPublished: false,
    };
    try {
      console.log("SAAAA",labData);
      await updateLabCollection(e.target.value, labData);
      fetchLabs();
    } catch (error) {
      console.error("Error updating lab:", error);
    }
  };

  useEffect(() => {
    console.log("SSS", labs[0]);
  }, [labs])



  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <select className="select select-bordered w-full max-w-[200px]">
            <option disabled selected>
              Cloud Provider
            </option>
            <option>Normal Apple</option>
            <option>Normal Orange</option>
            <option>Normal Tomato</option>
          </select>
          <select className="select select-bordered w-full max-w-[200px]">
            <option disabled selected>
              Lab Type
            </option>
            <option>Normal Apple</option>
            <option>Normal Orange</option>
            <option>Normal Tomato</option>
          </select>
          <select className="select select-bordered w-full max-w-[200px]">
            <option disabled selected>
              Difficulty Level
            </option>
            <option>Normal Apple</option>
            <option>Normal Orange</option>
            <option>Normal Tomato</option>
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
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {labs.map((ld, index) => {
              return (
                <tr key={ld.id}>
                  {
                    (ld.isPublished && !ld.isDeleted) &&
                    <>
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
                    </>
                  }
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabListing;
