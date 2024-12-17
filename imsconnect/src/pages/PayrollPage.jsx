import React, { useEffect, useState } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, Typography, Box } from '@mui/material';
import { Save } from '@mui/icons-material';
import Lottie from 'react-lottie';
import animationEmpty from '../Images/Animation2.json'; // Replace with your actual animation file

const PayrollPage = () => {
  const [payroll, setPayroll] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/payroll/generate');
        if (!response.ok) throw new Error('Failed to fetch payroll data.');
        const data = await response.json();
        setPayroll(data.payroll);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, []);

  const downloadCSV = () => {
    const csvContent = payroll.map(entry => 
      `${entry.employeeId},${entry.name},${entry.hours},${entry.payRate},${entry.totalPayment}`
    );
    const csvHeader = 'Employee ID,Name,Hours Worked,Pay Rate,Total Payment\n';
    const csvString = csvHeader + csvContent.join('\n');
  
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'payroll.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Lottie animation options
  const lottieOptionsEmpty = {
    loop: true,
    autoplay: true,
    animationData: animationEmpty,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
        Payroll Management
      </Typography>

      {error && (
        <Typography color="error" align="center" variant="h6">
          {error}
        </Typography>
      )}

      {loading ? (
        <Typography align="center" variant="h6">
          Loading...
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead sx={{ backgroundColor: '#2c3e50' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Employee ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Hours Worked</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Pay Rate</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Total Payment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payroll.map((entry) => (
                  <TableRow key={entry.employeeId}>
                    <TableCell>{entry.employeeId}</TableCell>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{entry.hours}</TableCell>
                    <TableCell>${entry.payRate.toFixed(2)}</TableCell>
                    <TableCell>${entry.totalPayment.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Download CSV Button */}
          <Box display="flex" justifyContent="center" marginTop={4}>
            <Button
              variant="contained"
              color="success"
              startIcon={<Save />}
              onClick={downloadCSV}
              sx={{ padding: '10px 20px', fontSize: '16px', textTransform: 'none' }}
            >
              Download Payroll CSV
            </Button>
          </Box>
        </>
      )}

      {/* Lottie Animation (Always displayed below the button) */}
      <Box display="flex" justifyContent="center" marginTop={4} flexDirection="column" alignItems="center">
        <Lottie options={lottieOptionsEmpty} height={250} width={250} />
      </Box>
    </Container>
  );
};

export default PayrollPage;
