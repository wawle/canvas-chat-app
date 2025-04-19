"use client";
import { useState, useEffect, useRef } from "react";
import { RefreshCwIcon } from "lucide-react";

interface HtmlSandboxProps {
  code: string;
}

export function HtmlSandbox({ code }: HtmlSandboxProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (code) {
      renderHtml();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const renderHtml = async () => {
    setLoading(true);
    setError(null);

    try {
      // Kodu işle
      let processedCode = code;

      // Markdown kod bloklarını temizle (```html ve ``` işaretlerini kaldır)
      // Farklı formatlarda olabilecek markdown HTML bloklarını düzgün şekilde temizleyelim
      processedCode = processedCode
        .replace(/```(html|HTML)?|```$/gm, "")
        .trim();

      // Ters eğik çizgi (\) ile kaçış karakterlerini temizle (markdown içinde \` şeklinde gösterilmiş olabilir)
      processedCode = processedCode.replace(/\\`/g, "`");

      // Standart HTML şablonu
      const htmlTemplate = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body>
            ${processedCode}
          </body>
        </html>
      `;

      console.log("Render edilecek HTML:", htmlTemplate); // Debug için

      // İframe'e srcdoc olarak doğrudan HTML içeriğini atayalım
      if (iframeRef.current) {
        iframeRef.current.srcdoc = htmlTemplate;
      }
    } catch (err) {
      console.error("HTML render edilirken hata:", err);
      setError(
        `HTML hatası: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full overflow-hidden flex flex-col border">
      <div className="flex-1 overflow-hidden bg-white">
        {error ? (
          <div className="text-red-500 p-4">{error}</div>
        ) : loading ? (
          <div className="flex items-center justify-center h-full">
            <RefreshCwIcon className="h-5 w-5 animate-spin text-blue-400 mr-2" />
            <span>HTML render ediliyor...</span>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups"
            title="HTML Preview"
          ></iframe>
        )}
      </div>
    </div>
  );
}
