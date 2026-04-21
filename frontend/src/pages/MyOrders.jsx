import { useState, useEffect } from "react";
import { Package, Calendar, CreditCard, CheckCircle, Clock, Truck, ChevronDown, ChevronUp, ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusConfig = {
  delivered: { label: "Delivered", color: "#16a34a", bg: "#dcfce7", icon: CheckCircle },
  processing: { label: "Processing", color: "#b45309", bg: "#fef3c7", icon: Clock },
  shipped: { label: "Shipped", color: "#1e40af", bg: "#dbeafe", icon: Truck },
  pending: { label: "Pending", color: "#6b7280", bg: "#f3f4f6", icon: Clock },
};

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const status = order.status || "processing";
  const cfg = statusConfig[status] || statusConfig.processing;
  const StatusIcon = cfg.icon;

  return (
    <div style={{
      background: "#fff",
      border: "1.5px solid #fde68a",
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 16,
      boxShadow: "0 2px 16px rgba(202,138,4,0.07)",
      transition: "box-shadow 0.2s ease",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 28px rgba(202,138,4,0.14)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 16px rgba(202,138,4,0.07)"}
    >
      {/* Card Header */}
      <div style={{
        background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
        padding: "18px 22px",
        borderBottom: expanded ? "1px solid #fde68a" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Order icon */}
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "linear-gradient(135deg, #b45309, #d97706)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <Package size={20} color="#fff" />
          </div>
          <div>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700, color: "#78350f", margin: 0 }}>
              Order #{order.id?.toString().slice(-6) || order.id}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 3 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#a1a1aa" }}>
                <Calendar size={11} />
                {order.date}
              </span>
              <span style={{ fontSize: 11, color: "#d1d5db" }}>·</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#a1a1aa" }}>
                <CreditCard size={11} />
                {order.paymentMethod}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Status badge */}
          <span style={{
            display: "flex", alignItems: "center", gap: 5,
            background: cfg.bg, color: cfg.color,
            fontSize: 11, fontWeight: 700,
            padding: "5px 12px", borderRadius: 20,
            letterSpacing: "0.05em",
          }}>
            <StatusIcon size={12} />
            {cfg.label}
          </span>

          {/* Amount */}
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700, color: "#92400e", margin: 0 }}>
              ₹{Number(order.totalAmount).toLocaleString("en-IN")}
            </p>
            <p style={{ fontSize: 10, color: "#a1a1aa", margin: 0 }}>
              {order.items?.length || 0} item{order.items?.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(p => !p)}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              border: "1.5px solid #fde68a", background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0, transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#fef9c3"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            {expanded ? <ChevronUp size={15} color="#b45309" /> : <ChevronDown size={15} color="#b45309" />}
          </button>
        </div>
      </div>

      {/* Expanded Items */}
      {expanded && (
        <div style={{ padding: "18px 22px" }}>
          {/* Progress bar (visual) */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              {["Order Placed", "Processing", "Shipped", "Delivered"].map((step, i) => {
                const stepsDone = { pending: 1, processing: 2, shipped: 3, delivered: 4 }[status] || 2;
                const done = i < stepsDone;
                const active = i === stepsDone - 1;
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: done ? "linear-gradient(135deg, #b45309, #d97706)" : "#f3f4f6",
                      border: active ? "2px solid #d97706" : "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: active ? "0 0 0 4px #fef3c7" : "none",
                      transition: "all 0.3s",
                    }}>
                      {done ? (
                        <CheckCircle size={14} color="#fff" />
                      ) : (
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#d1d5db" }} />
                      )}
                    </div>
                    <p style={{ fontSize: 9, color: done ? "#92400e" : "#9ca3af", marginTop: 5, textAlign: "center", fontWeight: done ? 700 : 400 }}>
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* Connector line */}
            <div style={{ height: 2, background: "#f3f4f6", borderRadius: 2, marginTop: -36, marginBottom: 28, zIndex: -1, position: "relative" }}>
              <div style={{
                height: "100%",
                width: `${({ pending: 10, processing: 40, shipped: 70, delivered: 100 }[status] || 40)}%`,
                background: "linear-gradient(90deg, #b45309, #d97706)",
                borderRadius: 2,
                transition: "width 0.5s ease",
              }} />
            </div>
          </div>

          {/* Items list */}
          <p style={{ fontFamily: "Georgia, serif", fontSize: 12, fontWeight: 700, color: "#78350f", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Items Ordered
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {order.items?.map((item, idx) => (
              <div key={item.id || idx} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#fffbeb",
                border: "1px solid #fef3c7",
                borderRadius: 12,
                padding: "12px 16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 40, height: 40, borderRadius: 8, objectFit: "contain", background: "#fef3c7" }}
                    />
                  ) : (
                    <div style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Package size={16} color="#b45309" />
                    </div>
                  )}
                  <div>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700, color: "#1c1917", margin: 0 }}>{item.name}</p>
                    <p style={{ fontSize: 11, color: "#a1a1aa", margin: "2px 0 0" }}>
                      Qty: {item.quantity}
                      {item.weight ? ` · ${item.weight}g` : ""}
                    </p>
                  </div>
                </div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: "#92400e", margin: 0 }}>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>

          {/* Order summary footer */}
          <div style={{
            marginTop: 16,
            paddingTop: 14,
            borderTop: "1px dashed #fde68a",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 20,
          }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 11, color: "#a1a1aa", margin: 0 }}>Order Total</p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: "#92400e", margin: "2px 0 0" }}>
                ₹{Number(order.totalAmount).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

  const totalSpent = orders.reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fffbeb 0%, #fef3c7 40%, #fde68a22 100%)",
      fontFamily: "Georgia, 'Times New Roman', serif",
      padding: "32px 16px",
    }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "none", border: "none",
            color: "#b45309", fontSize: 13, fontWeight: 700,
            cursor: "pointer", marginBottom: 28, padding: 0,
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Header */}
        <div style={{
          marginBottom: 32,
          paddingBottom: 24,
          borderBottom: "1px solid #fde68a",
        }}>
          <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #d97706, transparent)", borderRadius: 2, marginBottom: 18 }} />

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: "#b45309", margin: "0 0 6px" }}>
                Your Account
              </p>
              <h1 style={{ fontFamily: "Georgia, serif", fontSize: 40, fontWeight: 700, margin: 0, lineHeight: 1 }}>
                <span style={{
                  background: "linear-gradient(90deg, #92400e, #d97706, #92400e)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>My</span>
                {" "}
                <span style={{ color: "#1c1917" }}>Orders</span>
              </h1>
            </div>

            {/* Summary pills */}
            {orders.length > 0 && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <div style={{
                  background: "#fff", border: "1.5px solid #fde68a",
                  borderRadius: 14, padding: "10px 18px",
                  display: "flex", flexDirection: "column", alignItems: "center",
                }}>
                  <span style={{ fontSize: 10, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.08em" }}>Total Orders</span>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: "#b45309" }}>{orders.length}</span>
                </div>
                <div style={{
                  background: "#fff", border: "1.5px solid #fde68a",
                  borderRadius: 14, padding: "10px 18px",
                  display: "flex", flexDirection: "column", alignItems: "center",
                }}>
                  <span style={{ fontSize: 10, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.08em" }}>Total Spent</span>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: "#b45309" }}>
                    ₹{totalSpent.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Orders list or empty state */}
        {orders.length === 0 ? (
          <div style={{
            background: "#fff",
            border: "1.5px solid #fde68a",
            borderRadius: 24,
            padding: "64px 32px",
            textAlign: "center",
            boxShadow: "0 4px 24px rgba(202,138,4,0.07)",
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg, #fef3c7, #fde68a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <ShoppingBag size={32} color="#b45309" />
            </div>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#78350f", margin: "0 0 8px" }}>
              No orders yet
            </h3>
            <p style={{ fontSize: 13, color: "#a1a1aa", margin: "0 0 24px" }}>
              Your redeemed jewellery orders will appear here.
            </p>
            <button
              onClick={() => navigate("/redeem")}
              style={{
                padding: "12px 32px",
                background: "linear-gradient(90deg, #92400e, #d97706, #b45309)",
                color: "#fff", border: "none", borderRadius: 12,
                fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700,
                letterSpacing: "0.08em", cursor: "pointer",
              }}
            >
              Explore Jewellery
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 12, color: "#a1a1aa", marginBottom: 16 }}>
              Showing {orders.length} order{orders.length !== 1 ? "s" : ""} · Click any order to see details
            </p>
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;