"use client";
import { useState, useEffect } from "react";
import { RefreshCwIcon } from "lucide-react";

// Pyodide global tipleri için
declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
    pyodide?: PyodideInterface;
  }
}

// Pyodide interface tanımı
interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<string>;
  // Gerektiğinde diğer metot ve özellikleri ekleyebilirsiniz
}

interface PythonSandboxProps {
  code: string;
}

export function PythonSandbox({ code }: PythonSandboxProps) {
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pyodideReady, setPyodideReady] = useState(false);

  // Pyodide'ı başlat
  useEffect(() => {
    // Eğer window.pyodide varsa zaten yüklenmiştir
    if (window.pyodide) {
      setPyodideReady(true);
      return;
    }

    const loadPyodide = async () => {
      try {
        setLoading(true);

        // Pyodide script'ini yükle
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
        script.async = true;
        script.onload = async () => {
          try {
            const pyodide = await window.loadPyodide({
              indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
            });
            // Global olarak erişilebilir yap
            window.pyodide = pyodide;
            setPyodideReady(true);

            // Python içinde print çıktılarını yakalamak için yeniden yönlendirme
            await pyodide.runPythonAsync(`
              import sys
              from pyodide.ffi import to_js
              
              class PyodideOutput:
                  def __init__(self):
                      self.output = ""
                  
                  def write(self, text):
                      self.output += text
                  
                  def flush(self):
                      pass
                  
              py_output = PyodideOutput()
              sys.stdout = py_output
              sys.stderr = py_output
            `);

            setLoading(false);

            // Kod varsa hemen çalıştır
            if (code) {
              runCode();
            }
          } catch (err) {
            console.error("Pyodide yüklenirken hata oluştu:", err);
            setError(
              `Pyodide yüklenirken hata oluştu: ${
                err instanceof Error ? err.message : String(err)
              }`
            );
            setLoading(false);
          }
        };

        script.onerror = () => {
          setError("Pyodide yüklenirken hata oluştu");
          setLoading(false);
        };

        document.head.appendChild(script);
      } catch (err) {
        console.error("Pyodide yüklenirken hata oluştu:", err);
        setError(
          `Pyodide yüklenirken hata oluştu: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        setLoading(false);
      }
    };

    loadPyodide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Kod değiştiğinde otomatik çalıştırma
  useEffect(() => {
    if (code && pyodideReady) {
      // Kısa bir gecikme ekleyerek DOM'un hazır olmasını bekle
      const timer = setTimeout(() => {
        runCode();
      }, 300);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, pyodideReady]);

  const runCode = async () => {
    if (!pyodideReady || !window.pyodide) {
      setError("Pyodide henüz yüklenmedi, lütfen bekleyin");
      return;
    }

    setLoading(true);
    setError(null);
    setOutput("");

    try {
      // LLM çıktılarında yaygın olan kod şablonlarını tespit et ve dönüştür
      let processedCode = code;

      // 1. Markdown kod bloklarını temizle
      processedCode = processedCode.replace(/```python|```py|```$/g, "");

      // 2. Yorum satırlarını koru, ancak Python düzeninde olmasını sağla
      processedCode = processedCode
        .replace(/\/\/ (.*)/g, "# $1") // JavaScript yorum satırlarını Python yorumlarına dönüştür
        .trim();

      // 3. Geçersiz string karakterlerini düzelt
      processedCode = processedCode
        .replace(/print\("(\r?\n)"/g, 'print("\\n"') // Yeni satırları düzelt
        .replace(/\r?\n"/g, '\\n"'); // String içindeki satır sonlarını düzelt

      console.log("İşlenmiş Python kodu:", processedCode);

      const pyodide = window.pyodide;

      // Çıktıyı sıfırla
      await pyodide.runPythonAsync(`
        py_output.output = ""
      `);

      // Kodu çalıştır
      await pyodide.runPythonAsync(processedCode);

      // Çıktıyı al
      const result = await pyodide.runPythonAsync(`py_output.output`);
      setOutput(result || "Program başarıyla çalıştı (çıktı yok)");
    } catch (err) {
      console.error("Python kodu çalıştırılırken hata:", err);
      setError(
        `Python hatası: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full overflow-hidden flex flex-col border">
      <div className="flex-1 overflow-hidden bg-black text-white">
        {/* Çıktı bölümü */}
        <div className="overflow-auto h-full p-4 font-mono text-sm">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : loading ? (
            <div className="flex items-center justify-center h-full">
              <RefreshCwIcon className="h-5 w-5 animate-spin text-blue-400 mr-2" />
              <span>Python kodu çalıştırılıyor...</span>
            </div>
          ) : !pyodideReady ? (
            <div className="flex items-center justify-center h-full">
              <RefreshCwIcon className="h-5 w-5 animate-spin text-blue-400 mr-2" />
              <span>Pyodide yükleniyor... Bu biraz zaman alabilir</span>
            </div>
          ) : output ? (
            <pre className="whitespace-pre-wrap break-words">{output}</pre>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Python kodu çalıştırılmaya hazır
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
