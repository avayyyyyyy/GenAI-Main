"use client";

import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DownloadPdfButton = () => {
  const handleDownloadPdf = async () => {
    const element = document.getElementById("story-content");

    if (element) {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/jpeg");

      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const id = generateUniqueVoiceID();
      pdf.save(`story${id}.pdf`);
    }
  };

  return (
    <Button
      className="bg-pink-800 hover:bg-pink-900"
      onClick={handleDownloadPdf}
    >
      Download as PDF
    </Button>
  );
};

export default DownloadPdfButton;

const generateUniqueVoiceID = () => {
  const timestamp = Date.now().toString(36);
  const randomNumber = Math.random().toString(36).substr(2, 5);
  const additionalIdentifier = "genai";

  const voiceID = `${timestamp}${randomNumber}${additionalIdentifier}`;
  return voiceID;
};
