const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
const ipMap = new Map();

app.get('/', async (req, res) => {
    async function isOverLimit(ip) {
      ipMap.set(ip, ipMap.has(ip) ? ipMap.get(ip) + 1 : 0);
      console.log(ipMap.get(ip));
      if (ipMap.get(ip) > 10) {
          return true;
      }
    }
    let overLimit = await isOverLimit(req.ip);
    if (overLimit) {
        res.status(429).send('Too many requests - try again later');
        return;
    }
    res.send("Successful!!!");
});