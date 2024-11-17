"use client"
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Web3 from 'web3'
import { DIAGNOSIS_CONTACT_ADDRESS } from '../../../../contracts/contactAddress';
import DIAG_ABI from '@/src/../contracts/diagnosis.abi.json'
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

function DiagnosticReport() {
  const params = useParams();
  const patientAddress = params.address;
  const router = useRouter();

  const [toastLoading,setToastLoading] = useState(false);

  useEffect(() => {
    let toastId: any;

    if (toastLoading) {
        toastId = toast("Generating report ...", {
            icon: "⏳",
            duration: Infinity,
        });
    } else {
        toast.dismiss(toastId);
    }

    return () => {
        if (toastId) toast.dismiss(toastId);
    };
}, [toastLoading]);


  const [formData, setFormData] = useState({
    bloodPressure: "",
    sao2: "",
    haemoglobin: "",
    wbc: "",
    platelets: "",
    sgpt: "",
    date: "", // This will be set in useEffect
    doctorName: "",
    patientName: "",
    password: "",
    confirmpassword: "", // New field for confirm password
    summary: "",
    medicines: [
      {
        name: "",
        dosage: "",
        beforeBreakfast: false,
        afterBreakfast: false,
        beforeLunch: false,
        afterLunch: false,
        beforeDinner: false,
        afterDinner: false
      }
    ]
  });

  // Set the current date in the format YYYY-MM-DD
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    setFormData(prevData => ({
      ...prevData,
      date: formattedDate
    }));
  }, []); // Empty dependency array to run only once on mount

  const handleChange = (e:any) => {
    const { name, value, checked, type } = e.target;

    if (name.startsWith('medicine')) {
      const [_, index, field] = name.split('_');

      const updatedMedicines = formData.medicines.map((med, i) => {
        if (i === parseInt(index, 10)) {
          return {
            ...med,
            [field]: type === 'checkbox' ? checked : value
          };
        }
        return med;
      });

      setFormData({
        ...formData,
        medicines: updatedMedicines
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      medicines: [
        ...formData.medicines,
        {
          name: "",
          dosage: "",
          beforeBreakfast: false,
          afterBreakfast: false,
          beforeLunch: false,
          afterLunch: false,
          beforeDinner: false,
          afterDinner: false
        }
      ]
    });
  };

  const deleteMedicine = (indexToRemove:any) => {
    setFormData({
      ...formData,
      medicines: formData.medicines.filter((_, index) => index !== indexToRemove)
    });
  };

  const generatePDF = () => {
    setToastLoading(true);
    // Validate passwords
    console.log(formData.password)
    console.log(formData.confirmpassword)
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    const pdf = new jsPDF({
      encryption: {
        userPassword: formData.password,
        ownerPassword: formData.password
      }
    });

    // Page dimensions
    const pageWidth = pdf.internal.pageSize.width;

    // White background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.height, 'F');

    // Add VITALIS header in deep blue
    pdf.setFontSize(36);
    pdf.setTextColor(0, 73, 158);
    pdf.setFont('helvetica', 'bold');

    // Calculate width of the text to center it
    const textWidth = pdf.getStringUnitWidth('VITALIS') * pdf.getFontSize() / pdf.internal.scaleFactor;
    const x = (pageWidth - textWidth) / 2;

    pdf.text('VITALIS', x, 30);

    // Prepare data for the table
    const tableData = Object.entries(formData)
      .filter(([key]) => key !== 'summary' && key !== 'medicines' && key !== 'password' && key !== 'confirmpassword') // Exclude password fields
      .map(([key, value]) => [
        key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
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
        textColor: [0, 0, 0],
        lineColor: [200, 200, 200],
        lineWidth: 0.5
      },
      headStyles: {
        fillColor: [255, 255, 255],
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
        left: (pageWidth - 160) / 2,
        right: (pageWidth - 160) / 2
      }
    };

    pdf.autoTable(tableOptions);

    // Add Summary section
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Diagnostic Summary', (pageWidth / 2) - 30, pdf.previousAutoTable.finalY + 20);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);

    // Wrap summary text
    const summaryLines = pdf.splitTextToSize(formData.summary, 160);
    pdf.text(summaryLines, (pageWidth - 160) / 2, pdf.previousAutoTable.finalY + 30);

    // Add Medicines section
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Medicines', (pageWidth / 2) - 20, pdf.previousAutoTable.finalY + 40);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);

    formData.medicines.forEach((med, index) => {
      const checkedMedicines = [];
      if (med.beforeBreakfast) checkedMedicines.push('Before Breakfast');
      if (med.afterBreakfast) checkedMedicines.push('After Breakfast');
      if (med.beforeLunch) checkedMedicines.push('Before Lunch');
      if (med.afterLunch) checkedMedicines.push('After Lunch');
      if (med.beforeDinner) checkedMedicines.push('Before Dinner');
      if (med.afterDinner) checkedMedicines.push('After Dinner');

      const medicineText = `${med.name} (${med.dosage}): ${checkedMedicines.join(', ')}`;
      const medicineLines = pdf.splitTextToSize(medicineText, 160);
      pdf.text(medicineLines, (pageWidth - 160) / 2, pdf.previousAutoTable.finalY + 50 + (index * 10));
    });

    if (formData.medicines.length === 0) {
      pdf.text(pdf.splitTextToSize("No medicines prescribed", 160), (pageWidth - 160) / 2, pdf.previousAutoTable.finalY + 50 + (0 * 10));
    }

    // Add a subtle border around the table
    pdf.setDrawColor(200, 200, 200);
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
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase();
    };


    const fileName = `${sanitizeFileName(formData.patientName)}_${formData.date}.pdf`;

    // Open the PDF in a new window or save with dynamic filename
    pdf.output('dataurlnewwindow', { filename: fileName });
    pdf.save(fileName);

    let blob = pdf.output("blob");
    const formData1 = new FormData();
    formData1.append("file", blob, fileName);

    // Send the FormData using fetch
    fetch("https://65hqhf12-7000.inc1.devtunnels.ms/add", {
      method: "POST",
      body: formData1,
    })
      .then(response => response.json())
      .then(data => {
        console.log("CID:", data.cid); // Log the IPFS CID returned by the server
        addDiag(data.cid, formData.password);
      })
      .catch(error => {
        console.error(" Error uploading to IPFS:", error);
      });
  };

  async function addDiag(cid: string, password: string) {
    const provider = (window as any).ethereum;
    if (provider) {
      const new_web3 = new Web3(provider);
      await new_web3.eth.requestAccounts();
      const res = await new_web3.eth.getAccounts(); // patient
      const contract = new new_web3.eth.Contract(DIAG_ABI,DIAGNOSIS_CONTACT_ADDRESS);

      // generate the ipfs link here and replace below

      const ans = await contract.methods.createDiagnosis(patientAddress,res[0],cid,password).send({
        from: res[0]
      })

      toast.success("Diagnosis report generated successfully !!");
      console.log(ans);
      router.push('/doctor/appointments');

      setTimeout(()=>setToastLoading(false),4000);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
  <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
    {/* Header */}
    <div className="bg-gradient-to-r from-teal-800 to-teal-500 text-white p-8 text-center">
      <h2 className="text-3xl font-extrabold">Patient Diagnostic Report</h2>
    </div>

    {/* Body */}
    <div className="p-10">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-sm uppercase tracking-wider text-gray-600">
              <th className="py-4 px-6">Parameter</th>
              <th className="py-4 px-6">Value</th>
            </tr>
          </thead>
          <tbody>
            {/* Dynamic Form Data */}
            {Object.keys(formData)
              .filter(
                (key) =>
                  key !== "summary" &&
                  key !== "medicines" &&
                  key !== "confirmpassword" &&
                  key !== "password"
              )
              .map((key) => (
                <tr key={key} className="border-b border-gray-300">
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </td>
                  <td className="py-4 px-6">
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      placeholder={`Enter ${key
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()}`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </td>
                </tr>
              ))}

            {/* Password Inputs */}
            {["Password", "Confirm Password"].map((field, idx) => (
              <tr key={field} className="border-b border-gray-300">
                <td className="py-4 px-6 text-gray-800 font-medium">
                  {field}
                </td>
                <td className="py-4 px-6">
                  <input
                    type="password"
                    name={field.toLowerCase().replace(" ", "")}
                    value={formData[field.toLowerCase().replace(" ", "")]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.toLowerCase()}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </td>
              </tr>
            ))}

            {/* Summary */}
            <tr className="border-b border-gray-300">
              <td className="py-4 px-6 text-gray-800 font-medium">Summary</td>
              <td className="py-4 px-6">
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter diagnostic summary..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y"
                />
              </td>
            </tr>

            {/* Medicines */}
            {formData.medicines.map((med, index) => (
              <tr key={`medicine_${index}`} className="border-b border-gray-300">
                <td className="py-4 px-6">
                  <div className="space-y-3">
                    <input
                      type="text"
                      name={`medicine_${index}_name`}
                      value={med.name}
                      onChange={handleChange}
                      placeholder="Medicine Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                      type="text"
                      name={`medicine_${index}_dosage`}
                      value={med.dosage}
                      onChange={handleChange}
                      placeholder="Dosage"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="grid grid-cols-3 gap-4">
                    {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                      <div key={meal}>
                        <p className="font-semibold text-gray-700 mb-1">
                          {meal}
                        </p>
                        {["Before", "After"].map((time) => (
                          <label
                            key={time}
                            className="flex items-center text-sm mb-2"
                          >
                            <input
                              type="checkbox"
                              name={`medicine_${index}_${time.toLowerCase()}${meal}`}
                              checked={med[`${time.toLowerCase()}${meal}`]}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            {time}
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteMedicine(index)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete Medicine
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Medicine Button */}
      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={addMedicine}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Add Medicine
        </button>
      </div>

      {/* Generate PDF Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={generatePDF}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Generate PDF
        </button>
      </div>
    </div>
  </div>
</div>

  );
}

export default DiagnosticReport;
