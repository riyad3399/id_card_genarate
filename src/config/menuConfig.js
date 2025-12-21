import { Building2, IdCard, Upload, CreditCard, Image } from "lucide-react";

export const menuConfig = [
  {
    label: "Institutions",
    icon: Building2,
    children: [
      {
        label: "Show Institutions",
        path: "/institutions",
      },
      {
        label: "Add Institution",
        path: "/institutions/add",
      },
    ],
  },
  {
    label: "Create Single Card",
    path: "/generate-id-card",
    icon: IdCard,
  },
  {
    label: "Bulk Student Upload",
    path: "/bulk-student-upload",
    icon: Upload,
  },
  {
    label: "Show All ID Card",
    path: "/show-all-id-card",
    icon: CreditCard,
  },
  {
    label: "ID Card Back Side",
    path: "/show-id-card-back",
    icon: Image,
  },
  {
    label: "StudentId Photo Upload",
    path: "/studentid-wise-photo-upload",
    icon: Upload,
  },
];
