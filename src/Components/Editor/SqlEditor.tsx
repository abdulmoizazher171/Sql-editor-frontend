import { Editor } from "@monaco-editor/react";

interface SqlEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
}

export function SqlEditor({ code, onChange }: SqlEditorProps) {
  return (
    <Editor
      height="70vh"
      defaultLanguage="sql"
      theme="vs-dark"
      value={code}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
      }}
    />
  );
}