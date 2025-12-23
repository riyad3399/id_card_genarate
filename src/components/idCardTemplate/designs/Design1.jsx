import { Droplet } from "lucide-react";
import formatDOB from "../../helper/formatDOB";

const baseUrl = "http://localhost:5000";

function fullUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

export default function Design1({ data }) {
const photo = data?.photo_url; 
const logo = data?.institute?.logo_url;       
  const signature = data?.institute?.signature_url; 
  
  console.log("photo url ", photo);

console.log(data);

  return (
    <div className="relative w-[57mm] h-[89mm] bg-white overflow-hidden border border-gray-300 ">
      {/* ===== Top Header ===== */}
      <div className="relative h-[28mm]">
        {/* ===== WAVE SVG HEADER ===== */}
        <div className="absolute top-0 left-0 w-full h-[35mm] overflow-hidden">
          <svg
            viewBox="0 0 1440 690"
            preserveAspectRatio="none"
            className="w-full h-full "
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="waveGradient"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <stop offset="5%" stopColor="#00d195" />
                <stop offset="95%" stopColor="#2e64fd" />
              </linearGradient>
            </defs>

            {/* Layer 1 */}
            <path
              d="M 0,700 L 0,105 C 54.60441724602818,89.45940944777816 109.20883449205635,73.91881889555631 154,79 C 198.79116550794365,84.08118110444369 233.76907927780275,109.78413386555289 274,108 C 314.23092072219725,106.21586613444711 359.7148483967327,76.94464564223215 415,81 C 470.2851516032673,85.05535435776785 535.3715271352664,122.43728356551853 589,132 C 642.6284728647336,141.56271643448147 684.799043062201,123.30622009569379 731,112 C 777.200956937799,100.69377990430621 827.4323006159294,96.33783605170636 881,102 C 934.5676993840706,107.66216394829364 991.4717544740809,123.3424356974808 1030,134 C 1068.5282455259191,144.6575643025192 1088.6806814877475,150.29242115837056 1133,154 C 1177.3193185122525,157.70757884162944 1245.8055195749291,159.48787966903697 1301,151 C 1356.1944804250709,142.51212033096303 1398.0972402125353,123.75606016548151 1440,105 L 1440,700 L 0,700 Z"
              fill="url(#waveGradient)"
              fillOpacity="0.25"
              transform="rotate(-180 720 350)"
            />

            {/* Layer 2 */}
            <path
              d="M 0,700 L 0,245 C 37.86687462000053,221.95607866980356 75.73374924000106,198.91215733960715 122,217 C 168.26625075999894,235.08784266039285 222.9318776599963,294.3074493113749 280,287 C 337.0681223400037,279.6925506886251 396.53874012001376,205.85804541489333 446,207 C 495.46125987998624,208.14195458510667 534.9131618599488,284.26036902905184 572,292 C 609.0868381400512,299.73963097094816 643.8086124401913,239.1004784688995 695,230 C 746.1913875598087,220.8995215311005 813.8523883792859,263.3377170953502 865,284 C 916.1476116207141,304.6622829046498 950.7818340426657,303.5486531497 999,286 C 1047.2181659573343,268.4513468503 1109.0202754500515,234.46767030584996 1160,230 C 1210.9797245499485,225.53232969415004 1251.1370641571282,250.58066562690004 1296,258 C 1340.8629358428718,265.41933437309996 1390.4314679214358,255.20966718654998 1440,245 L 1440,700 L 0,700 Z"
              fill="url(#waveGradient)"
              fillOpacity="0.4"
              transform="rotate(-180 720 350)"
            />

            {/* Layer 3 */}
            <path
              d="M 0,700 L 0,525 C 33.52689735388195,490.5159798038542 67.0537947077639,456.03195960770836 119,476 C 170.9462052922361,495.96804039229164 241.31171852282637,570.3881413730207 295,570 C 348.68828147717363,569.6118586269793 385.6993312009306,494.41547490020884 432,477 C 478.3006687990694,459.58452509979116 533.8909566734516,499.9499590261439 581,520 C 628.1090433265484,540.0500409738561 666.7368421052632,539.7846889952153 714,533 C 761.2631578947368,526.2153110047847 817.1616749054957,512.9112849929948 867,508 C 916.8383250945043,503.08871500700525 960.6164582727538,506.57017103280555 1009,505 C 1057.3835417272462,503.42982896719445 1110.3724920034892,496.8080308757832 1165,505 C 1219.6275079965108,513.1919691242168 1275.893573713289,536.197705464062 1322,542 C 1368.106426286711,547.802294535938 1404.0532131433556,536.401147267969 1440,525 L 1440,700 L 0,700 Z"
              fill="url(#waveGradient)"
              fillOpacity="1"
              transform="rotate(-180 720 350)"
            />
          </svg>
        </div>

        {/* Institute Name */}
        <p className="relative z-10 pt-2 px-3 text-[13.5px] font-bold text-white text-center uppercase">
          {data?.institute?.name || "Institute Name"}
        </p>
      </div>

      <div className="w-10 h-10 rounded-full  bg-white absolute top-[62px] left-3 flex items-center justify-center overflow-hidden  border-gray-300 shadow-md">
        {logo ? (
          <img src={fullUrl(logo)} alt="logo" className="w-full h-full object-cover" />
        ) : (
          <span className="text-[9px]">LOGO</span>
        )}
      </div>

      {/* ===== Photo ===== */}
      <div className="relative flex justify-center mt-[-28px]">
        <div className="w-[22mm] h-[27mm] rounded-[7px] border-[3px] border-b-emerald-300/50 border-r-emerald-300/50 border-s-indigo-300/50 border-t-indigo-300/50 bg-gray-100 overflow-hidden">
          {photo ? (
            <img
              src={photo}
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
      <div className="pt-2 px-4 text-gray-800">
        {/* STUDENT NAME */}
        <p
          className="text-center font-bold text-emerald-500 whitespace-nowrap overflow-hidden leading-tight mb-2 uppercase"
          style={{ fontSize: "clamp(9px,1.6vw,11px)" }}
        >
          {data?.studentName || "Smith James"}
        </p>

        {/* INFO LIST */}
        <div className=" text-[9.5px]">
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

          <Info label="Class" value={data?.className || "-"} />
          {data?.groupName && <Info label="Group" value={data?.groupName} />}

          <Info label="Gender" value={data?.gender || "-"} />

          {data?.dob && <Info label="D.O.B" value={formatDOB(data?.dob)} />}

          <Info label="Phone" value={data?.mobileNumber || "-"} />
        </div>
      </div>

      {/* ===== Signature ===== */}
      <div className="absolute bottom-6 right-3 text-center">
        {signature ? (
          <img src={fullUrl(signature)} alt="sign" className="h-10 mx-auto" />
        ) : (
          <div className="text-[9px] text-gray-400">Signature</div>
        )}
        <p className="text-[9px] font-semibold border-t">Headmaster</p>
      </div>

      {/* ===== Footer ===== */}
      <div className="absolute bottom-0 w-full h-5 bg-gradient-to-r from-[#2e64fd]  to-[#00d195] flex items-center justify-center">
        <p className="text-[9px] text-white">Student Identity Card</p>
      </div>
    </div>
  );
}

/* ================= INFO ROW ================= */
function Info({ label, value }) {
  return (
    <div className="grid grid-cols-[28%_5%_1fr] items-start">
      <span className="font-bold">{label}</span>
      <span>:</span>
      <span
        className="whitespace-nowrap overflow-hidden font-bold"
        style={{ fontSize: "clamp(7.5px,1.5vw,9.5px)" }}
      >
        {value}
      </span>
    </div>
  );
}
