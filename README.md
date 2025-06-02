# 🌊 Water Warriors - Interactive Water Conservation Platform

A comprehensive web platform dedicated to promoting water conservation awareness through education, interactive tools, and AI-powered assistance. Built with modern web technologies and featuring an intelligent chatbot powered by Ollama AI.

![Water Warriors](images/water_warrior_detourre.png)

## 🎯 Project Overview

Water Warriors is an educational platform that empowers users to become water conservation champions through:

- **Interactive Learning**: Comprehensive tips and DIY projects for water saving
- **Educational Games**: Quiz games and water usage calculators
- **AI Assistant**: Intelligent chatbot providing personalized water conservation advice
- **Community Stories**: Real-world examples of successful water conservation efforts
- **Visual Documentation**: Rich imagery and illustrations supporting water-saving concepts

## 🌟 Key Features

### 💧 Water Conservation Tips
- **Bathroom**: Shower efficiency, leak detection, low-flow fixtures
- **Kitchen**: Dishwashing optimization, appliance efficiency
- **Laundry**: Load optimization, energy-efficient practices
- **Outdoor**: Smart irrigation, native plants, rainwater collection
- **DIY Projects**: Rain barrels, greywater systems, toilet displacement

### 🎮 Interactive Elements
- Dynamic category filtering for tips
- Responsive design for all devices
- Smooth scrolling and animations
- Modern parallax effects

### 🤖 AI-Powered Chat Assistant
- **Real-time streaming responses** using Ollama AI
- **Specialized water conservation knowledge** with contextual advice
- **Natural language processing** for intuitive interactions
- **Visual typing indicators** for enhanced user experience
- **Bold text formatting** for emphasis on key conservation tips

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI Integration**: Ollama API with Gemma 2 model
- **Design**: Responsive CSS Grid/Flexbox layouts
- **Assets**: Optimized images and icons
- **Performance**: Minimal dependencies, fast loading

## 📋 Prerequisites

Before setting up the project, ensure you have:

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server capability (optional but recommended)
- Internet connection for initial setup

### For AI Chatbot Functionality:
- **Ollama** installed on your system
- **Gemma 2 model**
- Minimum 4GB RAM

## 🚀 Quick Start

### 1. Clone or Download the Project
```bash
git clone https://github.com/SilverBtc/Water-Warriors.git
cd Water-Warriors
```

### 2. Basic Setup (Without AI Chatbot)
Simply open `html/index.html` in your web browser to explore the static features.

### 3. Full Setup with AI Chatbot

#### Step 1: Install Ollama

**Windows:**
1. Download Ollama from [https://ollama.com/](https://ollama.com/)
2. Run the installer and follow the setup wizard
3. Ollama will be installed and automatically start as a service

**macOS:**
```bash
# Using Homebrew
brew install ollama

# Or download from https://ollama.com/
```

**Linux:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

#### Step 2: Download the AI Model

Open PowerShell (Windows) or Terminal (macOS/Linux) and run:

```powershell
# Start Ollama service (if not already running)
ollama serve

# Download the recommended model (in a new terminal window)
ollama pull gemma3:4b
```

#### Step 3: Verify Installation

```powershell
# Check if Ollama is running
ollama list

# Test the model
ollama run gemma2:2b "How can I save water at home?"
```

You should see the model respond with water conservation tips.

## 🎮 Usage Guide

### Navigating the Platform

1. **Home Page** (`index.html`): Overview and mission statement
2. **Tips Page** (`tips.html`): Comprehensive water-saving advice with AI chatbot
3. **Facts Page** (`facts.html`): Educational content and statistics
4. **Games Page** (`games.html`): Interactive tools and calculators
5. **About Page** (`about.html`): Project information and team details

### Using the AI Chatbot

1. **Access**: Click the chat icon (💬) on the tips page
2. **Interaction**: Type your water conservation questions
3. **Features**:
   - Real-time streaming responses
   - Specialized water-saving advice
   - **Bold text** highlights for important tips
   - Mobile-responsive design

**Example Questions:**
- "How can I reduce water usage in my bathroom?"
- "What are the best DIY water-saving projects?"
- "How much water can I save with a rain barrel?"
- "What's the most effective way to water my garden?"

## 🔍 Troubleshooting

### Common Issues

**Chatbot Not Responding:**
- Ensure Ollama is running: `ollama serve`
- Check if the model is available: `ollama list`
- Verify API endpoint: http://localhost:11434

**Model Loading Errors:**
```powershell
# Re-download the model
ollama pull gemma2:2b

# Check system resources
ollama ps
```

**Performance Issues:**
- Try a smaller model (gemma2:2b instead of gemma2:9b)
- Ensure sufficient RAM is available
- Close other resource-intensive applications

**CORS Errors:**
- Use a local web server instead of opening files directly
- Ensure Ollama is running on the default port (11434)

### Error Messages

| Error | Solution |
|-------|----------|
| "Model not found" | Run `ollama pull gemma2:2b` |
| "Connection refused" | Start Ollama with `ollama serve` |
| "Stream parsing error" | Check model compatibility and restart Ollama |
| "Memory insufficient" | Try a smaller model or increase system RAM |

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Ollama Team**: For providing excellent local AI infrastructure
- **Google**: For the Gemma model series
- **My classmate**: For water conservation insights and feedback
- **Efrei Teacher**: For supporting water conservation awareness <3

---

**Made with 💧 by the Water Warriors Team**

*Every drop counts in the fight for water conservation!* lol
