import { MessageCard } from './types';

// Helper to generate AI image URLs
const getAiImage = (prompt: string, seed: number) => 
  `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true&width=720&height=1280&model=flux&seed=${seed}`;

const TIKTOK_PROFILE_URL = "https://www.tiktok.com/@welcometoviviworld";

// Helper to extract TikTok Video ID from the Apify URL and create a deep link
const extractTikTokLink = (rawUrl: string): string => {
  try {
    // The Apify URL format ends with: ...-VIDEO_ID.mp4
    // We search for a hyphen, followed by digits, followed by .mp4 at the end of the string or path.
    const match = rawUrl.match(/-(\d+)\.mp4/);
    
    if (match && match[1]) {
      // Construct the web link: https://www.tiktok.com/@username/video/ID
      return `https://www.tiktok.com/@welcometoviviworld/video/${match[1]}`;
    }
  } catch (e) {
    console.error("Error extracting TikTok ID", e);
  }
  // Fallback to profile if ID not found
  return TIKTOK_PROFILE_URL; 
};

// Helper to determine card type and title based on text content
const analyzeContent = (text: string) => {
  const t = text.toLowerCase();
  let type: MessageCard['type'] = 'spirituality';
  let title = 'מסר מהיקום';
  let prompt = 'mystical glowing energy butterfly spiritual art';

  if (t.includes('אהבה') || t.includes('זוגיות') || t.includes('love')) {
    type = 'love';
    title = 'מסר של אהבה';
    prompt = 'mystical tarot card lovers couple glowing red string spiritual art';
  } else if (t.includes('שפע') || t.includes('כסף') || t.includes('קריירה') || t.includes('money')) {
    type = 'career';
    title = 'תדר השפע';
    prompt = 'golden key opening glowing door fortune abundance magical art';
  } else if (t.includes('הילינג') || t.includes('ניקוי') || t.includes('אנרגיה') || t.includes('healing')) {
    type = 'spirituality';
    title = 'ריפוי אנרגטי';
    prompt = 'protective energy shield white light crystals sage smoke art';
  } else if (t.includes('1111') || t.includes('555') || t.includes('מספרים')) {
    type = 'general';
    title = 'מסר המספרים';
    prompt = 'numerology 1111 glowing numbers sacred geometry cosmic art';
  } else if (t.includes('עין') || t.includes('עין הרע')) {
    type = 'spirituality';
    title = 'הגנה ושמירה';
    prompt = 'hamsa hand evil eye protection mystical blue gold art';
  } else if (t.includes('מכשפה') || t.includes('witch')) {
    type = 'spirituality';
    title = 'כוח הכישוף';
    prompt = 'mystical witch cauldron moon potion magical forest art';
  }

  if (title === 'מסר מהיקום') {
    const titles = ['הכוונה יומית', 'מסר מההדרכה', 'זמן לשינוי', 'הקשבה פנימית', 'סימן משמיים', 'בהירות מחשבתית'];
    title = titles[Math.floor(Math.random() * titles.length)];
  }

  return { type, title, prompt };
};

