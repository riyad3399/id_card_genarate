import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowAllIdCard from "./components/idCardForm/ShowAllIdCard";
// import ShowIdCardBack from "./components/idCardForm/ShowIdCardBack";
import BulkStudentUpload from "./components/idCardForm/BulkStudentUpload";
import StudentIdwisePhotoUpload from "./components/studentPhotoUpload/StudentIdwisePhotoUpload";
import HomeLayout from "./pages/HomeLayout";
import AddInstitute from "./components/institute/AddInstitute";
import ShowAllInstitute from "./components/institute/ShowAllInstitute";
import SingleIdCardForm from "./components/idCardForm/SingleIdCardForm";
import ShowIdCardBack from "./components/idCardForm/ShowIdCardBack";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Route */}
        <Route path="/" element={<HomeLayout />}>
          <Route path="institutions/add" element={<AddInstitute />} />
          <Route path="institutions" element={<ShowAllInstitute />} />
          <Route path="generate-id-card" element={<SingleIdCardForm />} />
          <Route path="show-all-id-card" element={<ShowAllIdCard />} />
          <Route path="show-id-card-back" element={<ShowIdCardBack />} />
          <Route path="bulk-student-upload" element={<BulkStudentUpload />} />
          <Route
            path="studentid-wise-photo-upload"
            element={<StudentIdwisePhotoUpload />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
