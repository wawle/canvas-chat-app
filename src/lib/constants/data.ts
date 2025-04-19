// Message tipi
export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: Date;
}

// Örnek mesaj verisi
export const dummyMessages: Message[] = [
  {
    id: "1",
    role: "system",
    content:
      "Merhaba! Ben Canvas Chat AI asistanınız. Size nasıl yardımcı olabilirim?",
    createdAt: new Date(),
  },
  {
    id: "2",
    role: "user",
    content:
      "React kullanarak basit bir todo uygulaması oluşturmama yardımcı olur musun?",
    createdAt: new Date(Date.now() - 120000),
  },
  {
    id: "3",
    role: "assistant",
    content: `Tabi, React ile bir Todo uygulaması oluşturalım. Size temel bir uygulama yapısı sunacağım.

Öncelikle bir Todo bileşeni oluşturalım:

\`\`\`jsx
import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { text: input, completed: false, id: Date.now() }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <h1>Todo Uygulaması</h1>
      
      <div className="add-todo">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Yapılacak iş ekle..."
          onKeyPress={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Ekle</button>
      </div>
      
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
\`\`\`

Bu temel yapı üzerine stil ekleyebilir ve daha fazla özellik geliştirebilirsiniz. Yardımcı olabileceğim başka bir konu var mı?`,
    createdAt: new Date(Date.now() - 60000),
  },
  {
    id: "4",
    role: "user",
    content: "Basit bir sayaç componenti örneği gösterebilir misin?",
    createdAt: new Date(Date.now() - 40000),
  },
  {
    id: "5",
    role: "assistant",
    content: `Tabii, size basit bir sayaç (counter) componenti örneği göstereyim:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-container">
      <h2>Sayaç Uygulaması</h2>
      
      <div className="counter-display">
        <p className="count-value">{count}</p>
      </div>
      
      <div className="counter-controls">
        <button 
          className="counter-button decrement" 
          onClick={decrement}
        >
          Azalt
        </button>
        
        <button 
          className="counter-button reset" 
          onClick={reset}
        >
          Sıfırla
        </button>
        
        <button 
          className="counter-button increment" 
          onClick={increment}
        >
          Artır
        </button>
      </div>
    </div>
  );
}

export default Counter;
\`\`\`

Bu basit sayaç componenti:
1. Artırma, azaltma ve sıfırlama işlevleriyle tam bir sayaç işlevi görür
2. useState hook'unu kullanarak sayaç değerini tutar
3. Kolayca özelleştirilebilir ve başka projelere entegre edilebilir

CSS ile güzelleştirmek veya başka özellikler eklemek isterseniz yardımcı olabilirim.`,
    createdAt: new Date(Date.now() - 30000),
  },
  {
    id: "6",
    role: "user",
    content: "buradaki gibi bir tane tic tac toe uygulaması yapar mısın?",
    createdAt: new Date(Date.now() - 20000),
  },
  {
    id: "7",
    role: "assistant",
    content: `Tabii, size basit bir Tic Tac Toe (XOX) oyunu örneği göstereyim:

\`\`\`jsx
import React, { useState } from 'react';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // yatay
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // dikey
      [0, 4, 8], [2, 4, 6]             // çapraz
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    
    return null;
  };
  
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);
  
  const handleClick = (i) => {
    if (board[i] || calculateWinner(board)) {
      return;
    }
    
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };
  
  const renderSquare = (i) => {
    return (
      <button 
        className="square" 
        onClick={() => handleClick(i)}
        style={{
          width: '60px',
          height: '60px',
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '2px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #999'
        }}
      >
        {board[i]}
      </button>
    );
  };
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };
  
  let status;
  if (winner) {
    status = 'Kazanan: ' + winner;
  } else if (isDraw) {
    status = 'Oyun berabere bitti!';
  } else {
    status = 'Sıradaki oyuncu: ' + (xIsNext ? 'X' : 'O');
  }
  
  return (
    <div className="tic-tac-toe">
      <h2>Tic Tac Toe Oyunu</h2>
      
      <div className="status" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        {status}
      </div>
      
      <div className="board">
        <div className="board-row" style={{ display: 'flex' }}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row" style={{ display: 'flex' }}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row" style={{ display: 'flex' }}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      
      <button 
        className="reset-button" 
        onClick={resetGame}
        style={{
          marginTop: '15px',
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Oyunu Sıfırla
      </button>
    </div>
  );
}

export default TicTacToe;
\`\`\`

Bu Tic Tac Toe oyunu:
1. 3x3'lük bir oyun tahtası oluşturur
2. Sırayla X ve O oyuncularının hamle yapmasını sağlar
3. Kazananı otomatik olarak belirler
4. Beraberlik durumunu kontrol eder
5. Oyunu sıfırlama özelliği sunar

Oyunu daha da geliştirmek için oyuncu isimlerini ekleyebilir, skor tablosu tutabilir veya tasarımı daha da güzelleştirebilirsiniz.`,
    createdAt: new Date(Date.now() - 10000),
  },
  {
    id: "8",
    role: "user",
    content: "bana hesap makinesi yap react ile",
    createdAt: new Date(Date.now() - 5000),
  },
  {
    id: "9",
    role: "assistant",
    content: `Tabii, size React ile basit bir hesap makinesi örneği göstereyim:

\`\`\`jsx
import React, { useState } from 'react';

function HesapMakinesi() {
  const [ekran, setEkran] = useState('0');
  const [oncekiDeger, setOncekiDeger] = useState(null);
  const [islem, setIslem] = useState(null);
  const [yeniSayiGir, setYeniSayiGir] = useState(true);

  const rakamGir = (rakam) => {
    if (yeniSayiGir) {
      setEkran(String(rakam));
      setYeniSayiGir(false);
    } else {
      setEkran(ekran === '0' ? String(rakam) : ekran + rakam);
    }
  };

  const islemSec = (secilenIslem) => {
    const deger = parseFloat(ekran);
    
    if (oncekiDeger === null) {
      setOncekiDeger(deger);
    } else if (islem) {
      const sonuc = hesapla();
      setOncekiDeger(sonuc);
      setEkran(String(sonuc));
    }
    
    setIslem(secilenIslem);
    setYeniSayiGir(true);
  };

  const hesapla = () => {
    const suankiDeger = parseFloat(ekran);
    let sonuc = 0;
    
    switch (islem) {
      case '+':
        sonuc = oncekiDeger + suankiDeger;
        break;
      case '-':
        sonuc = oncekiDeger - suankiDeger;
        break;
      case '*':
        sonuc = oncekiDeger * suankiDeger;
        break;
      case '/':
        sonuc = oncekiDeger / suankiDeger;
        break;
      default:
        return suankiDeger;
    }
    
    return Math.round(sonuc * 1000000) / 1000000;
  };

  const esittir = () => {
    if (!islem) return;
    
    const sonuc = hesapla();
    setEkran(String(sonuc));
    setOncekiDeger(null);
    setIslem(null);
    setYeniSayiGir(true);
  };

  const temizle = () => {
    setEkran('0');
    setOncekiDeger(null);
    setIslem(null);
    setYeniSayiGir(true);
  };

  const tusTakimi = [
    { deger: '7', onClick: () => rakamGir(7) },
    { deger: '8', onClick: () => rakamGir(8) },
    { deger: '9', onClick: () => rakamGir(9) },
    { deger: '÷', onClick: () => islemSec('/') },
    { deger: '4', onClick: () => rakamGir(4) },
    { deger: '5', onClick: () => rakamGir(5) },
    { deger: '6', onClick: () => rakamGir(6) },
    { deger: '×', onClick: () => islemSec('*') },
    { deger: '1', onClick: () => rakamGir(1) },
    { deger: '2', onClick: () => rakamGir(2) },
    { deger: '3', onClick: () => rakamGir(3) },
    { deger: '-', onClick: () => islemSec('-') },
    { deger: '0', onClick: () => rakamGir(0) },
    { deger: 'C', onClick: () => temizle() },
    { deger: '=', onClick: () => esittir() },
    { deger: '+', onClick: () => islemSec('+') },
  ];

  return (
    <div className="hesap-makinesi">
      <h2>Hesap Makinesi</h2>
      
      <div 
        className="ekran"
        style={{
          padding: '15px',
          backgroundColor: '#f0f0f0',
          textAlign: 'right',
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '10px',
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}
      >
        {ekran}
      </div>
      
      <div 
        className="tus-takimi"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px'
        }}
      >
        {tusTakimi.map((tus, index) => (
          <button
            key={index}
            onClick={tus.onClick}
            style={{
              padding: '15px',
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: /[0-9]/.test(tus.deger) ? '#fff' : 
                               tus.deger === '=' ? '#4CAF50' : '#f8f8f8',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {tus.deger}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HesapMakinesi;
\`\`\`

Bu hesap makinesi:
1. Dört temel matematik işlemini yapabilir (toplama, çıkarma, çarpma, bölme)
2. Tam sayılar ve ondalık sayılarla çalışır
3. Temizleme (C) tuşuyla hesaplamayı sıfırlayabilirsiniz
4. Sezgisel ve kullanımı kolay bir arayüze sahiptir
5. Temel hesap makinesi işlevlerinin hepsini sunar

Dilerseniz, renkleri değiştirerek veya hesaplama geçmişi ekleyerek daha da geliştirebilirsiniz.`,
    createdAt: new Date(Date.now()),
  },
  {
    id: "10",
    role: "user",
    content:
      "bana bir tane hava durumu sayfası yap şehir bilgisini seçtiğimde ilgili şehrin hava durumu bilgisini güzel grafikler ile gösterimini yapabilsin",
    createdAt: new Date(Date.now() + 5000),
  },
  {
    id: "11",
    role: "assistant",
    content: `Tabii, size şehir seçimine göre hava durumu gösteren ve grafik görselleştirmeleri içeren bir React uygulaması örneği göstereyim. Harici kütüphaneler kullanmadan, saf (vanilla) JavaScript ile grafikler oluşturacağım:

\`\`\`jsx
import React, { useState, useEffect, useRef } from 'react';

function HavaDurumuUygulamasi() {
  const [sehir, setSehir] = useState('istanbul');
  const [havaDurumu, setHavaDurumu] = useState(null);
  const [tahminler, setTahminler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);
  
  // Canvas referansları için useRef kullanıyoruz
  const sicaklikGrafikRef = useRef(null);
  const nemGrafikRef = useRef(null);

  const sehirler = [
    { id: 'istanbul', isim: 'İstanbul' },
    { id: 'ankara', isim: 'Ankara' },
    { id: 'izmir', isim: 'İzmir' },
    { id: 'antalya', isim: 'Antalya' },
    { id: 'bursa', isim: 'Bursa' },
    { id: 'adana', isim: 'Adana' },
  ];

  // API'den veri alma fonksiyonu (örnek amaçlıdır, gerçek API'ye göre düzenlenmelidir)
  const havaDurumuGetir = async (sehirAdi) => {
    setYukleniyor(true);
    setHata(null);
    
    try {
      // Gerçek bir uygulamada, bu kısımda OpenWeatherMap gibi bir API'ye istek yapılır
      // Bu örnek için veri simüle ediyoruz
      await new Promise(resolve => setTimeout(resolve, 800)); // Yükleme efekti için
      
      // Simüle edilmiş hava durumu verisi
      const simulasyonVerisi = {
        sehir: sehirler.find(s => s.id === sehirAdi).isim,
        tarih: new Date().toLocaleDateString('tr-TR'),
        sicaklik: Math.floor(Math.random() * 15) + 10, // 10-25 arası
        hissedilen: Math.floor(Math.random() * 15) + 8, // 8-23 arası
        durum: ['Güneşli', 'Parçalı Bulutlu', 'Bulutlu', 'Yağmurlu'][Math.floor(Math.random() * 4)],
        nem: Math.floor(Math.random() * 50) + 30, // 30-80 arası
        ruzgarHizi: Math.floor(Math.random() * 30) + 5, // 5-35 arası
        basinc: Math.floor(Math.random() * 50) + 1000, // 1000-1050 arası
      };

      // Tahminler için simüle edilmiş veri (5 günlük)
      const simulasyonTahminler = Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 1);
        
        return {
          tarih: date.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric' }),
          sicaklik: Math.floor(Math.random() * 15) + 10,
          durum: ['Güneşli', 'Parçalı Bulutlu', 'Bulutlu', 'Yağmurlu'][Math.floor(Math.random() * 4)],
          nem: Math.floor(Math.random() * 50) + 30,
        };
      });

      setHavaDurumu(simulasyonVerisi);
      setTahminler(simulasyonTahminler);
    } catch (error) {
      setHata('Hava durumu verileri alınırken bir hata oluştu');
      console.error('Hata:', error);
    } finally {
      setYukleniyor(false);
    }
  };

  // Seçilen şehir değiştiğinde verileri getir
  useEffect(() => {
    havaDurumuGetir(sehir);
  }, [sehir]);
  
  // Veriler geldiğinde grafikleri çiz
  useEffect(() => {
    if (tahminler.length > 0) {
      cizSicaklikGrafigi();
      cizNemGrafigi();
    }
  }, [tahminler]);

  // Vanilla JS ile Sıcaklık Çizgi Grafiği çizme
  const cizSicaklikGrafigi = () => {
    if (!sicaklikGrafikRef.current) return;
    
    const canvas = sicaklikGrafikRef.current;
    const ctx = canvas.getContext('2d');
    
    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;
    
    // Değerleri al
    const sicakliklar = tahminler.map(t => t.sicaklik);
    const tarihler = tahminler.map(t => t.tarih);
    
    const maxSicaklik = Math.max(...sicakliklar) + 5;
    const minSicaklik = Math.min(...sicakliklar) - 5;
    
    // Arka plan ve kenarlık çiz
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ddd';
    ctx.strokeRect(padding, padding, width, height);
    
    // Izgara çizgileri
    ctx.beginPath();
    ctx.strokeStyle = '#eee';
    for (let i = 1; i < 5; i++) {
      const y = padding + (height / 5) * i;
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + width, y);
    }
    ctx.stroke();
    
    // Y ekseni etiketleri
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const val = minSicaklik + ((maxSicaklik - minSicaklik) / 5) * (5 - i);
      const y = padding + (height / 5) * i;
      ctx.fillText(Math.round(val) + '°C', padding - 5, y + 4);
    }
    
    // X ekseni etiketleri
    ctx.textAlign = 'center';
    tarihler.forEach((tarih, i) => {
      const x = padding + (width / (tarihler.length - 1)) * i;
      ctx.fillText(tarih, x, canvas.height - padding / 3);
    });
    
    // Başlık
    ctx.textAlign = 'center';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Sıcaklık Grafiği (°C)', canvas.width / 2, 20);
    
    // Veri noktaları ve çizgiler
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(255, 99, 132)';
    ctx.lineWidth = 2;
    
    sicakliklar.forEach((sicaklik, i) => {
      const x = padding + (width / (sicakliklar.length - 1)) * i;
      const yRatio = (sicaklik - minSicaklik) / (maxSicaklik - minSicaklik);
      const y = padding + height - (height * yRatio);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Veri noktaları
    sicakliklar.forEach((sicaklik, i) => {
      const x = padding + (width / (sicakliklar.length - 1)) * i;
      const yRatio = (sicaklik - minSicaklik) / (maxSicaklik - minSicaklik);
      const y = padding + height - (height * yRatio);
      
      ctx.beginPath();
      ctx.fillStyle = 'rgb(255, 99, 132)';
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Veri noktası değerleri
      ctx.fillStyle = '#333';
      ctx.fillText(sicaklik + '°C', x, y - 10);
    });
  };
  
  // Vanilla JS ile Nem Çubuk Grafiği çizme
  const cizNemGrafigi = () => {
    if (!nemGrafikRef.current) return;
    
    const canvas = nemGrafikRef.current;
    const ctx = canvas.getContext('2d');
    
    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;
    
    // Değerleri al
    const nemDegerleri = tahminler.map(t => t.nem);
    const tarihler = tahminler.map(t => t.tarih);
    
    const maxNem = Math.max(...nemDegerleri) + 10;
    const minNem = Math.min(...nemDegerleri) > 10 ? Math.min(...nemDegerleri) - 10 : 0;
    
    // Arka plan ve kenarlık çiz
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ddd';
    ctx.strokeRect(padding, padding, width, height);
    
    // Izgara çizgileri
    ctx.beginPath();
    ctx.strokeStyle = '#eee';
    for (let i = 1; i < 5; i++) {
      const y = padding + (height / 5) * i;
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + width, y);
    }
    ctx.stroke();
    
    // Y ekseni etiketleri
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const val = minNem + ((maxNem - minNem) / 5) * (5 - i);
      const y = padding + (height / 5) * i;
      ctx.fillText(Math.round(val) + '%', padding - 5, y + 4);
    }
    
    // X ekseni etiketleri
    ctx.textAlign = 'center';
    tarihler.forEach((tarih, i) => {
      const x = padding + (width / tarihler.length) * i + (width / tarihler.length) / 2;
      ctx.fillText(tarih, x, canvas.height - padding / 3);
    });
    
    // Başlık
    ctx.textAlign = 'center';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Nem Grafiği (%)', canvas.width / 2, 20);
    
    // Çubukları çiz
    const barWidth = (width / nemDegerleri.length) * 0.6;
    
    nemDegerleri.forEach((nem, i) => {
      const x = padding + (width / nemDegerleri.length) * i + (width / nemDegerleri.length) / 2 - barWidth / 2;
      const yRatio = (nem - minNem) / (maxNem - minNem);
      const barHeight = height * yRatio;
      const y = padding + height - barHeight;
      
      ctx.fillStyle = 'rgba(53, 162, 235, 0.5)';
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Çubuk değerleri
      ctx.fillStyle = '#333';
      ctx.fillText(nem + '%', x + barWidth / 2, y - 10);
    });
  };

  // Hava durumu ikonları için yardımcı fonksiyon
  const havaDurumuIkonu = (durum) => {
    switch (durum) {
      case 'Güneşli':
        return '☀️';
      case 'Parçalı Bulutlu':
        return '⛅';
      case 'Bulutlu':
        return '☁️';
      case 'Yağmurlu':
        return '🌧️';
      default:
        return '❓';
    }
  };

  return (
    <div className="hava-durumu-uygulamasi" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Hava Durumu Uygulaması</h1>
      
      {/* Şehir Seçici */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="sehir-secici" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Şehir Seçin:
        </label>
        <select
          id="sehir-secici"
          value={sehir}
          onChange={(e) => setSehir(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        >
          {sehirler.map((s) => (
            <option key={s.id} value={s.id}>
              {s.isim}
            </option>
          ))}
        </select>
      </div>

      {/* Yükleniyor durumu */}
      {yukleniyor && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <p>Hava durumu bilgileri yükleniyor...</p>
        </div>
      )}

      {/* Hata durumu */}
      {hata && (
        <div style={{ 
          textAlign: 'center', 
          margin: '20px 0', 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          borderRadius: '4px' 
        }}>
          <p>{hata}</p>
        </div>
      )}

      {/* Güncel Hava Durumu Kartı */}
      {!yukleniyor && !hata && havaDurumu && (
        <div>
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px', 
            padding: '20px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ marginTop: 0 }}>{havaDurumu.sehir}</h2>
                <p style={{ fontSize: '14px', color: '#666' }}>{havaDurumu.tarih}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>{havaDurumuIkonu(havaDurumu.durum)}</div>
                <div style={{ fontSize: '16px' }}>{havaDurumu.durum}</div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '20px',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ flex: '1', minWidth: '120px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#666' }}>Sıcaklık</h3>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{havaDurumu.sicaklik}°C</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>
                  Hissedilen: {havaDurumu.hissedilen}°C
                </p>
              </div>
              
              <div style={{ flex: '1', minWidth: '120px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#666' }}>Nem</h3>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{havaDurumu.nem}%</p>
              </div>
              
              <div style={{ flex: '1', minWidth: '120px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#666' }}>Rüzgar</h3>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{havaDurumu.ruzgarHizi} km/sa</p>
              </div>
              
              <div style={{ flex: '1', minWidth: '120px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#666' }}>Basınç</h3>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{havaDurumu.basinc} hPa</p>
              </div>
            </div>
          </div>

          {/* 5 Günlük Tahmin */}
          <h2 style={{ marginBottom: '15px' }}>5 Günlük Tahmin</h2>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '30px',
            overflowX: 'auto',
            gap: '10px'
          }}>
            {tahminler.map((tahmin, index) => (
              <div key={index} style={{ 
                flex: '1',
                minWidth: '100px',
                backgroundColor: '#f9f9f9',
                padding: '15px',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}>
                <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>{tahmin.tarih}</p>
                <div style={{ fontSize: '32px', margin: '10px 0' }}>{havaDurumuIkonu(tahmin.durum)}</div>
                <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>{tahmin.sicaklik}°C</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>{tahmin.nem}% nem</p>
              </div>
            ))}
          </div>

          {/* Vanilla JavaScript ile Grafikler */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ marginBottom: '15px' }}>Sıcaklık Grafiği (5 Günlük)</h2>
            <div style={{ height: '300px', width: '100%' }}>
              <canvas
                ref={sicaklikGrafikRef}
                width={800}
                height={300}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>

          <div>
            <h2 style={{ marginBottom: '15px' }}>Nem Grafiği (5 Günlük)</h2>
            <div style={{ height: '300px', width: '100%' }}>
              <canvas
                ref={nemGrafikRef}
                width={800}
                height={300}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      )}
      
      <div style={{ marginTop: '30px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
        <p>
          Not: Bu uygulama demo amaçlıdır ve simüle edilmiş veriler kullanmaktadır. 
          Gerçek uygulamada, OpenWeatherMap veya benzeri bir hava durumu API'si kullanabilirsiniz.
        </p>
      </div>
    </div>
  );
}

export default HavaDurumuUygulamasi;
\`\`\`

Bu hava durumu uygulaması:

1. Kullanıcının şehir seçmesine olanak tanır
2. Seçilen şehre göre güncel hava durumunu gösterir
3. 5 günlük hava durumu tahminini gösterir
4. Sıcaklık değişimini HTML Canvas ve saf JavaScript ile çizgi grafiği olarak görselleştirir
5. Nem değişimini HTML Canvas ve saf JavaScript ile çubuk grafiği olarak görselleştirir

Hiçbir harici grafik kütüphanesi kullanılmamıştır - tüm grafikler vanilla JavaScript ve HTML Canvas API'si kullanılarak oluşturulmuştur. Bu yaklaşım, gereksiz harici bağımlılıkları ortadan kaldırır ve sayfanın daha hızlı yüklenmesini sağlar.

Bu örnek uygulamayı gerçek bir projeye dönüştürmek için:

1. OpenWeatherMap veya AccuWeather gibi gerçek bir hava durumu API'si entegre edilmelidir
2. API anahtarınızı güvenli bir şekilde yönetmelisiniz
3. Geolokasyon API'si ile kullanıcının konumunu otomatik tespit edebilirsiniz
4. Progressive Web App (PWA) yaparak offline kullanım ekleyebilirsiniz
5. Daha fazla hava durumu detayı ve radar görüntüleri ekleyebilirsiniz`,
    createdAt: new Date(Date.now() + 10000),
  },
  {
    id: "12",
    role: "user",
    content:
      "Basit bir Python örneği gösterebilir misin? Fibonacci dizisi hesaplayan bir kod istiyorum.",
    createdAt: new Date(Date.now() + 20000),
  },
  {
    id: "13",
    role: "assistant",
    content: `Tabii, Fibonacci dizisini hesaplayan basit bir Python kodu örneği:

\`\`\`python
def fibonacci(n):
    """
    Fibonacci dizisinin ilk n terimini hesaplar ve bir liste olarak döndürür.
    """
    fib_sequence = [0, 1]  # İlk iki terim
    
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return fib_sequence
    
    # Geri kalan terimleri hesapla
    for i in range(2, n):
        next_term = fib_sequence[i-1] + fib_sequence[i-2]
        fib_sequence.append(next_term)
    
    return fib_sequence

# Test etmek için:
n_terms = 10  # İlk 10 terimi göster
result = fibonacci(n_terms)

print(f"Fibonacci dizisinin ilk {n_terms} terimi:")
for i, term in enumerate(result):
    print(f"F({i}) = {term}")

# Daha iyi bir görselleştirme
print("\\nFibonacci dizisi:")
print(" → ".join(map(str, result)))

# Fibonacci oranını hesaplayarak doğrulayalım (Altın Oran'a yaklaşır)
if len(result) >= 2:
    for i in range(2, len(result)):
        ratio = result[i] / result[i-1]
        print(f"F({i})/F({i-1}) = {ratio:.8f}")
\`\`\`

Bu kod:
1. Fibonacci dizisinin ilk n terimini hesaplayan bir fonksiyon tanımlar
2. İlk 10 terimi hesaplar ve görüntüler
3. Her terimin bir öncekine oranını gösterir (Altın Oran'a yakınsadığını görebilirsiniz)

Çıktı, Fibonacci dizisinin ilk 10 terimini, görselize edilmiş diziyi ve her adımda Altın Oran'a yakınsama oranını gösterecektir.`,
    createdAt: new Date(Date.now() + 30000),
  },
  {
    id: "14",
    role: "user",
    content: "Basit bir Python veri görselleştirmesi örneği gösterir misin?",
    createdAt: new Date(Date.now() + 40000),
  },
  {
    id: "15",
    role: "assistant",
    content: `Tabii, ASCII sanat kullanarak terminal üzerinde basit bir veri görselleştirme örneği gösterebilirim. Bu örnek, bir veri seti için terminal üzerinde çubuk grafik oluşturuyor:

\`\`\`python
# Terminal üzerinde ASCII sanat ile basit bir veri görselleştirme örneği

def create_bar_chart(data, labels=None, title="Veri Görselleştirme", width=60):
    """
    ASCII karakterleri kullanarak terminal üzerinde çubuk grafik oluşturur.
    
    :param data: Görselleştirilecek sayısal veriler
    :param labels: Veri etiketleri (None ise otomatik indeks kullanılır)
    :param title: Grafik başlığı
    :param width: Maksimum çubuk genişliği
    """
    if not data:
        print("Görselleştirilecek veri yok!")
        return
    
    if labels is None:
        labels = [str(i+1) for i in range(len(data))]
    
    # Maksimum değeri bulma (ölçeklendirme için)
    max_value = max(data)
    # En uzun etiketi bulma (sol hizalama için)
    max_label_length = max(len(str(label)) for label in labels)
    
    # Başlık yazdırma
    print("\\n" + "=" * (width + max_label_length + 10))
    print(f" {title} ".center(width + max_label_length + 10, "="))
    print("=" * (width + max_label_length + 10) + "\\n")
    
    # Çubukları yazdırma
    for i, value in enumerate(data):
        # Çubuk uzunluğunu hesaplama (ölçekle)
        bar_length = int((value / max_value) * width) if max_value > 0 else 0
        
        # Etiketi ve çubuğu yazdırma
        label = str(labels[i]).ljust(max_label_length)
        bar = "█" * bar_length
        
        # Değeri çubuğun sonuna yazdırma
        print(f"{label} | {bar} {value}")
    
    print("\\n")

# Örnek 1: Şehirlerin Nüfus Verisi
population_data = [15462, 9783, 12591, 7864, 21683]
city_labels = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"]

create_bar_chart(
    population_data, 
    city_labels, 
    title="Şehir Nüfusları (Bin)"
)

# Örnek 2: Aylık Yağış Miktarı
rainfall_data = [63, 58, 47, 39, 28, 12, 5, 3, 15, 41, 72, 80]
month_labels = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", 
               "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"]

create_bar_chart(
    rainfall_data, 
    month_labels, 
    title="Aylık Ortalama Yağış Miktarı (mm)"
)

# Örnek 3: Programlama Dili Popülerliği
language_data = [89, 67, 74, 53, 42, 37, 29]
language_labels = ["Python", "JavaScript", "Java", "C++", "C#", "PHP", "Swift"]

create_bar_chart(
    language_data, 
    language_labels, 
    title="Programlama Dili Popülerlik İndeksi"
)
\`\`\`

Bu örnek:
1. Terminal içinde ASCII karakterleri kullanarak çubuk grafik oluşturur
2. Üç farklı veri seti için örnek gösterimler yapar:
   - Şehir nüfusları
   - Aylık yağış miktarları
   - Programlama dili popülerlik indeksi
3. Tamamen tarayıcıda çalışabilir, ekstra kütüphane gerektirmez

Not: Daha karmaşık ve görsel açıdan zengin grafikleri Matplotlib veya Plotly gibi kütüphanelerle oluşturabilirsiniz, ancak bunlar web tarayıcısında doğrudan çalışmayabilir.`,
    createdAt: new Date(Date.now() + 50000),
  },
  {
    id: "16",
    role: "user",
    content: "Karakter tabanlı bir animasyon gösterir misin Python ile?",
    createdAt: new Date(Date.now() + 60000),
  },
  {
    id: "17",
    role: "assistant",
    content: `Tabii, Python kullanarak terminal içinde karakter tabanlı basit bir animasyon örneği gösterebilirim. Bu örnek, ASCII sanat karakterleri kullanarak yük taşıyan bir kamyon animasyonu oluşturuyor:

\`\`\`python
import time
import sys

def clear_output():
    """Terminal ekranını temizler (simüle etmek için)"""
    print("\\n" * 30)  # Çıktıyı kaydırarak yeni ekranı simüle eder

def print_truck(position, road_length=50):
    """Belirli bir pozisyonda kamyon çizer"""
    # Yolu oluştur
    road = "-" * road_length
    
    # Kamyon ASCII sanatı
    truck = [
        "      _____",
        " ____//_||_\\\\____",
        "|    |  CARGO  |",
        "|____|_________|",
        "O----O      O--O"
    ]
    
    truck_width = len(truck[1])
    
    # Kamyonu konuma göre çiz
    for i, line in enumerate(truck):
        # Her satırı yazdır
        display_line = " " * position + line
        if i == 3:  # Yolu son kamyon satırının altında göster
            road_display = road[:position] + "O-O-O" + road[position+5:]
            print(display_line)
            print(road_display)
        else:
            print(display_line)

def animate_truck():
    """Kamyon animasyonunu gösterir"""
    road_length = 60
    
    print("Kamyon Animasyonu - Çıkış için Ctrl+C basın")
    time.sleep(1)
    
    try:
        # İleri gidiş
        for pos in range(road_length - 20):
            clear_output()
            print(f"Frame: {pos+1}")
            print_truck(pos, road_length)
            time.sleep(0.1)  # Animasyon hızı
            
        # Geri dönüş
        for pos in range(road_length - 20, 0, -1):
            clear_output()
            print(f"Frame: {2 * (road_length - 20) - pos}")
            print_truck(pos, road_length)
            time.sleep(0.1)  # Animasyon hızı
            
    except KeyboardInterrupt:
        print("\\nAnimasyon durduruldu!")

# ASCII sanat animasyonu göster
print("=" * 70)
print("Terminal Tabanlı Kamyon Animasyonu".center(70))
print("Bu animasyon Python'un terminal üzerinde karakter animasyonu yapabildiğini gösterir")
print("=" * 70)
print("\\nAnimasyon başlıyor...")
time.sleep(1)

animate_truck()

# İkinci bir animasyon: Dönen baklava
def spinning_diamond():
    """Dönen baklava animasyonu gösterir"""
    frames = [
        "    *    ",
        "   ***   ",
        "  *****  ",
        " ******* ",
        "*********",
        " ******* ",
        "  *****  ",
        "   ***   ",
        "    *    "
    ]
    
    try:
        print("\\n\\nDönen Baklava Animasyonu - Çıkış için Ctrl+C basın")
        time.sleep(1)
        
        # Animasyon döngüsü
        for _ in range(5):  # 5 defa döndür
            for i in range(len(frames)):
                clear_output()
                # Baklava konumunu hesapla ve çiz
                current_frame = (i) % len(frames)
                
                print("\\n" * 5)  # Ekranın ortasına konumlandır
                print("Dönen Baklava:".center(50))
                print()
                
                # Baklava desenini göster
                for j in range(len(frames)):
                    frame_idx = (current_frame + j) % len(frames)
                    print(frames[frame_idx].center(50))
                
                time.sleep(0.2)  # Animasyon hızı
                
    except KeyboardInterrupt:
        print("\\nAnimasyon durduruldu!")

# Baklava animasyonu göster
spinning_diamond()

print("\\nAnimasyonlar tamamlandı!")
\`\`\`

Bu kod:
1. ASCII sanat karakterleri kullanarak bir kamyon animasyonu oluşturur
2. Kamyonu terminalin içinde ileri ve geri hareket ettirir
3. Ayrıca dönen baklava şekli animasyonu da gösterir
4. Sadece standart Python kullanır, ekstra kütüphane gerektirmez

Not: Bu animasyonlar tarayıcıda çalışırken, gerçek terminaldeki gibi ekran temizleme işlemi yapamaz (bunu simüle etmek için çok sayıda yeni satır yazdırılır), bu nedenle animasyon biraz kesikli görünebilir. Gerçek bir terminal uygulamasında 'os.system(\"clear\")' veya 'os.system(\"cls\")' kullanılabilir.`,
    createdAt: new Date(Date.now() + 70000),
  },
  {
    id: "18",
    role: "user",
    content:
      "Basit bir matematik algoritması örneği gösterir misin Python ile?",
    createdAt: new Date(Date.now() + 80000),
  },
  {
    id: "19",
    role: "assistant",
    content: `Elbette! Python ile sayı teorisi alanından güzel bir örnek göstereyim - Eratosthenes Kalburu algoritmasını kullanarak belirli bir sayıya kadar olan tüm asal sayıları bulan bir program:

\`\`\`python
import time
import math

def sieve_of_eratosthenes(limit):
    """
    Eratosthenes Kalburu algoritması ile belirtilen limite kadar olan
    tüm asal sayıları bulur.
    
    :param limit: Üst sınır
    :return: Asal sayılar listesi
    """
    # Tüm sayıların asal olduğunu varsayalım (başlangıçta)
    is_prime = [True] * (limit + 1)
    # 0 ve 1 asal değildir
    is_prime[0] = is_prime[1] = False
    
    # Adım adım algoritmayı uygula
    steps = []
    
    # 2'den limit'in kareköküne kadar olan sayıları kontrol et
    for i in range(2, int(math.sqrt(limit)) + 1):
        # i asalsa, i'nin tüm katları asal değildir
        if is_prime[i]:
            # i'nin karesi ile başla ve i'nin tüm katlarını işaretle
            for j in range(i*i, limit + 1, i):
                # Eğer j henüz işaretlenmediyse işaretle ve adım olarak kaydet
                if is_prime[j]:
                    is_prime[j] = False
                    steps.append((i, j))
    
    # Asal sayıları topla
    primes = [i for i in range(2, limit + 1) if is_prime[i]]
    
    return primes, steps

def visualize_sieve(limit):
    """
    Eratosthenes Kalburu algoritmasını görselleştirir ve adım adım gösterir.
    
    :param limit: Üst sınır
    """
    start_time = time.time()
    primes, steps = sieve_of_eratosthenes(limit)
    end_time = time.time()
    
    # Başlık ve açıklama
    print(f"{'=' * 70}")
    print(f"ERATOSTHENES KALBURU ALGORİTMASI ({limit} sayısına kadar)".center(70))
    print(f"{'=' * 70}")
    print("Bu algoritma, M.Ö. 276-194 yılları arasında yaşamış Yunanlı matematikçi")
    print("Eratosthenes tarafından asal sayıları bulmak için geliştirilmiştir.")
    print(f"{'=' * 70}\\n")
    
    # Algoritma adımları
    print("ALGORİTMA ADIMLARI:")
    print("1. 2'den başlayarak her asal sayı için:")
    print("2. O sayının tüm katlarını elenir (asal olmadığı işaretlenir)")
    print("3. İşlem, sayının karesinden başlar (önceki sayılar zaten işaretlenmiştir)")
    print("4. İşlem, limit sayısının kareköküne kadar devam eder\\n")
    
    # Algoritmanın çalışmasını göster (seçili adımlar)
    print("ALGORİTMAN ÇALIŞMASI (İLK 10 ADIM):")
    for idx, (prime, multiple) in enumerate(steps[:10]):
        print(f"Adım {idx+1}: {prime} asal sayısının katı olan {multiple} elendi")
    
    if len(steps) > 10:
        print(f"... (toplam {len(steps)} eleme adımı) ...\\n")
    
    # Gruplar halinde asal sayıları göster
    print("BULUNAN ASAL SAYILAR:")
    group_size = 10  # Her satırda 10 asal sayı göster
    
    for i in range(0, len(primes), group_size):
        group = primes[i:i+group_size]
        print(", ".join(map(str, group)))
    
    # Asal sayıların dağılımını görselleştir
    print("\\nASAL SAYILARIN DAĞILIMI:")
    bin_size = limit // 10  # 10 aralığa böl
    
    distribution = [0] * 10
    for prime in primes:
        bin_idx = (prime - 1) // bin_size
        if bin_idx < 10:  # Son aralık için kontrol
            distribution[bin_idx] += 1
    
    # Dağılımı çubuk grafik olarak göster
    max_count = max(distribution)
    for i, count in enumerate(distribution):
        start = i * bin_size + 1
        end = min((i + 1) * bin_size, limit)
        bar_length = int((count / max_count) * 40)
        print(f"{start:4d}-{end:<4d} | {'#' * bar_length} ({count})")
    
    # İstatistikler
    print(f"\\nİSTATİSTİKLER:")
    print(f"- {limit} sayısına kadar toplam {len(primes)} asal sayı bulundu")
    print(f"- En büyük asal sayı: {primes[-1]}")
    print(f"- Algoritma çalışma süresi: {end_time - start_time:.6f} saniye")
    print(f"- Asal sayı yoğunluğu: %{(len(primes) / limit) * 100:.2f}")
    
    # Asal sayı teoremi ile karşılaştırma (yaklaşık değer)
    expected = limit / math.log(limit)
    print(f"- Asal Sayı Teoremi'ne göre beklenen: ~{expected:.1f}")
    print(f"- Fark: %{abs(len(primes) - expected) / expected * 100:.2f}")

# Algoritmanın çalışmasını görmek için çalıştır
limit = 1000
visualize_sieve(limit)

# Büyük sayılarla performans testi
print("\\n\\nPERFORMANS TESTİ:")
for test_limit in [10000, 100000]:
    start = time.time()
    primes, _ = sieve_of_eratosthenes(test_limit)
    end = time.time()
    print(f"{test_limit} sayısına kadar: {len(primes)} asal, {end-start:.6f} saniye")
\`\`\`

Bu program:

1. **Eratosthenes Kalburu** algoritmasını kullanarak belirli bir sayıya kadar olan tüm asal sayıları bulur
2. Algoritmanın çalışmasını adım adım açıklar ve görselleştirir
3. Bulunan asal sayıları gruplar halinde listeler
4. Asal sayıların sayı aralıklarına göre dağılımını çubuk grafik olarak gösterir
5. Asal sayıların dağılımını analiz eder ve Asal Sayı Teoremi ile karşılaştırır
6. Farklı büyüklükteki üst sınırlar için performans ölçümü yapar

Bu algoritmanın en güzel yanı, büyük sayılara kadar olan asal sayıları çok hızlı bir şekilde bulabilmesidir. Zaman karmaşıklığı O(n log log n) olduğundan, milyonlarca sayı içindeki asal sayıları saniyeler içinde bulabilir.`,
    createdAt: new Date(),
  },
  {
    id: "20",
    role: "user",
    content:
      "Basit bir HTML örneği gösterir misin? Kayan renk animasyonlu bir metin görmek istiyorum.",
    createdAt: new Date(),
  },
  {
    id: "21",
    role: "assistant",
    content: `Tabii, HTML ve CSS kullanarak kayan renk animasyonlu bir metin örneği hazırlayabilirim. İşte renk geçişli (gradient) ve hareketli bir başlık örneği:

\`\`\`html
<div class="container">
  <h1 class="rainbow-text">Renkli Animasyonlu Metin</h1>
  <p class="subtitle">HTML & CSS ile Yapılmış Renk Geçişleri</p>
  
  <div class="cards">
    <div class="card">
      <div class="card-content">
        <h2>HTML Sandbox</h2>
        <p>Canlı HTML önizlemesi</p>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <h2>Renk Geçişleri</h2>
        <p>Hareketli ve interaktif</p>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <h2>Animasyonlar</h2>
        <p>CSS animasyonları</p>
      </div>
    </div>
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #121212;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
  }
  
  .container {
    text-align: center;
    padding: 2rem;
    max-width: 800px;
  }
  
  .rainbow-text {
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: -1px;
    background-image: linear-gradient(
      to right,
      #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000
    );
    background-size: 300% auto;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: rainbow 8s linear infinite;
    margin-bottom: 1rem;
    text-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
  
  @keyframes rainbow {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 300% 0;
    }
  }
  
  .subtitle {
    color: #aaa;
    font-size: 1.2rem;
    margin-bottom: 3rem;
    letter-spacing: 1px;
  }
  
  .cards {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  
  .card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    width: 200px;
    height: 150px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .card::before {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: linear-gradient(
      to right,
      #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000
    );
    background-size: 300% auto;
    animation: cardGlow 8s linear infinite;
    opacity: 0;
    mix-blend-mode: overlay;
    transition: opacity 0.3s ease;
  }
  
  .card:hover::before {
    opacity: 0.8;
  }
  
  @keyframes cardGlow {
    0% {
      background-position: 0 0;
      transform: rotate(0deg);
    }
    100% {
      background-position: 300% 0;
      transform: rotate(360deg);
    }
  }
  
  .card-content {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
  }
  
  .card h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  .card p {
    color: #aaa;
    font-size: 0.9rem;
  }
</style>
\`\`\`

Bu HTML ve CSS kodu:

1. Geniş renk spektrumunda akan bir efekt ile "Renkli Animasyonlu Metin" başlığı oluşturur
2. Renk geçişi animasyonu, başlık metninin üzerinde sürekli olarak sağdan sola doğru hareket eder
3. Ayrıca interaktif kartlar ekledim, üzerlerine geldiğinizde renk geçişli bir efekt gösterir
4. Tamamen CSS ile yapılmıştır, JavaScript gerektirmez
5. Otomatik animasyonlar için @keyframes kurallarını kullandım

HTML Sandbox bileşenimizde çok güzel görünecektir!`,
    createdAt: new Date(),
  },
  {
    id: "22",
    role: "user",
    content: "Periyodik tablo oyunu yapabilir misin",
    createdAt: new Date(),
  },
  {
    id: "23",
    role: "assistant",
    content: `Tabii, periyodik tablo elementlerini öğrenmeye yardımcı olacak Tailwind CSS ile stillendirilmiş bir oyun yapabilirim:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function PeriyodikTabloOyunu() {
  // Elementlerin listesi - sembol, isim ve kategori içerir
  const elementler = [
    { sembol: "H", isim: "Hidrojen", kategori: "ametal" },
    { sembol: "He", isim: "Helyum", kategori: "soygaz" },
    { sembol: "Li", isim: "Lityum", kategori: "alkali-metal" },
    { sembol: "Be", isim: "Berilyum", kategori: "toprak-alkali" },
    { sembol: "B", isim: "Bor", kategori: "yarı-metal" },
    { sembol: "C", isim: "Karbon", kategori: "ametal" },
    { sembol: "N", isim: "Azot", kategori: "ametal" },
    { sembol: "O", isim: "Oksijen", kategori: "ametal" },
    { sembol: "F", isim: "Flor", kategori: "halojen" },
    { sembol: "Ne", isim: "Neon", kategori: "soygaz" }
  ];

  // Oyun durumu
  const [oyunBasladi, setOyunBasladi] = useState(false);
  const [mevcutElement, setMevcutElement] = useState(null);
  const [secilenCevap, setSecilenCevap] = useState(null);
  const [skor, setSkor] = useState(0);
  const [kalanSure, setKalanSure] = useState(60);
  const [oyunModu, setOyunModu] = useState("sembol");
  const [secenekler, setSecenekler] = useState([]);

  // Oyunu başlat
  const oyunuBaslat = () => {
    setOyunBasladi(true);
    setSkor(0);
    setKalanSure(60);
    yeniSoruOlustur();
  };

  // Oyun modunu değiştir
  const oyunModunuDegistir = () => {
    setOyunModu(oyunModu === "sembol" ? "isim" : "sembol");
  };

  // Yeni soru oluştur
  const yeniSoruOlustur = () => {
    setSecilenCevap(null);
    
    // Rastgele bir element seç
    const rastgeleIndex = Math.floor(Math.random() * elementler.length);
    const yeniElement = elementler[rastgeleIndex];
    
    // Seçenekler için 3 yanlış cevap ve 1 doğru cevap hazırla
    let yeniSecenekler = [yeniElement];
    
    while (yeniSecenekler.length < 4) {
      const rastgeleSecenekIndex = Math.floor(Math.random() * elementler.length);
      const rastgeleSecenek = elementler[rastgeleSecenekIndex];
      
      // Tekrar eden seçenekleri engellemek için kontrol
      if (!yeniSecenekler.some(e => e.sembol === rastgeleSecenek.sembol)) {
        yeniSecenekler.push(rastgeleSecenek);
      }
    }
    
    // Seçenekleri karıştır
    yeniSecenekler = yeniSecenekler.sort(() => Math.random() - 0.5);
    
    setMevcutElement(yeniElement);
    setSecenekler(yeniSecenekler);
  };

  // Cevabı kontrol et
  const cevabiKontrolEt = (secilenElement) => {
    setSecilenCevap(secilenElement);
    
    if (secilenElement.sembol === mevcutElement.sembol) {
      // Doğru cevap
      setSkor(skor + 10);
      
      // Kısa bir bekleme sonrası yeni soru
      setTimeout(() => {
        yeniSoruOlustur();
      }, 1000);
    } else {
      // Yanlış cevap
      setSkor(Math.max(0, skor - 5));
      
      // Kısa bir bekleme sonrası yeni soru
      setTimeout(() => {
        yeniSoruOlustur();
      }, 1000);
    }
  };

  // Oyun süresi sayacı
  useEffect(() => {
    let zamanlayici;
    
    if (oyunBasladi && kalanSure > 0) {
      zamanlayici = setInterval(() => {
        setKalanSure(prevSure => prevSure - 1);
      }, 1000);
    } else if (kalanSure === 0) {
      // Oyun süresi doldu
      setOyunBasladi(false);
    }
    
    return () => clearInterval(zamanlayici);
  }, [oyunBasladi, kalanSure]);

  // Kategoriye göre renk sınıfını belirle
  const kategoriRengi = (kategori) => {
    switch (kategori) {
      case "alkali-metal": return "bg-red-200";
      case "toprak-alkali": return "bg-orange-200";
      case "metal": return "bg-gray-200";
      case "yarı-metal": return "bg-green-200";
      case "ametal": return "bg-teal-200";
      case "halojen": return "bg-purple-200";
      case "soygaz": return "bg-pink-200";
      default: return "bg-gray-100";
    }
  };

  // Doğru/yanlış buton rengini belirle
  const butonRengi = (secenek) => {
    if (secilenCevap === null) {
      return kategoriRengi(secenek.kategori) + " hover:shadow-md cursor-pointer";
    }
    
    if (secilenCevap === secenek) {
      return secenek.sembol === mevcutElement.sembol 
        ? "bg-green-200 border-green-500" 
        : "bg-red-200 border-red-500";
    }
    
    return kategoriRengi(secenek.kategori) + " opacity-60";
  };

  // Element görünümünü belirle
  const elementSinifi = () => {
    if (!secilenCevap) return "text-indigo-900";
    
    return secilenCevap.sembol === mevcutElement.sembol 
      ? "text-green-600"
      : "text-red-600";
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6 font-sans">
      <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">
        Periyodik Tablo Oyunu
      </h1>
      
      {!oyunBasladi ? (
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <p className="text-lg text-gray-700 mb-6 text-center">
            Periyodik tablo elementlerini ne kadar iyi biliyorsun? Test et!
          </p>
          
          <div className="mb-6">
            <button
              onClick={oyunModunuDegistir}
              className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
            >
              Oyun Modu: {oyunModu === "sembol" ? "Sembole göre isim bul" : "İsime göre sembol bul"}
            </button>
          </div>
          
          <button
            onClick={oyunuBaslat}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            Oyunu Başlat
          </button>
        </div>
      ) : (
        <div className="w-full max-w-lg">
          <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow">
            <div className="font-medium">
              Skor: <span className="text-indigo-600 font-bold">{skor}</span>
            </div>
            <div className="font-medium">
              Süre: <span className={kalanSure <= 10 ? "text-red-500 font-bold" : "text-green-500 font-bold"}>
                {kalanSure}
              </span>
            </div>
          </div>
          
          <div className="mb-8 text-center">
            <div className="inline-block p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 mb-2">
                {oyunModu === "sembol" ? "Bu elementin ismi nedir?" : "Bu elementin sembolü nedir?"}
              </p>
              <div className={"text-2xl font-bold " + elementSinifi()}>
                {oyunModu === "sembol" 
                  ? mevcutElement?.sembol 
                  : mevcutElement?.isim}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {secenekler.map((secenek, index) => (
              <button
                key={index}
                onClick={() => !secilenCevap && cevabiKontrolEt(secenek)}
                disabled={secilenCevap !== null}
                className={"p-4 rounded-lg text-gray-800 font-medium border-2 transition-all " + butonRengi(secenek)}
              >
                {oyunModu === "sembol" ? secenek.isim : secenek.sembol}
              </button>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setOyunBasladi(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Oyunu Bitir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PeriyodikTabloOyunu;
\`\`\`

Bu Tailwind CSS ile stillendirilmiş periyodik tablo oyunu:

1. Modern ve responsive bir tasarıma sahiptir
2. Element kategorilerine göre renklendirilmiş butonlar sunar (alkali metaller, soygazlar, vb.)
3. Doğru/yanlış cevaplar için görsel geribildirim sağlar
4. İki farklı oyun modu sunar: Sembole göre isim bulma veya isime göre sembol bulma
5. 60 saniyelik bir süre içinde puanlama sistemi içerir
6. Doğru cevaplar +10 puan, yanlış cevaplar -5 puan olarak hesaplanır
7. Hover efektleri ve geçiş animasyonları ile kullanıcı deneyimini iyileştirir

Oyun, hem eğitici hem de eğlenceli bir şekilde kimya öğrenmek isteyenler için tasarlanmıştır.`,
    createdAt: new Date(),
  },
  {
    id: "24",
    role: "user",
    content: "bana react ile trip advisor uygulaması yapar mısın",
    createdAt: new Date(),
  },
  {
    id: "25",
    role: "assistant",
    content: `Tabii, size React ile basit bir TripAdvisor benzeri uygulama yapabilirim:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function SeyahatRehberiUygulamasi() {
  // Veri durumları
  const [sehirler, setSehirler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);
  const [filtre, setFiltre] = useState({
    arama: '',
    kategori: 'tumu',
    siralamaKriter: 'puan'
  });
  const [secilenSehir, setSecilenSehir] = useState(null);
  const [secilenMekan, setSecilenMekan] = useState(null);
  const [yorumFormu, setYorumFormu] = useState({
    isim: '',
    puan: 5,
    yorum: ''
  });

  // Örnek kategori listesi
  const kategoriler = [
    { id: 'tumu', isim: 'Tümü' },
    { id: 'restoran', isim: 'Restoranlar' },
    { id: 'otel', isim: 'Oteller' },
    { id: 'etkinlik', isim: 'Etkinlikler' },
    { id: 'muzeler', isim: 'Müzeler' }
  ];

  // Örnek veri yükleme (gerçek uygulamada API'den gelir)
  useEffect(() => {
    // API çağrısını simüle etmek için kısa bir gecikme
    setYukleniyor(true);
    
    setTimeout(() => {
      try {
        const ornek_sehirler = [
          {
            id: 1,
            isim: 'İstanbul',
            fotograf: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=500',
            aciklama: 'Doğu ile Batının buluştuğu benzersiz şehir',
            popülerMekanlar: [
              {
                id: 101,
                isim: 'Ayasofya',
                kategori: 'muzeler',
                fotograf: 'https://images.unsplash.com/photo-1620329297617-a39012ec5754?q=80&w=500',
                puan: 4.8,
                yorumlar: [
                  { kullanici: 'Ahmet Y.', puan: 5, yorum: 'Muhteşem bir tarihi yapı, mutlaka görülmeli!', tarih: '2023-06-15' },
                  { kullanici: 'Zeynep K.', puan: 4, yorum: 'Çok etkileyici bir mimari, ancak kalabalık olabiliyor.', tarih: '2023-05-22' }
                ]
              },
              {
                id: 102,
                isim: 'Sultanahmet Camii',
                kategori: 'muzeler',
                fotograf: 'https://images.unsplash.com/photo-1584644760908-b7fb537dcd5d?q=80&w=500',
                puan: 4.9,
                yorumlar: [
                  { kullanici: 'Mehmet A.', puan: 5, yorum: 'İçerideki çiniler görülmeye değer!', tarih: '2023-07-10' }
                ]
              },
              {
                id: 103,
                isim: 'Karaköy Güllüoğlu',
                kategori: 'restoran',
                fotograf: 'https://images.unsplash.com/photo-1585553616824-a74f0c88c9b5?q=80&w=500',
                puan: 4.6,
                yorumlar: [
                  { kullanici: 'Burak T.', puan: 5, yorum: 'En iyi baklavayı burada yiyebilirsiniz.', tarih: '2023-04-30' },
                  { kullanici: 'Selin M.', puan: 4, yorum: 'Lezzetli ama biraz pahalı.', tarih: '2023-05-12' }
                ]
              }
            ]
          },
          {
            id: 2,
            isim: 'Antalya',
            fotograf: 'https://images.unsplash.com/photo-1669905638894-726238c3e5a6?q=80&w=500',
            aciklama: 'Türkiye nin turizm cenneti, muhteşem plajlar',
            popülerMekanlar: [
              {
                id: 201,
                isim: 'Kaleiçi',
                kategori: 'etkinlik',
                fotograf: 'https://images.unsplash.com/photo-1595788625822-25009fefb0e4?q=80&w=500',
                puan: 4.7,
                yorumlar: [
                  { kullanici: 'Ece D.', puan: 5, yorum: 'Tarihi dokusu harika korunmuş.', tarih: '2023-08-05' }
                ]
              },
              {
                id: 202,
                isim: 'Lara Beach',
                kategori: 'etkinlik',
                fotograf: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500',
                puan: 4.5,
                yorumlar: [
                  { kullanici: 'Can B.', puan: 4, yorum: 'Temiz plaj, güzel deniz.', tarih: '2023-07-20' }
                ]
              },
              {
                id: 203,
                isim: 'Akra Hotel',
                kategori: 'otel',
                fotograf: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?q=80&w=500',
                puan: 4.8,
                yorumlar: [
                  { kullanici: 'Deniz A.', puan: 5, yorum: 'Mükemmel manzara ve servis.', tarih: '2023-06-22' }
                ]
              }
            ]
          },
          {
            id: 3,
            isim: 'Kapadokya',
            fotograf: 'https://images.unsplash.com/photo-1644333291335-413e834b3c53?q=80&w=500',
            aciklama: 'Peri bacaları ve sıcak hava balonlarıyla ünlü bölge',
            popülerMekanlar: [
              {
                id: 301,
                isim: 'Göreme Açık Hava Müzesi',
                kategori: 'muzeler',
                fotograf: 'https://images.unsplash.com/photo-1646486376477-5b69701c06d3?q=80&w=500',
                puan: 4.7,
                yorumlar: [
                  { kullanici: 'Mert K.', puan: 5, yorum: 'İnanılmaz bir deneyim.', tarih: '2023-05-18' }
                ]
              },
              {
                id: 302,
                isim: 'Kapadokya Balon Turu',
                kategori: 'etkinlik',
                fotograf: 'https://images.unsplash.com/photo-1666111119684-bd026df1667b?q=80&w=500',
                puan: 4.9,
                yorumlar: [
                  { kullanici: 'Ayşe T.', puan: 5, yorum: 'Hayatımda yaşadığım en güzel deneyimlerden biri.', tarih: '2023-09-10' }
                ]
              }
            ]
          }
        ];
        
        setSehirler(ornek_sehirler);
        setYukleniyor(false);
      } catch (error) {
        setHata('Veriler yüklenirken bir hata oluştu.');
        setYukleniyor(false);
      }
    }, 1000);
  }, []);

  // Filtreleme işlevi
  const filtrelenmisVeri = () => {
    if (!secilenSehir) return [];
    
    return secilenSehir.popülerMekanlar.filter(mekan => {
      // Arama filtresi
      const aramaMesaji = mekan.isim.toLowerCase().includes(filtre.arama.toLowerCase());
      
      // Kategori filtresi
      const kategoriFiltresi = filtre.kategori === 'tumu' || mekan.kategori === filtre.kategori;
      
      return aramaMesaji && kategoriFiltresi;
    }).sort((a, b) => {
      // Sıralama
      if (filtre.siralamaKriter === 'puan') {
        return b.puan - a.puan;
      } else if (filtre.siralamaKriter === 'isim') {
        return a.isim.localeCompare(b.isim);
      }
      
      return 0;
    });
  };

  // Şehir seçme işlevi
  const sehirSec = (sehir) => {
    setSecilenSehir(sehir);
    setSecilenMekan(null);
  };

  // Mekan seçme işlevi
  const mekanSec = (mekan) => {
    setSecilenMekan(mekan);
  };

  // Yorum gönderme işlevi (simülasyon)
  const yorumGonder = (e) => {
    e.preventDefault();
    
    if (yorumFormu.isim.trim() === '' || yorumFormu.yorum.trim() === '') {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }
    
    // Gerçek uygulamada bu kısım bir API'ye POST isteği gönderir
    const yeniYorum = {
      kullanici: yorumFormu.isim,
      puan: yorumFormu.puan,
      yorum: yorumFormu.yorum,
      tarih: new Date().toISOString().split('T')[0]
    };
    
    // Yorumu simüle edilen verilere ekle
    setSecilenMekan(prev => ({
      ...prev,
      yorumlar: [yeniYorum, ...prev.yorumlar]
    }));
    
    // Formu sıfırla
    setYorumFormu({
      isim: '',
      puan: 5,
      yorum: ''
    });
  };

  // Yorumlarda yıldız gösterimi
  const yildizGoster = (puan) => {
    const yildizlar = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= puan) {
        yildizlar.push(<span key={i} className="text-yellow-500">★</span>);
      } else {
        yildizlar.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    return yildizlar;
  };

  // Kategori adını getir
  const kategoriAdiGetir = (kategoriId) => {
    const kategori = kategoriler.find(k => k.id === kategoriId);
    return kategori ? kategori.isim : 'Diğer';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              <span className="text-yellow-300">Trip</span>Rehber
            </h1>
            <div className="hidden md:flex space-x-4">
              <a href="#" className="px-3 py-2 hover:bg-blue-700 rounded-md transition">Anasayfa</a>
              <a href="#" className="px-3 py-2 hover:bg-blue-700 rounded-md transition">Popüler Yerler</a>
              <a href="#" className="px-3 py-2 hover:bg-blue-700 rounded-md transition">Hakkımızda</a>
              <a href="#" className="px-3 py-2 hover:bg-blue-700 rounded-md transition">İletişim</a>
            </div>
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {yukleniyor ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-blue-600 text-xl font-semibold">Yükleniyor...</div>
          </div>
        ) : hata ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            {hata}
          </div>
        ) : (
          <>
            {!secilenSehir ? (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Popüler Seyahat Yerleri</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sehirler.map(sehir => (
                    <div 
                      key={sehir.id} 
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                      onClick={() => sehirSec(sehir)}
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={sehir.fotograf} 
                          alt={sehir.isim} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{sehir.isim}</h3>
                        <p className="text-gray-600">{sehir.aciklama}</p>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-blue-600 font-medium">
                            {sehir.popülerMekanlar.length} popüler yer
                          </span>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            Keşfet
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : !secilenMekan ? (
              <div className="space-y-8">
                <div className="flex items-center">
                  <button 
                    className="mr-4 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    onClick={() => setSecilenSehir(null)}
                  >
                    ← Geri
                  </button>
                  <h2 className="text-3xl font-bold text-gray-800">{secilenSehir.isim}</h2>
                </div>
                
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <img 
                    src={secilenSehir.fotograf} 
                    alt={secilenSehir.isim} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h2 className="text-3xl font-bold mb-2">{secilenSehir.isim}</h2>
                      <p>{secilenSehir.aciklama}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Popüler Yerler</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="col-span-1">
                      <input
                        type="text"
                        placeholder="Yer ara..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filtre.arama}
                        onChange={e => setFiltre({...filtre, arama: e.target.value})}
                      />
                    </div>
                    
                    <div className="col-span-1">
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filtre.kategori}
                        onChange={e => setFiltre({...filtre, kategori: e.target.value})}
                      >
                        {kategoriler.map(kategori => (
                          <option key={kategori.id} value={kategori.id}>{kategori.isim}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-span-1">
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filtre.siralamaKriter}
                        onChange={e => setFiltre({...filtre, siralamaKriter: e.target.value})}
                      >
                        <option value="puan">Puana Göre</option>
                        <option value="isim">İsme Göre</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtrelenmisVeri().length > 0 ? (
                      filtrelenmisVeri().map(mekan => (
                        <div 
                          key={mekan.id} 
                          className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => mekanSec(mekan)}
                        >
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={mekan.fotograf} 
                              alt={mekan.isim} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              {kategoriAdiGetir(mekan.kategori)}
                            </span>
                            <h4 className="text-lg font-semibold mt-2">{mekan.isim}</h4>
                            <div className="mt-2 flex items-center">
                              <div className="mr-2">{yildizGoster(mekan.puan)}</div>
                              <span className="text-sm text-gray-500">
                                ({mekan.yorumlar.length} yorum)
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-8">
                        <p className="text-gray-500">Bu kriterlere uygun mekan bulunamadı.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center">
                  <button 
                    className="mr-4 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    onClick={() => setSecilenMekan(null)}
                  >
                    ← Geri
                  </button>
                  <h2 className="text-3xl font-bold text-gray-800">{secilenMekan.isim}</h2>
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-80">
                    <img 
                      src={secilenMekan.fotograf} 
                      alt={secilenMekan.isim} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {kategoriAdiGetir(secilenMekan.kategori)}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-800 mt-2">{secilenMekan.isim}</h3>
                      </div>
                      <div className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg">
                        <span className="text-xl font-bold">{secilenMekan.puan}</span>
                        <span className="ml-1 text-xl">/5</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-xl font-semibold mb-4">Yorum Yap</h4>
                      <form onSubmit={yorumGonder} className="space-y-4">
                        <div>
                          <label htmlFor="isim" className="block text-sm font-medium text-gray-700 mb-1">
                            İsim
                          </label>
                          <input
                            type="text"
                            id="isim"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={yorumFormu.isim}
                            onChange={e => setYorumFormu({...yorumFormu, isim: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="puan" className="block text-sm font-medium text-gray-700 mb-1">
                            Puanınız
                          </label>
                          <select
                            id="puan"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={yorumFormu.puan}
                            onChange={e => setYorumFormu({...yorumFormu, puan: parseInt(e.target.value)})}
                          >
                            <option value="5">5 - Mükemmel</option>
                            <option value="4">4 - Çok İyi</option>
                            <option value="3">3 - Orta</option>
                            <option value="2">2 - Kötü</option>
                            <option value="1">1 - Çok Kötü</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="yorum" className="block text-sm font-medium text-gray-700 mb-1">
                            Yorumunuz
                          </label>
                          <textarea
                            id="yorum"
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={yorumFormu.yorum}
                            onChange={e => setYorumFormu({...yorumFormu, yorum: e.target.value})}
                            required
                          ></textarea>
                        </div>
                        
                        <button
                          type="submit"
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          Yorum Gönder
                        </button>
                      </form>
                    </div>
                    
                    <div className="mt-8">
                      <h4 className="text-xl font-semibold mb-4">Yorumlar ({secilenMekan.yorumlar.length})</h4>
                      
                      {secilenMekan.yorumlar.length > 0 ? (
                        <div className="space-y-6">
                          {secilenMekan.yorumlar.map((yorum, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                              <div className="flex justify-between">
                                <div className="font-medium">{yorum.kullanici}</div>
                                <div className="text-sm text-gray-500">{yorum.tarih}</div>
                              </div>
                              <div className="mt-1">
                                {yildizGoster(yorum.puan)}
                              </div>
                              <p className="mt-2 text-gray-700">{yorum.yorum}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">Henüz yorum yapılmamış.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">
                <span className="text-yellow-300">Trip</span>Rehber
              </h4>
              <p className="text-gray-400">
                Seyahat deneyimlerinizi paylaşın ve keşfedin. En iyi yerler, restoranlar ve etkinlikler hakkında bilgi edinin.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Popüler Şehirler</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">İstanbul</a></li>
                <li><a href="#" className="hover:text-white transition">Antalya</a></li>
                <li><a href="#" className="hover:text-white transition">Kapadokya</a></li>
                <li><a href="#" className="hover:text-white transition">İzmir</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Kategoriler</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Restoranlar</a></li>
                <li><a href="#" className="hover:text-white transition">Oteller</a></li>
                <li><a href="#" className="hover:text-white transition">Müzeler</a></li>
                <li><a href="#" className="hover:text-white transition">Etkinlikler</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@triprehber.com</li>
                <li>+90 212 345 67 89</li>
                <li>İstanbul, Türkiye</li>
              </ul>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2023 TripRehber. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SeyahatRehberiUygulamasi;
\`\`\`

Bu TripAdvisor benzeri uygulama:

1. Tailwind CSS ile modern ve responsive bir arayüz sunar
2. Farklı şehirleri ve popüler mekanları listeleme imkanı verir
3. Filtre ve arama özellikleri ile istediğiniz yeri kolayca bulmanızı sağlar
4. Kullanıcıların mekanlar hakkında yorum yapabilmesine ve puan verebilmesine olanak tanır
5. Detaylı mekan sayfaları ve fotoğraflar içerir
6. Farklı kategorilerdeki yerleri (restoranlar, oteller, müzeler, vb.) gruplayarak gösterir

Bu örnek, React hooks (useState, useEffect) kullanarak durum yönetimini gerçekleştiriyor ve gerçek bir uygulama için gerekli temel özellikleri içeriyor. API entegrasyonu ekleyerek, bu uygulamayı gerçek verilerle çalışacak şekilde geliştirebilirsiniz.`,
    createdAt: new Date(),
  },

  {
    id: "12345",
    role: "user",
    content: "Klavye ile kontrol edilebilen yılan oyunu yapabilir misin?",
    createdAt: new Date(),
  },

  {
    id: "12346",
    role: "assistant",
    content: `Tabii ki! İşte klavye ile kontrol edilebilen basit bir yılan oyunu:

\`\`\`jsx
import React, { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 100;

const directions = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

const YilanOyunu = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(directions.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const gameRef = useRef(null);

  // Rastgele yiyecek oluştur
  const generateFood = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    
    // Yılanın üzerinde yiyecek oluşturmamak için kontrol
    for (const segment of snake) {
      if (segment.x === x && segment.y === y) {
        return generateFood();
      }
    }
    
    return { x, y };
  };

  // Yılanı hareket ettir
  const moveSnake = () => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = { 
      x: newSnake[0].x + direction.x, 
      y: newSnake[0].y + direction.y 
    };

    // Duvar çarpışması kontrolü
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setGameOver(true);
      return;
    }

    // Kendine çarpma kontrolü
    for (const segment of newSnake) {
      if (head.x === segment.x && head.y === segment.y) {
        setGameOver(true);
        return;
      }
    }

    // Yılanı ilerlet
    newSnake.unshift(head);
    
    // Yiyecek yeme kontrolü
    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      setScore(score + 1);
      setSpeed(Math.max(INITIAL_SPEED - (score * 2), 50)); // Hızı artır
    } else {
      newSnake.pop(); // Yiyecek yemediyse kuyruğu kısalt
    }

    setSnake(newSnake);
  };

  // Klavye kontrollerini ayarla
  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== directions.DOWN) {
            setDirection(directions.UP);
          }
          break;
        case 'ArrowDown':
          if (direction !== directions.UP) {
            setDirection(directions.DOWN);
          }
          break;
        case 'ArrowLeft':
          if (direction !== directions.RIGHT) {
            setDirection(directions.LEFT);
          }
          break;
        case 'ArrowRight':
          if (direction !== directions.LEFT) {
            setDirection(directions.RIGHT);
          }
          break;
        case 'r':
        case 'R':
          resetGame();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);

  // Oyun döngüsü
  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(moveSnake, speed);
      return () => clearInterval(interval);
    }
  }, [snake, gameOver, direction, food, score, speed]);

  // Oyunu sıfırla
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection(directions.RIGHT);
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    
    if (gameRef.current) {
      gameRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Yılan Oyunu</h2>
      
      <div className="mb-4">
        <span className="text-lg font-semibold">Skor: {score}</span>
      </div>
      
      <div 
        ref={gameRef}
        className="relative border-2 border-gray-800 focus:outline-none"
        style={{ 
          width: GRID_SIZE * CELL_SIZE, 
          height: GRID_SIZE * CELL_SIZE,
          backgroundColor: '#f0f0f0'
        }}
        tabIndex={0}
      >
        {/* Yılan */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-500"
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              borderRadius: index === 0 ? '4px' : '0' // Baş kısmı yuvarlak
            }}
          />
        ))}
        
        {/* Yiyecek */}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
            left: food.x * CELL_SIZE + 1,
            top: food.y * CELL_SIZE + 1
          }}
        />
        
        {/* Oyun sonu ekranı */}
        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col">
            <div className="text-white text-2xl font-bold mb-4">Oyun Bitti!</div>
            <div className="text-white text-xl mb-4">Skorunuz: {score}</div>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={resetGame}
            >
              Tekrar Oyna
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Kontroller: Ok tuşları ile yılanı yönlendir, R tuşu ile oyunu sıfırla</p>
      </div>
    </div>
  );
};

export default YilanOyunu;
\`\`\`

Bu kod:

1. Klavye ok tuşlarıyla kontrol edilebilen bir yılan oyunu oluşturur
2. Yılan yiyeceği yedikçe büyür ve skor artar
3. Duvara veya kendine çarptığında oyun biter
4. R tuşuyla oyunu yeniden başlatabilirsiniz
5. Yılan yiyecek yedikçe hızı da artar
6. Tailwind CSS ile şık bir arayüz sunar

Oyunu bir sayfaya eklemek için bu bileşeni import edip kullanabilirsiniz. İsterseniz GRID_SIZE, CELL_SIZE ve INITIAL_SPEED değerlerini değiştirerek oyun alanının boyutunu ve hızını özelleştirebilirsiniz.`,
    createdAt: new Date(),
  },
];
