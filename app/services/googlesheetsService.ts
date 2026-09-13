const GOOGLE_SHEET_URL = 'ضع_الرابط_الذي_نسخته_من_Google_Apps_Script_هنا';

export interface OrderData {
  category?: string;
  item?: string;
  accountInfo?: string;
  quantityOrPack?: string;
  phone?: string;
  date?: string;
  [key: string]: any;
}

export async function saveOrderToGoogleSheets(data: OrderData): Promise<boolean> {
  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return true;
  } catch (error) {
    console.error('خطأ أثناء إرسال البيانات إلى Google Sheets:', error);
    return false;
  }
}

// دالة احتياطية في حال كان الكود القديم يستدعي sendOrderToGoogleSheets
export const sendOrderToGoogleSheets = saveOrderToGoogleSheets;