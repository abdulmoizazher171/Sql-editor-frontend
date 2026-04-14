/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from "@monaco-editor/react";

interface SqlEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
}

export function SqlEditor({ code, onChange }: SqlEditorProps) {
  const handleEditorDidMount = (editor: any, monaco: any) => {
    // Define light professional theme
    monaco.editor.defineTheme('light-professional', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6B7280', fontStyle: 'italic' },
        { token: 'keyword', foreground: '3a7e92', fontStyle: 'bold' },
        { token: 'keyword.sql', foreground: '2e6478', fontStyle: 'bold' },
        { token: 'string', foreground: 'F59E0B' },
        { token: 'number', foreground: '10B981', fontStyle: '' },
        { token: 'type', foreground: '6297aa' },
        { token: 'identifier', foreground: 'D1D5DB' },
        { token: 'operator', foreground: 'A3A3A3' },
        { token: 'delimiter', foreground: '9CA3AF' },
      ],
      colors: {
        'editor.background': '#1a1f25',
        'editor.foreground': '#D1D5DB',
        'editor.lineHighlightBackground': '#232a33',
        'editor.selectionBackground': '#3a7e92',
        'editor.inactiveSelectionBackground': '#2d3642',
        'editorCursor.foreground': '#F59E0B',
        'editorWhitespace.foreground': '#374452',
        'editorLineNumber.foreground': '#6B7280',
        'editorLineNumber.activeForeground': '#D1D5DB',
        'editorIndentGuide.background': '#2d3642',
        'editorIndentGuide.activeBackground': '#3f4d5c',
        'editor.foldBackground': '#3a7e92',
        'editorWidget.background': '#141619',
        'editorWidget.border': '#3f4d5c',
        'editorSuggestWidget.background': '#1a1f25',
        'editorSuggestWidget.border': '#3f4d5c',
        'editorSuggestWidget.selectedBackground': '#232a33',
        'editorSuggestWidget.highlightForeground': '#F59E0B',
        'editorHoverWidget.background': '#1a1f25',
        'editorHoverWidget.border': '#3f4d5c',
        'editorBracketMatch.background': '#3a7e9220',
        'editorBracketMatch.border': '#3a7e92',
        'editorError.foreground': '#ef4444',
        'editorWarning.foreground': '#F59E0B',
      }
    });

    monaco.editor.setTheme('industrial');
  };

  return (
    <div className="h-full w-full bg-white border border-slate-200 rounded-lg overflow-hidden shadow-inner">
      <Editor
        height="100%"
        defaultLanguage="sql"
        theme="light-professional"
        value={code}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: '"Jetbrains Mono", "Monaco", "Courier New", monospace',
          lineHeight: 1.6,
          letterSpacing: 0.5,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          tabSize: 2,
          insertSpaces: true,
          detectIndentation: true,
          trimAutoWhitespace: true,
          // renderLineFeedCharacters: false,
          renderControlCharacters: false,
          renderLineHighlight: 'line',
          selectionHighlight: true,
          // occurrencesHighlight: 'singleFileOnly',
          codeLens: false,
          folding: true,
          foldingHighlight: true,
          showFoldingControls: 'mouseover',
          matchBrackets: 'always',
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          autoSurround: 'languageDefined',
          colorDecorators: false,
          // lightbulb: { enabled: false },
          quickSuggestions: {
            other: true,
            comments: false,
            strings: false
          },
          parameterHints: { enabled: true },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          tabCompletion: 'on',
          // wordBasedSuggestions: 'matching',
          suggest: {
            preview: true,
            filterGraceful: true,
            localityBonus: true,
            shareSuggestSelections: true,
            showKeywords: true,
            showSnippets: false,
            showDeprecated: false,
          },
          hover: {
            enabled: true,
            delay: 500,
            sticky: true
          },
          contextmenu: true,
          mouseWheelZoom: false,
          multiCursorModifier: 'ctrlCmd',
          accessibilitySupport: 'auto',
          find: {
            addExtraSpaceOnTop: false,
            autoFindInSelection: 'never',
            seedSearchStringFromSelection: 'always'
          }
        }}
      />
    </div>
  );
}