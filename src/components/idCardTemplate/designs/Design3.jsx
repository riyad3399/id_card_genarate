import { Droplet } from "lucide-react";
import formatDOB from "../../helper/formatDOB";

const baseUrl = "http://localhost:5000";
const fullUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
};

export default function Design3({ data }) {

  const photo = fullUrl(data?.photo_url);
  const logo = fullUrl(data?.institute?.logo_url);
  const signature = fullUrl(data?.institute?.signature_url);

  return (
    <div className="relative w-[57mm] h-[89mm] overflow-hidden ">
      {/* ===== TOP RIGHT DESIGN ===== */}
      <div className=" w-full h-[90px] ">
        <div className="bg-[#0f5f4a] h-[60px] w-[140px] absolute rotate-[45deg] top-0 -right-10 inset-40 overflow-hidden"></div>
        <div className="bg-gray-300 h-[10px] w-[150px] absolute  right-13 top-0 rounded-md  overflow-hidden"></div>
        <div className="bg-gray-300 h-[10px] w-[220px] absolute  right-0 inset-18 top-5 rounded-md rotate-[45deg]  overflow-hidden"></div>
        <div className="bg-[#0f5f4a] h-[10px] w-[110px] absolute  right-13 top-2 rounded-md  overflow-hidden"></div>
        <div className="bg-[#0f5f4a] h-[10px] w-[140px] absolute  right-5  top-14 inset-34 rounded-md rotate-[45deg]  overflow-hidden"></div>
      </div>

      <p
        className="font-extrabold leading-tight uppercase absolute top-4 left-0 w-full text-center text-black dark:text[#ffffff]"
        style={{ fontSize: "clamp(10px,1.6vw,14.5px)" }}
      >
        {data?.institute?.name || "Your Institute Name"}
      </p>

      {/* ================= LOGO ================= */}
      <div className="w-10 h-10 rounded-md  bg-white absolute top-[68px] left-[13px] flex items-center justify-center overflow-hidden  border-gray-300 shadow-md">
        {logo && (
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        )}
      </div>

      {/* ===== Photo ===== */}
      <div className="relative flex justify-center ">
        <div className="w-[80px] h-[99px] rounded-[7px] border-[3px] border-[#0f5f4a] bg-gray-100 overflow-hidden absolute -top-4">
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
          <div className="absolute left-4 top-12 z-10">
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

      {/* ================= BODY ================= */}
      <div className="pt2 px-4 text-gray-800 absolute top-45 z-20 w-full ">
        {/* STUDENT NAME */}
        <p
          className="text-center font-bold text-[#0f5f4a] whitespace-nowrap overflow-hidden leading-tight py-2 uppercase"
          style={{ fontSize: "clamp(9px,1.6vw,13px)" }}
        >
          {data?.studentName || "Smith James"}
        </p>

        {/* body */}
        <div className=" text-[9.5px] ">
          <div className="grid grid-cols-[21%_3%_1fr] items-start text-[9.5px] font-bold">
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

          <Info label="Father" value={data?.fatherName || "-"} />

          {data?.className && (
            <Info label="Class" value={data?.className || "-"} />
          )}
          {data?.groupName && <Info label="Group" value={data?.groupName} />}

          {data?.gender && <Info label="Gender" value={data?.gender || "-"} />}

          {data?.dob && <Info label="D.O.B" value={formatDOB(data?.dob)} />}

          <Info label="Phone" value={0 + data?.mobileNumber || "-"} />
        </div>
      </div>

      {/* ================= SIGNATURE ================= */}
      <div className="absolute bottom-[25px] right-4 text-center">
        {signature && (
          <img src={signature} alt="sign" className="h-[35px] object-cover" />
        )}
        <p className="text-[9.5px] border-t font-semibold">Principal</p>
      </div>

      {/* ===== BOTTOM LEFT DESIGN ===== */}
      <div className="w-full h-[90px] ">
        {/* Main diagonal block */}
        <div className="bg-[#0f5f4a] h-[60px] w-[140px] absolute rotate-[45deg] bottom-0 -left-21 overflow-hidden"></div>

        {/* Light gray bottom bar */}
        <div className="bg-gray-300 h-[10px] w-[150px] absolute left-14 bottom-0 rounded-md overflow-hidden"></div>

        {/* Long diagonal gray bar */}
        <div
          className="bg-gray-300 h-[10px] w-[300px] -left-23 absolute 
          bottom-0 rounded-md rotate-[45deg] overflow-hidden"
        ></div>

        <div className="bg-[#0f5f4a] h-[10px] w-[110px] absolute left-14 bottom-2 rounded-md overflow-hidden"></div>

        <div className="bg-[#0f5f4a] h-[10px] w-[140px] absolute -left-14 bottom-14 rounded-md rotate-[45deg] overflow-hidden"></div>
      </div>

      {/* footer text / small website */}
    </div>
  );
}

/* Helper: label/value row */
function Info({ label, value }) {
  return (
    <div className="grid grid-cols-[21%_3%_1fr] items-start">
      <span className="font-bold">{label}</span>
      <span className="font-bold">:</span>
      <span
        className="whitespace-nowrap overflow-hidden font-bold"
        style={{ fontSize: "clamp(7.5px,1.5vw,9.5px)" }}
      >
        {value}
      </span>
    </div>
  );
}