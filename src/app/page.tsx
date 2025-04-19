import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { MessagesSquare, Code, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-b from-background to-muted">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-center size-20 rounded-full bg-primary/10">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Canvas Chat Uygulaması
        </h1>

        <p className="text-xl text-muted-foreground mb-8">
          ChatGPT benzeri arayüz ile kodlama yapın, görselleştirin ve
          düzenleyin.
        </p>

        <div className="w-full max-w-md">
          <Link href="/chat" passHref>
            <Button size="lg" className="w-full mb-4">
              <MessagesSquare className="mr-2 h-5 w-5" />
              Yeni Sohbet Başlat
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-16">
        <Card className="p-6">
          <div className="mb-4 bg-primary/10 size-12 flex items-center justify-center rounded-lg">
            <MessagesSquare className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">AI Destekli Sohbet</h2>
          <p className="text-muted-foreground">
            Doğal dil ile kod oluşturma, otomatik kod tamamlama ve programlama
            dillerine göre özelleştirilmiş yanıtlar alın.
          </p>
        </Card>

        <Card className="p-6">
          <div className="mb-4 bg-primary/10 size-12 flex items-center justify-center rounded-lg">
            <Code className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Kod Görselleştirme</h2>
          <p className="text-muted-foreground">
            AI tarafından üretilen kodları interaktif canvas üzerinde gösterin
            ve kod bileşenleri arasındaki ilişkileri inceleyin.
          </p>
        </Card>

        <Card className="p-6">
          <div className="mb-4 bg-primary/10 size-12 flex items-center justify-center rounded-lg">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Kodlama Deneyimi</h2>
          <p className="text-muted-foreground">
            Markdown desteği, kod bloklarında syntax highlighting ve gerçek
            zamanlı düzenleme özellikleri ile kodlama deneyiminizi geliştirin.
          </p>
        </Card>
      </div>
    </main>
  );
}
