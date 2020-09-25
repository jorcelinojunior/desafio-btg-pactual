import os from 'os'

export const getIPAddress = () => {
    let interfaces = os.networkInterfaces();
    let ip = '0.0.0.0'

    for (var devName in interfaces) {
        let iface = interfaces[devName];
    
        for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
            ip = alias.address;
        }
    }
    
    return ip; 
}
