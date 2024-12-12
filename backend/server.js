import express from "express";
import mongoose from "mongoose";
import cors from "cors";


const app = express();
const PORT = 5000;

// middleware

app.use(cors());
app.use(express.json());

// connection with mongodb

const uri = "mongodb+srv://martandmahajan03:7udO6ZUDV1aHcAYV@cluster0.8tlfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);


const cardSchema = new mongoose.Schema({
    desc: String,
    filesize: String,
    close: Boolean,
    tag:{
        isOpen: Boolean,
        tagTitle: String,
        tagColor: String,
    },
});

const Card = mongoose.model("Card", cardSchema);

// to get data
app.get("/api/cards", async(req, res) => {
    try{
        const cards = await Card.find();
        res.json(cards);
    } catch (err){
        res.status(500).json({error: err.message});
    }
});

// to post data

app.post("/api/data", async(req, res) =>{
    try{
        const newData = new Card(req.body);
        const savedData = await newData.save();

        res.status(201).json({
            success: true,
            message: "Data added successfully",
            data: savedData,
        });
    } catch (error){
        res.status(500).json({
            success: false,
            message: "Failed to add data",
            error: error.message,
        });
    }
});

// to delete a card

app.delete("/api/cards/:id", async (req,res) =>{
    try{
        const {id} = req.params;
        const deleteCard = await Card.findByIdAndDelete(id);

        if(!deleteCard){
            return res.status(404).json({
                success: false,
                message: "Card not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Card deleted successfully",
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to delete a card",
            error: error.message,
        });
    }
});

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});