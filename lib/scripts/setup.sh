#!/bin/bash
# scripts/setup.sh

echo "🚀 Setting up development environment..."

# ─── Install memcached ─────────────────────────────────
echo "📦 Installing memcached..."
sudo dnf install memcached -y

# ─── Enable and start memcached ────────────────────────
echo "⚙️  Enabling memcached service..."
sudo systemctl enable memcached
sudo systemctl start memcached

# ─── Add sudoers rule (no password for memcached) ──────
echo "🔐 Adding sudoers rule..."
SUDOERS_LINE="$USER ALL=(ALL) NOPASSWD: /usr/bin/systemctl start memcached, /usr/bin/systemctl stop memcached, /usr/bin/systemctl restart memcached"
SUDOERS_FILE="/etc/sudoers.d/memcached"

# only add if not already exists
if ! sudo grep -q "systemctl start memcached" /etc/sudoers.d/memcached 2>/dev/null; then
  echo "$SUDOERS_LINE" | sudo tee "$SUDOERS_FILE" > /dev/null
  sudo chmod 440 "$SUDOERS_FILE"
  echo "✅ Sudoers rule added"
else
  echo "⏭️  Sudoers rule already exists"
fi

# ─── Install node dependencies ─────────────────────────
echo "📦 Installing node dependencies..."
npm install

# ─── Install parcel watcher ────────────────────────────
echo "📦 Installing @parcel/watcher..."
npm install @parcel/watcher

echo ""
echo "🎉 Setup complete! You can now run: npm run server"

# ─── Production only ───────────────────────────────────
if [ "$1" == "--production" ]; then
  echo "🏭 Running production setup..."
  npm run deploy
fi
