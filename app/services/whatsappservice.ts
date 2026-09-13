export interface OrderItem {
  serviceTitle: string;
  category: string;
  price: number;
  currency: string;
  customFields: Record<string, string>;
}

export function generateOrderId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${new Date().getFullYear()}-${randomNum}`;
}

export function createWhatsAppCheckoutLink(
  merchantPhone: string,
  item: OrderItem,
  customerPhone?: string
) {
  const orderId = generateOrderId();
  
  let detailsText = "";
  for (const [key, value] of Object.entries(item.customFields)) {
    if (value) detailsText += `🔹 *${key}:* ${value}\n`;
  }

  const message = 
`مرحباً، أود إكمال طلب الخدمة التالية:

📌 *رقم الطلب:* \`${orderId}\`
🎮 *الخدمة:* ${item.serviceTitle}
💰 *المبلغ:* ${item.price} ${item.currency}

📋 *تفاصيل الطلب:*
${detailsText}----------------------------------
💳 *يرجى تزويدي برقم المحفظة/طريقة الدفع لتأكيد الطلب.*`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${merchantPhone}?text=${encodedMessage}`;

  return { orderId, whatsappUrl, formattedMessage: message };
}