import formatDOB from "../../helper/formatDOB";

const baseUrl = "http://localhost:5000";
const fullUrl = (p) =>
  !p
    ? ""
    : p.startsWith("http")
    ? p
    : `${baseUrl}${p.startsWith("/") ? "" : "/"}${p}`;

export default function Design3({ data }) {
  const photo = fullUrl(data?.photo_url);
  const logo = fullUrl(data?.institute?.logo_url);
    const signature = fullUrl(data?.institute?.signature_url);


  return (
    <div className="relative w-[57mm] h-[89mm] bg-white overflow-hidden border border-gray-300 font-sans">
      {/* ===== BACKGROUND BLOBS ===== */}
      <div className="absolute -top-6 -left-6 w-20 h-20 bg-orange-400 rounded-full opacity-80" />
      <div className="absolute top-12 -right-6 w-20 h-20 bg-green-400 rounded-full opacity-80" />
      <div className="absolute bottom-10 -left-6 w-16 h-16 bg-green-300 rounded-full opacity-70" />
      <div className="absolute -top-10 left-8 w-16 h-16 bg-sky-500 rounded-full opacity-70" />
      <div className="absolute bottom-0 -right-6 w-20 h-20 bg-orange-300 rounded-full opacity-80" />
      <div className="absolute bottom-10 -right-9 w-16 h-16 bg-sky-300 rounded-full opacity-80" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 px-3 pt-2 text-center">
        {/* Logo */}
        {logo && (
          <div className="w-9 h-9 mx-auto rounded-full  ">
            <img src={logo} alt="logo" className="w-full h-full" />
          </div>
        )}

        {/* School Name */}
        <p
          className="mt-1 font-bold uppercase text-green-600 leading-tight"
          style={{ fontSize: "clamp(13px,2vw,14px)" }}
        >
          {data?.institute?.name || "SCHOOL NAME"}
        </p>

        {/* PHOTO */}
        <div className="mt-2 flex justify-center">
          <div className="w-[80px] h-[99px] bg-white border-[3px] border-orange-400 flex items-center justify-center rounded-[7px]">
            {photo ? (
              <img
                src={photo}
                alt="student"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[9px] text-gray-400">PHOTO</span>
            )}
          </div>
        </div>
      </div>

      {/* ===== BODY ===== */}
      <div className="relative z-10 mt-2 px-4 text-left text-gray-800 space-y-[2px]">
        {/* Student Name */}
        <p
          className="font-bold uppercase text-green-600 text-center whitespace-nowrap overflow-hidden"
          style={{ fontSize: "clamp(9px,1.6vw,11px)" }}
        >
          {data?.studentName || "JONTHAN DOW"}
        </p>

        <Info label="Roll" value={data?.roll || "0125"} />
        <Info label="Student ID" value={data?.studentId || "0125"} />
        <Info label="Father's Name" value={data?.fatherName || "Father Name"} />
        <Info label="Class" value={data?.className || "class Name"} />
        <Info label="Group" value={data?.groupName || "0125"} />
        <Info label="Gender" value={data?.gender || "Male"} />
        <Info label="DOB" value={formatDOB(data?.dob) || "0125"} />
      </div>

      <div className="absolute bottom-[14px] right-3 text-center z-10">
        {signature && (
          <img src={signature} alt="sign" className="h-8 mx-auto" />
        )}
        <p className="text-[8px] border-t font-medium">Principal </p>
      </div>
      <div className="absolute text-white text-center bottom-0 left-0 w-full h-[12px] text-[8px] bg-gradient-to-r from-orange-600 to-green-500">
        STUDENT IDENTITY CARD
      </div>
    </div>
  );
}

/* ===== INFO ROW ===== */
function Info({ label, value }) {
  return (
    <p
      className="leading-tight whitespace-nowrap overflow-hidden"
      style={{ fontSize: "clamp(7.5px,1.4vw,9.5px)" }}
    >
      <b>{label}</b> : {value}
    </p>
  );
}
