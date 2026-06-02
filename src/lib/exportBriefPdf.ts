import { jsPDF } from "jspdf";

const MARGIN = 20;
const BODY_SIZE = 11;
const HEADER_SIZE = 13;
const TITLE_SIZE = 20;
const LINE_HEIGHT = 5.5;
const HEADER_GAP = 3;

function isHeader(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^#{1,3}\s/.test(trimmed)) return true;
  if (/^\*\*.+\*\*$/.test(trimmed)) return true;
  if (
    trimmed.length <= 80 &&
    trimmed === trimmed.toUpperCase() &&
    /[A-Z]/.test(trimmed)
  ) {
    return true;
  }
  return false;
}

function cleanHeader(line: string): string {
  return line
    .trim()
    .replace(/^#{1,3}\s/, "")
    .replace(/^\*\*(.+)\*\*$/, "$1");
}

function addPageNumber(doc: jsPDF) {
  const pageCount = doc.getNumberOfPages();
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(
    `Page ${pageCount}`,
    doc.internal.pageSize.getWidth() / 2,
    doc.internal.pageSize.getHeight() - 10,
    { align: "center" }
  );
  doc.setTextColor(0, 0, 0);
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (y + needed > pageHeight - MARGIN) {
    addPageNumber(doc);
    doc.addPage();
    return MARGIN;
  }
  return y;
}

export function exportBriefPdf(brief: string, company: string) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const maxWidth = doc.internal.pageSize.getWidth() - MARGIN * 2;
  let y = MARGIN;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(TITLE_SIZE);
  doc.text(`${company} Strategic Brief`, MARGIN, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(
    `Generated ${new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
    MARGIN,
    y
  );
  y += 12;
  doc.setTextColor(0, 0, 0);

  const paragraphs = brief.split("\n");

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();

    if (!trimmed) {
      y += LINE_HEIGHT;
      continue;
    }

    if (isHeader(trimmed)) {
      y = ensureSpace(doc, y, HEADER_SIZE + HEADER_GAP);
      y += HEADER_GAP;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(HEADER_SIZE);
      const headerLines = doc.splitTextToSize(cleanHeader(trimmed), maxWidth);

      for (const line of headerLines) {
        y = ensureSpace(doc, y, LINE_HEIGHT + 1);
        doc.text(line, MARGIN, y);
        y += LINE_HEIGHT + 1;
      }

      doc.setFont("helvetica", "normal");
      doc.setFontSize(BODY_SIZE);
      continue;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(BODY_SIZE);
    const bodyLines = doc.splitTextToSize(trimmed, maxWidth);

    for (const line of bodyLines) {
      y = ensureSpace(doc, y, LINE_HEIGHT);
      doc.text(line, MARGIN, y);
      y += LINE_HEIGHT;
    }

    y += 2;
  }

  addPageNumber(doc);

  const filename = `${company.toLowerCase().replace(/\s+/g, "-")}-brief.pdf`;
  doc.save(filename);
}
