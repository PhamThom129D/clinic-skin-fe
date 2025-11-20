// src/components/patient/personal/history/HistoryTable.tsx
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Chip,
    Button,
} from '@mui/material';
import { AppointmentHistoryItem } from '@/types/patient';

interface HistoryTableProps {
    data: AppointmentHistoryItem[];
    onViewDetail: (appointmentId: number, recordId: number | null) => void; // callback xem chi tiết
}

const getStatusChipProps = (status: string) => {
    switch (status) {
        case 'COMPLETED': return { label: 'Đã hoàn thành', color: 'success' as const };
        case 'IN_PROGRESS': return { label: 'Đang tiến hành', color: 'info' as const };
        case 'PENDING': return { label: 'Chờ xác nhận', color: 'warning' as const };
        case 'CANCELLED': return { label: 'Đã hủy', color: 'error' as const };
        default: return { label: status, color: 'default' as const };
    }
};

const HistoryTable: React.FC<HistoryTableProps> = ({ data, onViewDetail }) => {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="Lịch sử khám bệnh">
                <TableHead sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Ngày & Giờ</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Ghi chú lịch hẹn</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Bác sĩ Khám</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow
                            key={item.appointmentId}
                            hover
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Typography variant="body2" color="text.secondary">
                                    {item.appointmentDateTime}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    {...getStatusChipProps(item.status)}
                                    size="small"
                                    sx={{ fontWeight: 'bold' }}
                                />
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    {item.appointmentNote || "— Không có dữ liệu —"}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    {item.doctorName || "— Chưa phân công —"}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => onViewDetail(item.appointmentId, item.recordId)}
                                    disabled={!item.recordId} // Nếu chưa khám thì disable
                                >
                                    Xem chi tiết
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default HistoryTable;
