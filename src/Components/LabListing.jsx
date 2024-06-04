import { Link } from "react-router-dom";

const LabListing = () => {
    return (
        <div>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <select className="select select-bordered w-full max-w-[200px]">
                        <option disabled selected>Cloud Provider</option>
                        <option>Normal Apple</option>
                        <option>Normal Orange</option>
                        <option>Normal Tomato</option>
                    </select>
                    <select className="select select-bordered w-full max-w-[200px]">
                        <option disabled selected>Lab Type</option>
                        <option>Normal Apple</option>
                        <option>Normal Orange</option>
                        <option>Normal Tomato</option>
                    </select>
                    <select className="select select-bordered w-full max-w-[200px]">
                        <option disabled selected>Difficulty Level</option>
                        <option>Normal Apple</option>
                        <option>Normal Orange</option>
                        <option>Normal Tomato</option>
                    </select>
                </div>
                <div>
                    <Link to={'/createnewlab'}><button className="py-2 px-3 rounded-md border border-black">Create new lab</button></Link>
                </div>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Lab Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <td className="w-[5%]">1</td>
                            <td className="w-full">This is a very long lab title</td>
                            <td className="flex gap-4">
                                <button className="w-24 py-1 rounded-md border border-black">Edit Metadata</button>
                                <button className="w-24 py-1 rounded-md border border-black">Edt Steps</button>
                                <button className="w-24 py-1 rounded-md border border-black">Publish</button>
                                <button className="w-24 py-1 rounded-md border border-black">Delete</button>
                            </td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <td className="w-[5%]">2</td>
                            <td>This is a very long lab title</td>
                            <td className="flex gap-4">
                                <button className="w-24 py-1 rounded-md border border-black">Edit Metadata</button>
                                <button className="w-24 py-1 rounded-md border border-black">Edt Steps</button>
                                <button className="w-24 py-1 rounded-md border border-black">Publish</button>
                                <button className="w-24 py-1 rounded-md border border-black">Delete</button>
                            </td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <td className="w-[5%]">3</td>
                            <td>This is a very long lab title</td>
                            <td className="flex gap-4">
                                <button className="w-24 py-1 rounded-md border border-black">Edit Metadata</button>
                                <button className="w-24 py-1 rounded-md border border-black">Edt Steps</button>
                                <button className="w-24 py-1 rounded-md border border-black">Publish</button>
                                <button className="w-24 py-1 rounded-md border border-black">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LabListing;