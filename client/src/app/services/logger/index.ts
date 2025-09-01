const levels = {
  error: 70,
  warn: 60,
  info: 50,
  debug: 30,
  trace: 20,
} as const;

type Level = keyof typeof levels;

const logger: Console = console;

const currentLevel: Level = "info";
const logLevel = levels[currentLevel] ?? levels.info;

function log(level: Level, method: keyof Console, ...args: unknown[]) {
  const fn = logger[method] as (...args: unknown[]) => void; // ép type hàm

  if (logLevel > levels[level]) {
    return;
  }

  fn(`[${level.toUpperCase()}] [${new Date().toLocaleString()}]:`, ...args);
}

export default {
  error: (...args: unknown[]) => log("error", "error", ...args),
  warn: (...args: unknown[]) => log("warn", "warn", ...args),
  info: (...args: unknown[]) => log("info", "info", ...args),
  debug: (...args: unknown[]) => log("debug", "log", ...args),
  trace: (...args: unknown[]) => log("trace", "log", ...args),
};
