import QRCode from "react-qr-code";
import Design1 from "./designs/Design1";
import Design2 from "./designs/Design2";
import Design3 from "./designs/Design3";
import Design4 from "./designs/Design4";
import Design5 from "./designs/Design5";
import Design6 from "./designs/Design6";
import Design7 from "./designs/Design7";

const DESIGN_MAP = {
  design1: Design1,
  design2: Design2,
  design3: Design3,
  design4: Design4,
  design5: Design5,
  design6: Design6,
  design7: Design7,
};

function StudentIDCard({ data, design = "design4" }) {
  const Card = DESIGN_MAP[design] || Design1;
  return <Card data={data} />;
}
const baseUrl = "http://localhost:5000";

function fullUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

function InstituteBackCard({
  institute = {},
  contact = {},
  theme = "light",
  className = "",
}) {
  const isDark = theme === "dark";

  const logo = fullUrl(institute.logo_url);
  const name = (institute.name || "INSTITUTE NAME").toString();
  const address = contact.address || institute.address || "—";
  const eiin = institute.eiin || "—";
  const estd = institute.estd || "—";
  const phone = contact.phone || institute.phone || "—";
  const websiteRaw = contact.website || institute.website || "";
  const website = websiteRaw ? websiteRaw.replace(/^https?:\/\//, "") : "—";
  const emergency = contact.emergency || phone || "—";

  return (
    <div
      className={`
        w-[58mm] h-[90mm]
        rounded-[8px]
        
        shadow
        flex flex-col
        items-center
        text-center
        ${isDark ? "bg-slate-900 text-white" : "bg-white text-gray-800"}
        ${className}
      `}
      style={{
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
      role="region"
      aria-label={`Back of ${name} ID card`}
    >
      {/* ===== TOP NOTICE ===== */}
      <div className="px-5 pt-[13px] text-[10px] leading-[11px] font-semibold capitalize">
        if this card found please return it to the following address:
      </div>

      {/* ===== LOGO ===== */}
      <div className="mt-2 flex justify-center">
        {logo ? (
          <img
            src={logo}
            alt={`${name} logo`}
            className="w-10 h-10 object-contain rounded  bg-white"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-10 h-10 border rounded flex items-center justify-center text-[9px] text-gray-400">
            LOGO
          </div>
        )}
      </div>

      {/* ===== CONTACT TITLE ===== */}
      <div className="mt-2 w-full">
        <div
          className="text-[13px] tracking-tight font-bold uppercase italic"
        >
          contact address
        </div>
        <div className="mx-8 mt-[2px] h-[1px] bg-current opacity-80" />
        <div className="mx-8 mt-[2px] h-[1px] bg-current opacity-80" />
      </div>

      {/* ===== QR CODE ===== */}
      <div className="mt-2">
        <div className="p-[2px] bg-white ">
          <QRCode value={websiteRaw || name} size={50} />
        </div>
      </div>
      {/* ===== INSTITUTE NAME ===== */}
      <div className="px-2 mt-2">
        <p
          className="font-bold text-[12.5px] tracking-tight
 uppercase line-clamp-3 italic leading-[1.4]"
        >
          {name}
        </p>
      </div>

      {/* ===== ADDRESS & DETAILS ===== */}
      <div className="px-3 mt-1 text-[10px] leading-[12px] space-y-[2px] font-semibold">
        <p className="break-words line-clamp-3">{address}</p>
        <p>
          EIIN: {eiin} &nbsp;|&nbsp; Estd: {estd}
        </p>
        <p className="break-all">Website: {"www." + website}</p>
      </div>

      {/* ===== EMERGENCY CONTACT ===== */}
      <div className="mt-3 w-full px-3 font-semibold">
        <div className="text-[10px] font-semibold mt-1">Emergency Contact</div>
        <div className="text-[11px] font-mono break-words">{emergency}</div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="mt-1 w-full border-t-[2px] pt-[3px] text-[8.5px] font-semibold">
        Powered by: <b>Saibon Soft</b>
      </div>
    </div>
  );
}

function IDCardPrintableSheet({
  students = [],
  perRow = 3,
  theme = "light",
  showBack = false,
  design = "design1",
}) {
  return (
    <div className="a4-root" style={{ fontFamily: "Arial, sans-serif" }}>
      <div className="a4-grid">
        {students.map((s, idx) => {
          const key = s?._id || s?.id || idx;

          return (
            <div key={key} className="card-slot">
              <StudentIDCard
                data={s}
                design={design}
                theme={theme}
                showQR={!showBack}
                showBarcode={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}






export { StudentIDCard, InstituteBackCard, IDCardPrintableSheet };
