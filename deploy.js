import Client from 'ssh2-sftp-client';
import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function deployToSFTP() {
    const sftp = new Client();

    // Configuration from environment variables
    const config = {
        host: "tondomino.online",
        port: 22,
        username: "mogilev.v",
        privateKey: fs.readFileSync("/Users/user/.ssh/id_ed25519")
    };

    console.log(config);

    const localPath = path.resolve(__dirname, 'dist');
    const remotePath = "/opt/domino_web/dev"

    try {
        console.log('🔐 Connecting to SFTP server...');
        await sftp.connect(config);
        console.log('✅ Connected successfully');

        console.log('📁 Checking if remote directory exists...');
        const remoteExists = await sftp.exists(remotePath);
        if (!remoteExists) {
            console.log('📁 Creating remote directory...');
            await sftp.mkdir(remotePath, true);
        }

        console.log('🚀 Uploading files...');
        // await sftp.uploadDir(localPath, remotePath);
        await sftp.put(path.join(localPath, 'bundle.js'), path.join(remotePath, 'bundle.js'));
        await sftp.uploadDir(path.join(localPath, 'cfg'), path.join(remotePath, 'cfg'));
        console.log('✅ Upload completed successfully');

    } catch (error) {
        console.error('❌ Deploy failed:', error.message);
        process.exit(1);
    } finally {
        await sftp.end();
        console.log('🔌 Connection closed');
    }
}

// Check if dist folder exists
if (!fs.existsSync('dist')) {
    console.error('❌ dist folder not found. Please run build first.');
    process.exit(1);
}

deployToSFTP();