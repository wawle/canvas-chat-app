import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/canvas-chat-app";

// MongoDB bağlantı şemalarımız
const Schema = {
  connection: null as mongoose.Connection | null,
};

/**
 * Global bağlantı oluştur
 */
export async function connectToDatabase(): Promise<mongoose.Connection> {
  // Eğer halihazırda bir bağlantı varsa onu kullan
  if (Schema.connection) {
    return Schema.connection;
  }

  // MongoDB'ye bağlan
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB bağlantısı başarılı");

    // Bağlantı başarılı durumda global bağlantı değişkenini ayarla
    Schema.connection = mongoose.connection;

    // Bağlantı hatalarını dinle
    mongoose.connection.on("error", (err: Error) => {
      console.error("MongoDB bağlantı hatası:", err);
    });

    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB bağlantısı kurulamadı:", error);
    throw new Error("Veritabanına bağlanılamadı");
  }
}

export function getConnection(): mongoose.Connection | null {
  return Schema.connection;
}
