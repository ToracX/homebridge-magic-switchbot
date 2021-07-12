var Service, Characteristic;
const { exec } = require('child_process');

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory('homebridge-magic-switchbot', 'Magic-SwitchBot', Switch);
};

function Switch(log, config) {
    this.log = log;
    this.switch = {
        powerOn: {},
        powerOff: {}
    };
    this.name = config.name;
}
Switch.prototype.getServices = function () {
    var plugin = this;
    plugin.log('creating Switch');
    var switchService = new Service.Switch(plugin.name);
    switchService.getCharacteristic(Characteristic.On)
        .on('set', function (value, callback) {
            plugin.log("Switch -> " + value);

            command = "python3 /home/pi/magicswitchbot/magicswitchbot-push.py"
            exec(command)

            callback();
        });
    return [switchService];
}
