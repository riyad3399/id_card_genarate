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
  const getUniqueValues = (arr, key) => [
    ...new Set(arr.map((i) => i?.[key]).filter(Boolean)),
  ];

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [printStudents, setPrintStudents] = useState([]); // 🔥 print-only
  const [institutes, setInstitutes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [hasFiltered, setHasFiltered] = useState(false);
  const [showPrintable, setShowPrintable] = useState(false);

  const [selectedDesign, setSelectedDesign] = useState("design1");

  const [filters, setFilters] = useState({
    instituteId: "",
    className: "",
    section: "",
    groupName: "",
  });

  const printRef = useRef(null);

  /* ---------------- PRINT HANDLER ---------------- */

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Student-ID-Cards",
  });

  /* -------- IMG URL → BASE64 (PRINT SAFE) -------- */

  const convertToBase64 = async (url) => {
    const res = await fetch(url, { mode: "cors" });
    const blob = await res.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const prepareStudentsForPrint = async () => {
    const prepared = await Promise.all(
      filteredStudents.map(async (s) => {
        if (!s.photo_url) return s;

        try {
          const base64 = await convertToBase64(s.photo_url);
          return {
            ...s,
            photo: base64, // 🔥 print time image
          };
        } catch {
          return s;
        }
      })
    );

    setPrintStudents(prepared);

    // print after DOM update
    setTimeout(() => handlePrint(), 300);
  };

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/institutes`)
      .then((res) => res.json())
      .then((data) => setInstitutes(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/students`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (mounted) setStudents(Array.isArray(data) ? data : []);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  /* ---------------- FILTER ---------------- */

  const handleFilterChange = (e) =>
    setFilters((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFilter = () => {
    let result = [...students];

    if (filters.instituteId)
      result = result.filter((s) => s?.institute?._id === filters.instituteId);
    if (filters.className)
      result = result.filter((s) => s?.className === filters.className);
    if (filters.section)
      result = result.filter((s) => s?.section === filters.section);
    if (filters.groupName)
      result = result.filter((s) => s?.groupName === filters.groupName);

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

  /* ---------------- UI ---------------- */

  return (
    <div className="p-4 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">All Student ID Cards</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setShowPrintable((s) => !s)}
            className="px-3 py-1 text-white bg-gradient-to-b from-sky-200 to-sky-600 rounded"
          >
            {showPrintable ? "Hide Printable" : "Show Printable"}
          </button>

          <button
            onClick={prepareStudentsForPrint}
            disabled={!hasFiltered || filteredStudents.length === 0}
            className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
          >
            🖨 Print (Illustrator Safe)
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-12 gap-3 items-end">
          <select
            name="instituteId"
            value={filters.instituteId}
            onChange={handleFilterChange}
            className="select select-bordered col-span-3"
          >
            <option value="">Select Institute</option>
            {institutes.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>

          <select
            name="className"
            value={filters.className}
            onChange={handleFilterChange}
            className="select select-bordered col-span-2"
          >
            <option value="">All Classes</option>
            {classOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            name="section"
            value={filters.section}
            onChange={handleFilterChange}
            className="select select-bordered col-span-2"
          >
            <option value="">All Sections</option>
            {sectionOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            name="groupName"
            value={filters.groupName}
            onChange={handleFilterChange}
            className="select select-bordered col-span-2"
          >
            <option value="">All Groups</option>
            {groupOptions.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>

          <select
            value={selectedDesign}
            onChange={(e) => setSelectedDesign(e.target.value)}
            className="select select-bordered col-span-1"
          >
            {ID_CARD_DESIGNS.map((d) => (
              <option key={d.key} value={d.key}>
                {d.label}
              </option>
            ))}
          </select>

          <div className="col-span-2 flex gap-2">
            <button
              onClick={handleFilter}
              className="btn btn-sm bg-sky-600 text-white w-[70%]"
            >
              Show
            </button>
            <button
              onClick={resetFilter}
              className="btn btn-sm btn-outline w-[30%]"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* PREVIEW */}
      {hasFiltered && filteredStudents.length > 0 && !showPrintable && (
        <div className="grid md:grid-cols-5 sm:grid-cols-3 gap-4">
          {filteredStudents.map((s) => (
            <StudentIDCard key={s._id} data={s} design={selectedDesign} />
          ))}
        </div>
      )}

      

      {/* PRINT AREA (HIDDEN) */}
      <div className="hidden">
        <div ref={printRef} clsassName="pdf-safe">
          <IDCardPrintableSheet
            students={printStudents}
            design={selectedDesign}
            perRow={3}
            showBack={false}
          />
        </div>
      </div>
    </div>
  );
}
