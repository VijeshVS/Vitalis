"use client"
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function DiagnosticReport() {
  const [formData, setFormData] = useState({
    bloodPressure: "120/80 mmHg",
    sao2: "98%",
    hemoglobin: "12 g/dL",
    wbc: "8000/µL",
    platelets: "250,000/µL",
    sgpt: "20 U/L",
    date: "2023-11-13",
    doctorName: "Dr. John Doe",
    patientName: "Jane Smith"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Page dimensions
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;

    // White background
    pdf.setFillColor(255, 255, 255); // Pure white
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Add VITALIS header in deep blue
    pdf.setFontSize(36);
    pdf.setTextColor(0, 73, 158); // Deep, rich blue
    pdf.setFont('helvetica', 'bold');
    
    // Calculate width of the text to center it
    const textWidth = pdf.getStringUnitWidth('VITALIS') * pdf.getFontSize() / pdf.internal.scaleFactor;
    const x = (pageWidth - textWidth) / 2;
    
    pdf.text('VITALIS', x, 30);

    // Prepare data for the table
    const tableData = Object.entries(formData).map(([key, value]) => [
      key.replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase()), // Capitalize first letter
      value
    ]);

    // Table options
    const tableOptions = {
      startY: 50,
      head: [['Parameter', 'Value']],
      body: tableData,
      theme: 'plain',
      styles: {
        fontSize: 12,
        cellPadding: 5,
        textColor: [0, 0, 0], // Black text
        lineColor: [200, 200, 200], // Light gray lines
        lineWidth: 0.5
      },
      headStyles: {
        fillColor: [255, 255, 255], // Match background color
        textColor: [0, 0, 0],
        fontSize: 14,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { 
          cellWidth: 80,
          fontStyle: 'bold'
        },
        1: { cellWidth: 80 }
      },
      tableWidth: 'auto',
      margin: { 
        left: (pageWidth - 160) / 2, // Center the table
        right: (pageWidth - 160) / 2 
      }
    };

    pdf.autoTable(tableOptions);

    // Add a subtle border around the table
    pdf.setDrawColor(200, 200, 200); // Light gray border
    pdf.rect(
      tableOptions.margin.left, 
      tableOptions.startY, 
      160, 
      pdf.previousAutoTable.finalY - tableOptions.startY + 10, 
      'S'
    );

    // Generate filename based on patient name and date
    const sanitizeFileName = (name) => {
      return name
        .replace(/[^a-z0-9]/gi, '_') // Replace non-alphanumeric characters with underscore
        .toLowerCase();
    };

    const fileName = `${sanitizeFileName(formData.patientName)}_${formData.date}.pdf`;

    // Open the PDF in a new window or save with dynamic filename
    pdf.output('dataurlnewwindow');
    pdf.save(fileName);
  };

  return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Diagnostic Report</h2>
      <div className="mb-4">
        <table className="w-full border-collapse border border-gray-600">
          <thead>
            <tr>
              <th className="border border-gray-600 p-2 text-left text-white">Parameter</th>
              <th className="border border-gray-600 p-2 text-left text-white">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(formData).map((key) => (
              <tr key={key}>
                <td className="border border-gray-600 p-2 text-white">{key.replace(/([A-Z])/g, ' $1')}</td>
                <td className="border border-gray-600 p-2 text-white">
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="bg-neutral-700 text-white p-1 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={generatePDF}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate PDF
      </button>
    </div>
  );
}

export default DiagnosticReport;