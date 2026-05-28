import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "15mb" }));
  app.use(express.urlencoded({ extended: true, limit: "15mb" }));

  // In-memory or fallback database paths
  const COMPLAINTS_FILE = path.join(process.cwd(), "complaints.json");

  // Load initial complaints if file does not exist
  const getComplaints = () => {
    try {
      if (fs.existsSync(COMPLAINTS_FILE)) {
        return JSON.parse(fs.readFileSync(COMPLAINTS_FILE, "utf-8"));
      }
    } catch (e) {
      console.error("Error reading complaints file, using fallback", e);
    }
    const initial = [
      {
        id: "KB-C-901",
        type: "दिवाबत्ती (Broken Lamps)",
        description: "येथील मुख्य रस्ता चौक परिसरात दिवे गेल्या ३ दिवसांपासून बंद आहेत, रात्री अंधार असतो.",
        date: "२४ मे २०२६",
        status: "प्रलंबित", // Pending
        photo: null
      },
      {
        id: "KB-C-898",
        type: "पाणी पुरवठा (Water Supply)",
        description: "नळ जोडणी दुरुस्ती काम चालू असल्याने प्रभाग क्र. २ मध्ये पाणी संथ वेगाने येत आहे.",
        date: "२१ मे २०२६",
        status: "निवारण", // Solved
        photo: null
      }
    ];
    try {
      fs.writeFileSync(COMPLAINTS_FILE, JSON.stringify(initial, null, 2), "utf-8");
    } catch (err) {
      console.error("Could not write files", err);
    }
    return initial;
  };

  // Applications mock tracker database
  const applicationsDb = [
    { id: "KB908", name: "रहिवासी दाखला", applicant: "स्नेहल सावंत", status: "प्रलंबित", date: "२५ मे २०२६" },
    { id: "KB844", name: "जन्म नोंदणी दाखला", applicant: "दिनेश पेडणेकर", status: "पूर्ण", date: "१२ मे २०२६" },
    { id: "KB912", name: "उत्पन्नाचा दाखला", applicant: "राजेश गावकर", status: "पूर्ण", date: "२७ मे २०२६" },
    { id: "KB798", name: "जातीचा दाखला", applicant: "अमेय परब", status: "प्रलंबित", date: "१९ मे २०२६" }
  ];

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Services Certificate Application Status Lookup
  app.post("/api/services/status", (req, res) => {
    const { trackingId } = req.body;
    if (!trackingId) {
      return res.status(400).json({ error: "कृपया अर्ज क्रमांक प्रविष्ट करा." });
    }
    const cleanId = trackingId.trim().toUpperCase();
    const appRecord = applicationsDb.find(a => a.id === cleanId || a.id.replace("#", "") === cleanId.replace("#", ""));
    
    if (appRecord) {
      return res.json({ success: true, record: appRecord });
    } else {
      // Create a dynamic mockup entry if not found so that user always gets a nice result!
      const dynamicRecord = {
        id: cleanId,
        name: "सर्वसाधारण दाखला व परवाना",
        applicant: "नागरिक",
        status: "प्रलंबित",
        date: "नुकताच दाखल"
      };
      return res.json({ success: true, record: dynamicRecord, isDemo: true });
    }
  });

  // Complaints / Feedback Endpoints
  app.get("/api/complaints", (req, res) => {
    res.json(getComplaints());
  });

  app.post("/api/complaints", (req, res) => {
    const { type, description, photo } = req.body;
    if (!type || !description) {
      return res.status(400).json({ error: "तक्रार प्रकार आणि तपशील आवश्यक आहेत." });
    }

    try {
      const list = getComplaints();
      const newIdNum = Math.floor(100 + Math.random() * 900);
      const newComplaint = {
        id: `KB-C-${newIdNum}`,
        type,
        description,
        date: new Date().toLocaleDateString("mr-IN", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }),
        status: "प्रलंबित",
        photo: photo || null
      };

      list.unshift(newComplaint);
      fs.writeFileSync(COMPLAINTS_FILE, JSON.stringify(list, null, 2), "utf-8");
      return res.json({ success: true, record: newComplaint });
    } catch (e: any) {
      console.error("Error saving complaint", e);
      return res.status(500).json({ error: "तक्रार जतन करण्यात त्रुटी आली." });
    }
  });

  // Gemini AI Chat Endpoints
  app.post("/api/gemini/chat", async (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        text: "नमस्कार! सर्व्हरवर 'GEMINI_API_KEY' अजून जोडलेली नाही. कृपया एआय स्टुडिओच्या 'Settings > Secrets' मध्ये जाऊन तुमची API की प्रविष्ट करा, जेणेकरून मी तुमच्या सर्व प्रश्नांची एआयद्वारे जलद आणि अचूक उत्तरे देऊ शकेन!\n\nसध्यासाठी मी तुम्हाला ऑफलाइन सहाय्य करू शकतो. तुमची काही समस्या असल्यास मला विचारा!"
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });

      const systemInstruction = `
        तुम्ही 'ग्राम-मित्र' (Gram-Mitra) आहात, ग्रुप ग्रामपंचायत केर-भेकुर्ली (ता. दोडामार्ग, जि. सिंधुदुर्ग, महाराष्ट्र) चे अधिकृत डिजिटल एआय असिस्टंट.
        तुमचे ध्येय ग्रामस्थांना सर्व प्रकारची शासकीय योजनांची माहिती, ग्रामपंचायत सेवा, दाखले आणि गावाशी संबंधित चालू घडामोडी सोप्या भाषेत पुरवणे आहे.
        नेहमी अत्यंत नम्र, आदरयुक्त आणि मराठी भाषेत (किंवा वापरकर्त्याने इंग्रजीत विचारल्यास इंग्रजीत) उत्तरे द्या. 

        ग्रामपंचायत ओळख आणि वारसा:
        - नाव: ग्रुप ग्रामपंचायत केर-भेकुर्ली (Ker-Bhekurli Grampanchayat)
        - गावचा घोषवाक्य: "सांघिक ऐक्य व अभिमानातुन आदर्शगाव" (Model village through collective unity and pride)
        - आराध्य दैवत: मंदिरातील आदिमाया 'सतेरी देवी' (Goddess Sateri) जी गावची रक्षक मानली जाते.
        - तालुका: दोडामार्ग, जिल्हा: सिंधुदुर्ग.

        विशेष उपलब्धी:
        - "जल जीवन मिशन" यशस्वीरीत्या १००% पूर्ण झाले आहे. गावातील शेवटच्या घरालाही शुद्ध पिण्याच्या पाण्याचा जोड नळाद्वारे देण्यात आलेला असून हे संपूर्ण सिंधुदुर्ग जिल्ह्यातील आदर्शवत स्वयंपूर्ण गाव ठरले आहे.

        डिजिटल नागरी सेवा आणि लागणारी कागदपत्रे (Digital Services):
        १. रहिवासी दाखला (Residence Certificate)
        २. जन्म नोंदणी दाखला (Birth Certificate)
        ३. मृत्यू नोंदणी दाखला (Death Certificate)
        ४. उत्पन्नाचा दाखला (Income Certificate)
        ५. जातीचा दाखला (Caste Certificate)
        * लागणारी सर्वसाधारण आवश्यक कागदपत्रे: आधार कार्ड (आधार कार्ड अनिवार्य आहे), रेशन कार्ड (शिधापत्रिका झेरॉक्स), पासपोर्ट साईज फोटो, आणि स्वघोषणा पत्र (अप्रतिज्ञापत्र).

        प्रमुख कल्याणकारी योजना (Government Schemes available):
        १. मुख्यमंत्री माझी लाडकी बहीण योजना:
           - पात्रता: १८ ते ६५ वयोगटातील विवाहित, विधवा, घटस्फोटित महिला.
           - उत्पन्न मर्यादा: वार्षिक ₹२.५० लाखांपेक्षा कमी असावे.
           - फायदा: दरमहा ₹१,५०० थेट संबंधित बँक खात्यात पाठवले जातात.
        २. SMART प्रकल्प (State Maharashtra Agribusiness and Rural Transformation Project):
           - शेतकरी उत्पादक कंपन्यांना (FPCs) मूल्य साखळी विकासासाठी आणि नवोपक्रमासाठी मोठे अर्थसहाय्य मिळते.
        ३. प्रधानमंत्री आवास योजना (घरकुल):
           - बेघर आणि कच्च्या झोपडीत राहणाऱ्या कुटुंबांना हक्काचे पक्के घर उभारण्यासाठी शासनाकडून आर्थिक निधी व मदत दिली जाते.
        ४. संजय गांधी निराधार योजना:
           - वृद्ध, दिव्यांग, आणि अत्यंत गरीब निराधार कुटुंबियांना मासिक आर्थिक निवृत्तीवेतन स्वरूपात दरमहा मदत.

        चालू नोटीस आणि ग्रामसभा (Notice Board Highlights):
        - येत्या रविवारी सकाळी ठीक १० वाजता ग्रामपंचायत कार्यालयाच्या सभागृहात ग्रामसभा बैठक आयोजित करण्यात आलेली आहे. सर्व ग्रामस्थांनी यावे.
        - गावात बालकांसाठी पोलिओ व लसीकरण मोहीम आयोजित केली आहे. ० ते ५ वयोगटातील बालकांना जवळच्या प्राथमिक आरोग्य केंद्रात घेऊन यावे.
        - मुख्य बाजारपेठेतील रस्त्याचे डांबरीकरण (रस्ता दुरुस्ती काम) वेगाने सुरू आहे. नागरिकांच्या सुरक्षेसाठी वाहतूक काही काळासाठी पर्यायी मार्गाने वळवण्यात आली आहे.

        वापरकर्त्यांच्या सर्व प्रश्नांचे उत्तर या अधिकृत माहितीच्या आधारे सुंदर, नीटनेटके आणि मुद्देसूद द्या. माहितीमध्ये नसलेला प्रश्न विचारल्यास, त्यांना सांगा की "याबाबत अधिकृत माहितीसाठी कृपया तुम्ही केर-भेकुर्ली ग्रामपंचायत कार्यालयात प्रत्यक्ष संपर्क साधावा अथवा ग्रामसेवकांशी चर्चा करावी." 
      `;

      // Convert message format to Gemini standard contents
      const formattedContents = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content || msg.text || "" }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      return res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API server side error:", error);
      return res.status(500).json({ error: error.message || "An error occurred with Gemini." });
    }
  });

  // Serve static assets in production, otherwise hook up Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Gram-Sahyog API] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
