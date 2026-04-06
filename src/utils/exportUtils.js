import * as XLSX from 'xlsx';
export const exportToExcel = (transactions) => {
  if (!transactions || transactions.length === 0) {
    alert("No data available to export.");
    return;
  }

  const excelData = transactions.map(t => ({
    Date: t.date,
    Description: t.note,
    Category: t.category,
    Type: t.type.toUpperCase(),
    Amount: t.amount
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Financial Report");

  // generate .xlsx file and trigger download
  XLSX.writeFile(workbook, `Zorvyn_Dashboard_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
};