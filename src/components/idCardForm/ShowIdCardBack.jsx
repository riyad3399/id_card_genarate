import  { useEffect, useState } from "react";
import { InstituteBackCard } from "../idCardTemplate/StudentIDCard";
export default function ShowIdCardBack({ fetchByEmail = false }) {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const loadAll = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:5000/api/institutes", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setInstitutes(Array.isArray(data) ? data : []);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load institutes");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadAll();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const handleSelect = async (e) => {
    const idOrEmail = e.target.value;
    setSelectedId(idOrEmail);
    setSelectedInstitute(null);

    if (!idOrEmail) return;

    const local = institutes.find(
      (ins) => ins._id === idOrEmail || ins.id === idOrEmail
    );

    if (!fetchByEmail) {
      if (local) setSelectedInstitute(local);
      return;
    }


    let emailToUse = idOrEmail;
    if (local && local.contactEmail) emailToUse = local.contactEmail;

    try {
      setLoadingDetail(true);
      const res = await fetch(
        `http://localhost:5000/api/institutes/by-email?email=${encodeURIComponent(
          emailToUse
        )}`
      );
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setSelectedInstitute(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load institute");
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Select Institute</h2>

      {loading ? (
        <div className="text-sm text-slate-600">Loading institutes…</div>
      ) : error ? (
        <div className="text-sm text-red-600">Error: {error}</div>
      ) : (
        <>
          <div className="mb-4 flex items-center gap-2">
            <select
              value={selectedId}
              onChange={handleSelect}
              className="border px-3 py-2 rounded w-full max-w-md"
            >
              <option value="">-- choose institute --</option>
              {institutes.map((ins) => {
                const value = ins._id || ins.id || ins.contactEmail || "";
                const label = ins.name
                  ? `${ins.name} ${
                      ins.contactEmail ? `(${ins.contactEmail})` : ""
                    }`
                  : ins.contactEmail || value;
                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>

            <button
              onClick={() => {
                if (!selectedId && institutes.length > 0) {
                  const first = institutes[0];
                  setSelectedId(
                    first._id || first.id || first.contactEmail || ""
                  );
                  setSelectedInstitute(first);
                }
              }}
              className="px-3 py-2 bg-gradient-to-b from-sky-200 to-sky-600 text-white rounded"
            >
              Show
            </button>
          </div>

          <div>
            {loadingDetail ? (
              <div className="text-sm text-slate-600">Loading institute…</div>
            ) : selectedInstitute ? (
              <InstituteBackCard
                institute={{
                  name: selectedInstitute.name,
                  logo_url: selectedInstitute.logo_url,
                  eiin: selectedInstitute.eiin,
                  estd: selectedInstitute.estd,
                  website: selectedInstitute.website,
                  address: selectedInstitute.address,
                  phone: selectedInstitute.phone,
                }}
                contact={{
                  address: selectedInstitute.address,
                  phone: selectedInstitute.phone,
                  emergency:
                    selectedInstitute.emergency || selectedInstitute.phone,
                }}
                theme="light"
              />
            ) : (
              <div className="text-sm text-slate-500">
                No institute selected.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
