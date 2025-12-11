import { useState } from "react";

export default function AddInstitute() {
  const [form, setForm] = useState({
    name: "",
    sohortName:"",
    type: "",
    address: "",
    contactEmail: "",
    phone: "",
    
    eiin: "",
    estd: "",
    website: "",
  });
  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };
  const handleDragOver = (e) => e.preventDefault();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };
  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSignature(file);
    setSignaturePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // basic client-side required check
    const required = [
      "name",
      "type",
      "address",
      "contactEmail",
      "phone",
      "eiin",
      "website",
    ];
    const missing = required.filter(
      (key) => !form[key] || String(form[key]).trim() === ""
    );
    if (missing.length) {
      setMessage("❌ Missing required fields: " + missing.join(", "));
      setLoading(false);
      return;
    }

    console.log("Institute submit", form);

    try {
      const formData = new FormData();
      // append only keys that have value (optional)
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value);
      });
      if (logo) formData.append("logo", logo);
      if (signature) formData.append("signature", signature);

      const res = await fetch("http://localhost:5000/api/institutes/add", {
        method: "POST",
        body: formData, // don't set Content-Type when using FormData
      });

      const data = await res.json();
      console.log("Server response:", res.status, data);

      if (res.ok) {
        setMessage("✅ Institute added successfully!");
        setForm({
          name: "",
          type: "",
          shortName: "", // rename sohortName -> shortName if you change state
          address: "",
          contactEmail: "",
          phone: "",
          eiin: "",
          estd: "",
          website: "",
        });
        setLogo(null);
        setLogoPreview(null);
        setSignature(null);
        setSignaturePreview(null);
      } else {
        // show detailed server message if present
        const errMsg = data?.message || "Something went wrong";
        if (data?.errors) {
          // append mongoose validation errors
          const details = Object.entries(data.errors)
            .map(([k, v]) => `${k}: ${v}`)
            .join(" | ");
          setMessage(`❌ Failed: ${errMsg} - ${details}`);
        } else if (data?.keyValue) {
          setMessage(`❌ Duplicate: ${JSON.stringify(data.keyValue)}`);
        } else {
          setMessage("❌ Failed: " + errMsg);
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error or network issue");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-7xl mx-auto mt-6 bg-base-100 p-8 rounded-2xl shadow-lg ring ring-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Institute</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-12 gap-x-3">
          {/* Institute Name */}
          <div className="col-span-5">
            <label className="label">
              <span className="label-text font-semibold">Institute Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter institute name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Contact Email */}
          <div className="col-span-3">
            <label className="label">
              <span className="label-text font-semibold">Contact Email</span>
            </label>
            <input
              type="email"
              name="contactEmail"
              placeholder="example@email.com"
              value={form.contactEmail}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Phone */}
          <div className="col-span-2">
            <label className="label">
              <span className="label-text font-semibold">Phone Number</span>
            </label>
            <input
              type="text"
              name="phone"
              placeholder="+8801XXXXXXXXX"
              value={form.phone}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="label">
              <span className="label-text font-semibold">
                Institute Short Name
              </span>
            </label>
            <input
              type="text"
              name="sohortName"
              placeholder="ATCC"
              value={form.sohortName  }
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-3">
          <div className="col-span-1">
            <label className="label">
              <span className="label-text font-semibold">Estd.</span>
            </label>
            <input
              type="text"
              name="estd"
              placeholder="1971"
              value={form.estd}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="label">
              <span className="label-text font-semibold">EIIN</span>
            </label>
            <input
              type="text"
              name="eiin"
              placeholder="123624"
              value={form.eiin}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="col-span-3">
            <label className="label">
              <span className="label-text font-semibold">Website Address</span>
            </label>
            <input
              type="text"
              name="website"
              placeholder="www.example.edu.bd"
              value={form.website}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Address */}
          <div className="col-span-4">
            <label className="label">
              <span className="label-text font-semibold">Address</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter institute address"
              value={form.address}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* short name */}
          <div className="col-span-2">
            <label className="label">
              <span className="label-text font-semibold">Type</span>
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="school">School</option>
              <option value="college">College</option>
              <option value="university">University</option>
              <option value="training_center">Training Center</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold">
              Institute Logo
            </label>
            <div
              className="flex items-center gap-4 border-2 border-dashed border-gray-300 rounded-xl p-1 cursor-pointer hover:border-blue-500 transition"
              onClick={() => document.getElementById("logo-input").click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="image/*"
                id="logo-input"
                className="hidden"
                onChange={handleLogoChange}
              />

              {!logoPreview ? (
                <div className="text-center flex flex-col items-center justify-center w-32 h-32">
                  <svg
                    className="w-10 h-10 text-gray-400 mb-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0 0l-3-3m3 3l3-3M12 4v8"
                    />
                  </svg>
                  <span className="text-gray-500 text-sm">
                    Click or Drop Logo
                  </span>
                </div>
              ) : (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-32 h-32 rounded-xl object-cover border shadow-md"
                />
              )}
            </div>
            {logo && (
              <p className="mt-2 text-gray-500 text-sm truncate w-40">
                Selected file: {logo.name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Pinciple Signature
            </label>
            <div
              className="flex items-center gap-4 border-2 border-dashed border-gray-300 rounded-xl p-1 cursor-pointer hover:border-blue-500 transition"
              onClick={() => document.getElementById("signature-input").click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="image/*"
                id="signature-input"
                className="hidden"
                onChange={handleSignatureChange}
              />

              {!signaturePreview ? (
                <div className="text-center flex flex-col items-center justify-center w-32 h-32">
                  <svg
                    className="w-10 h-10 text-gray-400 mb-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0 0l-3-3m3 3l3-3M12 4v8"
                    />
                  </svg>
                  <span className="text-gray-500 text-sm">
                    Click or Drop Logo
                  </span>
                </div>
              ) : (
                <img
                  src={signaturePreview}
                  alt="Signature Preview"
                  className="w-32 h-32 rounded-xl object-cover border shadow-md"
                />
              )}
            </div>
            {signature && (
              <p className="mt-2 text-gray-500 text-sm truncate w-40">
                Selected file: {signature.name}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6 ">
          <button
            type="submit"
            className={`btn btn-primary btn-block ${loading ? "loading" : ""}`}
          >
            {loading ? "Saving..." : "Add Institute"}
          </button>
        </div>
      </form>

      {message && (
        <div
          className={`alert mt-5 ${
            message.startsWith("✅") ? "alert-success" : "alert-error"
          }`}
        >
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
