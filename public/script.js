/**
 * SweetTongue Ice Cream & Charlie AI Chatbot
 * Vanilla JavaScript (Frontend)
 */

// ==========================================
// 1. DATA KATALOG MENU ES KRIM
// ==========================================
const MENU_ITEMS = [
  {
    id: 'strawberry',
    name: 'Strawberry Sparkle',
    flavor: 'Strawberry',
    desc: 'Sensasi stroberi segar manis dan creamy yang meleleh sempurna.',
    icon: '🍓',
    bg: '#ffe4ec',
    isBestSeller: true,
  },
  {
    id: 'matcha',
    name: 'Matcha Zen Garden',
    flavor: 'Matcha',
    desc: 'Teh hijau matcha asli Jepang dengan aroma menenangkan dan rasa otentik.',
    icon: '🍵',
    bg: '#e8f5e9',
    isBestSeller: true,
  },
  {
    id: 'bubblegum',
    name: 'Bubblegum Dream',
    flavor: 'Bubblegum',
    desc: 'Rasa permen karet nostalgic favorit sepanjang masa dengan warna ceria.',
    icon: '🫧',
    bg: '#e1f5fe',
    isBestSeller: true,
  },
  {
    id: 'coklat',
    name: 'Belgian Choco Rich',
    flavor: 'Coklat',
    desc: 'Coklat Belgia pekat, legit dan lumer mewah di setiap gigitan.',
    icon: '🍫',
    bg: '#efebe9',
    isBestSeller: false,
  },
  {
    id: 'vanilla',
    name: 'Madagascar Vanilla',
    flavor: 'Vanilla',
    desc: 'Vanilla klasik lembut dengan aroma polong vanila madagascar asli.',
    icon: '🍦',
    bg: '#fffde7',
    isBestSeller: false,
  },
  {
    id: 'banana',
    name: 'Banana Sunshine',
    flavor: 'Banana',
    desc: 'Pisang manis alami bertekstur selembut sutra yang menyegarkan.',
    icon: '🍌',
    bg: '#fff9c4',
    isBestSeller: false,
  },
  {
    id: 'mint',
    name: 'Cool Mint Breeze',
    flavor: 'Mint',
    desc: 'Sensasi mint dingin berpadu renyahnya choco flakes yang nagih.',
    icon: '🌿',
    bg: '#e0f2f1',
    isBestSeller: false,
  },
  {
    id: 'blueberry',
    name: 'Wild Blueberry Burst',
    flavor: 'Blueberry',
    desc: 'Buah blueberry hutan liar dengan perpaduan asam manis segar.',
    icon: '🫐',
    bg: '#ede7f6',
    isBestSeller: false,
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet Lux',
    flavor: 'Red Velvet',
    desc: 'Kue red velvet elegan berpadu cream cheese lembut yang memanjakan lidah.',
    icon: '🍰',
    bg: '#fce4ec',
    isBestSeller: false,
  },
  {
    id: 'avocado',
    name: 'Creamy Avocado',
    flavor: 'Avocado',
    desc: 'Alpukat mentega pilihan bertekstur kental manis khas SweetTongue.',
    icon: '🥑',
    bg: '#f1f8e9',
    isBestSeller: false,
  }
];

const PRICING = {
  1: { label: '1 Scoop', price: 20000 },
  2: { label: '2 Scoop', price: 35000 }
};

// ==========================================
// 2. KERANJANG BELANJA (CART) STATE
// ==========================================
let cart = [];

function formatRupiah(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

function renderCatalog() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = MENU_ITEMS.map((item) => `
    <div class="product-card" data-id="${item.id}">
      <div class="card-top" style="background: ${item.bg};">
        ${item.isBestSeller ? '<span class="badge-bestseller">⭐ Best Seller</span>' : ''}
        <span>${item.icon}</span>
      </div>
      <div class="card-body">
        <h3 class="product-title">${item.name}</h3>
        <p class="product-desc">${item.desc}</p>
        
        <div class="scoop-selector">
          <button type="button" class="scoop-btn active" data-scoop="1" onclick="selectScoop('${item.id}', 1, this)">1 Scoop (20k)</button>
          <button type="button" class="scoop-btn" data-scoop="2" onclick="selectScoop('${item.id}', 2, this)">2 Scoop (35k)</button>
        </div>

        <div class="card-footer">
          <span class="item-price" id="price-${item.id}">Rp 20.000</span>
          <button type="button" class="btn-add-cart" onclick="handleAddToCart('${item.id}')">
            <span>+</span> Keranjang
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Track chosen scoop per product card
const selectedScoops = {};

window.selectScoop = function(productId, scoopCount, buttonEl) {
  selectedScoops[productId] = scoopCount;
  const card = buttonEl.closest('.product-card');
  card.querySelectorAll('.scoop-btn').forEach(b => b.classList.remove('active'));
  buttonEl.classList.add('active');

  const priceEl = document.getElementById(`price-${productId}`);
  if (priceEl) {
    priceEl.textContent = formatRupiah(PRICING[scoopCount].price);
  }
};

window.handleAddToCart = function(productId) {
  const product = MENU_ITEMS.find(m => m.id === productId);
  if (!product) return;

  const scoop = selectedScoops[productId] || 1;
  const price = PRICING[scoop].price;
  const label = PRICING[scoop].label;

  const existingIndex = cart.findIndex(c => c.id === productId && c.scoop === scoop);
  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      flavor: product.flavor,
      icon: product.icon,
      scoop: scoop,
      scoopLabel: label,
      price: price,
      qty: 1
    });
  }

  updateCartUI();
  openCartDrawer();
};

function updateCartUI() {
  const badge = document.getElementById('cart-count-badge');
  const itemsContainer = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('cart-total-price');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (badge) {
    badge.textContent = totalItems;
    badge.style.transform = 'scale(1.25)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
  }

  if (totalPriceEl) {
    totalPriceEl.textContent = formatRupiah(totalPrice);
  }

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-icon">🍨</span>
        <p>Keranjang kamu masih kosong.</p>
        <p style="font-size: 12px; margin-top: 4px;">Pilih rasa favoritmu di menu yuk!</p>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.icon} ${item.name}</h4>
        <p>${item.scoopLabel} • ${formatRupiah(item.price)}</p>
      </div>
      <div class="cart-item-actions">
        <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
        <span class="qty-text">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        <button class="btn-remove-item" onclick="removeCartItem(${index})" title="Hapus">&times;</button>
      </div>
    </div>
  `).join('');
}

