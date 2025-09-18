import React, { useMemo, useState } from "react";

const PRODUCTS = [
  { id: "detailing-full", name: "Detailing Full", desc: "Corrección, pulido y sellado cerámico", price: 850000, img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200&auto=format&fit=crop", tag: "Servicio" },
  { id: "llantas-xxr", name: "Juego de Llantas XXR 18\"", desc: "Diseño deportivo, varias medidas", price: 3500000, img: "https://images.unsplash.com/photo-1600717460139-95f2a7a3f8b2?q=80&w=1200&auto=format&fit=crop", tag: "Producto" },
  { id: "aceite-motul", name: "Aceite Motul 8100 5W-40", desc: "100% sintético, 5L", price: 330000, img: "https://images.unsplash.com/photo-1618909568621-1b7c1e0ff3d8?q=80&w=1200&auto=format&fit=crop", tag: "Producto" }
];

const PY_GS = (n) => new Intl.NumberFormat("es-PY", { style: "currency", currency: "PYG", maximumFractionDigits: 0 }).format(n);

export default function App() {
  const [query, setQuery] = useState(""); const [cartOpen, setCartOpen] = useState(false); const [cart, setCart] = useState({});
  const filtered = useMemo(() => { if (!query) return PRODUCTS; const q = query.toLowerCase(); return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q)); }, [query]);
  const items = Object.values(cart); const total = items.reduce((acc, it) => acc + it.product.price * it.qty, 0);
  const add = (product) => { setCart((c) => { const curr = c[product.id]?.qty || 0; return { ...c, [product.id]: { product, qty: curr + 1 } }; }); };
  const remove = (productId) => { setCart((c) => { const curr = c[productId]?.qty || 0; if (curr <= 1) { const copy = { ...c }; delete copy[productId]; return copy; } return { ...c, [productId]: { ...c[productId], qty: curr - 1 } }; }); };
  const clear = () => setCart({});
  const PHONE_E164 = "+595973888436";
  const waText = encodeURIComponent(["Hola StanceGarage, quiero confirmar esta compra:", ...items.map((it) => `• ${it.product.name} x${it.qty} — ${PY_GS(it.product.price * it.qty)}`), `Total: ${PY_GS(total)}`, "\nMétodo: Retiro en tienda / Envío a coordinar"].join("\n"));
  const waLink = `https://wa.me/${PHONE_E164}?text=${waText}`;
  return (<div className="min-h-screen bg-neutral-950 text-neutral-100">
    <header className="sticky top-0 z-30 backdrop-blur bg-neutral-950/70 border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white text-neutral-900 grid place-items-center font-black">SG</div>
          <div><h1 className="text-lg font-bold tracking-wide">StanceGarage</h1><p className="text-xs text-neutral-400 -mt-1">Since 2022 — Tienda Online</p></div>
        </div>
        <div className="ml-auto flex items-center gap-2 w-full max-w-md">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar: llantas, detailing, aceite…" className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          <button onClick={() => setCartOpen(true)} className="relative rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-neutral-900 px-3 py-2 text-sm font-semibold" aria-label="Abrir carrito">
            Carrito {items.length > 0 && (<span className="absolute -top-2 -right-2 h-6 min-w-6 px-1 grid place-items-center rounded-full bg-white text-neutral-900 text-xs font-bold">{items.reduce((a, b) => a + b.qty, 0)}</span>)}
          </button>
        </div>
      </div>
    </header>
    <section className="border-b border-neutral-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 grid md:grid-cols-2 gap-8 items-center">
        <div><h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Performance, estilo y detalle.<br /><span className="text-emerald-400">Todo en un solo lugar.</span></h2>
          <p className="mt-4 text-neutral-300 max-w-prose">Bienvenido a la tienda oficial de StanceGarage — repuestos, accesorios y servicios de detailing para que tu proyecto quede a otro nivel.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#catalogo" className="rounded-xl bg-emerald-500 text-neutral-900 px-5 py-3 text-sm font-bold hover:bg-emerald-400">Ver catálogo</a>
            <a href={waLink} target="_blank" rel="noreferrer" className="rounded-xl border border-neutral-700 px-5 py-3 text-sm hover:bg-neutral-900">Consultar por WhatsApp</a>
          </div></div>
        <div className="relative">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-neutral-800 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1400&auto=format&fit=crop" alt="Showroom StanceGarage" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -right-5 bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl px-4 py-2 text-xs">Envíos a todo PY · Pago QR/Transferencia</div>
        </div>
      </div>
    </section>
    <section id="catalogo" className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div><h3 className="text-2xl md:text-3xl font-bold">Catálogo</h3><p className="text-neutral-400 text-sm">Seleccioná productos o servicios y cerrá por WhatsApp</p></div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (<article key={p.id} className="group rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 transition">
          <div className="aspect-[16/11] overflow-hidden"><img src={p.img} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition" /></div>
          <div className="p-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest"><span className="px-2 py-1 rounded-full bg-neutral-800 text-neutral-300">{p.tag}</span></div>
            <h4 className="mt-2 text-lg font-semibold">{p.name}</h4>
            <p className="text-sm text-neutral-400 line-clamp-2">{p.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-extrabold">{PY_GS(p.price)}</span>
              <button onClick={() => add(p)} className="rounded-xl bg-emerald-500 text-neutral-900 px-4 py-2 text-sm font-bold hover:bg-emerald-400">Agregar</button>
            </div>
          </div>
        </article>))}
      </div>
    </section>
    <footer className="border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center gap-3 text-sm text-neutral-400">
        <div className="flex items-center gap-2"><div className="h-7 w-7 rounded-full bg-white text-neutral-900 grid place-items-center font-black">SG</div><span>StanceGarage · Since 2022</span></div>
        <span className="md:ml-auto">Atención: Lun–Sáb · 09:00–18:00</span>
      </div>
    </footer>
    <aside className={`fixed inset-y-0 right-0 z-40 w-full sm:w-[420px] transform bg-neutral-950 border-l border-neutral-800 transition ${cartOpen ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!cartOpen}>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
          <button onClick={() => setCartOpen(false)} className="rounded-lg border border-neutral-800 px-3 py-2 text-sm hover:bg-neutral-900">Cerrar</button>
          <h4 className="text-lg font-bold">Tu carrito</h4>
          {items.length > 0 && (<button onClick={clear} className="ml-auto text-xs text-neutral-400 hover:text-red-400">Vaciar</button>)}
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {items.length === 0 ? (<p className="text-neutral-400">Aún no agregaste productos.</p>) : (items.map((it) => (
            <div key={it.product.id} className="flex items-center gap-3 border border-neutral-800 rounded-xl p-3">
              <img src={it.product.img} alt={it.product.name} className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="text-sm font-semibold">{it.product.name}</div>
                <div className="text-xs text-neutral-400">{PY_GS(it.product.price)}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => remove(it.product.id)} className="h-7 w-7 grid place-items-center rounded-lg border border-neutral-800 hover:bg-neutral-900">−</button>
                  <span className="w-6 text-center text-sm">{it.qty}</span>
                  <button onClick={() => add(it.product)} className="h-7 w-7 grid place-items-center rounded-lg border border-neutral-800 hover:bg-neutral-900">+</button>
                </div>
              </div>
              <div className="text-sm font-bold">{PY_GS(it.product.price * it.qty)}</div>
            </div>
          )))}
        </div>
        <div className="border-t border-neutral-800 p-4 space-y-3">
          <div className="flex items-center justify-between text-sm"><span className="text-neutral-400">Total</span><span className="text-xl font-extrabold">{PY_GS(total)}</span></div>
          <a href={waLink} target="_blank" rel="noreferrer" className={`block text-center rounded-xl px-5 py-3 text-sm font-bold ${items.length === 0 ? "bg-neutral-800 text-neutral-500 cursor-not-allowed" : "bg-emerald-500 text-neutral-900 hover:bg-emerald-400"}`} aria-disabled={items.length === 0}>Finalizar por WhatsApp</a>
          <p className="text-[11px] text-neutral-500">Al continuar, se abrirá WhatsApp con el detalle de tu pedido para confirmar stock, entrega y pago.</p>
        </div>
      </div>
    </aside>
    <button onClick={() => setCartOpen(true)} className="fixed bottom-5 right-5 z-30 rounded-2xl bg-emerald-500 text-neutral-900 px-5 py-3 text-sm font-bold shadow-xl hover:bg-emerald-400">
      Ver carrito ({items.reduce((a, b) => a + b.qty, 0)})
    </button>
  </div>);
}
