import React from 'react'
import {
  User, Phone, Mail,
  Edit,FileText,ShieldCheck,
  MapPin,CreditCard, Receipt,
  Clock, ArrowRightLeft, Gift,
  ShieldUser,Settings,TrendingUp,
  TrendingDown, Zap, BarChart2,
  ArrowUpRight, Wallet,Package,
  ChevronRight,Sparkles, X,
} from 'lucide-react';

const QuickAction = () => {



    const QUICK_ACTIONS = [
  {
    icon: BarChart2,
    label: 'Reports',
    sub: 'Analytics & insights',
    iconBg: 'bg-amber-100',
    iconBorder: 'border-amber-300',
    iconColor: 'text-amber-700',
    route: null,
  },
  {
    icon: Package,
    label: 'My Orders',
    sub: 'Track deliveries',
    iconBg: 'bg-green-50',
    iconBorder: 'border-green-300',
    iconColor: 'text-green-700',
    route: '/orders',
  },
  {
    icon: Gift,
    label: 'Redeem',
    sub: 'Browse jewellery',
    iconBg: 'bg-amber-100',
    iconBorder: 'border-amber-300',
    iconColor: 'text-amber-700',
    route: '/redeem',
  },
  {
    icon: Clock,
    label: 'History',
    sub: 'All transactions',
    iconBg: 'bg-stone-100',
    iconBorder: 'border-stone-300',
    iconColor: 'text-stone-600',
    route: null,
  },
];
  return (
    <div>
   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {QUICK_ACTIONS.map(
              ({ icon: Icon, label, sub, iconBg, iconBorder, iconColor, route }) => (
                <div
                  key={label}
                  className={`bg-gradient-to-r from-[#38393E] via-[#38393E] to-[#1A1A22] border border-white/20 rounded-2xl p-4 shadow-sm ${route ? 'cursor-pointer' : ''}`}
                  onClick={() => route && navigate(route)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-9 h-9 rounded-xl ${iconBg} border ${iconBorder} flex items-center justify-center`}
                    >
                      <Icon size={16} className={iconColor} />
                    </div>
                    <ChevronRight size={13} className="text-stone-300 mt-0.5" />
                  </div>
                  <p className="text-sm font-semibold text-secondary mb-0.5">{label}</p>
                  <p className="text-xs text-stone-400">{sub}</p>
                </div>
              )
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="text-amber-400 text-xs">◈</span>
            <p className="text-xs text-stone-400 tracking-wide">
              Prices updated live · Values indicative only
            </p>
            <span className="text-stone-300 text-xs">◈</span>
          </div>
          </div>
  )
}

export default QuickAction