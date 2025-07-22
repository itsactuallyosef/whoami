
class HistoryManager {
    history: string[] = [];
    index  : number = 0;
    MAX_LENGTH: number = 100;

    add(command: string) {
        if (!command.trim()) return;

        // Avoid duplicates and ensure it's within the limit
        if (this.history[this.history.length - 1] !== command && this.history.length < this.MAX_LENGTH) {
            this.history.push(command);
        }

        this.index = this.history.length;
    }

    previous(): string {
        if (this.index > 0) this.index--;
        return this.history[this.index] ?? "";
    }

    next(): string {
        if (this.index < this.history.length) this.index++;
        return this.history[this.index] ?? "";
    }

    all(): string[] {
        return [...this.history]
    }

    clear() {
        this.history = [];
        this.index = 0;
    }
}

export default new HistoryManager();