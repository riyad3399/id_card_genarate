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

function StudentIDCard({ data, design = "design1" }) {
  const Card = DESIGN_MAP[design] || Design1;
  return <Card data={data} />;
}

function InstituteBackCard({
  institute = {},
  contact = {},
  theme = "light",
  className = "",
}) {
  console.log(institute);

  const isDark = theme === "dark";
  const logo = fullUrl(institute.logo_url);
  const name = (institute.name || "INSTITUTE NAME").toString();
  const address = contact.address || institute.address || "—";
  const eiin = institute.eiin || "—";
  const estd = institute.estd || "—";
  const phone = contact.phone || institute.phone || "—";
  const website = contact.website || institute.website || "";
  const emergency = contact.emergency || contact.phone || "";

  return (
    <div
      className={`w-[54mm] h-[85.6mm] rounded-xl shadow-md border p-3 flex flex-col items-center text-center ${className} ${
        isDark ? "bg-slate-900 text-white" : "bg-white text-gray-800"
      }`}
      role="region"
      aria-label={`Back of ${name} ID cards`}
      style={{
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <p className="mt-3 font-bold text-[11px] leading-tight w-full text-center break-words max-h-10 overflow-hidden">
        {name.toUpperCase()}
      </p>

      <div className="mt-2 w-full flex justify-center">
        {logo ? (
          <img
            src={logo}
            alt={`${name} logo`}
            className="w-14 h-14 object-contain mx-auto rounded-md bg-white p-1"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-14 h-14 bg-gray-100 rounded-md mx-auto flex items-center justify-center text-xs text-gray-400">
            Logo
          </div>
        )}
      </div>

      <p className="mt-2 font-bold text-[11px] tracking-wide underline w-full">
        CONTACT ADDRESS
      </p>

      <div className="mt-2 bg-white p-1 rounded shadow inline-block">
        <QRCode value={website || "https://example.com"} size={40} />
      </div>

      <div className="text-[10px] mt-1 leading-tight w-full space-y-1">
        <p className="break-words">{address}</p>
        <p className="break-words">
          EIIN: {eiin}, Estd. {estd}
        </p>
        <p className="break-words">Website: {website || "—"}</p>
      </div>

      <div className="mt-2 text-[11px] w-full">
        <div className="font-semibold">Emergency Contact</div>
        <div className="text-[12px] font-mono break-words">
          {emergency || "—"}
        </div>
      </div>

      <div className="mt-2 text-[10px] text-center border-t w-full pt-2">
        Powered by: <span className="font-semibold">Saibon Soft</span>
      </div>
    </div>
  );
}

function IDCardPrintableSheet({
  students = [],
  perRow = 2,
  theme = "light",
  showBack = false,
  design = "design1", 
}) {
  const cols = Math.max(1, parseInt(String(perRow), 10) || 1);

  return (
    <div className="p-2 print:p-0" style={{ fontFamily: "Arial, sans-serif" }}>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {students.map((s, idx) => {
          const key = s && (s._id || s.id) ? s._id || s.id : `student-${idx}`;

          return (
            <div
              key={key}
              className="flex items-center justify-center"
              style={{
                breakInside: "avoid",
                WebkitColumnBreakInside: "avoid",
                pageBreakInside: "avoid",
              }}
            >
              <div className="transform scale-100 print:scale-100">
                {/* FRONT CARD */}
                <StudentIDCard
                  data={s}
                  design={design} 
                  theme={theme}
                  showQR={!showBack}
                  showBarcode={false}
                />

                {/* BACK CARD (OPTIONAL) */}
                {showBack && (
                  <div className="mt-2">
                    <StudentIDCardBack
                      data={s}
                      design={design} // (optional but safe)
                      theme={theme}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}


export { StudentIDCard, InstituteBackCard, IDCardPrintableSheet };