// Raw data from provided JSON
const rawData = [
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251118124818-7574046370332511509.mp4", text: "#מסריםמהיקום " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251104143031-7568877532599110932.mp4", text: "#מסרים #מסריםמהיקום " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251028091724-7566199237537434901.mp4", text: "#תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251023150055-7564432342173928725.mp4", text: "הכשרת תקשור\nללא עומס של מידע\nכדי שתוכלי לקרוא לעצמך מתקשרת\nשתוכלי להביא אנשים אליך ולעזור להם עם כלי התקשור \nובקרוב נפתחים שערים לכניסה להכשרה מי שמעוניינת תכתבו לי כאן ונעשה שיחת התאמה 💕😘" },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250731151604-7533265097016265991.mp4", text: "מסר אישי עבורך" },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250811103034-7537273458850401544.mp4", text: "#פתיחהמדוייקתבקלפים #תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251117145202-7573707182236044564.mp4", text: "#מסריםמהיקום " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251117114404-7573658741564771605.mp4", text: "#מסריםמהיקום " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251113123343-7572187194698272012.mp4", text: "#מסריםמהיקום " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251111135601-7571466226262609173.mp4", text: "#מסרים #תקשור #555 " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251111135337-7571465618835115285.mp4", text: "#מסרים #תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251109142508-7570731552238325012.mp4", text: "#מסריםמהיקום " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251102135352-7568125907718737173.mp4", text: "#מסרים #מסריםמהיקום " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251102101546-7568069705777335573.mp4", text: "מאחורי הקלעים!! הכשרת תקשור המחזור הבא מתחיל בדצמבר הרישומים בעיצומם 💜" },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251030124217-7566994211107605781.mp4", text: "#תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251029154516-7566670270191160596.mp4", text: "#תקשור #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20251005092957-7557667507067309330.mp4", text: "#תקשור #מסרים #מסריםמהיקום " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250917125053-7551039768809704722.mp4", text: "קצת סגנון שונה ❣️ מסר עבורך 🦋 #תקשור #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250908093542-7547649706801777938.mp4", text: "#תקשור #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250903163303-7545901826994900242.mp4", text: "#תקשור #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250831103737-7544696972641357074.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250829111118-7543963492336831762.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250824105050-7542102787518172423.mp4", text: "#פתיחהמדוייקתבקלפים #תקשור #פתיחהבקלפים #מסרים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250820160954-7540700665299864839.mp4", text: "#פתיחהמדוייקתבקלפים #תקשור #פתיחהבקלפים #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250812133744-7537692770283146504.mp4", text: "#פתיחהמדוייקתבקלפים #תקשור #פתיחהבקלפים #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250811101854-7537270443829431559.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250804124936-7534711689346911496.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסרים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250803124027-7534338247326010631.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250728110535-7532087287967239442.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250714122256-7526912031413357831.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250714080758-7526846322020764946.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסרים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250707142609-7524346183934905608.mp4", text: "זמן להתבוננות" },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250707135721-7524338764638965010.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250706155807-7523998799178583304.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250703194446-7522943939805072647.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים #מסרים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250702094442-7522418229864779015.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים #מסרים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250701121051-7522084808294534408.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים #מסרים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250630140242-7521742549543881992.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים #מסרים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250630140113-7521742165991542024.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים #מסרים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250629101514-7521312839165054216.mp4", text: "#תקשור #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250629100951-7521311448945986823.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250622115455-7518740932486008082.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250612202631-7515161917850160392.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250611130617-7514677385111883015.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250610134847-7514317259813293330.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250608134922-7513575233878592786.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250529104945-7509818100729007378.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250528084659-7509415364162293010.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250525122802-7508359081833286930.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250522102751-7507214858388000008.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250521074832-7506802711698951431.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250520093059-7506458023104220423.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים #מסריםמדוייקים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250519081820-7506068208126889224.mp4", text: "מעניין אותך התוכנית של אפקט הפרפר? רשמי לי אשלח לך שאלון 🌸\n#תקשור #מסרים #פתיחהמדוייקתבקלפים #מסריםמדוייקים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250515111206-7504628668245937416.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים #מסר " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250514134616-7504297306053692679.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים #מסר " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250512142625-7503565481379433736.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250508112844-7502035356062174482.mp4", text: "#תקשור #מסר #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250508112843-7502035349091257607.mp4", text: "#מסריםמדוייקים #תקשור #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250505193127-7501046470389353736.mp4", text: "#מסריםמדוייקים #תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250513153635-7503954653135047954.mp4", text: "#תקשור #מסרים #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250422123806-7496115860768050439.mp4", text: "#1111 #מסריםמדוייקים #תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250420094141-7495328229486644487.mp4", text: "#1111 " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250420094140-7495328227188083986.mp4", text: "#מסריםמדוייקים #תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250415204039-7493642594862320914.mp4", text: "#מסריםמדוייקים #תקשור #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250407113416-7490533142059699464.mp4", text: "#תקשור #מסריםמדוייקים #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250402202503-7488814472430144776.mp4", text: "#תקשור #מסריםמדוייקים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250401121619-7488317465005509906.mp4", text: "#תקשור #מסריםמדוייקים #פתיחהמדוייקתבקלפים #מסרים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250401121524-7488317225154153735.mp4", text: "#תקשור #מסריםמדוייקים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250331083052-7487888285256240402.mp4", text: "#תקשור #מסרים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250330112838-7487563008986615058.mp4", text: "#תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250330112203-7487561301837745415.mp4", text: "#מסרים #מסריםמדוייקים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250326105240-7486069397585530130.mp4", text: "#מסרים #מסריםמדוייקים #מתקשרת" },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250324163241-7485414835413437704.mp4", text: "#מסרים #מסריםמדוייקים #פתיחהמדוייקתבקלפים #פתיחהבקלפים #תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250323155019-7485032834449640712.mp4", text: "#מסרים #מסריםמדוייקים #פתיחהמדוייקתבקלפים #פתיחהבקלפים #תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250320184105-7483963592333659410.mp4", text: "זמן להקשבה" },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250320183242-7483961420011425032.mp4", text: "#מסרים #מסריםמדוייקים #פתיחהמדוייקתבקלפים #פתיחהבקלפים #תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250317130218-7482763026697932050.mp4", text: "#מסרים #מסריםמדוייקים #פתיחהמדוייקתבקלפים #פתיחהבקלפים #תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250312113530-7480885240068721938.mp4", text: "#מסרים #מסריםמדוייקים #פתיחהמדוייקתבקלפים #פתיחהבקלפים #תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250303173301-7477637586752785672.mp4", text: "#מסרים #מסריםמדוייקים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250223160205-7474645484095802632.mp4", text: "#מסרים #מסריםמדוייקים #מסריםמדוייקים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250220144424-7473512214469659922.mp4", text: "#מסרים #מסריםמדוייקים #פתיחהמדוייקתבקלפים #תקשור #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250218123926-7472737844256279815.mp4", text: "התהליך המטורף שלי יוצא לדרך🧚🏻🧜🏻‍♀️💜" },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250218103559-7472706025133542663.mp4", text: "#CapCut #קבוצתהשפע " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250211140536-7470162453721107730.mp4", text: "#תקשור #מסרים #מסריםמדוייקים #ניקויאנרגטי #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250210122758-7469766204828290311.mp4", text: "#תקשור #מסרים #מסריםמדוייקים #ניקויאנרגטי #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250209113617-7469381798015880455.mp4", text: "#תקשור #מסרים #מסריםמדוייקים #פתיחהבקלפים #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250206093615-7468237612134845703.mp4", text: "#תקשור #מסרים #מסריםמדוייקים #פתיחהבקלפים #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250205115802-7467903068978285832.mp4", text: "#תקשור #מסרים #מסריםמדוייקים #פתיחהבקלפים #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250127114603-7464560212679183634.mp4", text: "#תקשור #מסרים #מסריםמדוייקים #הילינג #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250121165419-7462413123803303186.mp4", text: "#תקשור #מסרים #מסריםמדוייקים #הילינג #עיןשלישית " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250120113510-7461959807533174034.mp4", text: "ראיתי אצל מישהי ובדקתי בתקשור- זה אמת , את המנטרה קצת שיניתי לשפה יותר טובה לתרגום עברי #תקשור #מסרים #הילינג #ניקויאנרגטי #צאקרתהעיןהשלישית #מסריםמדוייקים #עיןשלישית" },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250119114724-7461591868904705288.mp4", text: "#מסריםמדוייקים #תקשור #מסרים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250113114846-7459365715624119559.mp4", text: "#מסריםמדוייקים #תקשור #מסרים #הילינג #רוח " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250105114723-7456396674395688210.mp4", text: "כל הטקס הזה יכול להיות גם לקשרים רעילים בחיים שלכם #הפסקתעישון " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241231081454-7454486498851687688.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #הילינג " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241230203907-7454307172776693000.mp4", text: "אני לוקחת הפסקה מהקלפים - אז תקבלו מסרים ישירים ונקיים איזה כיף ☺️ #תקשור #מסריםמדוייקים #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241219121753-7450096094865902856.mp4", text: "משיב/ה ל-@דיקלה הדסה יחיא מטפלת תת מודע #ניתוקאנרגטי #ניתוקכבליםאנרגטי #תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241218155007-7449779701649804552.mp4", text: "משיב/ה ל-@@LANA@ בהצלחה 🦋💚 #נרות #תקשור" },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241218112243-7449710793215528200.mp4", text: "#תקשור #מסריםמדוייקים #פתיחהבקלפים #מסרים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241217102411-7449324625827220743.mp4", text: "#הילינג #תקשור #מסריםמדוייקים #מסרים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241210115303-7446749933010472200.mp4", text: "#תקשור #מסריםמדוייקים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241128125418-7442312689998744840.mp4", text: "משיב/ה ל-@Tami22 נרות ליום יום להדליק באלתר שלכם \nמחיר נגיש,הרבה נרות, שלל צבעים פשוט מושלם למי שמתעסקת בעולמות הרוח💞💞💞 רוצות מידע מעמיק יותר על אלתר??" },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241127121647-7441931938081934599.mp4", text: "#תקשור #מסריםמדוייקים #מכשפה #הילינג #witchtok " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241126112615-7441547832319839506.mp4", text: "סדרה חדשה 🕯️🕯️🕯️🔮🔮🔮🤩🤩🤩 מתרגשת להעביר את הידע הכיפי הזה למכשפות לכשפים שבנינו #תקשור #מסריםמדוייקים #הילינג #מכשפה #כשפות " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241126110633-7441542751532993800.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהבקלפים #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241125103024-7441162344597703954.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהבקלפים #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241113121342-7436735958717877522.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241107121718-7434510370355580178.mp4", text: "#תקשור #מסריםמדוייקים #הילינג #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241106124012-7434145182364273927.mp4", text: "#תקשור #מסריםמדוייקים #הילינג #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241103104745-7433002950756191495.mp4", text: "#תקשור #מסריםמדוייקים #הילינג #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241103094313-7432986319053229330.mp4", text: "#תקשור #מסריםמדוייקים #הילינג #מדיטציה " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241025012038-7429517017750719762.mp4", text: "#תקשור #מסריםמדוייקים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241010122455-7424121952995904786.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241008124718-7423385537643384082.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240910144750-7413026210214841608.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240903181827-7410482852984343816.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240819134350-7404845835965582608.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240818091008-7404404223338614032.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20250105140607-7456432435614485767.mp4", text: "#מסריםמדוייקים #תקשור #מסרים #הילינג " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20241008125449-7423387472836496648.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240815095055-7403301482008694017.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240812133558-7402246213736746241.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #הילינג " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240811103255-7401827959725657345.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240806110807-7399981599619697936.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240804075532-7399189798604393729.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240730083529-7397344669228633361.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240723130518-7394816610709540112.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240716153559-7392257817660476673.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240709092916-7389565763029323026.mp4", text: "#תקשור #מסריםמדוייקים #הילינג #מסרים #הילינג " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240707220729-7389018933615021320.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240707145613-7388907843866414344.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240705094103-7388084451030420754.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240701180454-7386729956287581446.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240627091724-7385109673600453895.mp4", text: "#תקשור #מסריםמדוייקים #מסרים #פתיחהמדוייקתבקלפים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240616100109-7381038996077481217.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #מסריםמדוייקים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240609091516-7378429573182082321.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #מסריםמדוייקים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240602110226-7375859606297251089.mp4", text: "#מסרים #תקשור #הילינג #פתיחהמדוייקתבקלפים #מסריםמדוייקים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240531071509-7375058842960366864.mp4", text: "#מסרים #תקשור #הילינג #פתיחהמדוייקתבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240528101749-7373992672350014736.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #מסריםמדוייקים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240523152551-7372216624453094673.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #מסריםמדוייקים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240520123214-7371058640221949185.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #מסריםמדוייקים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240520102853-7371026837809532176.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #מסריםמדוייקים #פתיחהבקלפים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240519185404-7370785912046832897.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #הילינג #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240515105321-7369177724746894609.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240513170200-7368530545631923473.mp4", text: "משיב/ה ל-@צילה אברהמי #מסרים #תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240513145513-7368497884288847120.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240510122131-7367345028974267665.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240508065041-7366517588932726033.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240506072129-7365783341041257745.mp4", text: "שתפו !🪷🥳🥳 #מסרים #תקשור " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240505151448-7365534250809969921.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240501122741-7364006837227703568.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240417152133-7358856450279591184.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240414164002-7357763420009090320.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240411150556-7356625923279457537.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240409140208-7355867319131737345.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240407084918-7355044515922611472.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240404161823-7354046981292985601.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240401125506-7352881366125530384.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240331160856-7352560210302553360.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240325113310-7350262638061833474.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240322111053-7349143634140302593.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240319112845-7348035005001534722.mp4", text: "מזל טוב לי זה מזל טוב לכם🤍 #מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240318182604-7347771421029862658.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240317100104-7347270215387925762.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240314160650-7346251231163174146.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240311102917-7345050984311164161.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240306104010-7343198372154641666.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240304154115-7342533788724972802.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240303105359-7342088671144725761.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240229100902-7340963830056406274.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240225133330-7339532184585342210.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240222103202-7338372175105150209.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240222083832-7338342917393714433.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240220095251-7337619895548464385.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240218104414-7336890954982509826.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240215084506-7335747006360571137.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240214133020-7335449433192123650.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240212104026-7334663471893712130.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240211145057-7334356954925518082.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240211114131-7334308138390129922.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240208110502-7333185471188634881.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240206124240-7332468474788269314.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240204112357-7331706012904279298.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240201111516-7330590521359863042.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240129102210-7329463569433595138.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240128105540-7329101128568671490.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240125091811-7327962757616110850.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240122115540-7326890065928473857.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240121125617-7326534610337271042.mp4", text: "הייתה לי קריאה לעשות משהו שונה #מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240117134147-7325062001602989314.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240116111806-7324653880204119298.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240116111303-7324652579558886657.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240109105918-7322051431630933250.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240108100002-7321665067286678785.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240107112154-7321315092207881474.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240103104855-7319822241640811777.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240102122247-7319475319281405186.mp4", text: "#מסרים #תקשור #פתיחהמדוייקתבקלפים #פתיחהבקלפים #מסריםמדוייקים " },
  { url: "https://api.apify.com/v2/key-value-stores/XOvdKOem5X2yfKcnx/records/video-welcometov-20240101100755-7319069470100606210.mp4", text: "אם מישהי או מישהו רוצה אני אפתח קבוצה בוואצפ למסרים ואוכל שם לשלוח כמעט בכל יום מסרים לקבוצה ( נסנכרן את האנרגיה וזה יהיה מדוייק) תכתבו אם מעניין אותכם #מסרים " },
];

// Map raw data to MessageCard objects
export const MESSAGES: MessageCard[] = rawData.map((item, index) => {
  const { type, title, prompt } = analyzeContent(item.text);
  const tiktokUrl = extractTikTokLink(item.url);
  
  return {
    id: index.toString(),
    title,
    content: item.text,
    videoUrl: item.url,
    imageUrl: getAiImage(prompt, index),
    profileUrl: TIKTOK_PROFILE_URL,
    originalUrl: tiktokUrl,
    type,
  };
});