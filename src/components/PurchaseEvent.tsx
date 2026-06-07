"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

export default function PurchaseEvent() {
  useEffect(() => {
    if (typeof window.gtag === "undefined") return;

    // Fire GA4 purchase event
    window.gtag("event", "purchase", {
      currency: "INR",
      value: parseInt(localStorage.getItem("rwp_amount_paid") || "249", 10),
      transaction_id: localStorage.getItem("rwp_payment_id") || `txn_${Date.now()}`,
      items: [
        {
          item_id: "remote-work-playbook-v2",
          item_name: "The Remote Work Playbook – Updated June 2026",
          price: parseInt(localStorage.getItem("rwp_amount_paid") || "249", 10),
          quantity: 1,
        },
      ],
    });

    // Also fire Google Ads conversion event
    window.gtag("event", "conversion", {
      send_to: "G-73PXTSJTTR",
      value: parseInt(localStorage.getItem("rwp_amount_paid") || "249", 10),
      currency: "INR",
    });
  }, []);

  return null;
}
