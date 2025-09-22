import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const downloadFile = (outputContend, toolName) => {
  const currentDate = new Date();
  const formattedDate = `${
    currentDate.getMonth() + 1
  }_${currentDate.getDate()}_${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours()}_${currentDate.getMinutes()}_${currentDate.getSeconds()}`;
  const filename = `${toolName}_Text_${formattedDate}_${formattedTime}.docx`;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: outputContend,
                size: 30,
                break: 1,
                font: { name: "Arial" },
              }),
            ],
          }),
        ],
      },
    ],
  });
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, filename);
  });
};
