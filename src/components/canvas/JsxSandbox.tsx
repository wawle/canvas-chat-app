"use client";
import { useState, useEffect, useCallback } from "react";
import { RefreshCwIcon } from "lucide-react";

interface Props {
  code: string;
  language?: string;
}

export function JsxSandbox({ code }: Props) {
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [iframeError, setIframeError] = useState<string | null>(null);

  // Iframe hata durumunu sıfırla
  useEffect(() => {
    if (code) {
      setIframeError(null);
    }
  }, [code]);

  // Kod değiştiğinde otomatik çalıştırma
  useEffect(() => {
    if (code) {
      // Kısa bir gecikme ekleyerek DOM'un hazır olmasını bekle
      const timer = setTimeout(() => {
        runCode();
      }, 300);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  // Iframe içindeki hataları yakalamak için bir işlev
  const handleIframeError = useCallback((event: MessageEvent) => {
    if (event.data && event.data.type === "iframe-error") {
      setIframeError(event.data.message);
    }
  }, []);

  // Event listener ekle/kaldır
  useEffect(() => {
    window.addEventListener("message", handleIframeError);
    return () => {
      window.removeEventListener("message", handleIframeError);
    };
  }, [handleIframeError]);

  // Geliştirilmiş HTML şablonu - daha fazla kütüphane ve stil desteği ile
  const createHtmlTemplate = (reactCode: string) => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>React Sandbox</title>
  
  <!-- React, ReactDOM ve Babel CDN -->
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin></script>
  
  <!-- Yaygın kullanılan ekstra kütüphaneler -->
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    // ReactRouterDOM global değişkeni için destek ekle
    window.ReactRouterDOM = window.ReactRouterDOM || window.ReactRouter;
    
    // Global hata yakalama
    window.onerror = function(message, source, lineno, colno, error) {
      window.parent.postMessage({ 
        type: 'iframe-error', 
        message: 'JavaScript Hatası: ' + message + ' (' + source + ':' + lineno + ':' + colno + ')'
      }, '*');
      return true;
    };
    
    // Promise hatalarını yakala
    window.addEventListener('unhandledrejection', function(event) {
      window.parent.postMessage({ 
        type: 'iframe-error', 
        message: 'İşlenmeyen Promise Hatası: ' + event.reason
      }, '*');
    });
  </script>
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 16px;
      box-sizing: border-box;
    }
    
    .todo-app {
      max-width: 500px;
      margin: 0 auto;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    h1 {
      text-align: center;
      color: #1a202c;
      margin-bottom: 16px;
    }
    
    .add-todo {
      display: flex;
      margin-bottom: 16px;
    }
    
    .add-todo input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      margin-right: 8px;
    }
    
    .add-todo button, .todo-list button {
      background-color: #4299e1;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
    }
    
    .add-todo button:hover, .todo-list button:hover {
      background-color: #3182ce;
    }
    
    .todo-list {
      list-style-type: none;
      padding: 0;
    }
    
    .todo-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .todo-list li:last-child {
      border-bottom: none;
    }
    
    .todo-list li.completed span {
      text-decoration: line-through;
      color: #a0aec0;
    }
    
    .todo-list span {
      cursor: pointer;
    }

    /* LLM çıktısı için genel stiller */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }
    
    .card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .button {
      background-color: #4299e1;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
    }
    
    .button:hover {
      background-color: #3182ce;
    }
    
    .input {
      padding: 8px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      width: 100%;
      margin-bottom: 8px;
    }
    
    .flex {
      display: flex;
    }
    
    .items-center {
      align-items: center;
    }
    
    .justify-between {
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    // React Hooks ve yardımcı fonksiyonlar
    const { 
      useState, useEffect, useRef, useCallback, useMemo, useContext, 
      createContext, memo, forwardRef, useReducer, useId 
    } = React;
    
    // React Router bileşenleri global alanda tanımla
    let ReactRouterComponents = {};
    try {
      ReactRouterComponents = ReactRouterDOM || window.ReactRouter || {};
    } catch (e) {
      console.warn("React Router yüklenemedi:", e);
    }
    
    const { 
      BrowserRouter, Routes, Route, Link, useNavigate, 
      useParams, useLocation, Outlet 
    } = ReactRouterComponents;

    // Axios tanımla
    const api = window.axios || { get: () => Promise.resolve({ data: {} }) };
    
    // Bileşen hata sınırı
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
      }
      
      static getDerivedStateFromError(error) {
        return { hasError: true, error };
      }
      
      componentDidCatch(error, errorInfo) {
        console.error("Bileşen hatası:", error, errorInfo);
        window.parent.postMessage({ 
          type: 'iframe-error', 
          message: 'React Bileşen Hatası: ' + error.message
        }, '*');
      }
      
      render() {
        if (this.state.hasError) {
          return <div style={{ color: 'red', padding: '10px', border: '1px solid red', borderRadius: '5px' }}>
            <h3>Bileşen Hatası</h3>
            <p>{this.state.error && this.state.error.message}</p>
          </div>;
        }
        return this.props.children;
      }
    }
    
    try {
      // İşlenmiş React kodu
      ${reactCode}

      // JSX kodunu çalıştırmak için gerekli yardımcı fonksiyonlar
      function detectMainComponent() {
        try {
          // Global alanda tanımlanan tüm bileşenleri bul
          const components = Object.keys(window).filter(key => {
            return key[0] === key[0].toUpperCase() && 
                  (typeof window[key] === 'function' || 
                  (window[key] && typeof window[key].render === 'function'));
          });
          
          // En olası ana bileşen adaylarını belirle
          const mainComponentNames = ['App', 'TodoApp', 'Main', 'Root', 'Component', 'Example'];
          let mainComponent = null;
          
          // Önce bilinen ana bileşen isimlerini kontrol et
          for (const name of mainComponentNames) {
            if (window[name] && typeof window[name] === 'function') {
              mainComponent = window[name];
              console.log('Ana bileşen bulundu:', name);
              break;
            }
          }
          
          // Eğer bulunamadıysa, export default olarak işaretlenmiş bileşeni kontrol et
          if (!mainComponent && window.DefaultExport) {
            mainComponent = window.DefaultExport;
            console.log('DefaultExport bileşeni kullanılıyor');
          }
          
          // Hala bulunamadıysa, bulunan ilk bileşeni kullan
          if (!mainComponent && components.length > 0) {
            mainComponent = window[components[0]];
            console.log('İlk bulunan bileşen kullanılıyor:', components[0]);
          }
          
          return mainComponent;
        } catch (err) {
          console.error('Bileşen tespit hatası:', err);
          return null;
        }
      }
    
      // JSX kodundan bileşen oluştur ve render et
      function renderJsxCode() {
        try {
          const mainComponent = detectMainComponent();
          
          if (mainComponent) {
            // Ana bileşen bulunduğunda render et
            const MainComponent = mainComponent;
            ReactDOM.createRoot(document.getElementById('root')).render(
              <ErrorBoundary>
                <MainComponent />
              </ErrorBoundary>
            );
          } else {
            // Doğrudan içeriği render etmeyi dene
            const jsxContent = document.getElementById('jsx-content');
            if (jsxContent && jsxContent.textContent) {
              const JSXElement = eval('(' + jsxContent.textContent + ')');
              ReactDOM.createRoot(document.getElementById('root')).render(
                <ErrorBoundary>
                  {JSXElement}
                </ErrorBoundary>
              );
            } else {
              throw new Error('Render edilecek bir React bileşeni bulunamadı');
            }
          }
        } catch (err) {
          console.error('Render hatası:', err);
          document.getElementById('root').innerHTML = '<div style="color: red; padding: 20px;">Render hatası: ' + err.message + '</div>';
          window.parent.postMessage({ type: 'iframe-error', message: 'Render hatası: ' + err.message }, '*');
        }
      }
    
      // İşlev: kodun bir JSX ifadesi olup olmadığını kontrol et
      function isJsxExpression(code) {
        try {
          // JSX içeriği ayrı bir script tagli altında sakla
          const jsxContentElm = document.createElement('script');
          jsxContentElm.id = 'jsx-content';
          jsxContentElm.type = 'text/jsx';
          jsxContentElm.textContent = code;
          document.body.appendChild(jsxContentElm);
          
          // Başlangıçta React bileşenlerini deneyelim
          renderJsxCode();
          return true;
        } catch (e) {
          console.log('JSX ifadesi değil, hata:', e);
          return false;
        }
      }
      
      // Doğrudan JSX ifadesini dene, başarısız olursa normal React bileşenlerini dene
      if (!isJsxExpression(\`${reactCode}\`)) {
        try {
          renderJsxCode();
        } catch (err) {
          console.error('Render hatası:', err);
          document.getElementById('root').innerHTML = '<div style="color: red; padding: 20px;">Render hatası: ' + err.message + '</div>';
          window.parent.postMessage({ type: 'iframe-error', message: 'Render hatası: ' + err.message }, '*');
        }
      }
    } catch (err) {
      console.error('Kod yürütme hatası:', err);
      document.getElementById('root').innerHTML = '<div style="color: red; padding: 20px;">Kod yürütme hatası: ' + err.message + '</div>';
      window.parent.postMessage({ type: 'iframe-error', message: 'Kod yürütme hatası: ' + err.message }, '*');
    }
  </script>
</body>
</html>
`;
  };

  const runCode = () => {
    setLoading(true);
    setError(null);
    setIframeError(null);

    try {
      // LLM çıktılarında yaygın olan kod şablonlarını tespit et ve dönüştür
      let processedCode = code;

      // 1. Markdown kod bloklarını temizle
      processedCode = processedCode.replace(
        /```jsx|```tsx|```js|```javascript|```react|```$/g,
        ""
      );

      // 2. İmport ifadelerini daha kapsamlı bir şekilde ele al
      processedCode = processedCode
        // React importlarını kaldır (zaten global olarak tanımlı)
        .replace(
          /import\s+React,\s*{\s*[^}]*}\s*from\s*['"]react['"];?/g,
          "// React ve React Hooks zaten global olarak tanımlı"
        )
        .replace(
          /import\s+React\s+from\s*['"]react['"];?/g,
          "// React zaten global olarak tanımlı"
        )
        .replace(
          /import\s+{\s*[^}]*}\s*from\s*['"]react['"];?/g,
          "// React Hooks zaten global olarak tanımlı"
        )

        // React-router importlarını kaldır
        .replace(
          /import\s+{\s*[^}]*}\s*from\s*['"]react-router-dom['"];?/g,
          "// React Router bileşenleri zaten global olarak tanımlı"
        )

        // Diğer tüm importları yoruma çevir
        .replace(
          /import\s+.*\s*from\s*['"].*['"];?/g,
          "// Import kaldırıldı: $&"
        )

        // CSS importlarını yoruma çevir
        .replace(/import\s+['"].*\.css['"];?/g, "// CSS import kaldırıldı: $&");

      // 3. Export ifadelerini düzenle
      processedCode = processedCode
        // export default function X() -> function X()
        .replace(/export\s+default\s+function\s+(\w+)/g, "function $1")
        // export function X() -> function X()
        .replace(/export\s+function\s+(\w+)/g, "function $1")
        // export default class X -> class X
        .replace(/export\s+default\s+class\s+(\w+)/g, "class $1")
        // export class X -> class X
        .replace(/export\s+class\s+(\w+)/g, "class $1")
        // export default X -> window.DefaultExport = X
        .replace(/export\s+default\s+(\w+);?/g, "window.DefaultExport = $1;")
        // export const X -> const X
        .replace(/export\s+const\s+(\w+)/g, "const $1");

      // 4. JSX ifadelerinin doğrudan render edilmesine izin ver
      // JSX kodu doğrudan yazıldıysa (bir fonksiyon veya sınıf içinde değilse) bunun için kontrol ekle
      const hasReactComponent =
        /function\s+\w+\s*\([^)]*\)\s*{/.test(processedCode) ||
        /class\s+\w+\s+extends\s+React\.Component/.test(processedCode) ||
        /const\s+\w+\s*=\s*\([^)]*\)\s*=>/.test(processedCode);

      if (
        !hasReactComponent &&
        processedCode.includes("<") &&
        processedCode.includes(">")
      ) {
        // JSX ifadesini doğrudan render etmek için işaretle
        processedCode = `// JSX ifadesi doğrudan render edilecek\n${processedCode}`;
      }

      console.log("İşlenmiş kod:", processedCode);

      // HTML içeriğini oluştur
      const htmlContent = createHtmlTemplate(processedCode);
      console.log("Render edilecek:", { htmlContent });

      // iframe içeriğini güncelle
      setOutput(htmlContent);
      setLoading(false);
    } catch (err) {
      console.error("Kod çalıştırma hatası:", err);
      setError(
        `Kod çalıştırma hatası: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full overflow-hidden flex flex-col border">
      <div className="flex-1 overflow-hidden">
        {/* Çıktı bölümü */}
        <div className="overflow-auto bg-white h-full">
          {error || iframeError ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="text-red-600 font-medium mb-1">Hata Oluştu</div>
              <div className="text-red-500 text-sm whitespace-pre-wrap">
                {error || iframeError}
              </div>
            </div>
          ) : loading ? (
            <div className="p-4 flex justify-center items-center h-full">
              <RefreshCwIcon className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : output ? (
            <iframe
              title="code-output"
              srcDoc={output}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-popups allow-same-origin"
              onError={() => setError("iframe yüklenirken hata oluştu")}
            />
          ) : (
            <div className="p-4 flex justify-center items-center h-full text-sm text-muted-foreground">
              Kodu çalıştırmak için &quot;Çalıştır&quot; düğmesine tıklayın
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
