"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Paper,
  Stack,
  Typography,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import UpdateIcon from "@mui/icons-material/Update";
import { getAppointments, AppointmentResponse } from "@/services/bookingService";
import AppointmentModal from "./AppointmentModal";

interface DoctorAppointmentTableProps {
  darkMode?: boolean;
}

const statusVN: Record<string, string> = {
  PENDING: "Chờ duyệt",
  IN_PROGRESS: "Đang khám",
  APPROVED: "Đã duyệt",
  REJECTED: "Từ chối",
};

const DoctorAppointmentTable: React.FC<DoctorAppointmentTableProps> = ({
  darkMode = false,
}) => {
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentResponse | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const todayStr = `${yyyy}-${mm}-${dd}`;
      const res = await getAppointments(todayStr);
      setAppointments(res.data);
    } catch (err) {
      console.error("❌ Lỗi lấy danh sách lịch hẹn:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const columns = useMemo<MRT_ColumnDef<AppointmentResponse>[]>(
    () => [
      {
        accessorKey: "stt",
        header: "STT",
        size: 50,
        enableSorting: false,
        Cell: ({ row }) => row.index + 1,
      },
      { accessorKey: "patient.account.fullName", header: "Họ và tên" },
      { accessorKey: "appointmentDate", header: "Ngày khám" },
      { accessorKey: "appointmentTime", header: "Giờ khám" },
      { accessorKey: "note", header: "Ghi chú" },
      {
        accessorKey: "status",
        header: "Trạng thái",
        Cell: ({ row }) => statusVN[row.original.status] || row.original.status,
      },
      {
        accessorKey: "actions",
        header: "Hành động",
        size: 120,
        Cell: ({ row }) => (
          <Tooltip title="Xem/Cập nhật lịch hẹn">
            <IconButton
              color="primary"
              onClick={() => setSelectedAppointment(row.original)}
            >
              <UpdateIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    []
  );

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight={200}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <>
      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
          background: darkMode ? "#1e1e2f" : "#fff",
        }}
      >
        <Typography variant="h6" mb={2} color={darkMode ? "#fff" : "#000"}>
          Danh sách lịch hẹn
        </Typography>

        <MaterialReactTable
          columns={columns}
          data={appointments}
          enableColumnFilters
          enableSorting
          enablePagination
          muiTablePaperProps={{
            sx: {
              backgroundColor: darkMode ? "#2e2e3e" : "#fff",
              color: darkMode ? "#f0f0f0" : "#000",
            },
          }}
          muiTableBodyRowProps={{
            sx: {
              "&:hover": {
                backgroundColor: darkMode ? "#3a3a4a" : "#f5f5f5",
                cursor: "pointer",
              },
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              fontWeight: "bold",
              backgroundColor: darkMode ? "#2a2a3a" : "#f0f0f0",
              color: darkMode ? "#f0f0f0" : "#000",
            },
          }}
          initialState={{ pagination: { pageSize: 10, pageIndex: 0 } }}
        />
      </Paper>

      <AppointmentModal
        open={!!selectedAppointment}
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onUpdateSuccess={(updated) => {
          setAppointments((prev) =>
            prev.map((a) => (a.id === updated.id ? updated : a))
          );
          fetchAppointments(); // làm mới toàn bộ danh sách sau cập nhật
        }}
      />
    </>
  );
};

export default DoctorAppointmentTable;
