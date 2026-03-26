/**
 * Utility functions for downloading files
 */

export const downloadFile = (content: string, filename: string, mimeType: string) => {
  const element = document.createElement('a');
  const blob = new Blob([content], { type: mimeType });
  element.href = URL.createObjectURL(blob);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const downloadImage = async (imageUrl: string, filename: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    // Fallback to direct download
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const generateCsvContent = (table: string[][]): string => {
  return table
    .map((row) =>
      row
        .map((cell) => {
          let cellStr = cell ? cell.toString() : '';
          if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
            cellStr = `"${cellStr.replace(/"/g, '""')}"`;
          }
          return cellStr;
        })
        .join(',')
    )
    .join('\n');
};

export const generateExcelHtml = (
  sheets: any[],
  fontStyle: string,
  headerColor: string,
  hasBorders: boolean
): string => {
  let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
    <meta charset="utf-8" />
    <style>
      table { font-family: ${fontStyle}; border-collapse: collapse; margin-bottom: 2em; }
      th { background-color: ${headerColor}; color: #ffffff; ${hasBorders ? 'border: 1pt solid #000000;' : ''} padding: 8px; font-weight: bold; text-align: left; }
      td { ${hasBorders ? 'border: 1pt solid #000000;' : ''} padding: 8px; }
    </style>
    </head>
    <body>`;

  sheets.forEach((sheet: any) => {
    html += `<h2>${sheet.name}</h2>`;
    html += `<table>`;
    sheet.data.forEach((row: any, rowIndex: number) => {
      html += `<tr>`;
      row.forEach((cell: any) => {
        const isHeader = rowIndex === 0;
        const tag = isHeader ? 'th' : 'td';

        let cellValue = '';
        let cellStyle = '';

        if (cell !== null && typeof cell === 'object' && cell.v !== undefined) {
          cellValue = cell.v.toString();
          if (cell.bg && !isHeader) {
            cellStyle = `style="background-color: ${cell.bg};"`;
          }
        } else {
          cellValue = cell === null ? '' : cell.toString();
        }

        html += `<${tag} ${cellStyle}>${cellValue}</${tag}>`;
      });
      html += `</tr>`;
    });
    html += `</table><br><br>`;
  });

  html += `</body></html>`;
  return html;
};
