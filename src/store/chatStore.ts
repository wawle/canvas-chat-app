import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Store'da tutulacak state tipleri
interface ChatState {
  // Panel boyut ayarları
  splitSizes: number[];
  currentSizes: number[];
  // Aktif içerik
  activeContent: string | null;
  codeResult: { type: string; code: string } | null;
  // Kod önizleme modu
  codePreview: { language: string; code: string } | null;
  isCodeRunning: boolean;

  // Actionlar
  setSplitSizes: (sizes: number[]) => void;
  setCurrentSizes: (sizes: number[]) => void;
  setActiveContent: (content: string | null) => void;
  setCodeResult: (result: { type: string; code: string } | null) => void;
  handleViewInCanvas: (code: string, language: string) => void;
  handleRunCode: () => void;
  handleCloseSandbox: () => void;
  handleStopCode: () => void;
  handleDragEnd: (newSizes: number[]) => void;

  // Yardımcı metotlar
  findJsxCode: (
    markdownContent: string
  ) => { type: string; code: string } | null;
  findPythonCode: (
    markdownContent: string
  ) => { type: string; code: string } | null;
  findHtmlCode: (
    markdownContent: string
  ) => { type: string; code: string } | null;
  extractCode: (
    content: string | null
  ) => { type: string; code: string } | null;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      // Başlangıç değerleri
      splitSizes: [60, 40],
      currentSizes: [100, 0],
      activeContent: null,
      codeResult: null,
      codePreview: null,
      isCodeRunning: false,

      // State güncelleyiciler
      setSplitSizes: (sizes) => set({ splitSizes: sizes }),
      setCurrentSizes: (sizes) => set({ currentSizes: sizes }),
      setActiveContent: (content) => set({ activeContent: content }),
      setCodeResult: (result) => set({ codeResult: result }),

      // Kodu gösterme işlemi
      handleViewInCanvas: (code, language) => {
        // Dil tipini belirle

        // Önizleme modunu aktif et
        set({
          codePreview: { language, code },
          codeResult: null,
          isCodeRunning: false,
        });

        // Paneli aç
        setTimeout(() => {
          set({ currentSizes: get().splitSizes });
        }, 100);
      },

      // Kodu çalıştırma işlemi
      handleRunCode: () => {
        const codePreview = get().codePreview;
        if (!codePreview) return;

        const { language, code } = codePreview;

        // Dil tipini belirle ve kodu çalıştır
        let type;
        if (language.toLowerCase().includes("py")) {
          type = "python";
        } else if (language.toLowerCase().includes("html")) {
          type = "html";
        } else {
          type = "jsx";
        }

        set({
          codeResult: { type, code },
          isCodeRunning: true,
        });
      },

      // Kodu durdurma işlemi
      handleStopCode: () => {
        const codeResult = get().codeResult;
        if (!codeResult) return;

        // Çalışan kodu durdur ve önizleme moduna geri dön
        set({
          codePreview: { language: codeResult.type, code: codeResult.code },
          codeResult: null,
          isCodeRunning: false,
        });
      },

      // Sandbox'ı kapatma
      handleCloseSandbox: () => {
        set({
          activeContent: null,
          codePreview: null,
          codeResult: null,
          isCodeRunning: false,
          currentSizes: [100, 0],
        });
      },

      // Split yeniden boyutlandırma
      handleDragEnd: (newSizes) => {
        if (get().codePreview || get().codeResult) {
          set({ splitSizes: newSizes });
        }
        set({ currentSizes: newSizes });
      },

      // JSX kodunu bul ve düzenle
      findJsxCode: (markdownContent) => {
        const regex = /```(jsx|tsx|javascript|js)([\s\S]*?)```/i;
        const match = markdownContent.match(regex);

        if (match) {
          const codeWithLanguage = match[0];
          const firstLineEnd = codeWithLanguage.indexOf("\n");
          let code = codeWithLanguage
            .substring(firstLineEnd + 1, codeWithLanguage.lastIndexOf("```"))
            .trim();

          // export default ifadelerini temizle
          code = code
            .replace(/export\s+default\s+function\s+(\w+)/g, "function $1")
            .replace(/export\s+default\s+class\s+(\w+)/g, "class $1")
            .replace(
              /export\s+default\s+(\w+);?/,
              "window.DefaultExport = $1;"
            );

          return { type: "jsx", code };
        }

        return null;
      },

      // HTML kodunu bul
      findHtmlCode: (markdownContent) => {
        const regex = /```(html)([\s\S]*?)```/i;
        const match = markdownContent.match(regex);

        if (match) {
          const codeWithLanguage = match[0];
          const firstLineEnd = codeWithLanguage.indexOf("\n");
          const code = codeWithLanguage
            .substring(firstLineEnd + 1, codeWithLanguage.lastIndexOf("```"))
            .trim();

          return { type: "html", code };
        }

        return null;
      },

      // Python kodunu bul
      findPythonCode: (markdownContent) => {
        const regex = /```(python|py)([\s\S]*?)```/i;
        const match = markdownContent.match(regex);

        if (match) {
          const codeWithLanguage = match[0];
          const firstLineEnd = codeWithLanguage.indexOf("\n");
          const code = codeWithLanguage
            .substring(firstLineEnd + 1, codeWithLanguage.lastIndexOf("```"))
            .trim();

          return { type: "python", code };
        }

        return null;
      },

      // Aktif içerikten kod bloklarını çıkar
      extractCode: (content) => {
        if (!content) return null;

        // Önce JSX kodunu dene
        const jsxResult = get().findJsxCode(content);
        if (jsxResult) return jsxResult;

        // Sonra HTML kodunu dene
        const htmlResult = get().findHtmlCode(content);
        if (htmlResult) return htmlResult;

        // Son olarak Python kodunu dene
        const pythonResult = get().findPythonCode(content);
        if (pythonResult) return pythonResult;

        return null;
      },
    }),
    {
      name: "chat-storage", // local storage anahtarı
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        splitSizes: state.splitSizes,
        // Sadece ihtiyaç duyulan state'leri persist et
      }),
    }
  )
);
