import { DiscretePID, Display, Edge, Generator, NodeBase, FSFilter } from './NodeTypes';
import { Plant } from './NodeTypes/Plant';
import { Signal } from './NodeTypes/Signal';

export const simulate = (
    nodes: NodeBase[],
    edges: Edge[],
    setNodes: any,
    Ts = 0.01,
    simulationSteps = 100,
    setSimFinishTrigger
) => {
    validate(nodes, edges);

    const topo = topoSort(nodes, edges);
    if (!topo) throw new Error("A cycle was found in the graph.");

    init(nodes);
    setTs(nodes, Ts);

    const nodeMap = new Map<string, NodeBase>();
    for (const n of nodes) nodeMap.set(n.id, n);

    const parents = new Map<string, string[]>();
    for (const edge of edges) {
        if (!parents.has(edge.to.id)) parents.set(edge.to.id, []);
        parents.get(edge.to.id)!.push(edge.from.id);
    }

    const output = new Map<string, Signal>();

    for (let step = 0; step < simulationSteps; step++) {
        for (const node of topo) {
            const parentIds = parents.get(node.id) || [];
            const input: Signal[] = [];

            for (const parentId of parentIds) {
                const parentOutput = output.get(parentId);
                if (parentOutput) input.push(parentOutput);
            }

            console.log("Executing: " + node.id + " with input: " + input.map(e => String(e.y)).join(','));

            const nodeOutput = node.execute(input);

            console.log("Output: " + nodeOutput.y);
            output.set(node.id, nodeOutput);
        }
    }

    setNodes([...nodes]);
    setSimFinishTrigger((_) => true);
    return output;
};

function validate(nodes: NodeBase[], edges: Edge[]) {
    // Only one continuous Plant allowed
    let numOfPlants = nodes.filter(n => n instanceof Plant).length;
    if (numOfPlants > 1) throw new Error("Only one continuous plant is allowed.");

    // Display and DiscretePID should only have one input
    nodes.forEach(n => {
        if ((n instanceof Display || n instanceof DiscretePID) && n.inDegree > 1) {
            throw new Error(`${n.constructor.name} should only have one input.`);
        }
    });
}

function topoSort(nodes: NodeBase[], edges: Edge[]): NodeBase[] | null {
    const adjList = edgeListToAdjList(nodes, edges);

    const inDegree = new Map<NodeBase, number>();
    for (const node of nodes) inDegree.set(node, 0);
    for (const edge of edges) {
        if (!(edge.from.displayName != "Plant")) {
            inDegree.set(edge.to, inDegree.get(edge.to)! + 1);
        }
    }

    const queue: NodeBase[] = [];
    for (const node of nodes) if (inDegree.get(node) === 0) queue.push(node);

    const order: NodeBase[] = [];
    while (queue.length > 0) {
        const node = queue.shift()!;
        order.push(node);

        for (const next of adjList.get(node.id)!) {
            const deg = inDegree.get(next)! - 1;
            inDegree.set(next, deg);
            if (deg == 0) queue.push(next);
        }
    }

    return order.length == nodes.length ? order : null;
}

function edgeListToAdjList(nodes: NodeBase[], edges: Edge[]): Map<string, NodeBase[]> {
    const adjList = new Map<string, NodeBase[]>();

    for (const node of nodes) {
        adjList.set(node.id, []);
    }

    for (const edge of edges) {
        adjList.get(edge.from.id)!.push(edge.to);
    }

    return adjList;
}


const init = (nodes) => {
    nodes.forEach(node => {
        if (typeof node.init == "function") {
            node.init();
        }
    })
}

const setTs = (nodes, Ts) => {
    nodes.forEach(node => {
        if (typeof node.setTs == "function") { node.setTs(Ts) } ''
    });
}