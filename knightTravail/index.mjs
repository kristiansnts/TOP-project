function knightMoves(start, end) {
    const queue = [[...start, [start]]];
    const moves = [
        [-2, -1], [-2, 1], [2, -1], [2, 1],
        [-1, -2], [-1, 2], [1, -2], [1, 2]
    ];

    while (queue.length > 0) {
        const [row, col, path] = queue.shift();

        if (row === end[0] && col === end[1]) {
            return `You made it in ${path.length - 1} moves! Here's your path:\n${path.map(square => `[${square}]`).join('\n')}`;
        }

        for (const [rDiff, cDiff] of moves) {
            const nextRow = row + rDiff;
            const nextCol = col + cDiff;

            if (nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8 && !path.some(([r, c]) => r === nextRow && c === nextCol)) {
                queue.push([nextRow, nextCol, [...path, [nextRow, nextCol]]]);
            }
        }
    }

    return 'No valid path found!';
}

console.log(knightMoves([3,3],[4,3]))
console.log(knightMoves([0,0],[7,7]))