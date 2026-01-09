require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Question = require("./models/Question");
const Answer = require("./models/Answer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { verifyToken, verifyAdmin } = require("./middleware/auth");

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });



const app = express();
const PORT = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("Backend server is running");
});

app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "Signup successful" });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            role: user.role
        });


    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/questions", async (req, res) => {
    try {
        const { title, description, solutionLink } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const newQuestion = new Question({
            title,
            description,
            solutionLink
        });

        await newQuestion.save();

        res.status(201).json({ message: "Question posted successfully" });

    } catch (error) {
        console.error("Question post error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
app.get("/questions", async (req, res) => {
    try {
        const questions = await Question.find().sort({ createdAt: -1 });
        res.status(200).json(questions);
    } catch (error) {
        console.error("Fetch questions error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/answers",verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { questionId, answerText } = req.body;

        if (!questionId || !answerText) {
            return res.status(400).json({ message: "Answer text required" });
        }

        const newAnswer = new Answer({
            questionId,
            answerText
        });

        await newAnswer.save();

        res.status(201).json({ message: "Answer submitted successfully" });

    } catch (error) {
        console.error("Answer submit error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
app.get("/answers", verifyToken, verifyAdmin,async (req, res) => {
    try {
        const answers = await Answer.find()
            .populate("questionId", "title")
            .sort({ createdAt: -1 });

        res.status(200).json(answers);
    } catch (error) {
        console.error("Fetch answers error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
