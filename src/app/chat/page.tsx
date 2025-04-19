"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChatList } from "@/components/chat/ChatList";
import { ChatInput } from "@/components/chat/ChatInput";
import { PlusIcon, HomeIcon, ArrowLeftIcon, PlayIcon } from "lucide-react";
import Link from "next/link";
import { JsxSandbox } from "@/components/canvas/JsxSandbox";
import { PythonSandbox } from "@/components/canvas/PythonSandbox";
import { HtmlSandbox } from "@/components/canvas/HtmlSandbox";
import Split from "react-split";
import { useChatStore } from "@/store/chatStore";
import { dummyMessages } from "@/lib/constants/data";

export default function ChatPage() {
  // Zustand store'dan state ve fonksiyonları al
  const {
    codeResult,
    codePreview,
    isCodeRunning,
    currentSizes,
    handleViewInCanvas,
    handleRunCode,
    handleStopCode,
    handleCloseSandbox,
    handleDragEnd,
  } = useChatStore();

  const splitRef = useRef(null);

  // Sandbox panel aktif mi?
  const isSandboxActive = codeResult || codePreview;

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Link href="/" passHref>
            <Button variant="ghost" size="icon">
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-medium">Yeni Sohbet</h1>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/" passHref>
            <Button variant="ghost" size="icon">
              <HomeIcon className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/chat" passHref>
            <Button variant="outline" size="sm">
              <PlusIcon className="h-4 w-4 mr-2" /> Yeni Sohbet
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content with Chat and Sandbox - Always use Split */}
      <Split
        ref={splitRef}
        className="flex-1 overflow-hidden flex split transition-all duration-500 ease-in-out"
        sizes={currentSizes}
        minSize={isSandboxActive ? 300 : [300, 0]} // ikinci bölme yoksa minimum boyutu 0 olsun
        gutterSize={isSandboxActive ? 6 : 0} // sandbox aktif değilse gutter'ı gizle
        gutterAlign="center"
        onDragEnd={handleDragEnd}
        direction="horizontal"
      >
        {/* Chat Container */}
        <div className="flex flex-col min-w-0 h-full transition-all duration-500">
          <div className="flex-1 overflow-y-auto">
            <ChatList
              messages={dummyMessages}
              onViewInCanvas={handleViewInCanvas}
            />
          </div>

          <div className="p-4 border-t">
            <ChatInput
              onSendMessage={(message) => {
                console.log("Gönderilen mesaj:", message);
              }}
            />
          </div>
        </div>

        {/* Sandbox Panel - Width controlled by Split sizes */}
        <div
          className="h-full transition-all duration-500 ease-in-out overflow-hidden"
          style={{ opacity: currentSizes[1] > 0 ? 1 : 0 }}
        >
          {/* Şartlara göre farklı içerikler göster */}

          {/* Kod önizleme - sadece kod gösterimi */}
          {codePreview && !isCodeRunning && (
            <div className="h-full">
              <div className="p-3 border-b bg-muted flex justify-between items-center">
                <h3 className="text-sm font-medium">
                  {codePreview.language || "Kod Önizleme"}
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRunCode}
                    className="h-7"
                  >
                    <PlayIcon className="h-3 w-3 mr-1" /> Çalıştır
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCloseSandbox}
                    className="h-6 w-6 rounded-full"
                    title="Kapat"
                  >
                    <span className="text-lg">×</span>
                  </Button>
                </div>
              </div>
              <div className="p-4 font-mono text-sm overflow-auto h-[calc(100%-44px)]">
                <pre className="whitespace-pre-wrap">{codePreview.code}</pre>
              </div>
            </div>
          )}

          {/* Kod çalıştırıcı - Sandbox bileşenleri */}
          {codeResult && (
            <div className="h-full">
              <div className="p-3 border-b bg-muted flex justify-between items-center">
                <h3 className="text-sm font-medium">
                  {codeResult.type === "python"
                    ? "Python Çalıştırıcı"
                    : codeResult.type === "html"
                    ? "HTML Önizleme"
                    : "Canlı Önizleme"}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    // Kodu durdur ve önizleme moduna geri dön
                    if (codeResult) {
                      handleStopCode();
                    }
                  }}
                  className="h-6 w-6 rounded-full"
                  title="Durdur"
                >
                  <span className="text-lg">■</span>
                </Button>
              </div>
              {codeResult.type === "python" ? (
                <PythonSandbox code={codeResult.code} />
              ) : codeResult.type === "html" ? (
                <HtmlSandbox code={codeResult.code} />
              ) : (
                <JsxSandbox code={codeResult.code} />
              )}
            </div>
          )}

          {/* Hiçbir şey aktif değilse default görünüm */}
          {!codePreview && !codeResult && (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
              <p className="mb-2">Canlı önizleme için bir kod bloğu seçin</p>
              <p className="text-sm">
                Asistanın yanıtındaki kodları önizlemek için &quot;Kodu
                Göster&quot; butonuna tıklayın
              </p>
            </div>
          )}
        </div>
      </Split>
    </div>
  );
}
