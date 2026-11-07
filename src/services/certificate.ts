import jsPDF from 'jspdf';
import { StoredCertificate } from '../services/db';

export function generateCertificatePDF(cert: StoredCertificate) {
  // Documento horizontal A4 (297 x 210 mm)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // 1. Fondo Oscuro Elegante
  doc.setFillColor(14, 19, 31);
  doc.rect(0, 0, width, height, 'F');

  // 2. Marco Exterior con Color de Acento Turquesa
  doc.setDrawColor(0, 180, 216);
  doc.setLineWidth(1.5);
  doc.rect(12, 12, width - 24, height - 24);

  // Marco Interior Fino
  doc.setDrawColor(55, 65, 81);
  doc.setLineWidth(0.5);
  doc.rect(16, 16, width - 32, height - 32);

  // 3. Encabezado de Marca Nodu
  doc.setTextColor(0, 180, 216);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('NODU // PLATAFORMA DE APRENDIZAJE DE PROGRAMACIÓN', width / 2, 35, { align: 'center' });

  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('CERTIFICADO LOCAL DE MAESTRÍA PRÁCTICA', width / 2, 42, { align: 'center' });

  // 4. Texto de Concesión
  doc.setTextColor(248, 250, 252);
  doc.setFontSize(12);
  doc.text('Se certifica solemnemente que el estudiante:', width / 2, 65, { align: 'center' });

  // Nombre del Estudiante
  doc.setTextColor(255, 183, 3);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text(cert.recipientName.toUpperCase(), width / 2, 80, { align: 'center' });

  // 5. Detalles del Curso Completado
  doc.setTextColor(226, 232, 240);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.text('ha completado con éxito la totalidad de las lecciones, retos de código y el proyecto de:', width / 2, 95, { align: 'center' });

  doc.setTextColor(0, 180, 216);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(cert.courseTitle.toUpperCase(), width / 2, 110, { align: 'center' });

  // 6. Métricas y Fecha
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(`Fecha de Emisión: ${cert.issueDate}   |   Puntuación Final: ${cert.finalScore}%   |   Verificación Local: OK`, width / 2, 130, { align: 'center' });

  // 7. Hash Criptográfico Local
  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`ID Único: ${cert.id}`, width / 2, 160, { align: 'center' });
  doc.text(`Firma Criptográfica SHA-256: ${cert.verificationHash}`, width / 2, 166, { align: 'center' });

  // 8. Disclaimer Honesto
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Documento expedido localmente en cliente por Nodu. Reconoce la resolución práctica de los retos del programa.', width / 2, 185, { align: 'center' });

  // Descargar automáticamente el PDF
  doc.save(`Certificado-Nodu-${cert.courseTitle.replace(/\s+/g, '-')}.pdf`);
}
