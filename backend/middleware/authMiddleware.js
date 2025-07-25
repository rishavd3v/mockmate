import {pool} from "../utils/db.js";
import {verifyIdToken} from "../utils/firebase.js";

export async function verifyToken(req, res, next){
  const authHeader = req.headers.authorization;
  
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try{
    const decodedToken = await verifyIdToken(token);
    if(!decodedToken){
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    
    const {uid,name,email} = decodedToken;
    const result = await pool.query("SELECT * FROM USERS WHERE uid = $1", [uid]);
    if(result.rows.length === 0){
      await pool.query("INSERT INTO users (uid,name,email) VALUES ($1,$2,$3)", [uid,name,email]);
    }
    req.user = decodedToken;
    
    next();
  }
  catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}