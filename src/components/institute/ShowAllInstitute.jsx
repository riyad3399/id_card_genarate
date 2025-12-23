import { Edit, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ShowAllInstitute() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitute = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/institutes/all`);
        const data = await res.json();
        setInstitutes(data);
        console.log("all institute", data);
      } catch (err) {
        console.error("Failed to load institute:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitute();
  }, []);

  console.log(institutes);

  const handleDelete = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/api/institutes/${id}`, {
        method: "DELETE",
      });
      setInstitutes((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;
  if (!institutes.length)
    return <p className="text-center p-10 text-red-500">Data Not Found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">All Institutes</h2>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">EIIN</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Logo</th>
            <th className="border p-2">Signature</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {institutes.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="border p-2">{item.name}</td>
              <td className="border p-2 capitalize">{item.type}</td>
              <td className="border p-2">{item.eiin}</td>
              <td className="border p-2">{item.phone}</td>
              <td className="border p-2">{item.contactEmail}</td>

              <td className="border p-2">
                {item.logo_url ? (
                  <img
                    src={`http://localhost:5000${item.logo_url}`}
                    alt="logo"
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td className="border p-2">
                {item?.signature_url ? (
                  <img
                    src={`http://localhost:5000${item?.signature_url}`}
                    alt="logo"
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td className="border space-x-2 pl-2">
                <button className="px-2 py-1 rounded-md text-white bg-gradient-to-b from-sky-200 to-sky-600">
                  <Edit size={18}/>
                </button>
                <button
                  className="px-2 py-1 rounded-md text-white bg-red-500"
                  onClick={() => handleDelete(item._id)}
                >
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
