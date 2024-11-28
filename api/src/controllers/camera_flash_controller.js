const fetchFlash = async (state) => {
    try {
        await fetch(`http://192.168.1.224:6001?message=${state}`)
    } catch (error) {
        console.log(error);
    }
}

module.exports = (req, res) => {
    fetchFlash(req.params.state)
    res.send(req.params);
}