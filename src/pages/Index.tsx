import { useEffect, useMemo, useRef, useState } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import LoveConfession from "@/components/LoveConfession";

const Index = () => {
  const [showConfession, setShowConfession] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // NEW: share/customization state
  const [toName, setToName] = useState("");
  const [fromName, setFromName] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [receiverMode, setReceiverMode] = useState(false);

  useEffect(() => {
    // Read values from the URL when someone opens a shared link
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to") ?? "";
    const from = params.get("from") ?? "";
    const msg = params.get("msg") ?? "";

    const hasAny = Boolean(to || from || msg);
    if (hasAny) setReceiverMode(true);

    setToName(to);
    setFromName(from);
    setCustomMessage(msg);
  }, []);

  const shareUrl = useMemo(() => {
    const url = new URL(window.location.origin + window.location.pathname);

    if (toName.trim()) url.searchParams.set("to", toName.trim());
    if (fromName.trim()) url.searchParams.set("from", fromName.trim());
    if (customMessage.trim()) url.searchParams.set("msg", customMessage.trim());

    return url.toString();
  }, [toName, fromName, customMessage]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback for older browsers
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
      } catch {
        return false;
      }
    }
  };

  const handleCopyLink = async () => {
    const ok = await copyToClipboard(shareUrl);
    setCopied(ok);
    setTimeout(() => setCopied(false), 1500);
  };

  const resetToBuilder = () => {
    window.history.pushState({}, "", window.location.pathname);
    setReceiverMode(false);
    setToName("");
    setFromName("");
    setCustomMessage("");
  };

  const handleNoHover = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    setNoButtonPosition({ x: newX, y: newY });
  };

  const question = toName?.trim()
    ? `Will you be my Valentine, ${toName.trim()}?`
    : "Will you be my Valentine?";

  return (
    <div className="min-h-screen bg-valentine-gradient overflow-hidden relative">
      <FloatingHearts />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4 text-4xl md:text-5xl">
          <span className="animate-pulse-heart">💕</span>
          <span
            className="animate-pulse-heart"
            style={{ animationDelay: "0.3s" }}
          >
            💖
          </span>
          <span
            className="animate-pulse-heart"
            style={{ animationDelay: "0.6s" }}
          >
            💗
          </span>
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-love-pink max-w-lg text-center space-y-8">
          <div className="text-7xl md:text-8xl animate-pulse-heart">💝</div>

          {/* NEW: builder UI (hide when partner opens the shared link) */}
          {!receiverMode ? (
            <div className="space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-foreground">
                    Partner name
                  </label>
                  <input
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                    placeholder="e.g., Arju Rana"
                    className="w-full rounded-2xl border border-love-pink/40 bg-background/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-love-pink/50"
                    maxLength={40}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-foreground">
                    Your name
                  </label>
                  <input
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder="e.g., Sher Bahadur"
                    className="w-full rounded-2xl border border-love-pink/40 bg-background/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-love-pink/50"
                    maxLength={40}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-foreground">
                  Custom message
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Write something cute… 🥺💕"
                  className="w-full min-h-[90px] rounded-2xl border border-love-pink/40 bg-background/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-love-pink/50 resize-none"
                  maxLength={300}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{customMessage.length}/300</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold text-sm hover:scale-[1.02] transition-transform shadow-md"
                >
                  {copied ? "Copied! ✅" : "Copy Link 🔗"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              {fromName?.trim() ? (
                <span>
                  A surprise from{" "}
                  <span className="font-semibold">{fromName.trim()}</span> 💕
                </span>
              ) : (
                <span>A surprise just for you 💕</span>
              )}
            </div>
          )}

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-love-gradient leading-tight">
            {question}
          </h1>

          <p className="text-muted-foreground text-lg font-medium">
            please? 🥺💕
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={() => setShowConfession(true)}
              className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold text-xl hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/30 animate-pulse-heart"
            >
              Yes! 💖
            </button>

            <button
              ref={noButtonRef}
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              className="px-10 py-4 bg-secondary text-secondary-foreground rounded-full font-bold text-xl transition-all duration-300 shadow-md hover:shadow-lg"
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              }}
            >
              No 😢
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 flex gap-6 text-3xl">
          <span className="animate-wiggle">🌹</span>
          <span className="animate-wiggle" style={{ animationDelay: "0.2s" }}>
            💐
          </span>
          <span className="animate-wiggle" style={{ animationDelay: "0.4s" }}>
            🦋
          </span>
        </div>
      </div>

      <LoveConfession
        isOpen={showConfession}
        onClose={() => setShowConfession(false)}
        toName={toName}
        fromName={fromName}
        message={customMessage}
      />
    </div>
  );
};

export default Index;
