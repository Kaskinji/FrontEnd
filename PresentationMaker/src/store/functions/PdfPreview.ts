import { exportPresentationToPDF } from "./exportToPDF";
function PdfPreview() {
    const [pdfUrl, setPdfUrl] = useState("");
  
    const handleGenerate = () => {
      const editor = getEditor();
      const pdf = exportPresentationToPDF(editor.presentation);
      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    };
}
export { PdfPreview }    