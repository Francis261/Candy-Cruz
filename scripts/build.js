const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

fs.readdirSync(path.join(__dirname, '..', 'assets'), { withFileTypes: true })
    .forEach(entry => {
        const srcPath = path.join(__dirname, '..', 'assets', entry.name);
        const destPath = path.join(distDir, 'assets', entry.name);
        if (entry.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            fs.readdirSync(srcPath).forEach(file => {
                fs.copyFileSync(path.join(srcPath, file), path.join(destPath, file));
            });
        } else {
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            fs.copyFileSync(srcPath, destPath);
        }
    });

fs.copyFileSync(path.join(__dirname, '..', 'index.html'), path.join(distDir, 'index.html'));

esbuild.build({
    entryPoints: [path.join(__dirname, '..', 'src', 'main.js')],
    bundle: true,
    outfile: path.join(distDir, 'js', 'game.js'),
    format: 'iife',
    globalName: 'Game',
    platform: 'browser',
    target: ['es2015'],
    minify: process.argv.includes('--production'),
    sourcemap: !process.argv.includes('--production'),
}).then(() => {
    console.log('Build complete: dist/');
}).catch(() => process.exit(1));
