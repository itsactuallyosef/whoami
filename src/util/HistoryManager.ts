import { CommandError } from "../commands/abstract";

type HistoryEntry = {
    date: Date,
    command: string,
}

class HistoryManager {
    history: HistoryEntry[] = [];
    index  : number = 0;
    MAX_LENGTH: number = 100;

    add(command: string) {
        if (!command.trim()) return;

        const last = this.history[this.history.length - 1];

        // Skip duplicates
        if (last && last.command === command) return;

        // Trim to max length
        if (this.history.length >= this.MAX_LENGTH) {
            this.history.shift();
        }

        this.history.push({ date: new Date(), command });
        localStorage.setItem("history", JSON.stringify(this.history))
        localStorage.setItem("historyIndex", String(this.index))
        this.index = this.history.length;
    }


    previous(): string {
        if (this.index > 0) this.index--;
        const entry = this.history[this.index];
        return entry ? entry.command : "";
    }

    next(): string {
        if (this.index < this.history.length) this.index++;
        const entry = this.history[this.index];
        return entry ? entry.command : "";
    }

    all(): HistoryEntry[] {
        return [...this.history]
    }

    clear() {
        this.history = [];
        localStorage.removeItem("history")
        this.index = 0;
    }

    loadSavedHistory() {
        const saved = localStorage.getItem("history");
        if (!saved) return;

        this.index = Number(localStorage.getItem("historyIndex"))

        try {
            const parsed: any[] = JSON.parse(saved);
            this.history = parsed.map(entry => ({
                ...entry,
                date: new Date(entry.date),
            }));
        } catch (e) {
            console.error("Failed to load history:", e);
            this.history = [];
        }
    }
}

export default new HistoryManager();