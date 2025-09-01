import TicketDetail from "@/pages/ticket-detail";
import Tickets from "@/pages/tickets";
import { Navigate, Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Tickets />} />
      <Route path="/:id" element={<TicketDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
