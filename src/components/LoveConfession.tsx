import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  delay: number;
  emoji: string;
  rotation: number;
}

const LOVE_EMOJIS = [
  "💕",
  "💖",
  "💗",
  "💓",
  "💝",
  "❤️",
  "🩷",
  "💘",
  "✨",
  "🎉",
  "🎊",
  "💐",
  "🌹",
  "🦋",
];
const CONFETTI = ["🎊", "✨", "🎉", "💫", "⭐"];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  toName?: string;
  fromName?: string;
  message?: string;
}

const LoveConfession = ({
  isOpen,
  onClose,
  toName,
  fromName,
  message,
}: Props) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [confetti, setConfetti] = useState<Particle[]>([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loveParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        emoji: LOVE_EMOJIS[Math.floor(Math.random() * LOVE_EMOJIS.length)],
        rotation: Math.random() * 360,
      }));
      setParticles(loveParticles);

      const confettiParticles: Particle[] = Array.from(
        { length: 30 },
        (_, i) => ({
          id: i + 100,
          left: Math.random() * 100,
          delay: Math.random() * 1.5,
          emoji: CONFETTI[Math.floor(Math.random() * CONFETTI.length)],
          rotation: Math.random() * 360,
        }),
      );
      setConfetti(confettiParticles);

      setTimeout(() => setShowContent(true), 300);
    } else {
      setShowContent(false);
      setParticles([]);
      setConfetti([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cleanTo = (toName ?? "").trim();
  const cleanFrom = (fromName ?? "").trim();
  const cleanMsg = (message ?? "").trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-love-pink/40 backdrop-blur-sm overflow-x-auto "
      onClick={onClose}
    >
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute animate-confetti pointer-events-none"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            fontSize: "2rem",
            transform: `rotate(${c.rotation}deg)`,
          }}
        >
          {c.emoji}
        </div>
      ))}

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti pointer-events-none"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            fontSize: "1.5rem",
            animationDuration: "4s",
          }}
        >
          {p.emoji}
        </div>
      ))}

      <div
        className={`relative bg-card rounded-3xl p-8 md:p-12 max-w-md mx-4 shadow-2xl border-4 border-love-pink transform transition-all duration-500 ${
          showContent ? "animate-bounce-in" : "scale-0 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-6 -left-6 text-4xl animate-pulse-heart">
          💖
        </div>
        <div
          className="absolute -top-6 -right-6 text-4xl animate-pulse-heart"
          style={{ animationDelay: "0.5s" }}
        >
          💖
        </div>
        <div
          className="absolute -bottom-6 -left-6 text-4xl animate-pulse-heart"
          style={{ animationDelay: "0.25s" }}
        >
          💕
        </div>
        <div
          className="absolute -bottom-6 -right-6 text-4xl animate-pulse-heart"
          style={{ animationDelay: "0.75s" }}
        >
          💕
        </div>

        <div className="text-center space-y-6">
          <div className="text-6xl animate-pulse-heart">💝</div>

          <h2 className="font-display text-3xl md:text-4xl text-love-gradient h-16">
            {cleanTo ? `Yay, ${cleanTo}! 🎉` : "Yay! 🎉"}
          </h2>
          <img
            src="/kiss.gif"
            alt="kiss"
            loading="lazy"
            className="mx-auto w-20 h-20 md:w-20 md:h-20 object-cover rounded-3xl shadow-lg border-2 border-love-pink/30"
          />

          <div className="space-y-4 text-foreground">
            {cleanMsg ? (
              <div className="rounded-2xl border border-love-pink/30 bg-background/60 px-4 py-4 text-left">
                <div className="text-xs text-muted-foreground mb-2">
                  Message:
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {cleanMsg}
                </p>
                <div className="mt-3 text-right text-xs text-muted-foreground">
                  {cleanFrom
                    ? `— ${cleanFrom} 💕`
                    : "— Someone who adores you 💕"}
                </div>
              </div>
            ) : (
              <>
                <p className="text-lg font-semibold">
                  You just made my heart skip a beat! 💓
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  From the first moment I saw you, I knew there was something
                  special about you. Your smile lights up my world, and your
                  laughter is my favorite melody.
                </p>
                <p className="text-lg font-semibold text-love-red">
                  {cleanFrom
                    ? `I love you, ${cleanTo || "my love"} — always. 💕`
                    : "I love you more than words can ever express! 💕"}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  You're my forever Valentine 🌹
                </p>
              </>
            )}
          </div>

          <div className="flex justify-center gap-2 text-3xl">
            <span className="animate-wiggle" style={{ animationDelay: "0s" }}>
              💖
            </span>
            <span className="animate-wiggle" style={{ animationDelay: "0.1s" }}>
              💗
            </span>
            <span className="animate-wiggle" style={{ animationDelay: "0.2s" }}>
              💓
            </span>
            <span className="animate-wiggle" style={{ animationDelay: "0.3s" }}>
              💕
            </span>
            <span className="animate-wiggle" style={{ animationDelay: "0.4s" }}>
              💖
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
          >
            I Love You Too! 💕
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoveConfession;
