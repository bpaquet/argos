const path = require('path')
const { default: config } = require('@argos-ci/config')

module.exports = {
  ...config.get('pg'),
  migrations: { directory: path.join(__dirname, 'migrations') },
}
