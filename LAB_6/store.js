class NodeStore {
    constructor() {
        this.nodes = this.getInitialData();
        this.updateNextId();
    }

    getInitialData() {
        return [
            { id: 1, performance: 95, performanceLevel: 'high', cpu: "Intel Xeon Gold 6248", ram: 128, storage: 2000, load: 45, available: true },
            { id: 2, performance: 72, performanceLevel: 'medium', cpu: "AMD EPYC 7302", ram: 64, storage: 1000, load: 78, available: false },
            { id: 3, performance: 45, performanceLevel: 'low', cpu: "Intel Xeon Silver 4214", ram: 32, storage: 500, load: 25, available: true },
            { id: 4, performance: 88, performanceLevel: 'high', cpu: "AMD EPYC 7402", ram: 256, storage: 4000, load: 12, available: true }
        ];
    }

    updateNextId() {
        this.nextId = Math.max(...this.nodes.map(n => n.id), 0) + 1;
    }

    getNodes() {
        return this.nodes;
    }

    addNode(node) {
        this.nodes.push(node);
        this.nextId++;
    }

    getNextId() {
        return this.nextId;
    }
}

const nodeStore = new NodeStore();
export default nodeStore;
