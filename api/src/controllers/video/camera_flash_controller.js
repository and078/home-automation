const fetchFlash = async (port, state) => {
    try {
        await fetch(`http://192.168.1.224:${port}?message=${state}`)
    } catch (error) {
        console.log(error);
    }
}

export default (req, res) => {
    console.log(req.params);
    fetchFlash(req.params.port, req.params.state)
    res.send(req.params);
}