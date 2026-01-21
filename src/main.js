const http = require('http')
const https = require('https')
const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const { getConfigFields } = require('./config')
const { getActionDefinitions } = require('./actions')
const { getVariableDefinitions, updateVariableValues } = require('./variables')
const { UpgradeScripts } = require('./upgrades')

class ModuleInstance extends InstanceBase {
  constructor(internal) {
    super(internal)
    this.playbackState = null
    this.recordingActive = false
  }

  async init(config) {
    this.config = config
    this.updateStatus(InstanceStatus.Ok)
    this.initActions()
    this.initVariables()
  }

  async destroy() {
    // nothing to clean up yet
  }

  getConfigFields() {
    return getConfigFields()
  }

  async configUpdated(config) {
    this.config = config
    this.initActions()
  }

  initActions() {
    this.setActionDefinitions(getActionDefinitions(this))
  }

  initVariables() {
    this.setVariableDefinitions(getVariableDefinitions())
    updateVariableValues(this)
  }

  async sendCommand(command, value) {
    if (!this.config?.host) {
      throw new Error('Host is not configured')
    }

    let host = this.config.host.trim()
    if (!host) {
      throw new Error('Host is not configured')
    }

    // Keep existing protocol if given; otherwise assume http for the actual request
    const hasProtocol = /^https?:\/\//i.test(host)
    const base = host.replace(/\/+$/, '')

    const query = value !== undefined ? `${command}=${value}` : command
    const fetchUrl = hasProtocol ? `${base}/remote.cgi?${query}` : `http://${base}/remote.cgi?${query}`
    const logUrl = hasProtocol ? fetchUrl : `${base}/remote.cgi?${query}`

    this.log('debug', `Sending command: ${logUrl}`)

    // Use plain Node request (closer to curl/PowerShell) to match Aura's expected behavior
    const client = fetchUrl.startsWith('https://') ? https : http

    await new Promise((resolve, reject) => {
      const req = client.request(fetchUrl, {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'identity',
          Connection: 'close',
        },
      })

      req.on('response', (res) => {
        let body = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
          body += chunk
        })

        res.on('end', () => {
          const statusOk = res.statusCode && res.statusCode >= 200 && res.statusCode < 500
          if (statusOk) {
            if (command === 'stop') {
              this.recordingActive = false
            }
            updateVariableValues(this, {
              last_command: query,
              last_status: `HTTP ${res.statusCode}`,
            })
            resolve()
          } else {
            reject(new Error(`HTTP ${res.statusCode} ${res.statusMessage || ''}${body ? ` - ${body}` : ''}`))
          }
        })
      })

      req.on('error', (err) => {
        reject(err)
      })

      req.end()
    })
  }
}

module.exports = ModuleInstance

runEntrypoint(ModuleInstance, UpgradeScripts)
