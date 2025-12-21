import { Droplet } from "lucide-react";
import formatDOB from "../../helper/formatDOB";

const baseUrl = "http://localhost:5000";
const fullUrl = (p) => (!p ? "" : p.startsWith("http") ? p : `${baseUrl}${p}`);

export default function Design4({ data }) {
  const photo = fullUrl(data?.photo_url);
  const logo = fullUrl(data?.institute?.logo_url);
  const signature = fullUrl(data?.institute?.signature_url);

  return (
    <div className="relative w-[58mm] h-[90mm] bg-white overflow-hidden border border-gray-400 font-sans">
      {/* ================= HEADER ================= */}
      <div className="relative h-[70px] text-white text-center px-2 pt-2">
        <div className="  text-center z-10 absolute absolute-top-0 left-0 mt-1">
          <p
            className="font-bold leading-tight uppercase"
            style={{ fontSize: "clamp(10px,1.6vw,14px)" }}
          >
            {data?.institute?.name || "Your Institute Name"}
          </p>
        </div>
        {/* wave */}
        <svg
          viewBox="0 0 1440 690"
          preserveAspectRatio="none"
          className="
    absolute
    -bottom-[14px]
    left-0
    w-full
    h-[70px]
    scale-[1.8]
    z-0
   
  "
        >
          <defs>
            <linearGradient id="gradient" x1="1%" y1="58%" x2="99%" y2="42%">
              <stop offset="5%" stop-color="#2f4fb5"></stop>
              <stop offset="95%" stop-color="#2f4fa3"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,700 L 0,105 C 88.90909090909093,96.77033492822966 177.81818181818187,88.54066985645932 267,96 C 356.18181818181813,103.45933014354068 445.6363636363636,126.60765550239236 531,158 C 616.3636363636364,189.39234449760764 697.6363636363635,229.0287081339713 817,263 C 936.3636363636365,296.9712918660287 1093.8181818181818,325.2775119617225 1204,348 C 1314.1818181818182,370.7224880382775 1377.090909090909,387.8612440191388 1440,405 L 1440,700 L 0,700 Z"
            stroke="none"
            stroke-width="0"
            fill="url(#gradient)"
            fill-opacity="0.265"
            class="transition-all duration-300 ease-in-out delay-150 path-0"
            transform="rotate(-180 720 350)"
          ></path>
          <defs>
            <linearGradient id="gradient" x1="1%" y1="58%" x2="99%" y2="42%">
              <stop offset="5%" stop-color="#2f4fb5"></stop>
              <stop offset="95%" stop-color="#2f4fa3"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,700 L 0,245 C 86.51674641148324,233.19138755980862 173.03349282296648,221.38277511961724 268,250 C 362.9665071770335,278.61722488038276 466.3827751196171,347.66028708133973 580,369 C 693.6172248803829,390.33971291866027 817.4354066985647,363.97607655502384 910,369 C 1002.5645933014353,374.02392344497616 1063.8755980861242,410.43540669856463 1147,445 C 1230.1244019138758,479.56459330143537 1335.0622009569379,512.2822966507176 1440,545 L 1440,700 L 0,700 Z"
            stroke="none"
            stroke-width="0"
            fill="url(#gradient)"
            fill-opacity="0.4"
            class="transition-all duration-300 ease-in-out delay-150 path-1"
            transform="rotate(-180 720 350)"
          ></path>
          <defs>
            <linearGradient id="gradient" x1="1%" y1="58%" x2="99%" y2="42%">
              <stop offset="5%" stop-color="#2f4fb8"></stop>
              <stop offset="95%" stop-color="#2f4fa3"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,700 L 0,385 C 66.51674641148324,395.3636363636364 133.03349282296648,405.7272727272727 240,418 C 346.9665071770335,430.2727272727273 494.38277511961724,444.45454545454544 602,459 C 709.6172248803828,473.54545454545456 777.4354066985645,488.4545454545454 854,507 C 930.5645933014355,525.5454545454546 1015.8755980861245,547.7272727272727 1115,578 C 1214.1244019138755,608.2727272727273 1327.0622009569379,646.6363636363636 1440,685 L 1440,700 L 0,700 Z"
            stroke="none"
            stroke-width="0"
            fill="url(#gradient)"
            fill-opacity="0.53"
            class="transition-all duration-300 ease-in-out delay-150 path-2"
            transform="rotate(-180 720 350)"
          ></path>
          <defs>
            <linearGradient id="gradient" x1="1%" y1="58%" x2="99%" y2="42%">
              <stop offset="5%" stop-color="#2f4fb8"></stop>
              <stop offset="95%" stop-color="#2f4fa3"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,700 L 0,525 C 83.77033492822966,540.5406698564593 167.54066985645932,556.0813397129186 255,560 C 342.4593301435407,563.9186602870814 433.6076555023924,556.2153110047847 536,581 C 638.3923444976076,605.7846889952153 752.0287081339712,663.0574162679426 854,682 C 955.9712918660288,700.9425837320574 1046.2775119617227,681.5550239234449 1142,699 C 1237.7224880382773,716.4449760765551 1338.8612440191387,770.7224880382776 1440,825 L 1440,700 L 0,700 Z"
            stroke="none"
            stroke-width="0"
            fill="url(#gradient)"
            fill-opacity="1"
            class="transition-all duration-300 ease-in-out delay-150 path-3"
            transform="rotate(-180 720 350)"
          ></path>
        </svg>
      </div>

      {/* ================= LOGO ================= */}
      <div className="absolute top-[78px] left-3 w-[38px] h-[38px] bg-white rounded-full shadow">
        {logo && (
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        )}
      </div>

      {/* ================= BLOOD GROUP ================= */}
      {data?.bloodGroup && (
        <div className="absolute top-[130px] left-4 z-10">
          <div className="relative">
            <Droplet size={26} className="fill-red-600 text-red-700" />
            <span className="absolute inset-0 flex items-center justify-center text-[7px] font-semibold text-white top-2 ">
              {data.bloodGroup}
            </span>
          </div>
        </div>
      )}

      {/* ================= PHOTO ================= */}
      <div className="flex justify-center mt-[8px]">
        <div className="w-[22mm] h-[27mm] border-[3px] border-[#2f4fa3] bg-white rounded-[7px] overflow-hidden shadow-md">
          {photo ? (
            <img
              src={photo}
              alt="student"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-[9px] text-gray-400">
              No Photo
            </div>
          )}
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="pt-1 px-4 text-gray-800">
        {/* STUDENT NAME */}
        <p
          className="text-center font-bold text-[#4c1d95] whitespace-nowrap overflow-hidden leading-tight mb-2 uppercase"
          style={{ fontSize: "clamp(9px,1.6vw,11px)" }}
        >
          {data?.studentName || "Smith James"}
        </p>

        {/* body */}
        <div className=" text-[9.5px] ">
          <div className="grid grid-cols-[28%_5%_1fr] items-start text-[9.5px] font-bold">
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

          <Info label="Phone" value={data?.mobileNumber || "-"} />
        </div>
      </div>

      {/* ================= SIGNATURE ================= */}
      <div className="absolute bottom-[25px] right-4 text-center">
        {signature && (
          <img src={signature} alt="sign" className="h-[35px] object-cover" />
        )}
        <p className="text-[9.5px] border-t font-semibold">Principal</p>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="absolute bottom-0 w-full h-[20px] bg-gradient-to-r from-[#2f4fb8] to-[#2f4fa2] flex items-center justify-center">
        <p className="text-[9px] text-white font-semibold">
          Student Identity Card
        </p>
      </div>
    </div>
  );
}


/* ================= INFO ROW ================= */
function Info({ label, value }) {
  return (
    <div className="grid grid-cols-[28%_5%_1fr] items-start font-bold">
      <span className="font-bold">{label}</span>
      <span>:</span>
      <span
        className="whitespace-nowrap overflow-hidden"
        style={{ fontSize: "clamp(7.5px,1.5vw,9.5px)" }}
      >
        {value}
      </span>
    </div>
  );
}
