import { CartItem } from '../context/CartContext';

const TG_TOKEN = '8608097304:AAG7D3wtpOsyeNAdjagSd2a8FDaUcAHomvU';
const TG_CHAT = '1355750983';

interface OrderData {
  orderNumber: string;
  name: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  notes: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

function formatDate(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d}  ${h}:${min}`;
}

function buildProductsText(items: CartItem[]): string {
  return items.map((item, i) => {
    const name = item.product.nameAr;
    const lines = [
      `🛍️ المنتج ${items.length > 1 ? `(${i + 1})` : ''}: ${name}`,
    ];
    if (item.color) lines.push(`🎨 اللون: ${item.color}`);
    if (item.size) lines.push(`📏 المقاس: ${item.size}`);
    lines.push(`🔢 الكمية: ${item.quantity}`);
    lines.push(`💰 السعر: ${item.product.price * item.quantity} EGP`);
    return lines.join('\n');
  }).join('\n\n');
}

export async function sendOrderToTelegram(data: OrderData): Promise<boolean> {
  const productsText = buildProductsText(data.items);

  const message = `🛒 *طلب جديد | Mony Store*

━━━━━━━━━━━━━━━

👤 العميل: ${data.name}
📞 الهاتف: ${data.phone}

📍 المحافظة: ${data.governorate}
🏙️ المدينة: ${data.city}

🏠 العنوان:
${data.address}
${data.notes ? `\n📝 ملاحظات: ${data.notes}` : ''}

━━━━━━━━━━━━━━━

${productsText}

━━━━━━━━━━━━━━━

💰 المجموع: ${data.subtotal} EGP
🚚 الشحن: ${data.shipping} EGP
💵 *الإجمالي: ${data.total} EGP*

💳 الدفع: عند الاستلام

━━━━━━━━━━━━━━━

🕒 الوقت: ${formatDate()}
🆔 رقم الطلب: #${data.orderNumber}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* Product 3 videos added manually:
https://ik.imagekit.io/n9fgagbyoz/IMG_6963.MP4
https://ik.imagekit.io/n9fgagbyoz/Scene%20Builder%20-%20Create%20a%20cinematic%20luxury%20fashion%20promo%20video%20from%20the%20uploaded%20image_The%20vide.mp4
*/
