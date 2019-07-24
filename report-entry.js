class ReportEntry {
    constructor(name, score, impact) {
        this.name = name;
        this.score = score;
        this.impact = impact;
    }

    toJSON() {
        return JSON.stringify({
            name: this.name,
            score: this.score,
            impact: this.impact
        });
    }
}

module.exports = ReportEntry;