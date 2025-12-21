import { useState } from "react";

export default function AddInstitute() {
  const [form, setForm] = useState({
    name: "",
    shortName: "",
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

  /* ---------- handlers (UNCHANGED LOGIC) ---------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFile = (setter, previewSetter) => (e) => {
    const file = e.target.files?.[0] || e.dataTransfer.files?.[0];
    if (!file) return;
    setter(file);
    previewSetter(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (logo) fd.append("logo", logo);
      if (signature) fd.append("signature", signature);

      const res = await fetch("http://localhost:5000/api/institutes/add", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Institute added successfully");
        setForm({
          name: "",
          shortName: "",
          type: "",
          address: "",
          contactEmail: "",
          phone: "",
          eiin: "",
          estd: "",
          website: "",
        });
        setLogo(null);
        setSignature(null);
        setLogoPreview(null);
        setSignaturePreview(null);
      } else {
        setMessage("❌ " + (data?.message || "Failed"));
      }
    } catch {
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border p-8">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Add Institute</h1>
          <p className="text-gray-500 mt-1">
            Create a new educational institute profile
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* STEP 1 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              🏫 Institute Information
            </h3>

            <div className=" grid grid-cols-12 gap-4 mb-6">
              <input
                className="input input-bordered col-span-7 w-full"
                placeholder="Institute full name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                className="input input-bordered col-span-3"
                placeholder="Short name"
                name="shortName"
                value={form.shortName}
                onChange={handleChange}
                required
              />

              <select
                className="select select-bordered col-span-2"
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="school">School</option>
                <option value="college">College</option>
                <option value="university">University</option>
                <option value="madrasa">madrasa</option>
              </select>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <input
                className="input input-bordered col-span-4"
                placeholder="Contact email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                required
              />

              <input
                className="input input-bordered col-span-3"
                placeholder="Phone number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <input
                className="input input-bordered col-span-5"
                placeholder="Full address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {/* STEP 2 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              📚 Academic Details
            </h3>

            <div className="grid grid-cols-12 gap-4">
              <input
                className="input input-bordered col-span-3"
                placeholder="EIIN (e.g., 123456)"
                name="eiin"
                type="number"
                value={form.eiin}
                onChange={handleChange}
              />

              <input
                className="input input-bordered col-span-3"
                placeholder="Established year (e.g., 1995)"
                name="estd"
                value={form.estd}
                onChange={handleChange}
              />

              <input
                className="input input-bordered col-span-6"
                placeholder="Website (suhss.edu.bd)"
                name="website"
                value={form.website}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {/* STEP 3 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              🖼 Branding Assets
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  label: "Institute Logo",
                  preview: logoPreview,
                  onChange: handleFile(setLogo, setLogoPreview),
                  id: "logo",
                },
                {
                  label: "Principal Signature",
                  preview: signaturePreview,
                  onChange: handleFile(setSignature, setSignaturePreview),
                  id: "signature",
                },
              ].map((f) => (
                <div
                  key={f.id}
                  className="border-2 border-dashed rounded-2xl p-6 text-center hover:border-indigo-500 transition cursor-pointer"
                  onClick={() => document.getElementById(f.id).click()}
                  onDrop={f.onChange}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <input
                    id={f.id}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={f.onChange}
                  />

                  {f.preview ? (
                    <img
                      src={f.preview}
                      className="w-32 h-32 mx-auto rounded-xl object-cover"
                    />
                  ) : (
                    <>
                      <p className="font-medium text-gray-600">{f.label}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Click or drag image here
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ACTION */}
          <button
            className={`btn bg-gradient-to-b from-sky-200 to-sky-600 text-white w-full text-lg ${
              loading ? "loading" : ""
            }`}
          >
            {loading ? "Saving..." : "Create Institute"}
          </button>
        </form>

        {message && (
          <div
            className={`alert mt-8 ${
              message.startsWith("✅") ? "alert-success" : "alert-error"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
