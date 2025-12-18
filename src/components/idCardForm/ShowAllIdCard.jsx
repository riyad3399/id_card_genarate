import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import {
  StudentIDCard,
  IDCardPrintableSheet,
} from "../idCardTemplate/StudentIDCard";

const ID_CARD_DESIGNS = [
  { key: "design1", label: "Design-1" },
  { key: "design2", label: "Design-2" },
  { key: "design3", label: "Design-3" },
  { key: "design4", label: "Design-4" },
  { key: "design5", label: "Design-5" },
  { key: "design6", label: "Design-6" },
  { key: "design7", label: "Design-7" },
  { key: "design8", label: "Design-8" },
  { key: "design9", label: "Design-9" },
  { key: "design10", label: "Design-10" },
];

export default function ShowAllIdCard() {
  const getUniqueValues = (arr, key) => {
    return [...new Set(arr.map((i) => i?.[key]).filter(Boolean))];
  };

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [institutes, setInstitutes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPrintable, setShowPrintable] = useState(false);
  const [hasFiltered, setHasFiltered] = useState(false);

  const [selectedDesign, setSelectedDesign] = useState("design1");

  const [filters, setFilters] = useState({
    instituteId: "",
    className: "",
    section: "",
    groupName: "",
  });

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Student-ID-Cards",
  });

  /* ---------- fetch institutes ---------- */
  useEffect(() => {
    fetch("http://localhost:5000/api/institutes")
      .then((res) => res.json())
      .then((data) => {
        setInstitutes(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
  }, []);

  /* ---------- fetch students ---------- */
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const getAllStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5000/api/students", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        const data = await res.json();
        if (mounted) setStudents(Array.isArray(data) ? data : []);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load students");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getAllStudents();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  /* ---------- filter handlers ---------- */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
  };

  const handleFilter = () => {
    let result = [...students];

    if (filters.instituteId) {
      result = result.filter((s) => s?.institute?._id === filters.instituteId);
    }
    if (filters.className) {
      result = result.filter((s) => s?.className === filters.className);
    }
    if (filters.section) {
      result = result.filter((s) => s?.section === filters.section);
    }
    if (filters.groupName) {
      result = result.filter((s) => s?.groupName === filters.groupName);
    }

    setFilteredStudents(result);
    setHasFiltered(true);
  };

  const resetFilter = () => {
    setFilters({
      instituteId: "",
      className: "",
      section: "",
      groupName: "",
    });
    setFilteredStudents([]);
    setHasFiltered(false);
  };

  const baseStudents = filters.instituteId
    ? students.filter((s) => s?.institute?._id === filters.instituteId)
    : students;

  const classOptions = getUniqueValues(baseStudents, "className");
  const sectionOptions = getUniqueValues(baseStudents, "section");
  const groupOptions = getUniqueValues(baseStudents, "groupName");

  return (
    <div className="p-4 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">All Student ID Cards</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setShowPrintable((s) => !s)}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            {showPrintable ? "Hide Printable" : "Show Printable"}
          </button>

          <button
            onClick={handlePrint}
            disabled={!hasFiltered || filteredStudents.length === 0}
            className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
          >
            🖨 Print
          </button>
        </div>
      </div>

      {/* FILTER + DESIGN BAR */}
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-12 gap-3 items-end">
          {/* Institute */}
          <select
            name="instituteId"
            value={filters.instituteId}
            onChange={handleFilterChange}
            className="select select-bordered col-span-3"
          >
            <option value="">Select Institute</option>
            {institutes.map((inst) => (
              <option key={inst._id} value={inst._id}>
                {inst.name}
              </option>
            ))}
          </select>

          {/* Class */}
          <select
            name="className"
            value={filters.className}
            onChange={handleFilterChange}
            className="select select-bordered col-span-2"
          >
            <option value="">All Classes</option>
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>

          {/* Section */}
          <select
            name="section"
            value={filters.section}
            onChange={handleFilterChange}
            className="select select-bordered col-span-2"
          >
            <option value="">All Sections</option>
            {sectionOptions.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>

          {/* Group */}
          <select
            name="groupName"
            value={filters.groupName}
            onChange={handleFilterChange}
            className="select select-bordered col-span-2"
          >
            <option value="">All Groups</option>
            {groupOptions.map((grp) => (
              <option key={grp} value={grp}>
                {grp}
              </option>
            ))}
          </select>

          {/* DESIGN SELECT */}
          <select
            value={selectedDesign}
            onChange={(e) => setSelectedDesign(e.target.value)}
            className="select select-bordered col-span-1"
          >
            {ID_CARD_DESIGNS.map((design) => (
              <option key={design.key} value={design.key}>
                {design.label}
              </option>
            ))}
          </select>

          <div className="col-span-2 flex gap-2">
            <button
              onClick={handleFilter}
              className="btn btn-primary btn-sm w-[70%]"
            >
              Show
            </button>
            <button
              onClick={resetFilter}
              className="btn btn-outline btn-sm w-[30%]"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* MESSAGE BEFORE FILTER */}
      {!hasFiltered && !loading && (
        <div className="text-sm text-slate-500 text-center">
          🔍 Please select filter and click <b>Show</b> to view ID cards
        </div>
      )}

      {/* NO RESULT */}
      {hasFiltered && filteredStudents.length === 0 && (
        <div className="text-sm text-slate-600 text-center">
          No students found for selected filter.
        </div>
      )}

      {/* PREVIEW */}
      {hasFiltered && filteredStudents.length > 0 && !showPrintable && (
        <div className="grid grid-cols-6 gap-4">
          {filteredStudents.map((std) => (
            <StudentIDCard
              key={std._id || std.id}
              data={std}
              design={selectedDesign}
            />
          ))}
        </div>
      )}

      {/* PRINT AREA */}
      <div className="hidden">
        <div ref={printRef}>
          <IDCardPrintableSheet
            students={filteredStudents}
            design={selectedDesign}
            perRow={3}
            showBack={false}
          />
        </div>
      </div>
    </div>
  );
}
