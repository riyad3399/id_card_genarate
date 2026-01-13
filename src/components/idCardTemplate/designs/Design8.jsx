import { Droplet } from "lucide-react";
import formatDOB from "../../helper/formatDOB";
// import formatDOB from "../../helper/formatDOB-";

const baseUrl = "http://localhost:5000";

function fullUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

export default function Design8({ data }) {
  const photo = data?.photo_url;
    const logo = data?.institute?.logo_url;
    const instituteName = data?.institute?.name || "INSTITUTE NAME";


  return (
    <div className="relative w-[57mm] h-[89mm] bg-[#ffff] overflow-hidden border border-gray-200 ">
      <div className="  text-center z-10 absolute absolute-top-0 left-0 mt-1">
        <p
          className="font-extrabold leading-tight uppercase text-[#ffffff]"
          style={{
            fontSize: "clamp(10px,1.6vw,13px)",
            fontFamily: "Nikosh, Kalpurush, sans-serif",
          }}
        >
          {instituteName || "Your Institute Name"}
        </p>
      </div>{" "}
      {/* Top curved green header */}
      <div className="absolute top-0 left-0 right-0 h-[26mm]">
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#39a14a" />
              <stop offset="100%" stopColor="#1e8f4a" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 L1440,0 L1440,200 Q960,120 720,140 Q240,160 0,100 Z"
            fill="url(#g1)"
          />
        </svg>
        {/* small logo centered on top inside white rounded square */}
        <div className="absolute h-10 w-10 rounded-md bg-[#ffff] top-[12mm] left-4 ">
          {logo ? (
            <img
              src={fullUrl(logo)}
              alt="logo"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <span className="text-[9px] font-bold">LOGO</span>
          )}
        </div>
      </div>
      {/* Big circular photo area */}
      <div className="relative flex justify-center mt-[10mm]">
        <div className="relative flex justify-center -mt-[-26px]">
          <div className="w-[80px] h-[99px] rounded-[7px] border-[2px] border-[#1e8f4a] bg-gray-100 overflow-hidden">
            {photo ? (
              <img
                src={fullUrl(photo)}
                alt="student"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                No Photo
              </div>
            )}
          </div>

          {/* Blood Group */}
          {data?.bloodGroup && (
            <div className="absolute -left-12 top-12 z-10">
              <div className="relative">
                <Droplet
                  size={27}
                  className="fill-red-600 text-red-700 drop-shadow-lg"
                  strokeWidth={1.5}
                />
                <span className="absolute inset-0 flex items-center top-1 justify-center text-[7.5px] font-semibold text-white">
                  {data.bloodGroup}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* ================= BODY ================= */}
      <div
        className="pt-2 px-4 text-gray-800"
        style={{ fontFamily: "Nikosh, Kalpurush, sans-serif" }}
      >
        {/* STUDENT NAME */}
        <p
          className="text-center font-bold text-[] whitespace-nowrap overflow-hidden leading-tight mb-2 uppercase"
          style={{ fontSize: "clamp(9px,1.6vw,13px)" }}
        >
          {data?.studentName || "Student Name"}
        </p>

        {/* Row LIST */}
        <div className=" text-[9.5px]">
          <div className="grid grid-cols-[22%_3.5%_1fr] items-start text-[9.5px] font-bold ml-[0.5px]">
            <span>ID</span>
            <span>:</span>
            <span
              className="flex gap-3 whitespace-nowrap overflow-hidden"
              style={{ fontSize: "clamp(7.5px,1.5vw,9.5px)" }}
            >
              <span>
                {data?.institute?.shortName}
                {data?.studentId || "-"}
              </span>
              <span>Roll : {data?.roll || "-"}</span>
            </span>
          </div>
          <Row label="Father" value={data?.fatherName || "-"} />

          <Row label="Class" value={data?.className || "-"} />
          {data?.groupName && <Row label="Group" value={data?.groupName} />}

          <Row label="Gender" value={data?.gender || "-"} />

          {data?.dob && <Row label="D.O.B" value={formatDOB(data?.dob)} />}

          {data?.mobileNumber !== "0" ? (
            <Row label="Phone" value={0 + data?.mobileNumber} />
          ) : (
            <Row label="Phone" value={0} />
          )}
        </div>
      </div>
      {/* small signature (optional) */}
      {data?.institute?.signature_url && (
        <div className="absolute right-4 bottom-7 text-center z-10">
          <img
            src={fullUrl(data.institute.signature_url)}
            className="h-8"
            alt="sign"
          />
          <div className="text-[8.5px] font-bold border-t mt-1 text-gray-800">
            Principal
          </div>
        </div>
      )}
      {/* Bottom curved green footer */}
      <div className="absolute bottom-0 left-0 right-0 h-[14mm]">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e8f4a" />
              <stop offset="100%" stopColor="#39a14a" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q240,20 480,70 Q720,120 960,50 Q1200,0 1440,80 L1440,200 L0,200 Z"
            fill="url(#g2)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none top-5">
          <div className="text-white text-[11px] font-bold">
            Student Identity Card
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-[22%_3.5%_1fr] items-center">
      <div className="font-bold ">{label}</div>
      <div className="font-bold">:</div>
      <div className="text-[9px] truncate font-bold">{value}</div>
    </div>
  );
}