window.changeQty = function(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
};

window.removeCartItem = function(index) {
  if (!cart[index]) return;
  cart.splice(index, 1);
  updateCartUI();
};

// Cart Drawer Handlers
const cartDrawer = document.getElementById('cart-drawer');
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartOverlay = document.getElementById('cart-overlay');

function openCartDrawer() {
  if (cartDrawer) cartDrawer.classList.add('open');
}

function closeCartDrawer() {
  if (cartDrawer) cartDrawer.classList.remove('open');
}

if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCartDrawer);
if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

// ==========================================
// 3. PEMESANAN VIA WHATSAPP (DUMMY)
// ==========================================
const waOrderBtn = document.getElementById('wa-order-btn');
if (waOrderBtn) {
  waOrderBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Keranjang kamu masih kosong! Silakan pilih varian es krim terlebih dahulu.');
      return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    let message = `Halo SweetTongue! 🍦\nSaya ingin memesan es krim:\n\n`;
    cart.forEach(item => {
      message += `• ${item.name} (${item.scoopLabel}) x${item.qty} = ${formatRupiah(item.price * item.qty)}\n`;
    });
    message += `\n*Total Pembayaran: ${formatRupiah(total)}*\n`;
    message += `Mohon konfirmasi pesanan saya ya, terima kasih!`;

    const dummyPhone = '6281234567890';
    const waUrl = `https://wa.me/${dummyPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  });
}

// ==========================================
// 4. BUBBLE POP TANYA CHARLIE (POPUP TOGGLE)
// ==========================================
const chatWidgetBtn = document.getElementById('chat-widget-btn');
const chatPopup = document.getElementById('chat-popup');
const chatCloseBtn = document.getElementById('chat-close-btn');
const heroChatTrigger = document.getElementById('hero-chat-trigger');
const userInput = document.getElementById('user-input');

function toggleChatPopup() {
  if (!chatPopup) return;
  chatPopup.classList.toggle('open');
  if (chatPopup.classList.contains('open')) {
    setTimeout(() => userInput && userInput.focus(), 250);
  }
}

if (chatWidgetBtn) chatWidgetBtn.addEventListener('click', toggleChatPopup);
if (chatCloseBtn) chatCloseBtn.addEventListener('click', () => chatPopup && chatPopup.classList.remove('open'));
if (heroChatTrigger) {
  heroChatTrigger.addEventListener('click', () => {
    if (chatPopup) chatPopup.classList.add('open');
    setTimeout(() => userInput && userInput.focus(), 250);
  });
}

// Quick Suggestion Chips
document.querySelectorAll('.quick-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const question = chip.getAttribute('data-question');
    if (question && userInput) {
      userInput.value = question;
      if (chatForm) chatForm.dispatchEvent(new Event('submit'));
    }
  });
});

// ==========================================
// 5. GEMINI AI CHATBOT LOGIC (/api/chat)
// ==========================================
const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const sendButton = document.getElementById('chat-send-btn');

// Menyimpan riwayat obrolan interaktif
const conversation = [];

if (chatForm) {
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const messageText = userInput.value.trim();
    if (!messageText) return;

    // 1. Tambahkan pesan user ke chat UI & conversation history
    appendMessage('user', messageText);
    conversation.push({ role: 'user', text: messageText });

    // Bersihkan & kunci input selama loading
    userInput.value = '';
    userInput.disabled = true;
    if (sendButton) sendButton.disabled = true;

    // 2. Tampilkan pesan bot sementara "Thinking..."
    const botMessageElement = appendMessage('bot', 'Thinking...');
    botMessageElement.classList.add('thinking');

    try {
      // 3. Kirim permintaan POST ke backend /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conversation })
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();

      // 4. Ganti "Thinking..." dengan respon AI
      botMessageElement.classList.remove('thinking');
      if (data && typeof data.result === 'string' && data.result.trim()) {
        botMessageElement.textContent = data.result;
        conversation.push({ role: 'model', text: data.result });
      } else {
        botMessageElement.textContent = 'Sorry, no response received.';
        conversation.pop(); // batalkan pesan terakhir jika respon kosong
      }
    } catch (error) {
      console.error('Chat error:', error);
      botMessageElement.classList.remove('thinking');
      botMessageElement.textContent = 'Failed to get response from server.';
      conversation.pop(); // batalkan pesan terakhir jika gagal
    } finally {
      // Aktifkan kembali input & tombol
      userInput.disabled = false;
      if (sendButton) sendButton.disabled = false;
      userInput.focus();
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  });
}

/**
 * Membuat elemen pesan dan menampilkannya di dalam chatBox
 * @param {'user' | 'bot'} sender
 * @param {string} text
 * @returns {HTMLDivElement}
 */
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

// Inisialisasi katalog saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updateCartUI();
});
