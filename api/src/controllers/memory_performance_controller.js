import fs from 'fs';

const parseMemoryInfo = () => {
    const data = fs.readFileSync('/proc/meminfo', 'utf-8');
    const lines = data.split('\n');
    
    const memoryInfo = {};

    for (const line of lines) {
        const parts = line.split(':');
        if (parts.length === 2) {
            const key = parts[0];
            const value = parts[1].trim().split(' ')[0];
            memoryInfo[key] = value;
        }
    }
    return memoryInfo;
}

export default async (_, res) => {
    const memoryInfo = parseMemoryInfo();
    res.send({
        data: {
            MemoryPerformance: ((memoryInfo["MemTotal"] - memoryInfo["MemFree"]) / memoryInfo["MemTotal"]) * 100,
        },
    });
};