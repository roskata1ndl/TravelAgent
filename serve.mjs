#!/usr/bin/env node
// Simple script to start Next.js dev server
import { spawn } from 'child_process';
const dev = spawn('npx', ['next', 'dev'], { stdio: 'inherit' });

dev.on('close', code => {
  console.log(`Dev server exited with code ${code}`);
});
