import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Heading,
  Link,
  List,
  BlockQuote,
  Table,
  TableToolbar,
  Image as CKImage,
  ImageUpload,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  FileRepository,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { memo } from "react";

class Base64UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          const img = new window.Image();

          reader.onload = (e) => {
            img.src = e.target.result;
          };

          img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 800;
            const scale = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scale;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            resolve({ default: canvas.toDataURL("image/jpeg", 0.8) });
          };

          reader.readAsDataURL(file);
        })
    );
  }
}

function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
    new Base64UploadAdapter(loader);
}

const CKEditorField = memo(({ value, onChange }) => {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 6 }}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: "GPL",
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Heading,
            Link,
            List,
            BlockQuote,
            Table,
            TableToolbar,
            CKImage,
            ImageUpload,
            ImageCaption,
            ImageStyle,
            ImageToolbar,
            FileRepository,
            Undo,
          ],
          extraPlugins: [CustomUploadAdapterPlugin],
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "uploadImage",
            "blockQuote",
            "insertTable",
            "|",
            "undo",
            "redo",
          ],
          heading: {
            options: [
              { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
              { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
              { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
              { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
            ],
          },
          table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
          },
          image: {
            toolbar: ["imageStyle:inline", "imageStyle:block", "|", "imageTextAlternative"],
          },
          placeholder: "Bắt đầu viết nội dung tại đây...",
        }}
        onChange={(event, editor) => {
          const html = editor.getData();
          onChange?.(html);
        }}
      />

      {/* ===== PREVIEW ===== */}
      {value && (
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
              marginBottom: 8,
              color: "#6b4e2e",
            }}
          >
            Xem trước nội dung
          </div>
          <div
            className="ck-content"
            style={{
              padding: 12,
              border: "1px dashed #e0c9a6",
              borderRadius: 8,
              background: "#fffdf9",
              overflowX: "auto",
            }}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      )}
    </div>
  );
});

export default CKEditorField;
