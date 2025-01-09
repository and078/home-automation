import fs from 'fs';

const parseCpuTimes = () => {
    const data = fs.readFileSync('/proc/stat', 'utf-8');
    const lines = data.split('\n');
    const cpuTimes = {};

    for (const line of lines) {
        if (line.startsWith('cpu')) {
            const parts = line.split(' ');        
            const cpuId = parts[0];
            const times = parts.slice(1).map(t => Number(t));
            cpuTimes[cpuId] = times;
        }
    }
    return cpuTimes;
}

const calculateCpuLoad = (t1, t2) => {
    const cpuLoads = {};

    for (const cpuId in t1) {
        const times1 = t1[cpuId];
        const times2 = t2[cpuId];

        const totalTime1 = times1.reduce((a, b) => a + b, 0);
        const totalTime2 = times2.reduce((a, b) => a + b, 0);

        const idleTime1 = times1[3] + times1[4]; 
        const idleTime2 = times2[3] + times2[4];

        const totalDelta = totalTime2 - totalTime1;
        const idleDelta = idleTime2 - idleTime1;

        const usage = totalDelta > 0 ? (100 * (totalDelta - idleDelta)) / totalDelta : 0;
        cpuLoads[cpuId] = usage.toFixed(2); 
    }
    return cpuLoads;
}

const monitorCpuLoad = async (res) => {
    const t1 = parseCpuTimes();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const t2 = parseCpuTimes();

    const loads = calculateCpuLoad(t1, t2);
    res.send({
        data: {
            CPUsPerformance: loads
        },
    });
};

export default async (_, res) => {
    await monitorCpuLoad(res);
}
