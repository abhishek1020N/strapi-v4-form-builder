import React from "react";
import * as XLSX from "xlsx";
import { Button } from "@strapi/design-system/Button";
import Download from "@strapi/icons/Download";

const ExportToExcel = ({ data }) => {
  // console.log("data-export:", data);
  const handleExport = () => {
    const host = window.location.protocol + "//" + window.location.host;
    const transformedData = data?.map((item) => {
      const jsonSubmission = item.attributes.jsonSubmission;
      const row = {};
      jsonSubmission.forEach((entry) => {
        const header = entry.label || entry.key;
        row[header] = entry.value;
        if (entry.fieldType == "upload") {
          let fileUrlArr = [];
          entry.files.forEach((file) => {
            file.url = file?.url?.startsWith("/uploads")
              ? host + file.url
              : file.url;
            fileUrlArr.push(file.url);
          });
          row[header] = fileUrlArr?.join(",");
        }
      });
      return row;
    });

    // Create a new workbook and a worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(transformedData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, `form_data_${new Date().getTime().toString()}.xlsx`);
  };

  return (
    <Button variant="secondary" startIcon={<Download />} onClick={handleExport}>
      Export to Excel
    </Button>
  );
};

export default ExportToExcel;
