import path from 'path';

export default async (req, res) => {
    const __dirname = path.resolve();
    
    console.log('stream')
        
    res.sendFile(path.join(__dirname, 'index.html'));
}