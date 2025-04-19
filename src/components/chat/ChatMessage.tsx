import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User, Bot, Copy, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant" | "system";
  content: string;
  onViewInCanvas?: (code: string, language: string) => void;
}

export function ChatMessage({
  role,
  content,
  onViewInCanvas,
}: ChatMessageProps) {
  const isCodeBlock = content.includes("```");
  const isUser = role === "user";

  // Kod bloklarını içerikten çıkarıp formatlı şekilde göster
  const formatContent = () => {
    if (!isCodeBlock) {
      return <p className="whitespace-pre-wrap">{content}</p>;
    }

    const parts = content.split(/```([\s\S]*?)```/);
    return (
      <>
        {parts.map((part, i) => {
          // Tek sayı indeksler kod blokları, çiftler normal metin
          if (i % 2 === 1) {
            let language = "";
            let code = part;

            // Dil tanımı içeriyor mu kontrol et
            const firstLineEnd = part.indexOf("\n");
            if (firstLineEnd > 0) {
              language = part.substring(0, firstLineEnd).trim();
              code = part.substring(firstLineEnd + 1);
            }

            // Desteklenen diller
            const supportedLanguages = [
              "html",
              "javascript",
              "js",
              "python",
              "py",
              "jsx",
            ];
            const isLanguageSupported = supportedLanguages.includes(
              language.toLowerCase()
            );

            return (
              <div
                key={i}
                className="relative my-2 bg-muted p-0 rounded-md font-mono text-sm overflow-hidden"
              >
                {/* Başlık ve Butonlar Alanı */}
                <div className="flex justify-between items-center px-3 py-2 border-b border-border bg-black/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs opacity-70">
                      <code className="text-xs">{`</>`}</code>
                    </span>
                    <span className="font-medium">{language || "kod"}</span>
                  </div>
                  <div className="flex gap-2">
                    {isLanguageSupported && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          onViewInCanvas && onViewInCanvas(code, language)
                        }
                        title="Kodu Göster"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigator.clipboard.writeText(code)}
                      title="Kopyala"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Desteklenmeyen diller için kod içeriğini doğrudan göster */}
                {!isLanguageSupported && (
                  <pre className="px-4 py-3 overflow-x-auto">{code}</pre>
                )}
              </div>
            );
          }

          return (
            <p key={i} className="whitespace-pre-wrap">
              {part}
            </p>
          );
        })}
      </>
    );
  };

  return (
    <div
      className={cn(
        "flex gap-3 w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 bg-primary-foreground border border-border">
          <Bot className="h-4 w-4 text-primary" />
        </Avatar>
      )}

      <Card
        className={cn(
          "px-4 py-3 max-w-[80%]",
          isUser ? "bg-primary text-primary-foreground" : "bg-card"
        )}
      >
        {formatContent()}
      </Card>

      {isUser && (
        <Avatar className="h-8 w-8 bg-primary border border-primary">
          <User className="h-4 w-4 text-primary-foreground" />
        </Avatar>
      )}
    </div>
  );
}
