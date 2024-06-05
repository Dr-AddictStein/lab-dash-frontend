import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLabCollection, getLabCollections } from "../services/labServices";

const LabListing = () => {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await getLabCollections();
        setLabs(response.data);
      } catch (error) {
        console.error("Error fetching lab collections:", error);
      }
    };

    fetchLabs();
  }, []);

  useEffect(()=>{
    console.log("SSS",labs[0]);
  },[labs])



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
              <th className="text-center">Sl No.</th>
              <th className="text-center">Lab Title</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {labs.map((ld,index) => {
              return (
                <tr key={ld.id}>
                  <td className="w-[5%]">{index+1}</td>
                  <td className="w-full">{ld.title}</td>
                  <td className="flex gap-4">
                    <Link to={"/labdetails/"+ld.id}>
                      <button className="w-24 py-1 rounded-md border border-base-300">
                        Details
                      </button>
                    </Link>
                    <Link to={"/updatelab"}>
                      <button className="w-24 py-1 rounded-md border border-base-300">
                        Update Lab
                      </button>
                    </Link>
                    <button className="w-24 py-1 rounded-md border border-base-300">
                      Publish
                    </button>
                    <button className="w-24 py-1 rounded-md border border-base-300">
                      Delete
                    </button>
                  </td>
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
