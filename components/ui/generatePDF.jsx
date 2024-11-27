import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (facture, rowData) => {
const doc = new jsPDF();
// Add your PDF generation logic here
doc.save(`Facture_${rowData._id}.pdf`);
};