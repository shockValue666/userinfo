import * as dotenv from 'dotenv'
dotenv.config();
import { request } from 'undici'
import cors from 'cors'
import express from 'express'
import {IgApiClient} from 'instagram-private-api'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    console.log("home")
    res.send('Welcome to CORS server 😁')
})


var options = {
  'method': 'GET',
  'url': 'https://www.instagram.com/asd',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: '',
    variables: {}
  })
};

app.get('/getUserInfo/:username', async (req, res) => {
    console.log("username")
     const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    try{
        const info = await ig.user.usernameinfo("asdf")
        // console.log("info: ",info)
        res.send(info)
    }catch(err){
        console.log("err: ",err)
        res.send(err)
    }

})


app.get('/cors', (req, res) => {
    res.send('This has CORS enabled 🎈')
})
app.listen(8080, () => {
    console.log('listening on port 8080')
})