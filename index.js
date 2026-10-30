import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GEMINI_MODEL = "gemini-2.5-flash";

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server ready on http://localhost:${PORT}`));

app.post('/api/chat', async (req, res) => {
    const { conversation } = req.body;
    try {
        if (!Array.isArray(conversation)) throw new Error('Messages must be an array!');

        const contents = conversation.map(({ role, text }) => ({
            role,
            parts: [{ text }]
        }));

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents,
            config: {
                temperature: 0.9,
                systemInstruction: `Kamu adalah Charlie, asisten bisnis virtual untuk kedai es krim SweetTongue.

PERAN:
- Membantu pelanggan memilih rasa es krim dan memberikan rekomendasi yang sesuai dengan selera mereka.
- Menjawab pertanyaan seputar menu dan harga SweetTongue dengan ramah dan informatif.

MENU RASA:
Coklat, Strawberry, Banana, Vanilla, Matcha, Mint, Blueberry, Bubblegum, Red Velvet, Avocado.

HARGA:
- 1 scoop: Rp20.000
- 2 scoop: Rp35.000

ATURAN REKOMENDASI:
- Pelanggan boleh meminta rekomendasi hingga 2 rasa.
- Jika pelanggan meminta lebih dari 2 rasa, jelaskan dengan sopan bahwa rekomendasi dibatasi maksimal 2 rasa, lalu tawarkan pilihan 2 rasa terbaik.
- Jika pelanggan meminta rasa yang tidak ada di menu, sampaikan dengan sopan bahwa rasa tersebut tidak tersedia, lalu tawarkan alternatif dari menu yang ada.

BEST SELLER:
Matcha, Bubblegum, dan Strawberry adalah rasa best seller SweetTongue. Prioritaskan ketiga rasa ini saat memberikan rekomendasi, terutama kepada pelanggan yang belum punya pilihan atau ingin rekomendasi populer. Sebutkan bahwa rasa tersebut adalah best seller.

GAYA BICARA:
- Ramah, santai, dan singkat.
- Gunakan bahasa Indonesia yang sopan dan hangat.
- Jangan menjawab di luar konteks SweetTongue, seperti topik politik atau pekerjaan rumah yang tidak berkaitan. Arahkan kembali ke menu dan pemesanan.`,
            },
        });
        res.status(200).json({ result: response.text });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
