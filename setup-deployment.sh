#!/bin/bash
# Setup and Deployment Script for Rant Home

echo "🚀 Starting Rant Home Deployment Setup..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}================== DEPLOYMENT SETUP ==================${NC}"
echo ""

# 1. Check if git is initialized
echo -e "${BLUE}1. Checking Git Repository...${NC}"
if [ -d ".git" ]; then
    echo -e "${GREEN}✓ Git repository found${NC}"
else
    echo -e "${YELLOW}! Initializing git...${NC}"
    git init
fi
echo ""

# 2. Check if .gitignore exists
echo -e "${BLUE}2. Checking .gitignore...${NC}"
if [ -f ".gitignore" ]; then
    echo -e "${GREEN}✓ .gitignore found${NC}"
else
    echo -e "${YELLOW}! Creating .gitignore...${NC}"
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
/build
/dist
.cache/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Test coverage
/coverage

# Misc
.netlify
.vercel
EOF
    echo -e "${GREEN}✓ .gitignore created${NC}"
fi
echo ""

# 3. Setup Backend
echo -e "${BLUE}3. Setting up Backend...${NC}"
cd backend

if [ -f "node_modules" ]; then
    echo -e "${GREEN}✓ Backend dependencies already installed${NC}"
else
    echo -e "${YELLOW}! Installing backend dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
fi

echo -e "${GREEN}✓ Backend ready${NC}"
cd ..
echo ""

# 4. Setup Frontend
echo -e "${BLUE}4. Setting up Frontend...${NC}"
cd frontend

if [ -f "node_modules" ]; then
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
else
    echo -e "${YELLOW}! Installing frontend dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
fi

echo -e "${GREEN}✓ Frontend ready${NC}"
cd ..
echo ""

# 5. Summary
echo -e "${BLUE}================== SETUP COMPLETE ==================${NC}"
echo ""
echo -e "${GREEN}Next Steps:${NC}"
echo "1. Read DEPLOYMENT_QUICK_START.md for quick deployment guide"
echo "2. Read VERCEL_DEPLOYMENT_GUIDE.md for detailed information"
echo "3. Read SECURITY_AND_CORS_GUIDE.md for security setup"
echo ""
echo -e "${YELLOW}Important:${NC}"
echo "- Create MongoDB Atlas account at: https://www.mongodb.com/cloud/atlas"
echo "- Get your MongoDB connection string"
echo "- Update backend/.env with the connection string"
echo "- Deploy to Vercel: https://vercel.com"
echo ""
echo -e "${BLUE}Happy Deploying! 🎉${NC}"
