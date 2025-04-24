#!/bin/bash
set -e  # Exit on errors

# --- 1. Start Server ---
npm run dev &
SERVER_PID=$!

# --- 2. Start Ngrok ---
./ngrok http 1111 > ngrok.log 2>&1 &
NGROK_PID=$!
sleep 5  # Wait for Ngrok initialization

# --- 3. Get Ngrok URL ---
URL=$(curl -s http://127.0.0.1:4040/api/tunnels | jq -r '.tunnels[0].public_url')
if [ -z "$URL" ]; then
    echo "ERROR: Failed to get Ngrok URL"
    exit 1
fi

# --- 4. Update .env Safely ---
if [ -f .env ]; then
    grep -v "NGROK_API_URL" .env > .env.tmp
    mv .env.tmp .env
fi
echo "NGROK_API_URL=$URL" >> .env
echo "✅ Ngrok URL set to: $URL"

# --- 5. Generate QR Code ---
echo "🌐 QR Code for Ngrok URL:"
npx qrcode-terminal "$URL"

# --- 6. Keep Running ---
wait $SERVER_PID $NGROK_PID