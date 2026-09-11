export async function generateQrCodeDataUrl(text: string): Promise<string> {
  if (typeof window === 'undefined') return '';
  try {
    const QRCode = (await import('qrcode')).default;
    return await QRCode.toDataURL(text, {
      width: 240,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('Error generating QR code', err);
    return '';
  }
}

export async function downloadCertificateAsPng(elementId: string, filename: string): Promise<void> {
  if (typeof window === 'undefined') return;

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Certificate DOM element not found');
  }

  // Ensure all custom fonts are completely loaded before capturing
  if ('fonts' in document) {
    await document.fonts.ready;
  }

  const html2canvas = (await import('html2canvas')).default;

  const canvas = await html2canvas(element, {
    scale: 3, // Crisp 3x DPI for printing
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff',
    scrollX: 0,
    scrollY: 0,
    width: element.offsetWidth,
    height: element.offsetHeight,
  });

  const imgData = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  link.href = imgData;
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadCertificateAsPdf(elementId: string, filename: string): Promise<void> {
  if (typeof window === 'undefined') return;

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Certificate DOM element not found');
  }

  if ('fonts' in document) {
    await document.fonts.ready;
  }

  const html2canvas = (await import('html2canvas')).default;
  const jsPDF = (await import('jspdf')).default;

  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff',
    scrollX: 0,
    scrollY: 0,
    width: element.offsetWidth,
    height: element.offsetHeight,
  });

  const imgData = canvas.toDataURL('image/png', 1.0);
  
  // Landscape A4 PDF (297mm x 210mm)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const canvasRatio = canvasWidth / canvasHeight;
  const pageRatio = pdfWidth / pdfHeight;

  let printWidth = pdfWidth;
  let printHeight = pdfHeight;
  let x = 0;
  let y = 0;

  if (Math.abs(canvasRatio - pageRatio) > 0.005) {
    if (canvasRatio > pageRatio) {
      printHeight = pdfWidth / canvasRatio;
      y = (pdfHeight - printHeight) / 2;
    } else {
      printWidth = pdfHeight * canvasRatio;
      x = (pdfWidth - printWidth) / 2;
    }
  }

  pdf.addImage(imgData, 'PNG', x, y, printWidth, printHeight, undefined, 'FAST');
  pdf.save(`${filename}.pdf`);
}
