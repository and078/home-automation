const fetchMove = async (port, direction) => {
    try {
        await fetch(`http://192.168.1.224:${port}/?message=${direction}`);
    }
    catch (error) {
        console.log(error);
    }
}

export default async (req, res) => {
    console.log(req.params);
    await fetchMove(req.params.port, req.params.direction);
    res.send(req.params);
}